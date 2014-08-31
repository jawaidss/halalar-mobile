var halalarControllers = angular.module('halalarControllers', []);

halalarControllers.controller('MainCtrl', ['$scope', '$location', 'localStorageService', function($scope, $location, localStorageService) {
  steroids.view.navigationBar.show('Halalar');

  $scope.user = localStorageService.get('user');

  $scope.login = function() {
    $location.path('/login');
  };

  $scope.signup = function() {
    $location.path('/signup');
  };

  $scope.logout = function() {
    navigator.notification.confirm('Log out?', function(buttonIndex) {
      if (buttonIndex == 1) {
        localStorageService.clearAll();
        $scope.$apply(function () {
          $scope.user = null;
        });
      }
    });
  };
}]);

halalarControllers.controller('LoginCtrl', ['$scope', '$location', 'localStorageService', function($scope, $location, localStorageService) {
  steroids.view.navigationBar.show('Log in');

  backButton = new steroids.buttons.NavigationBarButton()
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
    navigator.notification.alert('Logged in!', function() {
      localStorageService.set('user', 'test');
      backButton.onTap();
    });
  };
}]);

halalarControllers.controller('SignupCtrl', ['$scope', '$location', 'localStorageService', function($scope, $location, localStorageService) {
  steroids.view.navigationBar.show('Sign up');

  backButton = new steroids.buttons.NavigationBarButton()
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
    navigator.notification.alert('Signed up!', function() {
      localStorageService.set('user', 'test');
      backButton.onTap();
    });
  };
}]);