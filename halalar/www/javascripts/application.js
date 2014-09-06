'use strict';

angular.module('halalarServices', ['LocalStorageModule']);
angular.module('halalarControllers', ['halalarServices']);

angular.module('halalarApp', [
  'ngRoute',
  'halalarControllers'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'});
  $routeProvider.when('/browse/:username?', {templateUrl: 'partials/browse.html', controller: 'BrowseCtrl'});
  $routeProvider.when('/conversations', {templateUrl: 'partials/conversations.html', controller: 'ConversationsCtrl'});
  $routeProvider.when('/conversations/:username', {templateUrl: 'partials/conversation.html', controller: 'ConversationCtrl'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileCtrl'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);

var HELP_TEXT = { // TODO
  religion: 'Mauris in dui vestibulum, tristique enim ultricies, blandit quam. Ut non dolor arcu. Aliquam gravida vitae elit dignissim.',
  family: 'Donec dolor quam, vulputate volutpat nisi id, eleifend faucibus lorem. Nulla facilisi. Integer viverra, nisl rutrum tincidunt.',
  self: 'Mauris in dui vestibulum, tristique enim ultricies, blandit quam. Ut non dolor arcu. Aliquam gravida vitae elit dignissim.',
  community: 'Ut tincidunt consequat magna at hendrerit. Sed vitae mi ac urna volutpat hendrerit. Vivamus porta dapibus enim. Morbi.',
  career: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};