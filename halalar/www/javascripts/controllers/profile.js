'use strict';

/*global HELP_TEXT:false */
/*global GENDERS:false */
/*global COUNTRIES:false */

angular.module('halalarControllers').controller('ProfileCtrl', ['$scope', '$timeout', 'userService', 'profileService', 'scrollToService', function($scope, $timeout, userService, profileService, scrollToService) {
  var user = userService.getUser();
  steroids.view.navigationBar.show(user.username);
  $scope.username = user.username;

  profileService.getProfile(
    user.token,
    function(data) {
      $scope.profile = data.profile;
      $scope.age = data.profile.age;
      $scope.gender = data.profile.gender;
      $scope.city = data.profile.city;
      $scope.country = data.profile.country;
      $scope.religion = data.profile.religion;
      $scope.family = data.profile.family;
      $scope.self = data.profile.self;
      $scope.community = data.profile.community;
      $scope.career = data.profile.career;
      $scope.email = data.profile.email;
    },
    function(message) {
      navigator.notification.alert(message, function() {
        backButton.onTap();
      });
    }
  );

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
    profileService.editProfile(
      user.token, $scope.age, $scope.city, $scope.country,
      $scope.religion, $scope.family, $scope.self, $scope.community, $scope.career,
      function(data) {
        navigator.notification.alert('Saved!', function() {
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