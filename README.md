# imgsizer

imgsizer is a [Sails](http://sailsjs.org) application built to dynamically generate different sizes from an original image.

It was built to work with [SurrealComics](http://surrealcomics.org) by generating diferent images depending on the screen that the user is using to visit the site. 

## Usage

To use the app you just have to get it running either locally or on a server like heroku, afterwards you can make querys to it to generate new images.

The query must be built like this:

    <img src="http://imgsizr.8cdn.co/{max-width}/{max-height}/{encoded URL of original image}" />
    
A working example is: 

    <img src="http://imgsizer.8cdn.co/600/1000/http%3A%2F%2Fwww.surrealcomics.org%2Fcomic%2Fanimal-de-ciudad.img%2F0.jpg" />
    
    
## How it works?

The way the app works is very simple. It first download the original image and parse requested parameters, if a resized image already exists with the specified dimensions the app will instantly return such image.

If the image has never been generated in the requested size, it will resize the original image and store the new one in the /sized/ folder for future use, the "sized" folder is cleared on every app reboot so its cache is cleared. 

## When to use it?

You can use this simple app to generate responsive images for your sites on the fly, for example, by getting required dimensions using JavaScript and then generating appropiate images for the current screen, this way you only have to store full size images and the rest will be generated on the fly for every screen. 

## Feedback

This is a very basic node experiment by  [8manos](http://8manos.com), all feedback, enhancement requests, pull requests and bug reports are very welcome. 

