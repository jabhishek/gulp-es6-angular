class HomeController {
	constructor(todosData) {
		this.todos = todosData.data;
	}
}

HomeController.$inject = ['todosData'];

export default angular.module('homeControllerModule', [])
	.controller('HomeController', HomeController);

