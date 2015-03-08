'use strict';

var SENDER_ID = '708749631514';

angular.module('halalarServices').service('pushNotificationsService', ['apiService', function pushNotificationsService(apiService) {
  this.register = function(token) {
    window.plugins.pushNotification.register(
      function(deviceToken) {
        apiService.post(
          'register-push-notifications/' + window.device.platform,
          {
            'registration_id': deviceToken,
            token: token
          },
          function(data) {},
          function(message) {
            navigator.notification.alert(message, function() {});
          }
        );
      },
      function(message) {
        navigator.notification.alert(message, function() {});
      },
      {
        alert: true,
        badge: true,
        sound: true,
        senderID: SENDER_ID
      }
    );
  };

  this.clearApplicationIconBadgeNumber = function() {
    window.plugins.pushNotification.setApplicationIconBadgeNumber(function() {}, function() {}, 0);
  };

  this.onMessageInForeground = function() {
    window.plugins.pushNotification.onMessageInForeground(
      function(notification) {
        navigator.notification.alert(notification.message || notification.alert, function() {});
      },
      function(message) {
        navigator.notification.alert(message, function() {});
      }
    );
  };

  this.onMessageInBackground = function() {
    var that = this;

    window.plugins.pushNotification.onMessageInBackground(
      function(notification) {
        that.clearApplicationIconBadgeNumber();
      },
      function(message) {
        navigator.notification.alert(message, function() {});
      }
    );
  };
}]);