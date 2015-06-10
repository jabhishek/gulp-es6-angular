class User {
	constructor() {
		this.userid = '';
		this.password = '';
		this.token = '';
	}

	get isLoggedIn() {
		return !!this.token;
	}

}

export default angular.module('UserModule', [])
	.service('User', User);