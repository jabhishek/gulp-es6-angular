var Builder = require('systemjs-builder'),
	path = require('path');

// load SystemJS config from file

var builder = new Builder();
builder.loadConfig('./client/system.config.js')
	.then(function() {
		// Change baseURL to match the file system
		var baseUrl = path.resolve('./client/app');
		console.log(baseUrl);
		builder.config({ baseURL: 'file:' + baseUrl });

		// Build a self-executing bundle (ie. Has SystemJS built in and auto-imports the 'app' module)
		return builder.buildSFX('app', 'client/app/bundle.js', { minify: true, sourceMaps: true, runtime: false});
	}).catch(function(err) {
		console.error(err);
	});