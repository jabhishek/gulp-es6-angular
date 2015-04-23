var gulp = require("gulp");
var server = require('gulp-develop-server');
var Builder = require('systemjs-builder'),
	path = require('path');
var $gulp = require('gulp-load-plugins')({
	lazy: false
});

gulp.task('es6-build', function(cb) {
	"use strict";
	var builder = new Builder();
	builder.loadConfig('./client/system.config.js')
		.then(function() {
			// Change baseURL to match the file system
			var baseUrl = path.resolve('./client');
			builder.config({ baseURL: 'file:' + baseUrl });

			// Build a self-executing bundle (ie. Has SystemJS built in and auto-imports the 'app' module)
			return builder.buildSFX('app/es6/bootstrap', 'client/app/es5/bundle.js', { minify: true, sourceMaps: false, runtime: false});
		}).catch(function(err) {
			console.error(err);
		});
	cb();
});

gulp.task('watch', function() {
	"use strict";
	gulp.watch(['client/app/**/*', '!client/app/**/bundle.*'], ['es6-build']);
	gulp.watch([
		'client/index.html', 'client/**/bundle.js'
	], $gulp.livereload.changed);
});

gulp.task('server:start', function() {
	"use strict";
	server.listen({path: 'server/app.js'}, $gulp.livereload.listen);
});

gulp.task('default', ['server:start', 'watch']);