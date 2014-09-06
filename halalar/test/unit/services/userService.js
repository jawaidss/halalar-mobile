'use strict';

describe('Service: userService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var userService,
    localStorageService;

  beforeEach(inject(function(_userService_, _localStorageService_) {
    userService = _userService_;
    localStorageService = _localStorageService_;

    spyOn(localStorageService, 'get').andCallThrough();
    spyOn(localStorageService, 'set').andCallThrough();
    spyOn(localStorageService, 'remove').andCallThrough();
  }));

  it('should get the current user', function() {
    var user = userService.getUser();
    expect(localStorageService.get).toHaveBeenCalledWith('user');
    expect(user).toEqual({username: 'samad', token: 'temp123'});
  });

  it('should log in', function() {
    var username = 'username';
    var password = 'password';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    userService.logIn(username, password, successCallback, errorCallback);
    expect(localStorageService.set).toHaveBeenCalledWith('user', {username: 'samad', token: 'temp123'});
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    username = null;
    userService.logIn(username, password, successCallback, errorCallback);
    expect(localStorageService.set.calls.length).toEqual(1);
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should sign up', function() {
    var age = 'age';
    var gender = 'gender';
    var city = 'city';
    var country = 'country';
    var religion = 'religion';
    var family = 'family';
    var self = 'self';
    var community = 'community';
    var career = 'career';
    var username = 'username';
    var email = 'email';
    var password = 'password';
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    userService.signUp(
      age, gender, city, country,
      religion, family, self, community, career,
      username, email, password,
      successCallback, errorCallback
    );
    expect(localStorageService.set).toHaveBeenCalledWith('user', {username: 'samad', token: 'temp123'});
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    username = null;
    userService.signUp(
      age, gender, city, country,
      religion, family, self, community, career,
      username, email, password,
      successCallback, errorCallback
    );
    expect(localStorageService.set.calls.length).toEqual(1);
    expect(successCallback.calls.length).toEqual(1);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should log out', function() {
    userService.logOut();
    expect(localStorageService.remove).toHaveBeenCalledWith('user');
  });
});