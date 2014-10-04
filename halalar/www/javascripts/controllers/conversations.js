'use strict';

angular.module('halalarControllers').controller('ConversationsCtrl', ['$scope', '$location', 'userService', 'conversationService', function($scope, $location, userService, conversationService) {
  steroids.view.navigationBar.show('Conversations');

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

  $scope.loading = true;
  $scope.user = userService.getUser();
  conversationService.getConversations(
    $scope.user.token,
    function(data) {
      $scope.conversations = data.messages;
      $scope.loading = false;
    },
    function(message) {
      navigator.notification.alert(message, function() {
        backButton.onTap();
      });
    }
  );

  $scope.redirect = function(path) {
    $location.path(path);
  };
}]);