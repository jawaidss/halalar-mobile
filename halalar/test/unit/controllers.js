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
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location,
      localStorageService: localStorageService
    });
  }));

  it('should change the navigation bar title', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Halalar');
  });

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
    scope,
    location,
    localStorageService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _localStorageService_) {
    scope = $rootScope.$new();
    location = $location;
    localStorageService = _localStorageService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(localStorageService, 'set').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'setButtons').andCallThrough();

    navigator.notification = {
      alert: jasmine.createSpy('alert').andCallFake(function() {
        arguments[1]();
      })
    };

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $location: location,
      localStorageService: localStorageService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Log in');
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({
      left: [jasmine.any(Object)],
      overrideBackButton: true
    });

    var backButton = steroids.view.navigationBar.setButtons.mostRecentCall.args[0].left[0];
    expect(backButton.title).toEqual('Back');

    backButton.onTap();
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({left: []});
    expect(location.path).toHaveBeenCalledWith('/main');
  });

  it('should log in', function() {
    scope.submit();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Logged in!', jasmine.any(Function));
    expect(localStorageService.set).toHaveBeenCalledWith('user', 'test');
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({left: []});
    expect(location.path).toHaveBeenCalledWith('/main');
  });
});

describe('Controller: SignupCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var SignupCtrl,
    scope,
    location,
    localStorageService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _localStorageService_) {
    scope = $rootScope.$new();
    location = $location;
    localStorageService = _localStorageService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(localStorageService, 'set').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'setButtons').andCallThrough();

    navigator.notification = {
      alert: jasmine.createSpy('alert').andCallFake(function() {
        arguments[1]();
      })
    };

    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
      $location: location,
      localStorageService: localStorageService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Sign up');
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({
      left: [jasmine.any(Object)],
      overrideBackButton: true
    });

    var backButton = steroids.view.navigationBar.setButtons.mostRecentCall.args[0].left[0];
    expect(backButton.title).toEqual('Back');

    backButton.onTap();
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({left: []});
    expect(location.path).toHaveBeenCalledWith('/main');
  });

  it('should sign up', function() {
    scope.submit();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Signed up!', jasmine.any(Function));
    expect(localStorageService.set).toHaveBeenCalledWith('user', 'test');
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({left: []});
    expect(location.path).toHaveBeenCalledWith('/main');
  });
});