'use strict';

/*global HELP_TEXT:false */

angular.module('halalarControllers').controller('ProfileCtrl', ['$scope', '$location', '$anchorScroll', 'userService', 'profileService', function($scope, $location, $anchorScroll, userService, profileService) {
  var user = userService.getUser();
  steroids.view.navigationBar.show(user.username);
  $scope.username = user.username;

  var profile = profileService.getProfile(user.token);
  $scope.age = profile.age;
  $scope.gender = profile.gender;
  $scope.city = profile.city;
  $scope.country = profile.country;
  $scope.religion = profile.religion;
  $scope.family = profile.family;
  $scope.self = profile.self;
  $scope.community = profile.community;
  $scope.career = profile.career;
  $scope.email = profile.email;

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
    $location.hash($scope.field).replace();
    $anchorScroll();
  };

  $scope.submit = function() {
    profileService.editProfile(
      user.token, $scope.age, $scope.city, $scope.country,
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