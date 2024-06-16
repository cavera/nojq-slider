# No jQ Slider

A js slider with no dependencies and little extra job for the browser.

> Currently tested on chromium browsers.

This is a simple slider built using HTML, CSS, and JavaScript. The slider is responsive and can be made to adapt its height based on the content of each slide. It supports infinite scrolling, autoplay with custom intervals, and navigation buttons for manually moving through the slides.

## Features

- Infinite scrolling
- Autoplay with adjustable interval
- Visible slides configuration
- Adaptive height based on content
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

## Configuration Options

- `infinite` (boolean): Whether or not the slider should allow infinite scrolling.
- `autoplay` (boolean): Whether or not the slider should autoplay.
- `visibleSlides` (number): The number of slides that should be visible at once.
- `adaptiveHeigh` (boolean): Whether or not the slider should adapt its height based on the content of each slide.
- `speed` (number): The speed of the animation in milliseconds.
- `autoplayInterval` (number): The interval between autoplays in milliseconds.
- `wrapper` (string): The CSS selector for the wrapper element containing the slider.
- `container` (string): The CSS selector for the container element where the slides are placed.
- `track` (string): The CSS selector for the track element that moves the slides.
- `nextBtn` (string): The CSS selector for the button to move the slider to the next slide.
- `prevBtn` (string): The CSS selector for the button to move the slider to the previous slide.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
