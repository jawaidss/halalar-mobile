'use strict';

angular.module('halalarControllers').controller('LoginCtrl', ['$scope', 'userService', function($scope, userService) {
  steroids.view.navigationBar.show('Log in');

  var backButton = new steroids.buttons.NavigationBarButton();
  backButton.title = 'Back';
  backButton.onTap = function() {
    steroids.view.navigationBar.setButtons({
      left: []
    });
    history.back();
  };

  steroids.view.navigationBar.setButtons({
    left: [backButton],
    overrideBackButton: true
  });

  $scope.submit = function() {
    userService.logIn(
      $scope.username, $scope.password,
      function() {
        navigator.notification.alert('Logged in!', function() {
          backButton.onTap();
        });
      },
      function() {
        navigator.notification.alert('Error!', function() {});
      }
    );
  };
}]);