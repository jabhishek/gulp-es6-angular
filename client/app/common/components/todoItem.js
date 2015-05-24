class TodoItem {
	constructor() {

		this.template = '<div>{{ todo.task }}</div>';
	}
}

export default angular.module('TodoDirectiveModule', [])
	.directive('todoItem', () => new TodoItem());