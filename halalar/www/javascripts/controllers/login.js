'use strict';

angular.module('halalarControllers').controller('LoginCtrl', ['$scope', 'userService', function($scope, userService) {
  steroids.view.navigationBar.show('Log in');

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

  $scope.submit = function() {
    $scope.loading = true;
    userService.logIn(
      $scope.username, $scope.password,
      function() {
        navigator.notification.alert('Logged in!', function() {
          backButton.onTap();
        });
      },
      function(message) {
        navigator.notification.alert(message, function() {});
        $scope.loading = false;
      }
    );
  };
}]);