import angular from 'angular';
import 'angular-mocks';
import './CurrentUser';

describe('CurrentUser', function () {
	"use strict";
	/* global spyOn */
	var correctUser = {userid: 'abc', token: 'token'};
	var defaultUser = {userid: '', token: ''};

	function createStorageFactoryMock(userInStorage) {
		return {
			get: function () {
				return userInStorage;
			},
			put: function (key, newUser) {
				userInStorage = newUser;
			},
			remove: function () {
				userInStorage = undefined;
			}
		};
	}

	function createUserModule(user = correctUser) {
		angular.mock.module('StorageFactoryModule');
		module(function ($provide) {
			$provide.value('StorageFactory', createStorageFactoryMock(user));
		});
		angular.mock.module('CurrentUserModule');
	}

	it('should Initialize User from storageFactory if already exists in storage', function () {
		createUserModule();
		inject(function (CurrentUser) {
			expect(CurrentUser.profile).toEqual(correctUser);
		});
	});

	it('should Initialize default user if user not present in storage', function () {
		createUserModule(null);
		inject(function (CurrentUser) {
			expect(CurrentUser.profile).toEqual(defaultUser);
		});
	});

	it('should Initialize default user if user present in storage but does not have tokan', function () {
		createUserModule({user: 'aa'});
		inject(function (CurrentUser) {
			expect(CurrentUser.profile).toEqual(defaultUser);
		});
	});

	it('should Initialize default user if user present in storage but does not have tokan', function () {
		createUserModule({user: 'aa', token: ""});
		inject(function (CurrentUser) {
			expect(CurrentUser.profile).toEqual(defaultUser);
		});
	});

	describe('isLoggedIn', function () {
		beforeEach(function () {
			createUserModule();
		});

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
		beforeEach(function () {
			createUserModule();
		});

		it('should set user if user is passed', inject(function (CurrentUser) {
			CurrentUser.set({userid: 'x'}, 'y');
			expect(CurrentUser.profile.userid).toEqual('x');
			expect(CurrentUser.profile.token).toEqual('y');
		}));

		it('should call StorageFactory.put', inject(function (CurrentUser, StorageFactory) {
			spyOn(StorageFactory, 'put');
			CurrentUser.storageKey = 'key';
			CurrentUser.set({userid: 'x'}, 'y');
			expect(StorageFactory.put).toHaveBeenCalledWith('key', {userid: 'x', token: 'y'});
		}));
	});
});