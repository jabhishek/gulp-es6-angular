import angular from 'angular';
import loginControllerModule from './loginController';
import loginTemplate from './login.html!text';

var loginModule = angular.module('loginModule',
	[
		'ui.router',
		'ngMessages',
		loginControllerModule.name
	])
	.config([
		'$stateProvider', function ($stateProvider) {
			'use strict';
			$stateProvider
				.state('login', {
					url: '/login',
					controller: 'LoginController',
					controllerAs: 'loginVm',
					template: loginTemplate
				});
		}
	]);

export default loginModule;


