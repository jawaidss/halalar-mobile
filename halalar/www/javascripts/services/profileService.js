'use strict';

angular.module('halalarServices').service('profileService', [function profileService() {
  this.getProfile = function(token) {
    return { // TODO
      age: 23,
      gender: 'male',
      city: 'Louisville',
      country: 'US',
      religion: 'religion',
      family: 'family',
      self: 'self',
      community: 'community',
      career: 'career',
      email: 'samad@halalar.com'
    };
  };

  this.editProfile = function(token, age, city, country,
                              religion, family, self, community, career,
                              successCallback, errorCallback) {
    if (age === 18) { // TODO
      successCallback();
    } else {
      errorCallback();
    }
  };

  this.getRandomProfile = function(token) {
    return { // TODO
      age: 21,
      gender: 'female',
      city: 'Seattle',
      country: 'US',
      religion: 'religion',
      family: 'family',
      self: 'self',
      community: 'community',
      career: 'career',
      username: (new Date()).getTime() + ''
    };
  };
}]);