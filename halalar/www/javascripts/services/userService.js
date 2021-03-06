'use strict';

angular.module('halalarServices').service('userService', ['localStorageService', 'apiService', function userService(localStorageService, apiService) {
  this.getUser = function() {
    return localStorageService.get('user');
  };

  this.logIn = function(username, password, successCallback, errorCallback) {
    apiService.post(
      'log-in',
      {
        username: username,
        password: password
      },
      function(data) {
        localStorageService.set('user', {
          username: username,
          token: data.token
        });
        successCallback(data);
      },
      errorCallback
    );
  };

  this.signUp = function(photoURI, age, gender, city, country,
                         religion, family, self, community, career,
                         username, email, password,
                         successCallback, errorCallback) {
    apiService.postFile(
      'sign-up',
      {
        age: age,
        gender: gender,
        city: city,
        country: country,
        religion: religion,
        family: family,
        self: self,
        community: community,
        career: career,
        username: username,
        email: email,
        password: password
      },
      'photo',
      photoURI,
      false,
      function(data) {
        localStorageService.set('user', {
          username: username,
          token: data.token
        });
        successCallback(data);
      },
      errorCallback
    );
  };

  this.logOut = function() {
    localStorageService.remove('user');
  };
}]);