'use strict';

/*global HELP_TEXT:false */
/*global GENDERS:false */
/*global COUNTRIES:false */
/*global DEFAULT_COUNTRY:false */

angular.module('halalarControllers').controller('SignupCtrl', ['$scope', '$timeout', 'userService', 'scrollToService', function($scope, $timeout, userService, scrollToService) {
  steroids.view.navigationBar.show('Sign up');

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
  $scope.country = DEFAULT_COUNTRY;

  $scope.showModal = function(field, title) {
    steroids.statusBar.hide();
    steroids.view.navigationBar.hide();
    $scope.modal = true;
    $scope.field = field;
    $scope.fieldTitle = title;
    $scope.fieldHelpText = HELP_TEXT[field];
    $scope.temporaryField = $scope[field];
  };

  $scope.hideModal = function() {
    $scope[$scope.field] = $scope.temporaryField;
    $scope.modal = false;
    steroids.view.navigationBar.show();
    steroids.statusBar.show();
    $timeout(function() {
      scrollToService.scrollToElement($scope.field);
    });
  };

  $scope.submit = function() {
    $scope.loading = true;
    userService.signUp(
      $scope.age, $scope.gender, $scope.city, $scope.country,
      $scope.religion, $scope.family, $scope.self, $scope.community, $scope.career,
      $scope.username, $scope.email, $scope.password,
      function() {
        navigator.notification.alert('Signed up!', function() {
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