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
});