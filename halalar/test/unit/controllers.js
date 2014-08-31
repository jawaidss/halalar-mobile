'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var MainCtrl,
    scope,
    location,
    localStorageService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _localStorageService_) {
    scope = $rootScope.$new();
    location = $location;
    localStorageService = _localStorageService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(localStorageService, 'get').andCallThrough();
    spyOn(localStorageService, 'clearAll').andCallThrough();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location,
      localStorageService: localStorageService
    });
  }));

  it('should attach a user to the scope', function() {
    expect(localStorageService.get).toHaveBeenCalled();
    expect(scope.user).toEqual(localStorageService.get());
  });

  it('should change the path to the login page', function() {
    scope.login();
    expect(location.path).toHaveBeenCalledWith('/login');
  });

  it('should change the path to the signup page', function() {
    scope.signup();
    expect(location.path).toHaveBeenCalledWith('/signup');
  });

  it('should prompt to log out', function() {
    scope.user = true;

    navigator.notification = {
      confirm: jasmine.createSpy('confirm').andCallFake(function() {
        arguments[1](0);
      })
    };

    scope.logout();
    expect(navigator.notification.confirm).toHaveBeenCalledWith('Log out?', jasmine.any(Function));
    expect(localStorageService.clearAll).not.toHaveBeenCalled();
    expect(scope.user).not.toBeNull();

    navigator.notification = {
      confirm: jasmine.createSpy('confirm').andCallFake(function() {
        arguments[1](1);
      })
    };

    scope.logout();
    expect(navigator.notification.confirm).toHaveBeenCalledWith('Log out?', jasmine.any(Function));
    expect(localStorageService.clearAll).toHaveBeenCalled();
    expect(scope.user).toBeNull();
  });
});

describe('Controller: LoginCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(true).toBeTruthy();
  });
});

describe('Controller: SignupCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var SignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(true).toBeTruthy();
  });
});