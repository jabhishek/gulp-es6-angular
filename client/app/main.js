import angular from 'angular';

import homeModule from './home/homeModule';
import loginModule from './login/loginModule';
import ajNavbarModule from './common/components/ajNavbar/ajNavbar';
import mainConfig from './mainConfig';


export var mainModule = angular.module('mainModule',
	[
		'ngAnimate',
		'ngTouch',
		'ngAria',
		'ngMaterial',
		homeModule.name,
		mainConfig.name,
		loginModule.name,
    ajNavbarModule.name
	]);