import angular from 'angular';
import 'angular-mocks';
import './homeModule';

describe('homeModule', function () {
	'use strict';
	beforeEach(angular.mock.module('homeModule'));

	describe('homeController', function () {
		var homeCtrl;
		beforeEach(inject(function ($controller) {
			homeCtrl = $controller('HomeController');
		}));
		it('should be defined', function () {
			expect(homeCtrl).toBeDefined();
		});
	});
});

