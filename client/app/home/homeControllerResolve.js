var homeControllerResolve = function (TodoService) {
	'use strict';
	return TodoService.get();
};
homeControllerResolve.$inject = ['TodoService'];

export default homeControllerResolve;