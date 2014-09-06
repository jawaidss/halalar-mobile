'use strict';

/*global HELP_TEXT:false */

angular.module('halalarControllers').controller('ProfileCtrl', ['$scope', 'userService', function($scope, userService) {
  steroids.view.navigationBar.show(userService.getUser());
  $scope.age = 23;
  $scope.gender = 'Male';
  $scope.city = 'Louisville';
  $scope.country = 'United States of America';
  $scope.religion = 'religion';
  $scope.family = 'family';
  $scope.self = 'self';
  $scope.community = 'community';
  $scope.career = 'career';
  $scope.username = 'temp123';
  $scope.email = 'samad@halalar.com';

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
  };

  $scope.submit = function() {
    userService.edit(
      $scope.age, $scope.city, $scope.country,
      $scope.religion, $scope.family, $scope.self, $scope.community, $scope.career,
      function() {
        navigator.notification.alert('Saved!', function() {
          backButton.onTap();
        });
      },
      function() {
        navigator.notification.alert('Error!', function() {});
      }
    );
  };
}]);