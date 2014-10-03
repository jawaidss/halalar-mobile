'use strict';

angular.module('halalarServices').service('profileService', ['apiService', function profileService(apiService) {
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
    apiService.get(
      'get-profile/random',
      {
        token: token,
      },
      successCallback,
      errorCallback
    );
  };
}]);