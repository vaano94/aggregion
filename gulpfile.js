var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    mainBowerFiles = require('main-bower-files'),
    order = require('gulp-order'),
    exec = require('child_process').exec;

    
// Путь к собранным файлам
var buildPath = "app/build";

var JsPath = "app/resources/application/**/*.js";
var CSSPath = "app/resources/css/*.css";

// Bower js components
var vendorsJsFiles = mainBowerFiles({
    filter:'**/*.js',
    paths: {
        bowerDirectory: 'bower_components'
    }
});
// Bower css components
var vendorsCSSFiles = mainBowerFiles({
  filter:'**/*.css',
    paths: {
        bowerDirectory: 'bower_components'
    }
});

// scans All js files in bower_components and connects them to the pipe vendors.js
// adds them to build/js/vendors.js
gulp.task('composeVendorJS', function() {
    return gulp.src(vendorsJsFiles)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(buildPath + "/js"));
  });
// scans All css files in bower_components and connects them to the pipe vendors.css
// adds them to build/css/vendors.css
gulp.task('composeVendorCSS', function() {
    return gulp.src(vendorsCSSFiles)
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(buildPath + "/css"));
  });  

// composes all developer-created libraries into dev.js
// app.module.js comes first
gulp.task('composeDevJS', function() {
    return gulp.src(JsPath)
    .pipe(order([
      '**/app.module.js', 
      "**/*.js"]))
    .pipe(concat('dev.js'))
    .pipe(gulp.dest(buildPath + "/js")); 
});  


gulp.task('composeDevCSS', function() {
    return gulp.src(CSSPath)
    .pipe(order([ 
      "**/*.css"]))
    .pipe(concat('dev.css'))
    .pipe(gulp.dest(buildPath + "/css")); 
});

// starts server
// uses node command to run it
gulp.task('server', function (cb) {
  exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// watches after vendor files
gulp.task('watch', function(){
  gulp.watch(vendorsJsFiles, ['composeVendorJS']);
  gulp.watch(vendorsCSSFiles, ['composeVendorCSS']);
  gulp.watch(JsPath, ['composeDevJS']);
  gulp.watch(CSSPath, ['composeDevCSS']);
});

// Collects all build components together
gulp.task('build', [
        'composeVendorCSS',
        'composeVendorJS',
        'composeDevJS',
        'composeDevCSS'
        ]);

// task to start server, build deps and watch changes
gulp.task('default', ['build', 'server', 'watch'] );
// gulp serve task
gulp.task('serve', ['default']);
