import 'app/common/components/todoItem';

class HomeController {
    constructor(todosData) {
        this.todos = todosData.data;
    }
}

HomeController.$inject = ['todosData'];

export default angular.module('homeControllerModule', ['TodoDirectiveModule'])
    .controller('HomeController', HomeController);

