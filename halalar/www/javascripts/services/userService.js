'use strict';

angular.module('halalarServices').service('userService', ['localStorageService', function userService(localStorageService) {
  this.getUser = function() {
    return localStorageService.get('user');
  };

  this.logIn = function(username, password, successCallback, errorCallback) {
    if (username) { // TODO
      localStorageService.set('user', {
        username: 'samad',
        token: 'temp123'
      });
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
      localStorageService.set('user', {
        username: 'samad',
        token: 'temp123'
      });
      successCallback();
    } else {
      errorCallback();
    }
  };

  this.logOut = function() {
    localStorageService.remove('user');
  };
}]);