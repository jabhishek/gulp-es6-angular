class alertService {
	constructor($timeout) {
		this.currentAlerts = [];
		this.shouldShowAlerts = true;
		this.$timeout = $timeout;
		$timeout(() => {
			"use strict";
			this.addInfo('Info');
		}, 1000);

		$timeout(() => {
			"use strict";
			this.addWarning('Warning');
		}, 3000);

		$timeout(() => {
			"use strict";
			this.addSuccess('Success');
		}, 5000);

	}

	addWarning(message) {
		this.addAlert("warning", message);
	}

	addSuccess(message) {
		this.addAlert("success", message);
	}

	addInfo(message) {
		this.addAlert("info", message);
	}

	addAlert(type, message) {
		var message = {type: type, message: message, createdOn: new Date()};
		this.currentAlerts.push(message);

		this.$timeout(() => {
			var index = this.currentAlerts.indexOf(message);
			this.currentAlerts.splice(index, 1);
		}, 5000);

	}
}

alertService.$inject = ['$timeout'];

export default angular.module('alertServiceModule', [])
	.service('alertService', alertService);
