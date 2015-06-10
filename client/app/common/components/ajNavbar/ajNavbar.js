import template from './ajNavbar.html!text';
import 'app/common/models/CurrentUser';

// changed from using es6 class to plain old function -- feels more readable

function ajNavbar(CurrentUser) {
	'use strict';
	let ajNavbarObj = {
		restrict: 'E',
		template: template,
		controllerAs: 'navbarVm',
		controller: function() {
			this.currentUser = CurrentUser;
			console.log(this.currentUser, 'user');
		}
	};

	return ajNavbarObj;
}

ajNavbar.$inject = ['CurrentUser'];

export default angular.module('ajNavbarModule', ['CurrentUserModule'])
	.directive('ajNavbar', ajNavbar);
