System.config({
	baseURL: '/',
	meta: {
		'components/angular-mocks/angular-mocks': {deps: ['angular']}
	},
	map: {
		'angular': 'app/adapter/angular-adapter',
		'angular-mocks': 'components/angular-mocks/angular-mocks',
		'text': 'ext/plugin-text/text'
	}
});