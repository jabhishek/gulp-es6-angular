import angular from 'angular';
import 'angular-mocks';
import HomeController from './index';

describe('homeController', function () {
    'use strict';
    beforeEach(angular.mock.module('homeModule'));

    it('should ....', function() {
        //spec body
        expect(HomeController).toBeDefined();
    });
    it('should ....', inject(function($controller) {
        //spec body
        var homeCtrl = $controller('HomeController');
        expect(homeCtrl).toBeDefined();
        expect(homeCtrl.users).toBeDefined();
    }));
});



