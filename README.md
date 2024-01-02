# Image Processing Application

This is a simple web-based image processing application that allows users to apply various point processing methods to images. The application includes a graphical user interface (GUI) with sliders, buttons, etc., to control the settings.

## Features

1. **Brightness/Darkness Adjustment**
   - Control the brightness of the image using a slider.

2. **Contrast Adjustment**
   - Adjust the contrast of the image using a slider.

3. **Saturation Variation**
   - Vary the saturation of the image. RGB to HSL conversion is used for this operation.

4. **Combined Brightness and Contrast Control**
   - Adjust both brightness and contrast simultaneously using a single equation.

5. **Invert Image**
   - Invert the colors of the image.

6. **Switch Between Black and White (Greyscale) and Color Image**
   - Toggle between a black and white (greyscale) image and a color image.
   - Choose between the average method (I = (R + G + B)/3) and the weighted method (I = 0.299R + 0.587G + 0.114B).

## Usage

1. Open the `index.html` file in a web browser.
2. Use the GUI controls to adjust image processing settings.
3. Toggle between black and white and color images using the provided button.

## How to Run

Simply open the `index.html` file in a web browser. No additional installation or setup is required.

## Dependencies

- This project uses HTML, CSS, and JavaScript for the frontend.
- Ensure that your browser supports WebGL for shader-based image processing.


