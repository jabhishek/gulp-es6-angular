"format register";
System.register("app/main", ["components/angular/angular"], function($__export) {
  "use strict";
  var __moduleName = "app/main";
  var angular,
      mainModule;
  return {
    setters: [function($__m) {
      angular = $__m.default;
    }],
    execute: function() {
      console.log('Hi');
      mainModule = $__export("mainModule", angular.module('mainModule', []));
    }
  };
});

System.register("app/bootstrap", ["components/angular/angular", "app/main"], function($__export) {
  "use strict";
  var __moduleName = "app/bootstrap";
  var angular,
      mainModule;
  return {
    setters: [function($__m) {
      angular = $__m.default;
    }, function($__m) {
      mainModule = $__m.mainModule;
    }],
    execute: function() {
      angular.element(document).ready(function() {
        angular.bootstrap(document.querySelector('[data-app]'), [mainModule.name], {strictDi: true});
      });
    }
  };
});
