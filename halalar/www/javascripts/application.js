'use strict';

var halalarApp = angular.module('halalarApp', [
  'ngRoute',
  'LocalStorageModule',
  'halalarControllers'
]);

halalarApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);