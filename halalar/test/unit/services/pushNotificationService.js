'use strict';

describe('Service: pushNotificationsService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var pushNotificationsService,
    apiService;

  beforeEach(inject(function(_pushNotificationsService_, _apiService_) {
    pushNotificationsService = _pushNotificationsService_;
    apiService = _apiService_;

    spyOn(pushNotificationsService, 'clearApplicationIconBadgeNumber').andCallThrough();
    spyOn(apiService, 'post').andCallFake(function(url, data, successCallback, errorCallback) {
      if (data.token) {
        successCallback({});
      } else {
        errorCallback('Error!');
      }
    });

    window.plugins = {
      pushNotification: {
        register: jasmine.createSpy('register').andCallFake(function(successCallback, errorCallback, options) {
          successCallback('deviceToken');
        }),
        setApplicationIconBadgeNumber: jasmine.createSpy('setApplicationIconBadgeNumber').andCallFake(function(successCallback, errorCallback, badgeCount) {}),
        onMessageInForeground: jasmine.createSpy('onMessageInForeground').andCallFake(function(successCallback, errorCallback) {
          successCallback({message: 'message'});
        }),
        onMessageInBackground: jasmine.createSpy('onMessageInBackground').andCallFake(function(successCallback, errorCallback) {
          successCallback({});
        }),
      }
    };

    window.device = {
      platform: 'platform'
    };

    navigator.notification = {
      alert: jasmine.createSpy('alert').andCallFake(function() {})
    };
  }));

  it('should register push notifications', function() {
    var token = 'token';
    pushNotificationsService.register(token);
    expect(window.plugins.pushNotification.register).toHaveBeenCalled();
    expect(apiService.post).toHaveBeenCalled();
    expect(navigator.notification.alert).not.toHaveBeenCalled();

    token = null;
    pushNotificationsService.register(token);
    expect(window.plugins.pushNotification.register.calls.length).toEqual(2);
    expect(apiService.post.calls.length).toEqual(2);
    expect(navigator.notification.alert).toHaveBeenCalled();
  });

  it('should clear push notifications application icon badge number', function() {
    pushNotificationsService.clearApplicationIconBadgeNumber();
    expect(window.plugins.pushNotification.setApplicationIconBadgeNumber).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), 0);
  });

  it('should handle foreground push notifications', function() {
    pushNotificationsService.onMessageInForeground();
    expect(window.plugins.pushNotification.onMessageInForeground).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(navigator.notification.alert).toHaveBeenCalledWith('message', jasmine.any(Function));
  });

  it('should handle background push notifications', function() {
    pushNotificationsService.onMessageInBackground();
    expect(window.plugins.pushNotification.onMessageInBackground).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(pushNotificationsService.clearApplicationIconBadgeNumber).toHaveBeenCalled();
  });
});