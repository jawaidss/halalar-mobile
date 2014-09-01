'use strict';

angular.module('halalarControllers').controller('MainCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
  steroids.view.navigationBar.show('Halalar');

  $scope.user = userService.getUser();

  $scope.logIn = function() {
    $location.path('/login');
  };

  $scope.signUp = function() {
    $location.path('/signup');
  };

  $scope.logOut = function() {
    navigator.notification.confirm('Log out?', function(buttonIndex) {
      if (buttonIndex === 1) {
        userService.logOut();
        $scope.$apply(function () {
          $scope.user = null;
        });
      }
    });
  };
}]);