import angular from 'angular';
import 'angular-mocks';
import './LoginController';
import 'app/common/models/CurrentUser';

describe('LoginController', function () {
	'use strict';
	/*global spyOn */
	var $state, User, AuthService, $q;

	beforeEach(angular.mock.module('ui.router'));
	beforeEach(angular.mock.module('loginControllerModule'));

	beforeEach(angular.mock.module('CurrentUserModule'));
	beforeEach(angular.mock.module('AuthServiceModule'));

	var correctUser = {userid: 'goodUser'};
	var incorrectUser = {userid: 'badUser'};

	class MockUser {
		constructor() {
			this.userid = 'user';
			this.password = 'password';
		}
	}

	beforeEach(function () {
		module(function ($provide) {
			$provide.service('CurrentUser', MockUser);
		});
	});

	beforeEach(inject(function (_$state_, _CurrentUser_, _AuthService_, _$q_) {
		$state = _$state_;
		User = _CurrentUser_;
		AuthService = _AuthService_;
		$q = _$q_;
	}));

	describe('LoginController', function () {
		var LoginCtrl;

		it('should be defined', inject(function ($controller) {
			LoginCtrl = $controller('LoginController');
			expect(LoginCtrl).toBeDefined();
		}));

		it('should have user initialised', inject(function ($controller) {
			LoginCtrl = $controller('LoginController');
			expect(LoginCtrl.user).toBeDefined();
			expect(LoginCtrl.user.userid).toEqual('');
			expect(LoginCtrl.user.password).toEqual('');
		}));

		describe('submitForm', function () {
			it('should call AuthService.login if form is valid', inject(function ($controller) {
				spyOn(AuthService, 'login').and.returnValue($q.when(true));
				LoginCtrl = $controller('LoginController');
				LoginCtrl.submitForm(correctUser, true);
				expect(AuthService.login).toHaveBeenCalledWith(correctUser);
			}));
			it('should not call AuthService.login if form is invalid', inject(function ($controller) {
				spyOn(AuthService, 'login').and.returnValue($q.when(true));
				LoginCtrl = $controller('LoginController');
				LoginCtrl.submitForm(correctUser, false);
				expect(AuthService.login).not.toHaveBeenCalled();
			}));
			it('should go to home page if login is successful', inject(function ($controller, $rootScope) {
				spyOn(AuthService, 'login').and.returnValue($q.when({data: { token: 'someToken'}}));
				spyOn($state, 'go').and.returnValue('');
				LoginCtrl = $controller('LoginController');
				LoginCtrl.submitForm(correctUser, true);
				$rootScope.$apply();

				expect(User.token).toEqual('someToken');
				expect($state.go).toHaveBeenCalledWith('home');
			}));

			it('should not go to home page if login fails', inject(function ($controller, $rootScope) {
				spyOn(AuthService, 'login').and.returnValue($q.reject());
				spyOn($state, 'go').and.returnValue('');
				LoginCtrl = $controller('LoginController');
				LoginCtrl.submitForm(incorrectUser, true);

				$rootScope.$apply();

				expect($state.go).not.toHaveBeenCalled();
			}));

		});
	});
});

