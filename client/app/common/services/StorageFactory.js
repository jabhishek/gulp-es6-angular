class StorageFactory {
	constructor(localStorageService) {
		this.localStorageService = localStorageService;
	}

	get(key) {
		return this.localStorageService.get(key);
	}

	remove(key) {
		this.localStorageService.remove(key);
	}

	put(key, value) {
		if (value === null || value === undefined) {
			return;
		}
		this.localStorageService.set(key, value);
	}
}

StorageFactory.$inject = ['localStorageService'];

export default angular.module('StorageFactoryModule', ['LocalStorageModule'])
	.service('StorageFactory', StorageFactory);
