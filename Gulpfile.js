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


gulp.task('jshint', function () {
	return gulp.src(['client/app/**/*.js'])
	//	.pipe($gulp.using())
		.pipe($gulp.jshint())
		.pipe($gulp.jshint.reporter('default'));
});

gulp.task('js', ['systemjs', 'es6-build:app', 'es6-build:vendors']);
gulp.task('systemjs', function () {
	return gulp.src(['client/components/es6-module-loader/dist/es6-module-loader.js',
		'client/components/traceur-runtime/traceur-runtime.min.js',
		'client/components/system.js/dist/system.js'])
	//	.pipe($gulp.using())
		.pipe($gulp.uglify())
		.pipe($gulp.concat('systemjs-dep.min.js'))
		.pipe(gulp.dest('client/build/scripts/'))
		.pipe($gulp.size({showFiles: false}));
});
gulp.task('es6-build:app', ['jshint'], function (cb) {
	"use strict";
	var builder = getBuilder();

	// Build a self-executing bundle (ie. Has SystemJS built in and auto-imports the 'app' module)
	// Ignore the last line -- Not Using SFX anymore because it (at the moment) forces you to create one large monolithic bundle with all the external files....
	// https://github.com/systemjs/builder/issues/108

	// Creating different bundles for vendors and app files -- may change in future
	builder.build('app/bootstrap - [components/*/*]', 'client/build/scripts/app.js', {minify: false, sourceMaps: false, runtime: false});
	cb();
});
gulp.task('es6-build:vendors', function (cb) {
	"use strict";

	var builder = getBuilder();
	builder.build('components/angular/angular', 'client/build/scripts/vendors.js', {minify: true, sourceMaps: false, runtime: false});
	cb();
});

gulp.task('watch', function () {
	"use strict";
	gulp.watch(['client/content/**/*.less'], ['css']);
	gulp.watch(['client/app/**/*.js'], ['es6-build:app']);

	gulp.watch([
		'client/index.html', 'client/build/**/*'
	], $gulp.livereload.changed);
});

gulp.task('build:dev', ['js', 'css']);

gulp.task('server:start', ['build:dev'], function () {
	"use strict";
	server.listen({path: 'server/app.js'}, $gulp.livereload.listen);
});

gulp.task('default', ['server:start', 'watch']);