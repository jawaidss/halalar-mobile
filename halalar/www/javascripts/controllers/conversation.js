'use strict';

angular.module('halalarControllers').controller('ConversationCtrl', ['$scope', '$routeParams', '$location', 'userService', 'conversationService', 'scrollToService', function($scope, $routeParams, $location, userService, conversationService, scrollToService) {
  var username = $routeParams.username;
  steroids.view.navigationBar.show(username);

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

  var user = userService.getUser();
  $scope.conversation = conversationService.getConversation(user.token, username);
  scrollToService.scrollToBottom();

  $scope.redirect = function(path) {
    $location.path(path);
  };

  $scope.submit = function() {
    conversationService.sendMessage(
      user.token, username, $scope.message,
      function() {
        navigator.notification.alert('Sent!', function() {
          $scope.$apply(function() {
            $scope.conversation.push({
              timestamp: 'Now',
              username: user.username,
              message: $scope.message
            });
            $scope.message = '';
            scrollToService.scrollToBottom();
          });
        });
      },
      function() {
        navigator.notification.alert('Error!', function() {});
      }
    );
  };
}]);