import angular from 'angular';

export default angular.module('mainConfig', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
		'use strict';
		$stateProvider
			// todo-abhi demo view - remove later
			.state('view2', {
				url: '/view2',
				template: '<div>View 2</div><br/><a ui-sref="home">Home</a>'
			});

		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}
]);
