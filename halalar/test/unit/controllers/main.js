'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var MainCtrl,
    scope,
    location,
    userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_) {
    scope = $rootScope.$new();
    location = $location;
    userService = _userService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(userService, 'getUser').andCallThrough();
    spyOn(userService, 'logOut').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location,
      userService: userService
    });
  }));

  it('should change the navigation bar title', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Halalar');
  });

  it('should attach a user to the scope', function() {
    expect(userService.getUser).toHaveBeenCalled();
    expect(scope.user).toEqual(userService.getUser());
  });

  it('should change the path to the login page', function() {
    scope.logIn();
    expect(location.path).toHaveBeenCalledWith('/login');
  });

  it('should change the path to the signup page', function() {
    scope.signUp();
    expect(location.path).toHaveBeenCalledWith('/signup');
  });

  it('should prompt to log out', function() {
    scope.user = true;

    navigator.notification = {
      confirm: jasmine.createSpy('confirm').andCallFake(function() {
        arguments[1](0);
      })
    };

    scope.logOut();
    expect(navigator.notification.confirm).toHaveBeenCalledWith('Log out?', jasmine.any(Function));
    expect(userService.logOut).not.toHaveBeenCalled();
    expect(scope.user).not.toBeNull();

    navigator.notification = {
      confirm: jasmine.createSpy('confirm').andCallFake(function() {
        arguments[1](1);
      })
    };

    scope.logOut();
    expect(navigator.notification.confirm).toHaveBeenCalledWith('Log out?', jasmine.any(Function));
    expect(userService.logOut).toHaveBeenCalled();
    expect(scope.user).toBeNull();
  });
});