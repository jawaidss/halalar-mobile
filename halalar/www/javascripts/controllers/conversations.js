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

  var user = userService.getUser();
  $scope.conversations = conversationService.getConversations(user.token);

  $scope.redirect = function(path) {
    $location.path(path);
  };
}]);