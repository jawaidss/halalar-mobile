'use strict';

describe('Controller: LoginCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var LoginCtrl,
    scope,
    userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _userService_) {
    scope = $rootScope.$new();
    userService = _userService_;

    spyOn(history, 'back').andCallThrough();
    spyOn(userService, 'logIn').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'setButtons').andCallThrough();

    navigator.notification = {
      alert: jasmine.createSpy('alert').andCallFake(function() {
        arguments[1]();
      })
    };

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      userService: userService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Log in');
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({
      left: [jasmine.any(Object)],
      overrideBackButton: true
    });

    var backButton = steroids.view.navigationBar.setButtons.mostRecentCall.args[0].left[0];
    expect(backButton.title).toEqual('Back');

    backButton.onTap();
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({left: []});
    expect(history.back).toHaveBeenCalled();
  });

  it('should not log in', function() {
    var steroidsViewNavigationBarSetButtonsCallsLength = steroids.view.navigationBar.setButtons.calls.length;
    var historyBackCallsLength = history.back.calls.length;
    scope.submit();
    expect(userService.logIn).toHaveBeenCalled();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Error!', jasmine.any(Function));
    expect(steroids.view.navigationBar.setButtons.calls.length).toEqual(steroidsViewNavigationBarSetButtonsCallsLength);
    expect(history.back.calls.length).toEqual(historyBackCallsLength);
  });

  it('should log in', function() {
    scope.username = 'username';
    scope.password = 'password';
    scope.submit();
    expect(userService.logIn).toHaveBeenCalledWith(
      scope.username, scope.password,
      jasmine.any(Function), jasmine.any(Function)
    );
    expect(navigator.notification.alert).toHaveBeenCalledWith('Logged in!', jasmine.any(Function));
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({left: []});
    expect(history.back).toHaveBeenCalled();
  });
});