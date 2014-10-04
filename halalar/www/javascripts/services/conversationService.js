'use strict';

angular.module('halalarServices').service('conversationService', ['apiService', function conversationService(apiService) {
  this.getConversations = function(token, successCallback, errorCallback) {
    apiService.get(
      'get-conversations',
      {
        token: token,
      },
      successCallback,
      errorCallback
    );
  };

  this.getConversation = function(token, username, successCallback, errorCallback) {
    apiService.get(
      'get-conversation/' + username,
      {
        token: token,
      },
      successCallback,
      errorCallback
    );
  };

  this.sendMessage = function(token, username, message,
                              successCallback, errorCallback) {
    apiService.post(
      'send-message/' + username,
      {
        token: token,
        body: message
      },
      successCallback,
      errorCallback
    );
  };
}]);