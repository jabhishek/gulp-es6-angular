class AuthService {
	constructor ($http) {
		this.$http = $http;
		this.url = '/api/auth/login';
	}

	login(user) {
		return this.$http.post(this.url, user);
	}
}

AuthService.$inject = ['$http'];

export default angular.module('AuthServiceModule', [])
	.service('AuthService', AuthService);