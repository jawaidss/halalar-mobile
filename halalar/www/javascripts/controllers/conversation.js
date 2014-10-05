'use strict';

angular.module('halalarControllers').controller('ConversationCtrl', ['$scope', '$routeParams', '$location', 'userService', 'conversationService', 'scrollToService', function($scope, $routeParams, $location, userService, conversationService, scrollToService) {
  var username = $routeParams.username;
  steroids.view.navigationBar.show(username);

  var backButton = new steroids.buttons.NavigationBarButton();
  backButton.title = 'Back';
  backButton.onTap = function() {
    steroids.view.navigationBar.update({
      buttons: {
        left: [],
        right: []
      }
    });
    history.back(); // TODO
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
      $location.path('/browse'); // TODO
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
      scrollToService.scrollToBottom();
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
            scrollToService.scrollToBottom();
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