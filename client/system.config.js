System.config({
	baseURL: '/',
	meta: {
		'components/angular/angular': {format: 'global', exports: 'angular'},
		'components/angular-ui-router/release/angular-ui-router': {deps: ['angular']},
		'components/angular-aria/angular-aria': {deps: ['angular']},
		'components/angular-material/angular-material': {deps: ['angular']},
		'components/angular-mocks/angular-mocks': {deps: ['angular']},
		'components/angular-touch/angular-touch': {deps: ['angular']},
		'components/angular-animate/angular-animate': {deps: ['angular']}
	},
	map: {
		'angular': 'components/angular/angular',
		'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router',
		'angular-animate': 'components/angular-animate/angular-animate',
		'angular-aria': 'components/angular-aria/angular-aria',
		'angular-touch': 'components/angular-touch/angular-touch',
		'angular-material': 'components/angular-material/angular-material',
		'angular-mocks': 'components/angular-mocks/angular-mocks',
		'text': 'ext/plugin-text/text'
	}
});