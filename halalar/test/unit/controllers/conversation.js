'use strict';

describe('Controller: ConversationCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var ConversationCtrl,
    scope,
    routeParams,
    location,
    timeout,
    userService,
    conversationService,
    scrollToService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $routeParams, $location, $timeout, _userService_, _conversationService_, _scrollToService_) {
    scope = $rootScope.$new();
    routeParams = $routeParams;
    location = $location;
    timeout = $timeout;
    userService = _userService_;
    conversationService = _conversationService_;
    scrollToService = _scrollToService_;

    routeParams.username = 'monica100';

    spyOn(history, 'back').andCallThrough();
    spyOn(location, 'path').andCallThrough();
    spyOn(userService, 'getUser').andReturn({username: 'username', token: 'token'});
    spyOn(conversationService, 'getConversation').andCallFake(function(token, username, successCallback, errorCallback) {
      if (token) {
        successCallback({messages: []});
      } else {
        errorCallback('Error!'); // TODO
      }
    });
    spyOn(conversationService, 'sendMessage').andCallFake(function(token, username, message, successCallback, errorCallback) {
      if (message) {
        successCallback({message: {}});
      } else {
        errorCallback('Error!');
      }
    });
    spyOn(scrollToService, 'scrollToBottom').andReturn();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'update').andCallThrough();

    navigator.notification = {
      alert: jasmine.createSpy('alert').andCallFake(function() {
        arguments[1]();
      })
    };

    ConversationCtrl = $controller('ConversationCtrl', {
      $scope: scope,
      $routeParams: routeParams,
      $location: location,
      userService: userService,
      conversationService: conversationService,
      scrollToService: scrollToService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('monica100');
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({
      buttons: {
        left: [jasmine.any(Object)],
        right: [jasmine.any(Object)],
        overrideBackButton: true
      }
    });

    var backButton = steroids.view.navigationBar.update.mostRecentCall.args[0].buttons.left[0];
    expect(backButton.title).toEqual('Back');

    var profileButton = steroids.view.navigationBar.update.mostRecentCall.args[0].buttons.right[0];
    expect(profileButton.title).toEqual('Profile');

    backButton.onTap();
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({buttons: {left: [], right: []}});
    expect(history.back).toHaveBeenCalled();

    profileButton.onTap();
    expect(steroids.view.navigationBar.update.calls.length).toEqual(3);
    expect(steroids.view.navigationBar.update.mostRecentCall.args).toEqual([{buttons: {left: [], right: []}}]);
    expect(location.path).toHaveBeenCalledWith('/browse');
  });

  it('should attach the conversation to the scope', function() {
    timeout.flush();
    expect(userService.getUser).toHaveBeenCalled();
    expect(conversationService.getConversation).toHaveBeenCalledWith('token', 'monica100', jasmine.any(Function), jasmine.any(Function));
    expect(scope.conversation).toEqual(jasmine.any(Object));
    expect(scrollToService.scrollToBottom).toHaveBeenCalled();
  });

  it('should not send a message', function() {
    timeout.flush();
    var conversation = scope.conversation;
    var message = scope.message;
    scope.submit();
    expect(conversationService.sendMessage).toHaveBeenCalledWith(
      'token', 'monica100', message,
      jasmine.any(Function), jasmine.any(Function)
    );
    expect(navigator.notification.alert).toHaveBeenCalledWith('Error!', jasmine.any(Function));
    expect(scope.conversation).toEqual(conversation);
    expect(scope.message).toEqual(message);
    expect(scrollToService.scrollToBottom.calls.length).toEqual(1);
  });

  it('should send a message', function() {
    timeout.flush();
    var conversation = scope.conversation;
    conversation.push({});
    scope.message = 'test';
    scope.submit();
    expect(conversationService.sendMessage).toHaveBeenCalledWith(
      'token', 'monica100', 'test',
      jasmine.any(Function), jasmine.any(Function)
    );
    expect(navigator.notification.alert).toHaveBeenCalledWith('Sent!', jasmine.any(Function));
    expect(scope.conversation).toEqual(conversation);
    expect(scope.message).toEqual('');
    expect(scrollToService.scrollToBottom).toHaveBeenCalled();
  });
});