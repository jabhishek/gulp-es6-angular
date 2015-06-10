import template from './ajNavbar.html!text';
import 'app/common/models/User';

// changed from using es6 class to plain old function -- feels more readable

function ajNavbar(User) {
	'use strict';
	let ajNavbarObj = {
		restrict: 'E',
		template: template,
		controllerAs: 'navbarVm',
		controller: function() {
			this.user = User;
			console.log(this.user, 'user');
		}
	};

	return ajNavbarObj;
}

ajNavbar.$inject = ['User'];

export default angular.module('ajNavbarModule', ['UserModule'])
	.directive('ajNavbar', ajNavbar);
