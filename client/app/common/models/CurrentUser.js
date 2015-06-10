class CurrentUser {
	constructor() {
		this.userid = '';
		this.password = '';
		this.token = '';
	}

	get isLoggedIn() {
		return !!this.token;
	}

}

export default angular.module('CurrentUserModule', [])
	.service('CurrentUser', CurrentUser);