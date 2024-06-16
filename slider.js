function createSlider(options = {}) {
  const defaultOptions = {
    wrapper: ".slider-wrapper",
    container: ".slides-container",
    track: ".track",
    nextBtn: ".nav.next",
    prevBtn: ".nav.prev",
    autoplay: false,
    autoplayInterval: 3000,
    speed: 300,
    infinite: false,
    visibleSlides: 1,
    adaptiveHeigh: true,
  };

  const sliderOptions = {
    ...defaultOptions,
    ...options,
  };

  let { wrapper, container, track, nextBtn, prevBtn, autoplay, autoplayInterval, speed, infinite, visibleSlides, adaptiveHeigh } = sliderOptions;

  const sliderWrapper = document.querySelector(wrapper);
  const sliderContainer = sliderWrapper.querySelector(container);
  const sliderTrack = sliderContainer.querySelector(track);
  const sliderItems = [...sliderTrack.children];

  if (!sliderWrapper || !sliderContainer || !sliderTrack || sliderItems.length === 0) {
    console.error("Slider elements not found");
    return;
  }

  visibleSlides = Math.max(1, Math.min(visibleSlides, sliderItems.length));
  adaptiveHeigh = visibleSlides <= 1;

  const navNext = sliderWrapper.querySelector(nextBtn);
  const navPrev = sliderWrapper.querySelector(prevBtn);

  const showNext = () => navNext.classList.add("nav-active");
  const showPrev = () => navPrev.classList.add("nav-active");
  const hideNext = () => navNext.classList.remove("nav-active");
  const hidePrev = () => navPrev.classList.remove("nav-active");

  let currentSlide = 0;
  let maxHeight = 0;
  let slideCount, slideWidth, slideHeight;
  let slideStart = 0;

  updateDOM();

  if (infinite) {
    sliderTrack.style.marginLeft = `-${slideWidth}px`;
    sliderTrack.insertBefore(sliderItems[slideCount - 1], sliderItems[0]);
    showNext();
    showPrev();
  }

  function initSlides() {}

  function moveSlide(direction) {
    let prevSlide = currentSlide;
    let isPrev = direction === "prev";
    let slideDistance;

    if (isPrev) {
      currentSlide--;
    } else {
      currentSlide++;
    }

    if (infinite) {
      if (currentSlide >= slideCount) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slideCount - 1;
      }
    } else {
      if (currentSlide >= slideCount) {
        currentSlide = slideCount - 1;
      }
      if (currentSlide < 0) {
        currentSlide = 0;
      }
    }

    if (infinite) {
      slideDistance = isPrev ? slideWidth : -slideWidth;
    } else {
      slideStart = slideWidth * prevSlide;
      slideStart = -slideStart;

      let slideEnd = slideWidth * currentSlide;
      slideDistance = -slideEnd;
    }

    const keyframes = [
      {
        transform: `translateX(${slideStart}px)`,
      },
      {
        transform: `translateX(${slideDistance}px)`,
      },
    ];

    const animationOptions = {
      duration: speed,
      iterations: 1,
      fill: "forwards",
      ease: "ease-in-out",
    };

    const movement = sliderTrack.animate(keyframes, animationOptions);
    let updSliderItems = sliderTrack.children;
    currentSlide = parseInt(currentSlide);

    let currentSlideItem = sliderTrack.querySelector(`[data-index="${currentSlide}"]`);
    slideHeight = currentSlideItem.getBoundingClientRect().height;
    updateDOM();

    movement.addEventListener("finish", () => {
      if (infinite) {
        if (!isPrev) {
          sliderTrack.appendChild(updSliderItems[0]);
        } else {
          sliderTrack.insertBefore(updSliderItems[slideCount - 1], updSliderItems[0]);
        }
        movement.cancel();

        updSliderItems = sliderTrack.children;
        currentSlide = updSliderItems[1].getAttribute("data-index");
      }
    });
  }

  function checkNav() {
    if (!infinite) {
      if (currentSlide <= 0) {
        hidePrev();
        showNext();
      } else if (currentSlide >= slideCount - visibleSlides) {
        showPrev();
        hideNext();
      } else {
        showNext();
        showPrev();
      }
    }
  }

  function updateDOM() {
    slideCount = sliderItems.length;
    slideWidth = sliderContainer.clientWidth / visibleSlides;

    sliderItems.forEach((item, i) => {
      item.setAttribute("data-index", i);
      item.style.width = `${slideWidth}px`;
      maxHeight = Math.max(maxHeight, item.offsetHeight);
    });

    if (!adaptiveHeigh) {
      slideHeight = maxHeight;
    } else {
      slideHeight = sliderItems[currentSlide].clientHeight;
    }

    sliderContainer.style.height = `${slideHeight}px`;
    sliderTrack.style.height = `${slideHeight}px`;

    if (infinite) {
      sliderTrack.style.marginLeft = `-${slideWidth}px`;
    }

    checkNav();
  }

  function eventHandler(fn) {
    let isExecuting = false;
    return () => {
      if (!isExecuting) {
        isExecuting = true;
        fn();
        setTimeout(() => {
          isExecuting = false;
        }, 300);
      }
    };
  }

  const moveLeft = eventHandler(() => moveSlide("prev"));
  const moveRight = eventHandler(() => moveSlide("next"));

  navPrev.addEventListener("click", () => moveLeft());
  navNext.addEventListener("click", () => moveRight());

  if (autoplay) setInterval(() => moveRight(), autoplayInterval);
  window.addEventListener("resize", () => updateDOM());
}

createSlider({
  infinite: true,
  autoplay: true,
  visibleSlides: 3,
});
