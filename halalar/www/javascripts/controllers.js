'use strict';

var halalarControllers = angular.module('halalarControllers', ['halalarServices']);

halalarControllers.controller('MainCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
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

halalarControllers.controller('LoginCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
  steroids.view.navigationBar.show('Log in');

  var backButton = new steroids.buttons.NavigationBarButton();
  backButton.title = 'Back';
  backButton.onTap = function() {
    steroids.view.navigationBar.setButtons({
      left: []
    });
    $scope.$apply(function() {
      $location.path('/main');
    });
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

halalarControllers.controller('SignupCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
  steroids.view.navigationBar.show('Sign up');

  var backButton = new steroids.buttons.NavigationBarButton();
  backButton.title = 'Back';
  backButton.onTap = function() {
    steroids.view.navigationBar.setButtons({
      left: []
    });
    $scope.$apply(function() {
      $location.path('/main');
    });
  };

  steroids.view.navigationBar.setButtons({
    left: [backButton],
    overrideBackButton: true
  });

  $scope.modal = function(field) {
    $scope[field] = 'Nice!'; // TODO
  };

  $scope.submit = function() {
    userService.signUp(
      $scope.age, $scope.gender, $scope.city, $scope.country,
      $scope.religion, $scope.family, $scope.self, $scope.community, $scope.career,
      $scope.username, $scope.email, $scope.password,
      function() {
        navigator.notification.alert('Signed up!', function() {
          backButton.onTap();
        });
      },
      function() {
        navigator.notification.alert('Error!', function() {});
      }
    );
  };
}]);