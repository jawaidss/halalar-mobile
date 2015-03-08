'use strict';

/*global VERSION:false */

angular.module('halalarControllers').controller('MainCtrl', ['$scope', '$location', 'userService', 'profileService', 'pushNotificationsService', function($scope, $location, userService, profileService, pushNotificationsService) {
  steroids.view.navigationBar.show('Halalar');

  profileService.removeCache();

  $scope.user = userService.getUser();

  $scope.redirect = function(path) {
    $location.path(path);
  };

  $scope.logOut = function() {
    navigator.notification.confirm('Log out?', function(buttonIndex) {
      if (buttonIndex === 1) {
        userService.logOut();
        $scope.$apply(function() {
          $scope.user = null;
        });
      }
    });
  };

  $scope.VERSION = VERSION;

  if ($scope.user) {
    pushNotificationsService.register($scope.user.token);
  }

  pushNotificationsService.clearApplicationIconBadgeNumber();
  pushNotificationsService.onMessageInForeground();
  pushNotificationsService.onMessageInBackground();
}]);