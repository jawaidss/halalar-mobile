'use strict';

describe('Service: conversationService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var conversationService,
    apiService;

  beforeEach(inject(function(_conversationService_, _apiService_) {
    conversationService = _conversationService_;
    apiService = _apiService_;

    var fake = function(url, data, successCallback, errorCallback) {
      if (data.token) {
        successCallback({});
      } else {
        errorCallback('Error!');
      }
    };

    spyOn(apiService, 'get').andCallFake(fake);
    spyOn(apiService, 'post').andCallFake(fake);
  }));

  it('should get all conversations', function() {
    var token = 'token';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    conversationService.getConversations(token, successCallback, errorCallback);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    token = null;
    conversationService.getConversations(token, successCallback, errorCallback);
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should get the conversation', function() {
    var token = 'token';
    var username = 'username';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    conversationService.getConversation(token, username, successCallback, errorCallback);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    token = null;
    conversationService.getConversation(token, username, successCallback, errorCallback);
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should send a message', function() {
    var token = 'token';
    var username = 'username';
    var message = 'message';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    conversationService.sendMessage(token, username, message, successCallback, errorCallback);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    token = null;
    conversationService.sendMessage(token, username, message, successCallback, errorCallback);
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });
});