class CurrentUser {
	constructor() {
		this.userid = '';
		this.password = '';
		this.token = '';
	}

	get isLoggedIn() {
		return !!this.token;
	}

	set(user, token) {
		this.userid = user.userid;
		this.password = user.password;
		this.token = token;
	}

}

export default angular.module('CurrentUserModule', [])
	.service('CurrentUser', CurrentUser);