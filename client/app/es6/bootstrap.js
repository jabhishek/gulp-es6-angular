import angular from 'angular';
import {mainModule} from './main';

angular.element(document).ready(function() {
	angular.bootstrap(document.querySelector('[data-app]'), [
		mainModule.name
	], {
		strictDi: true
	});
});