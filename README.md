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

## Setting up a Local Web Server

In order to run the image processing application locally, you need to set up a simple web server. Follow these steps:

1. **Install Python 3.x:**
   - If you haven't already, download and install Python 3.x from [Python's official website](https://www.python.org/downloads/).

2. **Navigate to Your Project Folder:**
   - Open a PowerShell window and navigate to the folder where all your HTML and JS files for the project are located.

3. **Open PowerShell in the Project Folder:**
   - Shift right-click in the project folder and choose "Open PowerShell."

4. **Start the Web Server:**
   - In the PowerShell window, execute the following Python command:
     ```powershell
     py -m http.server
     ```
     If the server starts successfully, you should see a message like this:
     ```
     Serving HTTP on :: port 8000 (http://[::]:8000/) ...
     ```
     By default, the server will run on localhost at port 8000.

5. **Access Your Application:**
   - Open your web browser and navigate to [http://localhost:8000](http://localhost:8000) to access your image processing application.

6. **Start Your App:**
   - Interact with your app through the GUI controls to apply various image processing methods.

**Note:** There are options to further configure the web server, but the provided command will start a server at port 8000 on localhost.


