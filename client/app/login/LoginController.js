
import 'app/common/services/AuthService';

class LoginController {
	constructor($state, AuthService) {
		this.user = {
			userid: '',
			password: ''
		};

		this.$state = $state;
		this.AuthService = AuthService;
	}

	submitForm(user, isValid) {
		if (isValid) {
			this.AuthService.login(user)
				.then(() => {
					this.$state.go('home');
				})
				.catch((err) => {
					if (err && err.data) {
						console.log(err.data.message);
					}
				});
		}
	}
}

LoginController.$inject = ['$state', 'AuthService'];
export default angular.module('loginControllerModule', ['AuthServiceModule'])
	.controller('LoginController', LoginController);

