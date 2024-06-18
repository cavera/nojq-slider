# No jQ Slider

A js slider with no dependencies and little extra job for the browser.

> Currently tested on chromium browsers.

This is a simple slider built using HTML, CSS, and JavaScript. The slider is responsive and can be made to adapt its height based on the content of each slide. It supports infinite scrolling, autoplay with custom intervals, and navigation buttons for manually moving through the slides.

## Features:

- **Responsive Design:** The slider adjusts to fit the width of its container.
- **Autoplay:** Slides automatically change every interval if enabled.
- **Infinite Scrolling:** Option to loop through slides without limits.
- **Navigation Buttons:** Clicking on previous or next buttons advances the slide.
- **Adaptive Height:** The height of the slider adjusts dynamically based on the tallest slide visible at any time, unless turned off with adaptiveHeigh.
- Customizable speed of animations

## Demo

You can see a live demo of this slider by visiting [https://cavera.github.io/nojq-slider/](https://cavera.github.io/nojq-slider/).

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/slider.git`
2. Navigate to the project directory: `cd slider`
3. Open the `index.html` file in a web browser to see the demo.

## Usage

To use this slider, you need to include the following files in your HTML:

1. `styles.css` - The CSS file for styling the slider.
2. `slider.js` - The JavaScript file containing the slider functionality.
3. Add the `slider.css` and `slider.js` files to your project's HTML file.
4. Customize the slider by modifying the `slider.css` file, or add your own styles in your project's style sheet.

Additionally, you will need to modify the `createSlider()` function in the `slider.js` file to fit your specific needs. You can pass an object with various configuration options as the argument to customize the behavior of the slider.

## Usage example

```js
createSlider({
  wrapper: ".slider", // The main wrapper element for the slider
  container: ".slides", // The container for all slides
  track: ".slide-items", // The track within which slides are positioned
  nextBtn: ".btn-next", // The button to go to the next slide
  prevBtn: ".btn-prev", // The button to go to the previous slide
  autoplay: true, // Enable autoplay of slides
  autoplayInterval: 4000, // Time between autoplays in milliseconds
  speed: 500, // Transition speed in milliseconds
  infinite: true, // Loop through the slides indefinitely
  visibleSlides: 3, // How many slides are visible at once
});
```

This is a detailed explanation of the options available in `createSlider()`:

**wrapper** (string): CSS selector for the main wrapper element around the slider.

**container** (string): CSS selector for the container that holds all the slides.

**track** (string): CSS selector for the track within which the slides are positioned.

**nextBtn** (string): CSS selector for the button to go to the next slide.

**prevBtn** (string): CSS selector for the button to go to the previous slide.

**autoplay** (boolean): Whether the slider should start autoplaying on page load.

**autoplayInterval** (number): The interval in milliseconds between each autoplay transition.

**speed** (number): The duration of the animation when moving from one slide to another, in milliseconds.

**infinite** (boolean): Whether the slider should loop endlessly without limits.

**visibleSlides** (number): The maximum number of slides that can be visible at once. If this value exceeds the total number of slides, it defaults to 1.

**adaptiveHeigh** (boolean): Whether the slider should adjust its height based on the tallest slide visible at any time. It's turned on by default.

**onChangeSlide** (function): A function called when the current slide changes. Receives the new active slide element as an argument. Default is an empty function.

## Note:

Ensure that you have linked a CSS file or added necessary styles for the slider elements (e.g., .slider, .slides, etc.) before using this script.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
