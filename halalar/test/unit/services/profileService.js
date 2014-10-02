'use strict';

describe('Service: profileService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var profileService,
    apiService;

  beforeEach(inject(function(_profileService_, _apiService_) {
    profileService = _profileService_;
    apiService = _apiService_;

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
      token, age, city, country,
      religion, family, self, community, career,
      successCallback, errorCallback
    );
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    token = null;
    profileService.editProfile(
      token, age, city, country,
      religion, family, self, community, career,
      successCallback, errorCallback
    );
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should get a random profile', function() {
    var profile = profileService.getRandomProfile('temp123');
    expect(profile).toEqual(jasmine.any(Object));
  });
});