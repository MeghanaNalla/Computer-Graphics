//
// Submitted by Meghana Reddy Nalla

//
var gl;
var program;
var canvas;
var aspect;

var warmth = 0.0;
var brightness = 0.0;
var contrast = 1.0;
var saturation = 0.0;
var invert = 0;
var greyscale = 0;

var left = -2;           // left limit of world coords
var right = 2;           // right limit of world coords
var bottom = -2;         // bottom limit of world coords
var topBound = 2;        // top limit of worlds coord
var near = -10;           // near clip plane
var far = 10;             // far clip plane

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" ); // Get HTML canvas
    
    gl = canvas.getContext('webgl2');                    // Get a WebGL 2.0 context
    if ( !gl ) { alert( "WebGL isn't available" ); }

    aspect = canvas.width / canvas.height;        // get the aspect ratio of the canvas
    left *= aspect;                                   // left limit of world coords
    right *= aspect;                                  // right limit of world coords
	
	var image = document.getElementById("texImage");
	//var imgAspect = image.width() / image.height();

    // Vertices of two triangles in complex plane
    
    var vertices = [
        vec2(-2.0 * 1.942, 2.0),
        vec2(-2.0 * 1.942,-2.0),
        vec2( 2.0 * 1.942,-2.0),
        vec2(-2.0 * 1.942, 2.0),
        vec2( 2.0 * 1.942, 2.0),
        vec2( 2.0 * 1.942,-2.0)
    ];

    var texCoordsArray = [
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(0.0, 1.0),
        vec2(1.0, 1.0),
        vec2(1.0, 0.0)
    ];

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );  // What part of html are we looking at?
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );               // Set background color of the viewport to black
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" ); // Compile and link shaders to form a program
    gl.useProgram(program);                                              // Make this the active shaer program

    // Texture attribute VBO

    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);

    var vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);
    
    // Load the data into the GPU

    var bufferId = gl.createBuffer();                                    // Generate a VBO id
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );                          // Bind this VBO to be the active one
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); // Load the VBO with vertex data

    // Associate our shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );        // Link js vPosition with "vertex shader attribute variable" - vPosition
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0 );        // Specify layout of VBO memory
    gl.enableVertexAttribArray(vPosition);                             // Enable this attribute

    // Set up texture
    
    configureTexture2(image);

    render();
};


// Three callback functions for 3 color sliders, one red, one green, and one blue
document.getElementById("Warmth").oninput = function () {
    warmth = (event.srcElement.value / 128) * .5;
};

document.getElementById("Brightness").oninput = function () {
    brightness = (event.srcElement.value / 128) * .5;
};
document.getElementById("Contrast").oninput = function () {
    contrast = parseFloat(event.srcElement.value) / 128.0;
};
document.getElementById("Saturation").oninput = function () {
    saturation = (event.srcElement.value / 128) * 2.0;
};

document.getElementById("Invert").onchange = function () {
    invert = this.checked ? 1 : 0;
};

document.getElementById("Greyscale").onchange = function () {
    greyscale = this.checked ? 1 : 0;
};


// Callback function for keydown events, rgeisters function dealWithKeyboard
window.addEventListener("keydown", dealWithKeyboard, false);

// Functions that gets called to parse keydown events
function dealWithKeyboard(e) {
    switch (e.keyCode) {
       case 33: // PageUp key , Zoom in
           {
               var range = (right - left);
               var delta = (range - range * 0.9) * 0.5;
               left += delta; right -= delta;
               range = topBound - bottom;
               delta = (range - range * 0.9) * 0.5;
               bottom += delta; topBound -= delta;
           }
       break;
       case 34: // PageDown key, zoom out
           {
               var range = (right - left);
               var delta = (range * 1.1 - range) * 0.5;
               left -= delta; right += delta;
               range = topBound - bottom;
               delta = (range * 1.1 - range) * 0.5;
               bottom -= delta; topBound += delta;
           }
       break;
       case 37: // left arrow pan left
           { left += -0.1; right += -0.1; }
       break;
       case 38: // up arrow pan up
           { bottom += 0.1; topBound += 0.1; }
       break;
       case 39: // right arrow pan right
           { left += 0.1; right += 0.1; }
       break;
       case 40: // down arrow pan down
           { bottom += -0.1; topBound += -0.1;}
       break;
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);            // Clear viewport with gl.clearColor defined above

    var PMat;                                                  // js variable to hold projection matrix
    //console.log(left + " " + right);
    PMat = ortho(left, right, bottom, topBound, near, far);    // Call function to compute orthographic projection matrix

    var P_loc = gl.getUniformLocation(program, "P");           // Get Vertex shader memory location for P
    gl.uniformMatrix4fv(P_loc, false, flatten(PMat));          // Set uniform variable P on GPU 

    // Get uniform locations
    // Set CPU-side variables for all of our shader variables
    //var viewportDimensions = vec2(canvas.width, canvas.height);


    var brightnessLoc = gl.getUniformLocation(program, 'brightness');
    var warmthLoc = gl.getUniformLocation(program, 'warmth');
    var contrastLoc = gl.getUniformLocation(program, 'contrast');
    var invertLoc = gl.getUniformLocation(program, "invert");
    var saturationLoc = gl.getUniformLocation(program, "saturation");
    var greyscaleLoc = gl.getUniformLocation(program, "greyscale");
 
    gl.uniform1f(brightnessLoc, brightness);
    gl.uniform1f(warmthLoc, warmth);
    gl.uniform1f(contrastLoc, contrast);
    gl.uniform1i(invertLoc, invert);
    gl.uniform1f(saturationLoc, saturation);
    gl.uniform1i(greyscaleLoc, greyscale);

    gl.drawArrays(gl.TRIANGLES, 0, 6);         // Draw two triangles using the TRIANGLES primitive using 6 vertices
    requestAnimationFrame(render);                                  // swap buffers, continue render loop
}


function configureTexture2(image) {
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	

    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}