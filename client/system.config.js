System.config({
	baseURL: '/',
	/* References for traceur options */
	/* https://github.com/google/traceur-compiler/wiki/Options-for-Compiling */
	/* https://github.com/google/traceur-compiler/blob/master/src/Options.js */
	traceurOptions: {
		symbols: true
	},
	meta: {
		'components/angular/angular': {format: 'global', exports: 'angular'}
	},
	map: {
		'angular': 'components/angular/angular'
	}
});