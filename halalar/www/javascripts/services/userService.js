'use strict';

angular.module('halalarServices').service('userService', ['localStorageService', function userService(localStorageService) {
  this.getUser = function() {
    return localStorageService.get('user');
  };

  this.getProfile = function() {
    return { // TODO
      age: 23,
      gender: 'Male',
      city: 'Louisville',
      country: 'United States of America',
      religion: 'religion',
      family: 'family',
      self: 'self',
      community: 'community',
      career: 'career',
      email: 'samad@halalar.com'
    };
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

  this.edit = function(token, age, city, country,
                       religion, family, self, community, career,
                       successCallback, errorCallback) {
    if (age === 18) { // TODO
      successCallback();
    } else {
      errorCallback();
    }
  };
}]);