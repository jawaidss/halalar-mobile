'use strict';

/*global VERSION:false */

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var MainCtrl,
    scope,
    location,
    userService,
    profileService,
    pushNotificationsService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_, _profileService_, _pushNotificationsService_) {
    scope = $rootScope.$new();
    location = $location;
    userService = _userService_;
    profileService = _profileService_;
    pushNotificationsService = _pushNotificationsService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(userService, 'getUser').andCallThrough();
    spyOn(userService, 'logOut').andCallThrough();
    spyOn(profileService, 'removeCache').andCallThrough();
    spyOn(pushNotificationsService, 'register').andCallFake(function(token) {});
    spyOn(pushNotificationsService, 'clearApplicationIconBadgeNumber').andCallFake(function() {});
    spyOn(pushNotificationsService, 'onMessageInForeground').andCallFake(function() {});
    spyOn(pushNotificationsService, 'onMessageInBackground').andCallFake(function() {});
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location,
      userService: userService,
      pushNotificationsService: pushNotificationsService
    });
  }));

  it('should change the navigation bar title', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Halalar');
  });

  it('should remove the cache', function() {
    expect(profileService.removeCache).toHaveBeenCalled();
  });

  it('should attach a user to the scope', function() {
    expect(userService.getUser).toHaveBeenCalled();
    expect(scope.user).toEqual(userService.getUser());
  });

  it('should redirect', function() {
    scope.redirect('/signup');
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

  it('should attach the version to the scope', function() {
    expect(scope.VERSION).toEqual(VERSION);
  });

  it('should not register push notifications', function() {
    expect(pushNotificationsService.register).not.toHaveBeenCalled();
  });

  it('should clear push notifications application icon badge number', function() {
    expect(pushNotificationsService.clearApplicationIconBadgeNumber).toHaveBeenCalled();
  });

  it('should handle foreground push notifications', function() {
    expect(pushNotificationsService.onMessageInForeground).toHaveBeenCalled();
  });

  it('should handle background push notifications', function() {
    expect(pushNotificationsService.onMessageInBackground).toHaveBeenCalled();
  });
});