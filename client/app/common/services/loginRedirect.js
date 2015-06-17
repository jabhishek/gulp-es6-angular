import 'app/common/models/CurrentUser';

function loginRedirect($q, $location, $timeout) {
	"use strict";

	var lastPath = "/";
	var responseError = function responseError(response) {
		console.log(response);

		if (response.status === 401) {
			lastPath = $location.path();
			$timeout(function () {
				$location.path('/login');
				$location.replace();
			});
		}
		return $q.reject(response);
	};

	var redirectPostLogin = function redirectPostLogin() {
		$timeout(function () {
			$location.path(lastPath);
			lastPath = "/";
		});
	};

	return {
		responseError: responseError,
		redirectPostLogin: redirectPostLogin
	};
}

loginRedirect.$inject = ['$q', '$location', '$timeout'];

export default angular.module('loginRedirectModule', [])
	.factory('loginRedirect', loginRedirect);