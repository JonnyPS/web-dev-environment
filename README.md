# A simple ad development work environment<br>to speed up general processes.

This will develop over time but currently includes the following features.

- Uses Gulp task runner to:
  - Compile SASS
  - Minify CSS and Javascript
  - Concatonate multiple CSS and Javascript files
  - Compress images
  - Exports finished output to a 'dist' folder
  - Zips all content ready for publication
- Live reloading with BrowserSync
- Integration of Nunjucks templating language to import JSON data in to HTML

## Setting up the environment

Clone this project to your local environment.
Open terminal and run **gulp watch** to get started.

### Install
Run **npm install**

### Folder Structure
The *app* folder is used for development purposes only.<br>
The *dist* folder is used for publication only.

### Nunjucks
Nunjucks templating language is used to import text from a JSON file as banner copy.
This way, you can have a different object for every format of banner, and import the relevent text over for each one. This allows for changes across the board by changing only the one JSON file.

### Gulp Watch

Run **gulp watch** in the terminal when developing. This runs browserSync, and watches for any changes to the sass, js or nunjucks templates.
The browser will refresh to render the new view upon any saved change.

### Gulp build

Run **gulp build** in the terminal once you're ready to deploy the project.
This ensures everything is optimised.
Javascript and css files are concatonated and minified, images are compressed and a zip file of all dist folder files is created.

