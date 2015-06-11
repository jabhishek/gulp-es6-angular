import angular from 'angular';
import addTokenModule from 'app/common/services/addToken';
import loginRedirectModule from 'app/common/services/loginRedirect';

export default angular.module('mainConfig', [
		'ui.router',
		addTokenModule.name,
		loginRedirectModule.name
	]
).config([
		'$stateProvider', '$urlRouterProvider', '$locationProvider', '$animateProvider', '$compileProvider', '$mdThemingProvider', '$httpProvider',
		function ($stateProvider, $urlRouterProvider, $locationProvider, $animateProvider, $compileProvider, $mdThemingProvider, $httpProvider) {
			'use strict';
			$animateProvider.classNameFilter(/animate/);
			// disable debug info in html (example, disables insertion of classes like ng-scope, ng-binding)
			$compileProvider.debugInfoEnabled(false);

			$mdThemingProvider.theme('default')
				.primaryPalette('blue');

			$httpProvider.interceptors.push('addToken');
			$httpProvider.interceptors.push('loginRedirect');

			$urlRouterProvider.otherwise('/');
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
		}
	]);
