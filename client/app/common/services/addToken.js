import 'app/common/models/CurrentUser';

function addToken(CurrentUser, $q) {
	"use strict";
	var request = function request(config) {
		console.log(config);
		if (CurrentUser.isLoggedIn) {
			config.headers.Authorization = 'Bearer ' + CurrentUser.token;
		}
		return $q.when(config);
	};

	return {
		request: request
	};
}

addToken.$inject = ['CurrentUser', '$q', '$location'];

export default angular.module('addTokeneModule', ['CurrentUserModule'])
	.factory('addToken', addToken);