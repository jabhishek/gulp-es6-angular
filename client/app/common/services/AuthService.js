import 'app/common/models/CurrentUser';

class AuthService {
	constructor ($http, CurrentUser) {
		this.$http = $http;
		this.CurrentUser = CurrentUser;
		this.url = '/api/auth/login';
	}

	login(user) {
		return this.$http.post(this.url, user)
			.then((response) => {
				this.CurrentUser.set(user, response.data.token);
				// no need to return anything to the caller (or created promise by then)
				// return response;
			});
	}
}

AuthService.$inject = ['$http', 'CurrentUser'];

export default angular.module('AuthServiceModule', ['CurrentUserModule'])
	.service('AuthService', AuthService);