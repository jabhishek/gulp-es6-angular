import angular from 'angular';
import homeControllerModule from './HomeController';
import homeTemplate from './home.html!text';
import TodoServiceModule from 'app/common/services/TodoService';
import homeControllerResolve from './homeControllerResolve';

var homeModule = angular.module('homeModule',
	[
		'ui.router',
		TodoServiceModule.name,
		homeControllerModule.name
	])
	.config([
		'$stateProvider', function ($stateProvider) {
			'use strict';
			$stateProvider
				.state('home', {
					url: '/',
					controller: 'HomeController',
					controllerAs: 'vm',
					template: homeTemplate,
					resolve: {
						todosData: homeControllerResolve
					}
				});
		}
	]);

export default homeModule;


