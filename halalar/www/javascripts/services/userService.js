'use strict';

angular.module('halalarServices').service('userService', ['localStorageService', function userService(localStorageService) {
  this.getUser = function() {
    return localStorageService.get('user');
  };

  this.logIn = function(username, password, successCallback, errorCallback) {
    if (username) { // TODO
      localStorageService.set('user', 'temp123');
      successCallback();
    } else {
      errorCallback();
    }
  };

  this.signUp = function(age, gender, city, country,
                         religion, family, self, community, career,
                         username, email, password,
                         successCallback, errorCallback) {
    if (username) { // TODO
      localStorageService.set('user', 'temp123');
      successCallback();
    } else {
      errorCallback();
    }
  };

  this.logOut = function() {
    localStorageService.remove('user');
  };

  this.edit = function(age, city, country,
                       religion, family, self, community, career,
                       successCallback, errorCallback) {
    if (age === 18) { // TODO
      successCallback();
    } else {
      errorCallback();
    }
  };
}]);