class TodoService {
	constructor($http) {
		this.$http = $http;
	}

	get() {
		return this.$http.get('/api/todos');
	}
}

TodoService.$inject = ['$http'];

export default angular.module('TodoServiceModule', [])
	.service('TodoService', TodoService);