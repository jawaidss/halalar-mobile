'use strict';

/*global GENDERS:false */
/*global COUNTRIES:false */

angular.module('halalarControllers').controller('BrowseCtrl', ['$scope', '$location', 'userService', 'profileService', 'scrollToService', function($scope, $location, userService, profileService, scrollToService) {
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

  $scope.GENDERS = GENDERS;
  $scope.COUNTRIES = COUNTRIES;

  var user = userService.getUser();

  $scope.redirect = function(path) {
    $location.path(path);
  };

  $scope.next = function() {
    $scope.loading = true;
    profileService.getRandomProfile(
      user.token,
      function(data) {
        $scope.profile = data.profile;
        steroids.view.navigationBar.update($scope.profile.username);
        scrollToService.scrollToTop();
        $scope.loading = false;
      },
      function(message) {
        navigator.notification.alert(message, function() {
          backButton.onTap();
        });
      }
    );
  };

  $scope.next();
}]);