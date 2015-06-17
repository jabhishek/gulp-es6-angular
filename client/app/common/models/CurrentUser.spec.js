import angular from 'angular';
import 'angular-mocks';
import './CurrentUser';

describe('CurrentUser', function () {
	"use strict";
	/* global spyOn */
	var user = {userid: 'abc', token: 'token'};

	var storageFactoryMock = {
		get: function () {
			console.log('mocked get');
			return user;
		},
		put: function (key, newUser) {
			console.log('mocked put');
			user = newUser;
		},
		remove: function () {
			console.log('mocked remove');
			user = undefined;
		}
	};

	beforeEach(function () {
		angular.mock.module('StorageFactoryModule');
		module(function ($provide) {
			$provide.value('StorageFactory', storageFactoryMock);
		});
		angular.mock.module('CurrentUserModule');
	});

	it('should Initialize User from local storage if already exists there', inject(function (CurrentUser) {
		expect(CurrentUser.profile).toEqual(user);
	}));

	describe('isLoggedIn', function () {
		it('should return true if token is set', inject(function (CurrentUser) {
			CurrentUser.profile = {token: 'abc'};
			expect(CurrentUser.isLoggedIn).toEqual(true);
		}));

		it('isLoggedIn should return false if token is undefined', inject(function (CurrentUser) {
			CurrentUser.profile = {token: undefined};
			expect(CurrentUser.isLoggedIn).toEqual(false);
		}));
	});

	describe('set', function () {
		it('should set user if user is passed', inject(function (CurrentUser) {
			CurrentUser.set({userid: 'x'}, 'y');
			expect(CurrentUser.profile.userid).toEqual('x');
			expect(CurrentUser.profile.token).toEqual('y');
		}));

		it('should call StorageFactory.put', inject(function (CurrentUser, StorageFactory) {
			spyOn(StorageFactory, 'put');
			CurrentUser.storageKey = 'key';
			CurrentUser.set({userid: 'x'}, 'y');
			expect(StorageFactory.put).toHaveBeenCalledWith('key', { userid: 'x', token: 'y'});
		}));
	});
});