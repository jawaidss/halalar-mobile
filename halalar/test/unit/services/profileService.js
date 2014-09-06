'use strict';

describe('Service: profileService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var profileService;

  beforeEach(inject(function(_profileService_) {
    profileService = _profileService_;
  }));

  it('should get the current profile', function() {
    var profile = profileService.getProfile();
    expect(profile).toEqual({
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
    });
  });

  it('should edit the current profile', function() {
    var age = 18;
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
      'temp123', age, city, country,
      religion, family, self, community, career,
      successCallback, errorCallback
    );
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    age = 19;
    profileService.editProfile(
      'temp123', age, city, country,
      religion, family, self, community, career,
      successCallback, errorCallback
    );
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });
});