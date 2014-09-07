'use strict';

angular.module('halalarControllers').controller('BrowseCtrl', ['$scope', '$location', 'userService', 'profileService', function($scope, $location, userService, profileService) {
  steroids.view.navigationBar.show('Browse');

  var backButton = new steroids.buttons.NavigationBarButton();
  backButton.title = 'Back';
  backButton.onTap = function() {
    steroids.view.navigationBar.update({
      buttons: {
        left: []
      }
    });
    history.back();
  };

  steroids.view.navigationBar.update({
    buttons: {
      left: [backButton],
      overrideBackButton: true
    }
  });

  var user = userService.getUser();

  $scope.next = function() {
    $scope.profile = profileService.getRandomProfile(user.token);
    steroids.view.navigationBar.update($scope.profile.username);
  };

  $scope.next();
}]);