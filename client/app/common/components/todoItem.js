function todoItem () {
	'use strict';
	let todoItemObj = {
		restrict: 'E',
		scope: {
			todo : '='
		},
		template: '<div>{{ todo.task }}</div>'
	};
	return todoItemObj;
}

export default angular.module('TodoDirectiveModule', [])
	.directive('todoItem', todoItem);