import angular from 'angular';
import homeModule from './home/index';
import mainConfig from './mainConfig';

export var mainModule = angular.module('mainModule',
	[
		homeModule.name,
		mainConfig.name
	]);