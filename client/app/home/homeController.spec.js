import 'angular';
import 'angular-ui-router';
import 'angular-mocks';
import './index';

describe('homeController', function () {
    beforeEach(angular.mock.module('homeModule'));

    it('should ....', inject(function($controller) {
        //spec body
        var homeCtrl = $controller('HomeController');
        expect(homeCtrl).toBeDefined();
        expect(homeCtrl.users).toBeDefined();
    }));
});