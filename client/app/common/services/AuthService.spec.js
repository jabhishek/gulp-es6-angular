import angular from 'angular';
import 'angular-mocks';
import './AuthService';

describe('AuthService', function () {
	/* global afterEach */
	'use strict';
	beforeEach(angular.mock.module('AuthServiceModule'));
	describe('login', function () {
		var $httpBackend;
		var correctUser = {userid: 'goodUser'};
		var incorrectUser = {userid: 'badUser'};
		var url = '/api/auth/login';
		beforeEach(inject(function (_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			$httpBackend.when('POST', url, correctUser).respond(200, {token: "someToken"});
			$httpBackend.when('POST', url, incorrectUser).respond(404, 'Invalid credentials');
		}));

		afterEach(function () {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make an http call to /api/auth/local', inject(function (AuthService) {
			$httpBackend.expectPOST(url);
			AuthService.login(correctUser);
			$httpBackend.flush();
		}));

		it('should reject promise when invalid user is passed', inject(function (AuthService) {
			$httpBackend.expectPOST(url);
			var promise = AuthService.login(incorrectUser);
			expect(promise.$$state.status).toEqual(0);
			$httpBackend.flush();
			expect(promise.$$state.status).toEqual(2);
			expect(promise.$$state.value.status).toEqual(404);
		}));

		it('should resolve promise when correct user is passed', inject(function (AuthService) {
			$httpBackend.expectPOST(url);
			var promise = AuthService.login(correctUser);
			expect(promise.$$state.status).toEqual(0);
			$httpBackend.flush();
			expect(promise.$$state.status).toEqual(1);
		}));

		it('should set current user if http post is successful', inject(function (AuthService, CurrentUser) {
			$httpBackend.expectPOST(url);
			var promise = AuthService.login(correctUser);
			expect(promise.$$state.status).toEqual(0);
			$httpBackend.flush();

			expect(promise.$$state.status).toEqual(1);
			expect(CurrentUser.profile.token).toEqual('someToken');
		}));
	});
});
