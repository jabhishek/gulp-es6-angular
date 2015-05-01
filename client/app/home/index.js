import angular from 'angular';
import HomeController from './HomeController';
import homeTemplate from './home.html!text';

var homeModule = angular.module('homeModule', ['ui.router'])
	.config(['$stateProvider', function($stateProvider) {
		'use strict';
		$stateProvider
			.state('home', {
				url: '/',
				controller: 'HomeController',
				controllerAs: 'vm',
				template: homeTemplate
			});
	}])
	.controller('HomeController', HomeController);

export default homeModule;

