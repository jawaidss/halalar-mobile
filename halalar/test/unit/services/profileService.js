'use strict';

describe('Service: profileService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var profileService,
    localStorageService,
    apiService;

  beforeEach(inject(function(_profileService_, _localStorageService_, _apiService_) {
    profileService = _profileService_;
    localStorageService = _localStorageService_;
    apiService = _apiService_;

    spyOn(localStorageService, 'get').andCallThrough();
    spyOn(localStorageService, 'set').andCallThrough();
    spyOn(localStorageService, 'remove').andCallThrough();

    var fake = function(url, data, successCallback, errorCallback) {
      if (data.token) {
        successCallback({});
      } else {
        errorCallback('Error!');
      }
    };

    spyOn(apiService, 'get').andCallFake(fake);
    spyOn(apiService, 'post').andCallFake(fake);
  }));

  it('should get the cache', function() {
    var username = profileService.getCache();
    expect(localStorageService.get).toHaveBeenCalledWith('cache');
    expect(username).toEqual(null);
  });

  it('should set the cache', function() {
    profileService.setCache('username');
    expect(localStorageService.set).toHaveBeenCalledWith('cache', 'username');
  });

  it('should remove the cache', function() {
    profileService.removeCache();
    expect(localStorageService.remove).toHaveBeenCalledWith('cache');
  });

  it('should get the current profile', function() {
    var token = 'token';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    profileService.getProfile(token, successCallback, errorCallback);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    token = null;
    profileService.getProfile(token, successCallback, errorCallback);
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should edit the current profile', function() {
    var token = 'token';
    var photoURI = null;
    var photoClear = false;
    var age = 'age';
    var city = 'city';
    var country = 'country';
    var religion = 'religion';
    var family = 'family';
    var self = 'self';
    var community = 'community';
    var career = 'career';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    profileService.editProfile(
      token, photoURI, photoClear, age, city, country,
      religion, family, self, community, career,
      successCallback, errorCallback
    );
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    token = null;
    profileService.editProfile(
      token, photoURI, photoClear, age, city, country,
      religion, family, self, community, career,
      successCallback, errorCallback
    );
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should get a random profile', function() {
    var token = 'token';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    profileService.getRandomProfile(token, successCallback, errorCallback);
    expect(apiService.get.mostRecentCall.args[0]).toEqual('get-profile/random');
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    token = null;
    profileService.getRandomProfile(token, successCallback, errorCallback);
    expect(apiService.get.mostRecentCall.args[0]).toEqual('get-profile/random');
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();

    profileService.setCache('username');
    profileService.getRandomProfile(token, successCallback, errorCallback);
    expect(apiService.get.mostRecentCall.args[0]).toEqual('get-profile/random/username');
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback.calls.length).toEqual(2);
  });
});