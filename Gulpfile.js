var gulp = require("gulp");
var server = require('gulp-develop-server');
var Builder = require('systemjs-builder'),
	path = require('path');
var $gulp = require('gulp-load-plugins')({
	lazy: false
});

function getBuilder() {
	"use strict";
	var builder = new Builder('./client/system.config.js');
	// Change baseURL to match the file system
	var baseUrl = path.resolve('./client');
	builder.config({
		baseURL: 'file:' + baseUrl
	});
	return builder;
}


gulp.task('es6-build', ['es6-build:app', 'es6-build:vendors']);

gulp.task('es6-build:app', function (cb) {
	"use strict";
	var builder = getBuilder();

	// Build a self-executing bundle (ie. Has SystemJS built in and auto-imports the 'app' module)
	// Ignore the last line -- Not Using SFX anymore because it (at the moment) forces you to create one large monolithic bundle with all the external files....
	// https://github.com/systemjs/builder/issues/108

	// Creating different bundles for vendors and source files -- may change in future
	builder.build('app/bootstrap - [components/angular/angular]', 'client/build/es5/app.js', {minify: false, sourceMaps: false, runtime: false});
	cb();
});
gulp.task('es6-build:vendors', function (cb) {
	"use strict";

	var builder = new Builder('./client/system.config.js');
	// Change baseURL to match the file system
	var baseUrl = path.resolve('./client');
	builder.config({
		baseURL: 'file:' + baseUrl
	});

	// Build a self-executing bundle (ie. Has SystemJS built in and auto-imports the 'app' module)
	// Ignore the last line -- Not Using SFX anymore because it (at the moment) forces you to create one large monolithic bundle with all the external files....
	// https://github.com/systemjs/builder/issues/108

	// Creating different bundles for vendors and source files -- may change in future
	builder.build('components/angular/angular', 'client/build/es5/vendors.js', {minify: true, sourceMaps: false, runtime: false});
	cb();
});

gulp.task('watch', function () {
	"use strict";
	gulp.watch(['client/app/**/*.js'], ['es6-build:app']);
	gulp.watch([
		'client/index.html', 'client/build/**/*'
	], $gulp.livereload.changed);
});

gulp.task('server:start', ['es6-build'], function () {
	"use strict";
	server.listen({path: 'server/app.js'}, $gulp.livereload.listen);
});

gulp.task('default', ['server:start', 'watch']);