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
  };

  const sliderOptions = {
    ...defaultOptions,
    ...options,
  };

  let {
    wrapper,
    container,
    track,
    nextBtn,
    prevBtn,
    autoplay,
    autoplayInterval,
    speed,
  } = sliderOptions;

  const sliderWrapper = document.querySelector(wrapper);
  const sliderContainer = sliderWrapper.querySelector(container);
  const sliderTrack = sliderContainer.querySelector(track);
  const sliderItems = sliderTrack.children;

  if (
    !sliderWrapper ||
    !sliderContainer ||
    !sliderTrack ||
    sliderItems.length === 0
  ) {
    console.error("Slider elements not found");
    return;
  }

  let maxHeight = 0;

  [...sliderItems].forEach((item, index) => {
    item.setAttribute("data-index", index);
    if (item.offsetHeight > maxHeight) {
      maxHeight = item.offsetHeight;
    }
  });

  let currentSlide = 0;

  const slideCount = sliderItems.length;
  const slideWidth = sliderItems[0].getBoundingClientRect().width;
  let slideHeight = sliderItems[currentSlide].getBoundingClientRect().height;

  sliderWrapper.style.width = `${slideWidth}px`;
  sliderContainer.style.width = `${slideWidth}px`;
  sliderTrack.style.marginLeft = `-${slideWidth}px`;

  updateHeight(slideHeight);

  sliderWrapper.classList.add("slider-active");

  sliderTrack.insertBefore(sliderItems[slideCount - 1], sliderItems[0]);

  function moveSlide(direction) {
    const slideDistance = direction === "prev" ? slideWidth : -slideWidth;

    const keyframes = [
      { transform: "translateX(0px)" },
      { transform: `translateX(${slideDistance}px)` },
    ];
    const animationOptions = {
      duration: speed,
      iterations: 1,
      fill: "forwards",
    };

    const movement = sliderTrack.animate(keyframes, animationOptions);
    let updSliderItems = sliderTrack.children;

    if (direction === "prev") {
      currentSlide--;
      if (currentSlide < 0) currentSlide = slideCount - 1;
    } else {
      currentSlide++;
      if (currentSlide >= slideCount) currentSlide = 0;
    }

    // updating height
    let currentSlideItem = sliderTrack.querySelector(
      `[data-index="${currentSlide}"]`
    );
    slideHeight = currentSlideItem.getBoundingClientRect().height;
    updateHeight(slideHeight);

    movement.addEventListener("finish", () => {
      if (direction === "next") {
        sliderTrack.appendChild(updSliderItems[0]);
      } else {
        sliderTrack.insertBefore(
          updSliderItems[slideCount - 1],
          updSliderItems[0]
        );
      }
      movement.cancel();
      updSliderItems = sliderTrack.children;
      currentSlide = updSliderItems[1].getAttribute("data-index");
    });
  }

  function updateHeight(height) {
    sliderContainer.style.height = `${height}px`;
    sliderTrack.style.height = `${height}px`;
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

  const navNext = sliderWrapper.querySelector(nextBtn);
  const navPrev = sliderWrapper.querySelector(prevBtn);

  navPrev.addEventListener("click", () => moveLeft());
  navNext.addEventListener("click", () => moveRight());

  if (autoplay) setInterval(() => moveRight(), autoplayInterval);
}

createSlider();
