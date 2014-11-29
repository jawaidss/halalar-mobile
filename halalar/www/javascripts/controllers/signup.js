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
    $timeout(function() {
      scrollToService.scrollToElement('photo');
    });
  };

  $scope.submit = function() {
    $scope.loading = true;
    userService.signUp(
      $scope.photoURI, $scope.age, $scope.gender, $scope.city, $scope.country,
      $scope.religion, $scope.family, $scope.self, $scope.community, $scope.career,
      $scope.username, $scope.email, $scope.password,
      function(data) {
        navigator.notification.alert('Signed up!', function() {
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