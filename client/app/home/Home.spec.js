
// unit test HomeController class - no angular involvement

import HomeController from './HomeController';

describe('HomeController', function () {
    'use strict';
    var homeController;
    beforeEach(function() {
        homeController = new HomeController();
    });

    it('should be defined', function() {
        expect(homeController).toBeDefined();
    });
    it('should have users defined', function() {
        expect(homeController.users).toBeDefined();
        expect(homeController.users.length).toEqual(4);
    });
});