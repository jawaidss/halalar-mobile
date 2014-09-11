'use strict';

describe('Service: conversationService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var conversationService;

  beforeEach(inject(function(_conversationService_) {
    conversationService = _conversationService_;
  }));

  it('should get all conversations', function() {
    var conversations = conversationService.getConversations('temp123');
    expect(conversations).toEqual(jasmine.any(Object));
  });

  it('should get the conversation', function() {
    var conversation = conversationService.getConversation('temp123', 'samad');
    expect(conversation).toEqual(jasmine.any(Object));
  });

  it('should send a message', function() {
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');

    conversationService.sendMessage(
      'temp123', 'samad', 'message',
      successCallback, errorCallback
    );
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    conversationService.sendMessage(
      'temp123', 'samad', '',
      successCallback, errorCallback
    );
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });
});