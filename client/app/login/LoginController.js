import 'app/common/models/User';
import 'app/common/services/AuthService';

class LoginController {
	constructor(User, $state, AuthService) {
		this.User = User;

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
				.then((response) => {
					if (response && response.data) {
						angular.merge(this.User, this.user);
						this.User.token = response.data.token;
					}
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

LoginController.$inject = ['User', '$state', 'AuthService'];
export default angular.module('loginControllerModule', ['UserModule', 'AuthServiceModule'])
	.controller('LoginController', LoginController);

