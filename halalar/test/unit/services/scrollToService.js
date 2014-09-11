'use strict';

/*global xit:false */

describe('Service: scrollToService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var scrollToService;

  beforeEach(inject(function(_scrollToService_) {
    scrollToService = _scrollToService_;
  }));

  xit('should scroll to the top', function() {
    scrollToService.scrollToTop();
    // TODO
  });

  xit('should scroll to the bottom', function() {
    scrollToService.scrollToBottom();
    // TODO
  });

  xit('should scroll to the element', function() {
    scrollToService.scrollToElement('foo');
    // TODO
  });
});