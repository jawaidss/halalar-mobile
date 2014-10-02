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

  this.getRandomProfile = function(token) {
    return { // TODO
      age: 21,
      gender: 'female',
      city: 'Seattle',
      country: 'US',
      religion: 'Beard Pitchfork mlkshk craft beer occupy. Fingerstache flannel bicycle rights forage mixtape.',
      family: 'Actually Pinterest small batch irony aesthetic fap, tousled Brooklyn gluten-free Banksy butcher.',
      self: 'Viral meggings Etsy craft beer mustache, deep v flannel Vice PBR put a bird on it cornhole organic Odd Future twee.',
      community: 'American Apparel distillery flannel, biodiesel PBR readymade disrupt chia deep v Echo Park.',
      career: 'Try-hard crucifix Helvetica retro butcher mlkshk. Skateboard selvage Echo Park, sriracha Vice cardigan XOXO Cosby sweater.',
      username: (new Date()).getTime() + ''
    };
  };
}]);