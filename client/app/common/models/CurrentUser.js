import StorageFactoryModule from 'app/common/services/StorageFactory';

class CurrentUser {
	constructor(StorageFactory) {
		this.storageKey = 'user_loggedin';

		this.StorageFactory = StorageFactory;

		this.profile = initializeUser.call(this);

		function initializeUser() {
			var userFromStorage = StorageFactory.get(this.storageKey);
			// used != so that it covers both null and undefined
			if (userFromStorage != null) {
				return userFromStorage;
			} else {
				return {
					userid: '',
					token: ''
				};
			}
		}

	}

	get isLoggedIn() {
		return !!this.profile.token;
	}

	set(user, token) {
		this.profile.userid = user.userid;
		this.profile.token = token;
		this.StorageFactory.put(this.storageKey, this.profile);
	}
}

CurrentUser.$inject = ['StorageFactory'];

export default angular.module('CurrentUserModule', [StorageFactoryModule.name])
	.service('CurrentUser', CurrentUser);