import angular from 'angular';
import 'angular-mocks';
import './HomeController';

describe('homeController', function () {
	'use strict';
	beforeEach(angular.mock.module('homeControllerModule'));

	describe('homeController', function () {
		var homeCtrl;

		it('should be defined', inject(function ($controller) {
			homeCtrl = $controller('HomeController', {todosData: []});
			expect(homeCtrl).toBeDefined();
		}));

		it('should set tasks', inject(function ($controller) {
			var todos = [ {task: '111'}];
			homeCtrl = $controller('HomeController', {todosData: { data: todos }});
			expect(homeCtrl.todos.length).toBe(1);
			expect(homeCtrl.todos).toBe(todos);
		}));
	});
});

