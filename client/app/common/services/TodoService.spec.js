import angular from 'angular';
import 'angular-mocks';
import './TodoService';

describe('TodoService', function () {
	/* global afterEach */
	'use strict';
	beforeEach(angular.mock.module('TodoServiceModule'));
	describe('get', function () {
		var $httpBackend;
		beforeEach(inject(function(_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			$httpBackend.when('GET', '/api/todos').respond({data : []});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make an http call to /api/todos', inject(function (TodoService) {
			$httpBackend.expectGET('/api/todos');
			TodoService.get();
			$httpBackend.flush();
		}));
	});
});