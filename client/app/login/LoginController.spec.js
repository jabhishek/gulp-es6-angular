import 'angular-mocks';
import './LoginController';
import 'app/common/services/loginRedirect';

describe('LoginController', function () {
	'use strict';
	/*global spyOn  */
	var AuthService, $q, loginRedirect;

	beforeEach(angular.mock.module('ui.router'));
	beforeEach(angular.mock.module('loginControllerModule'));
	beforeEach(angular.mock.module('loginRedirectModule'));

	var correctUser = {userid: 'goodUser'};
	var incorrectUser = {userid: 'badUser'};

	beforeEach(inject(function (_AuthService_, _$q_, _loginRedirect_) {
		AuthService = _AuthService_;
		$q = _$q_;
		loginRedirect = _loginRedirect_;
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
				spyOn(AuthService, 'login');
				LoginCtrl = $controller('LoginController');
				LoginCtrl.submitForm(correctUser, false);
				expect(AuthService.login).not.toHaveBeenCalled();
			}));
			it('should go to home page if login is successful', inject(function ($controller, $rootScope) {
				spyOn(AuthService, 'login').and.returnValue($q.when({data: { token: 'someToken'}}));
				spyOn(loginRedirect, 'redirectPostLogin');
				LoginCtrl = $controller('LoginController');
				LoginCtrl.submitForm(correctUser, true);
				$rootScope.$apply();

				expect(loginRedirect.redirectPostLogin).toHaveBeenCalled();
			}));

			it('should not go to home page if login fails', inject(function ($controller, $rootScope) {
				spyOn(AuthService, 'login').and.returnValue($q.reject());
				spyOn(loginRedirect, 'redirectPostLogin');
				LoginCtrl = $controller('LoginController');
				LoginCtrl.submitForm(incorrectUser, true);

				$rootScope.$apply();

				expect(loginRedirect.redirectPostLogin).not.toHaveBeenCalled();
			}));

		});
	});
});

