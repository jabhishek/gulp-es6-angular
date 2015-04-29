import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-touch';
import 'angular-material';

import homeModule from './home/index';
import mainConfig from './mainConfig';

export var mainModule = angular.module('mainModule',
	[
		'ngAnimate',
		'ngTouch',
		'ngAria',
		'ngMaterial',
		homeModule.name,
		mainConfig.name
	]);