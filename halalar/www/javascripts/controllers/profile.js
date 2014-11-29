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
      $scope.photo = data.profile.photo;
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
    steroids.statusBar.show({style: 'light'});
    $timeout(function() {
      scrollToService.scrollToElement($scope.field);
    });
  };

  $scope.PictureSourceType = navigator.camera.PictureSourceType;

  $scope.setPhoto = function(sourceType) {
    navigator.camera.getPicture(
      function(imageURI) {
        window.resolveLocalFileSystemURI(
          imageURI,
          function(sourceFile) {
            window.resolveLocalFileSystemURI(
              'file://' + steroids.app.absoluteUserFilesPath,
              function(directory) {
                sourceFile.moveTo(
                  directory,
                  sourceFile.name,
                  function(destinationFile) {
                    $scope.$apply(function() {
                      $scope.photo = '/' + destinationFile.name + '?' + ((new Date()).getTime());
                      $scope.photoURI = destinationFile.toURI();
                      $scope.photoClear = false;
                    });
                  },
                  function(message) {}
                );
              },
              function(message) {}
            );
          },
          function(message) {}
        );
      },
      function(message) {},
      {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        allowEdit: true,
        encodingType: navigator.camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        mediaType: navigator.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        cameraDirection: navigator.camera.Direction.FRONT
      }
    );
  };

  $scope.removePhoto = function() {
    $scope.photo = null;
    $scope.photoURI = null;
    $scope.photoClear = true;
    $timeout(function() {
      scrollToService.scrollToElement('photo');
    });
  };

  $scope.submit = function() {
    $scope.loading = true;
    profileService.editProfile(
      user.token, $scope.photoURI, $scope.photoClear, $scope.age, $scope.city, $scope.country,
      $scope.religion, $scope.family, $scope.self, $scope.community, $scope.career,
      function(data) {
        navigator.notification.alert('Saved!', function() {
          backButton.onTap();
        });
      },
      function(message) {
        navigator.notification.alert(message, function() {});

        if ($scope.photoURI) {
          $scope.$apply(function() {
            $scope.loading = false;
          });
        } else {
          $scope.loading = false;
        }
      }
    );
  };
}]);