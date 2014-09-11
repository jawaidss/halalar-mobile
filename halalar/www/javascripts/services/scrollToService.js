'use strict';

/*global $:false */

angular.module('halalarServices').service('scrollToService', [function scrollToService() {
  this.scrollToAnimated = function(where) {
    $('html, body').animate({scrollTop: where}, 'slow');
  };
  
  this.scrollToTop = function() {
    this.scrollToAnimated(0);
  };
  
  this.scrollToBottom = function() {
    this.scrollToAnimated($('body').height());
  };
  
  this.scrollToElement = function(id) {
    this.scrollToAnimated($('#' + id).offset().top);
  };
}]);