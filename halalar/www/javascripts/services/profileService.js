'use strict';

angular.module('halalarServices').service('profileService', ['localStorageService', 'apiService', function profileService(localStorageService, apiService) {
  this.getCache = function() {
    return localStorageService.get('cache');
  };

  this.setCache = function(username) {
    localStorageService.set('cache', username);
  };

  this.removeCache = function() {
    localStorageService.remove('cache');
  };

  this.getProfile = function(token, successCallback, errorCallback) {
    apiService.get(
      'get-profile',
      {
        token: token,
      },
      successCallback,
      errorCallback
    );
  };

  this.editProfile = function(token, age, city, country,
                              religion, family, self, community, career,
                              successCallback, errorCallback) {
    apiService.post(
      'edit-profile',
      {
        token: token,
        age: age,
        city: city,
        country: country,
        religion: religion,
        family: family,
        self: self,
        community: community,
        career: career
      },
      successCallback,
      errorCallback
    );
  };

  this.getRandomProfile = function(token, successCallback, errorCallback) {
    var url = 'get-profile/random';
    var username = this.getCache();

    if (username) {
      url += '/' + username;
    }

    apiService.get(
      url,
      {
        token: token,
      },
      successCallback,
      errorCallback
    );
  };
}]);