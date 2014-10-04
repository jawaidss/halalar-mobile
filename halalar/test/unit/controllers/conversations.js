'use strict';

describe('Controller: ConversationsCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var ConversationsCtrl,
    scope,
    location,
    userService,
    conversationService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_, _conversationService_) {
    scope = $rootScope.$new();
    location = $location;
    userService = _userService_;
    conversationService = _conversationService_;

    spyOn(history, 'back').andCallThrough();
    spyOn(location, 'path').andCallThrough();
    spyOn(userService, 'getUser').andReturn({username: 'username', token: 'token'});
    spyOn(conversationService, 'getConversations').andCallFake(function(token, successCallback, errorCallback) {
      if (token) {
        successCallback({messages: []});
      } else {
        errorCallback('Error!'); // TODO
      }
    });
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'update').andCallThrough();

    ConversationsCtrl = $controller('ConversationsCtrl', {
      $scope: scope,
      $location: location,
      userService: userService,
      conversationService: conversationService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Conversations');
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({
      buttons: {
        left: [jasmine.any(Object)],
        overrideBackButton: true
      }
    });

    var backButton = steroids.view.navigationBar.update.mostRecentCall.args[0].buttons.left[0];
    expect(backButton.title).toEqual('Back');

    backButton.onTap();
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({buttons: {left: []}});
    expect(history.back).toHaveBeenCalled();
  });

  it('should attach all conversations to the scope', function() {
    expect(userService.getUser).toHaveBeenCalled();
    expect(conversationService.getConversations).toHaveBeenCalledWith('token', jasmine.any(Function), jasmine.any(Function));
    expect(scope.conversations).toEqual(jasmine.any(Object));
  });

  it('should redirect', function() {
    scope.redirect('/conversations/username');
    expect(location.path).toHaveBeenCalledWith('/conversations/username');
  });
});