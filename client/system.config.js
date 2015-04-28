System.config({
	baseURL: '/',
	meta: {
		'components/angular/angular': {format: 'global', exports: 'angular'},
		'components/angular-ui-router/release/angular-ui-router': {deps: ['angular']}
	},
	map: {
		'angular': 'components/angular/angular',
		'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router',
		'text': 'components/plugin-text/text'
	}
});