import template from './alerts.html!text';
import alertServiceModule from 'app/common/services/alertService';

function alerts(alertService, $timeout) {
	'use strict';
	let alertsObj = {
		restrict: 'E',
		template: template,
		controllerAs: 'alertsVm',
		scope: true,
		controller: function () {
			this.alertService = alertService;
		}
	};

	return alertsObj;
}

alerts.$inject = ['alertService', '$timeout'];

export default angular.module('alertsModule', [alertServiceModule.name])
	.directive('alerts', alerts);

