import angular from 'angular';
import 'angular-mocks';
import './LoginController';

describe('LoginController', function () {
	'use strict';
	beforeEach(angular.mock.module('loginControllerModule'));

	describe('LoginController', function () {
		var LoginCtrl;

		it('should be defined', inject(function ($controller) {
			LoginCtrl = $controller('LoginController');
			expect(LoginCtrl).toBeDefined();
		}));

		it('should have user initialised', inject(function ($controller) {
			LoginCtrl = $controller('LoginController');
			expect(LoginCtrl.user).toBeDefined();
			expect(LoginCtrl.user.userId).toEqual('');
			expect(LoginCtrl.user.password).toEqual('');
		}));
	});
});

