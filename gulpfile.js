'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanss = require('gulp-cleancss');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var jsx = require('gulp-react');
var browserify = require('gulp-browserify');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build-scss', function() {
  gulp.src(['./style/css/*.css', './style/sass/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['IE 9', 'last 2 versions'] }))
    .pipe(cleanss({keepBreaks: false}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./build/style'));
});

gulp.task('build-js', function() {
	gulp.src('./js/main.js')
	.pipe(browserify({
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        extensions: ['.jsx']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('deploy', ['build-scss'], function() {
	gulp.src('./js/main.js')
	.pipe(browserify({
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: false, // Gives us sourcemapping
        extensions: ['.jsx']
    }))
    .pipe(uglify({
    	mangle: true,
    	compress: {
    		sequences     : true,  // join consecutive statemets with the “comma operator”
			properties    : true,  // optimize property access: a["foo"] → a.foo
			dead_code     : true,  // discard unreachable code
			drop_debugger : true,  // discard “debugger” statements
			unsafe        : false, // some unsafe optimizations (see below)
			conditionals  : true,  // optimize if-s and conditional expressions
			comparisons   : true,  // optimize comparisons
			evaluate      : false,  // evaluate constant expressions
			booleans      : true,  // optimize boolean expressions
			loops         : false,  // optimize loops
			unused        : true,  // drop unused variables/functions
			hoist_funs    : false,  // hoist function declarations
			hoist_vars    : false, // hoist variable declarations
			if_return     : true,  // optimize if-s followed by return/continue
			join_vars     : true,  // join var declarations
			cascade       : false,  // try to cascade `right` into `left` in sequences
			side_effects  : true,  // drop side-effect-free statements
			warnings      : true,  // warn about potentially dangerous optimizations/code
    	}
    }))
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./build/js'));
});


gulp.task('default', ['build-scss', 'build-js']);