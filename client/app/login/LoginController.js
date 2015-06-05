class LoginController {
	constructor($state) {
		this.user = {
			userid: '',
			password: ''
		};
		this.$state = $state;
	}

	submitForm(user, isValid) {
		console.group('submitForm');
		console.log(`isValid: ${isValid}`);
		console.log(`user: ${JSON.stringify(user)}`);
		console.groupEnd('submitForm');

		if(isValid) {
			this.$state.go('home');
		}
	}
}

LoginController.$inject = ['$state'];
export default angular.module('loginControllerModule', [])
	.controller('LoginController', LoginController);

