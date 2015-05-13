import angular from 'angular';
import 'angular-mocks';
import './homeModule';

describe('homeModule', function () {
	/*global spyOn */
	'use strict';
	beforeEach(angular.mock.module('homeModule'));

	describe('dependencies', function () {
		var deps, app;

		beforeEach(inject(function () {
			app = angular.module('homeModule');
			deps = app.value('homeModule').requires;
		}));

		function hasModule(module) {
			return deps.indexOf(module) > -1;
		}

		it('should have ui.router as a dependency', function () {
			expect(hasModule('ui.router')).toBe(true);
		});
		it('should have TodoServiceModule as a dependency', function () {
			expect(hasModule('TodoServiceModule')).toBe(true);
		});
		it('should have homeControllerModule as a dependency', function () {
			expect(hasModule('homeControllerModule')).toBe(true);
		});
	});

	describe('home', function () {
		it('TodoService.get should be called when going to state home', inject(function (TodoService, $state) {
			spyOn(TodoService, 'get').and.returnValue(Promise.resolve());
			$state.go('home');
			expect(TodoService.get).toHaveBeenCalled();
		}));
	});
});

