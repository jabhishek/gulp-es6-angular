
import 'app/common/services/AuthService';

class LoginController {
	constructor($state, AuthService, loginRedirect) {
		this.user = {
			userid: '',
			password: ''
		};

		this.$state = $state;
		this.AuthService = AuthService;
		this.loginRedirect = loginRedirect;
	}

	submitForm(user, isValid) {
		if (isValid) {
			this.AuthService.login(user)
				.then(() => {
					this.loginRedirect.redirectPostLogin();
				})
				.catch((err) => {
					if (err && err.data) {
						console.log(err.data.message);
					}
				});
		}
	}
}

LoginController.$inject = ['$state', 'AuthService', 'loginRedirect'];
export default angular.module('loginControllerModule', ['AuthServiceModule'])
	.controller('LoginController', LoginController);

