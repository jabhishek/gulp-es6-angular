import 'app/common/models/CurrentUser';
import 'app/common/services/AuthService';

class LoginController {
	constructor(CurrentUser, $state, AuthService) {
		this.CurrentUser = CurrentUser;

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
						angular.merge(this.CurrentUser, this.user);
						this.CurrentUser.token = response.data.token;
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

LoginController.$inject = ['CurrentUser', '$state', 'AuthService'];
export default angular.module('loginControllerModule', ['CurrentUserModule', 'AuthServiceModule'])
	.controller('LoginController', LoginController);

