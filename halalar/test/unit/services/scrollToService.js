'use strict';

/*global $:false */

describe('Service: scrollToService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var scrollToService;

  beforeEach(inject(function(_scrollToService_) {
    scrollToService = _scrollToService_;

    spyOn(scrollToService, 'scrollToAnimated').andCallThrough();
    spyOn($.fn, 'animate').andReturn();
    spyOn($.fn, 'height').andReturn(100);
    spyOn($.fn, 'offset').andReturn({top: 50});
  }));

  it('should scroll with animation', function() {
    scrollToService.scrollToAnimated(200);
    expect($.fn.animate).toHaveBeenCalledWith({scrollTop: 200}, 'slow');
  });

  it('should scroll to the top', function() {
    scrollToService.scrollToTop();
    expect(scrollToService.scrollToAnimated).toHaveBeenCalledWith(0);
  });

  it('should scroll to the bottom', function() {
    scrollToService.scrollToBottom();
    expect(scrollToService.scrollToAnimated).toHaveBeenCalledWith(100);
    expect($.fn.height).toHaveBeenCalled();
  });

  it('should scroll to the element', function() {
    scrollToService.scrollToElement('foo');
    expect(scrollToService.scrollToAnimated).toHaveBeenCalledWith(50);
    expect($.fn.offset).toHaveBeenCalled();
  });
});