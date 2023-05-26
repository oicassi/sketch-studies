# sketches study

This is a simple project to study the [canvas-sketch](https://github.com/mattdesl/canvas-sketch) library that allows to draw stuff into a canvas on the web


## How it works?   

[canvas-sketch](https://github.com/mattdesl/canvas-sketch) is a library that uses the `canvas` element and provide a better API to interact when it comes to creating generative art.   
Notice that there's only JavaScript files, since the library takes care of rendering stuff in the browser

## What's under the hood

There are basically two libraries:

- [canvas-sketch](https://github.com/mattdesl/canvas-sketch) - The API that is used to draw stuff on the browser and also some utils (like Math functions)
- [tweakpane](https://cocopon.github.io/tweakpane/) - A "GUI" that is present in some of the sketches that allows to update and change things on the fly


## How to run?

You need to have [Node](https://nodejs.org/en) installed on your system (along with [NPM](https://www.npmjs.com/))

Follow the instructions on your terminal:

```bash
# 1) After cloning the repo, navigate to the root directory
cd sketches

# 2) Install the dependencies
npm install

# 3) Now you can run some of the existing sketches or create a new one
# 3.1) Run existing sketch

# a) Using the canvas-sketch command
canvas-sketch <name-of-the-sketch.js> --open

# b) Using npm start
npm start <name-of-the-sketch.js> -- --open

# The flag --open automatically opens the browser on the port that the
# app is being served

# 3.2) Creating a new sketch
canvas-sketch-cli <name-of-the-sketch.js> --open

# This will create a new sketch and automatically will run the file
# The --open flag is optional and will automatically open the browser
```
