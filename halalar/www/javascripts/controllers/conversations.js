'use strict';

angular.module('halalarControllers').controller('ConversationsCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {
  steroids.view.navigationBar.show('Conversations');

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
}]);