# A simple web development work environment to speed up your process.

This will develop over time but currently includes the following features.

- Uses Gulp task runner to:
  - Compile SASS
  - Minify CSS and Javascript
  - Concatonate multiple Javascript files
  - Compress images
  - exports finished output to a different directory
- Live reloading with BrowserSync
- Integration of Nunjucks templating language to import JSON data in to HTML

### *Gulp tasks*

### Gulp Watch

Run **gulp watch** in the terminal to start browserSync, and watch for any changes to the sass, js or nunjucks templates
The browser will refresh to render the new view upon any change

### Gulp build

Run **gulp build** in the terminal once you're ready to deploy the project.
This ensures everything is optimised.
Javascript and css files are concatonated and minified, images are compressed and a zip file of all dist folder files is created.
