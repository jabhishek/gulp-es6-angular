var gulp = require("gulp");
var server = require('gulp-develop-server');
var Builder = require('systemjs-builder'),
	path = require('path');
var $gulp = require('gulp-load-plugins')({
	lazy: false
});
var runSequence = require('run-sequence');
var exec = require('child_process').exec;

var vendorJsFiles = [
	'client/bower_components/angular/angular.js',
	'client/bower_components/angular-ui-router/release/angular-ui-router.js',
	'client/bower_components/angular-aria/angular-aria.js',
	'client/bower_components/angular-material/angular-material.js',
	'client/bower_components/angular-touch/angular-touch.js',
	'client/bower_components/angular-animate/angular-animate.js'
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

gulp.task('css', function () {
	"use strict";
	return gulp.src(['client/assets/app.less'])
		.pipe($gulp.less())
		.pipe($gulp.autoprefixer())
		//.pipe(minify())
		//.pipe($gulp.rev())
		.pipe(gulp.dest('client/build/css/'))
		.pipe($gulp.size({showFiles: false}));
});

gulp.task('vendors:js', function () {
	"use strict";
	return gulp.src(vendorJsFiles)
		.pipe($gulp.concat('vendors.js'))
		.pipe($gulp.uglify())
		//.pipe(minify())
		//.pipe($gulp.rev())
		.pipe(gulp.dest('client/build/vendors/'))
		.pipe($gulp.size({showFiles: false}));
});

/* Run gulp test:server --harmony */
gulp.task('test:server', function () {
	"use strict";
	return gulp.src('server/**/*.spec.js')
		.pipe($gulp.mocha({reporter: 'spec'}))
		.on('error', $gulp.util.log);

});

gulp.task('test:server:exec', function (cb) {
	"use strict";
	exec('gulp test:server --harmony', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('jshint', function () {
	return gulp.src(['client/app/**/*.js'])
		//	.pipe($gulp.using())
		.pipe($gulp.jshint())
		.pipe($gulp.jshint.reporter('default'));
});

gulp.task('es6', ['jshint'], function (cb) {
	"use strict";
	var builder = getBuilder();

	// Build a self-executing bundle (ie. Has SystemJS built in and auto-imports the 'app' module)
	// gone back to build sfx file, although I am not happy with it... it was this or load systemjs and all other dependencies in browser
	// https://github.com/systemjs/builder/issues/108
	// update - 05/05/2015 - still building sfx files, but vendor files are included as script tags and modules exposed as adapter modules
	// https://github.com/systemjs/builder#adapter-modules
	builder.buildSFX('app/bootstrap', 'client/build/scripts/app.js', {minify: true, sourceMaps: true, runtime: true})
		.catch(function (err) {
			console.log('Build error');
			console.log(err);
		});
	cb();
});

gulp.task('watch', function () {
	"use strict";
	/*gulp.watch(['server/!**!/!*.js'], ['test:server']);*/
	gulp.watch(['server/**/*.js'], ['server:restart']);
	gulp.watch(['client/**/*.less'], ['css']);
	gulp.watch(['client/app/**/*.js', 'client/app/**/*.html'], ['es6']);

	gulp.watch([
		'client/index.html', 'client/build/**/*'
	], $gulp.livereload.changed);
});
// restart server if app.js changed
gulp.task('server:restart', function () {
	//server.restart();
	server.changed(function (error) {
		if (!error) $gulp.livereload.changed();
	});
});

gulp.task('build:dev', ['css', 'vendors:js', 'es6']);

gulp.task('server:start', ['build:dev'], function () {
	"use strict";
	server.listen({path: 'server/app.js', execArgv: ['--harmony', '--use_strict']}, $gulp.livereload.listen);
});

gulp.task('default', function () {
	runSequence('server:start', 'watch')
});