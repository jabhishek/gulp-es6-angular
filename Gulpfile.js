var gulp = require("gulp");
var server = require('gulp-develop-server');
var Builder = require('systemjs-builder'),
	path = require('path');
var $gulp = require('gulp-load-plugins')({
	lazy: false
});

var vendorJsFiles = [
	'client/components/angular/angular.js',
	'client/components/angular-ui-router/release/angular-ui-router.js',
	'client/components/angular-aria/angular-aria.js',
	'client/components/angular-material/angular-material.js',
	'client/components/angular-touch/angular-touch.js',
	'client/components/angular-animate/angular-animate.js'
];

function getBuilder() {
	"use strict";
	var builder = new Builder('./client/system.config.js');
	// Change baseURL to match the file system
	var baseUrl = path.resolve('./client');
	builder.config({
		baseURL: 'file:' + baseUrl,
		transpiler: 'babel'
	});
	return builder;
}

gulp.task('css', function() {
	"use strict";
	return gulp.src(['client/content/app.less'])
		.pipe($gulp.less())
		.pipe($gulp.autoprefixer())
		//.pipe(minify())
		//.pipe($gulp.rev())
		.pipe(gulp.dest('client/build/css/'))
		.pipe($gulp.size({showFiles: false}));
});

gulp.task('vendors:js', function() {
	"use strict";
	return gulp.src(vendorJsFiles)
		.pipe($gulp.concat('vendors.js'))
		.pipe($gulp.uglify())
		//.pipe(minify())
		//.pipe($gulp.rev())
		.pipe(gulp.dest('client/build/vendors/'))
		.pipe($gulp.size({showFiles: false}));
});


gulp.task('jshint', function () {
	return gulp.src(['client/app/**/*.js'])
	//	.pipe($gulp.using())
		.pipe($gulp.jshint())
		.pipe($gulp.jshint.reporter('default'));
});

gulp.task('es6-buildsfx', ['jshint'], function (cb) {
	"use strict";
	var builder = getBuilder();

	// Build a self-executing bundle (ie. Has SystemJS built in and auto-imports the 'app' module)
	// gone back to build sfx file, although I am not happy with it... it was this or load systemjs and all other dependencies in browser
	// https://github.com/systemjs/builder/issues/108
	// update - 05/05/2015 - still building sfx files, but vendor files are included as script tags and modules exposed as adapter modules
	// https://github.com/systemjs/builder#adapter-modules
	builder.buildSFX('app/bootstrap', 'client/build/scripts/app.js', {minify: true, sourceMaps: true, runtime: true});
	cb();
});

gulp.task('watch', function () {
	"use strict";
	gulp.watch(['client/content/**/*.less'], ['css']);
	gulp.watch(['client/app/**/*.js'], ['es6-buildsfx']);

	gulp.watch([
		'client/index.html', 'client/build/**/*'
	], $gulp.livereload.changed);
});

gulp.task('build:dev', ['css', 'vendors:js', 'es6-buildsfx' ]);

gulp.task('server:start', ['build:dev'], function () {
	"use strict";
	server.listen({path: 'server/app.js'}, $gulp.livereload.listen);
});

gulp.task('default', ['server:start', 'watch']);