'use strict';

angular.module('halalarControllers').controller('ConversationCtrl', ['$scope', '$routeParams', '$location', '$timeout', 'userService', 'profileService', 'conversationService', 'scrollToService', function($scope, $routeParams, $location, $timeout, userService, profileService, conversationService, scrollToService) {
  var username = $routeParams.username;
  steroids.view.navigationBar.show(username);
  profileService.setCache(username);

  var backButton = new steroids.buttons.NavigationBarButton();
  backButton.title = 'Back';
  backButton.onTap = function() {
    steroids.view.navigationBar.update({
      buttons: {
        left: [],
        right: []
      }
    });
    history.back();
  };

  var profileButton = new steroids.buttons.NavigationBarButton();
  profileButton.title = 'Profile';
  profileButton.onTap = function() {
    steroids.view.navigationBar.update({
      buttons: {
        left: [],
        right: []
      }
    });
    $scope.$apply(function() {
      $location.path('/browse');
    });
  };

  steroids.view.navigationBar.update({
    buttons: {
      left: [backButton],
      right: [profileButton],
      overrideBackButton: true
    }
  });

  $scope.conversationLoading = true;
  $scope.user = userService.getUser();
  conversationService.getConversation(
    $scope.user.token, username,
    function(data) {
      $scope.conversation = data.messages;
      $timeout(function() {
        scrollToService.scrollToBottom();
      }, 100);
      $scope.conversationLoading = false;
    },
    function(message) {
      navigator.notification.alert(message, function() {
        backButton.onTap();
      });
    }
  );

  $scope.submit = function() {
    $scope.loading = true;
    conversationService.sendMessage(
      $scope.user.token, username, $scope.message,
      function(data) {
        navigator.notification.alert('Sent!', function() {
          $scope.$apply(function() {
            $scope.conversation.push(data.message);
            $scope.message = '';
            $timeout(function() {
              scrollToService.scrollToBottom();
            }, 100);
            $scope.loading = false;
          });
        });
      },
      function(message) {
        navigator.notification.alert(message, function() {});
        $scope.loading = false;
      }
    );
  };
}]);