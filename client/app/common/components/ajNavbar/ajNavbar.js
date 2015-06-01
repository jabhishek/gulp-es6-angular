import template from './ajNavbar.html!text';

// changed from using es6 class to plain old function -- feels more readable

function ajNavbar() {
	'use strict';
	let ajNavbarObj = {
		restrict: 'E',
		template: template
	};

	return ajNavbarObj;
}

export default angular.module('ajNavbarModule', [])
	.directive('ajNavbar', ajNavbar);
