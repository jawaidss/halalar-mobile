'use strict';

angular.module('halalarControllers').controller('MainCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
  steroids.view.navigationBar.show('Halalar');

  $scope.user = userService.getUser();

  $scope.redirect = function(path) {
    $location.path(path);
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