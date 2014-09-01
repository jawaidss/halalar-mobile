'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var MainCtrl,
    scope,
    location,
    userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_) {
    scope = $rootScope.$new();
    location = $location;
    userService = _userService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(userService, 'getUser').andCallThrough();
    spyOn(userService, 'logOut').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location,
      userService: userService
    });
  }));

  it('should change the navigation bar title', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Halalar');
  });

  it('should attach a user to the scope', function() {
    expect(userService.getUser).toHaveBeenCalled();
    expect(scope.user).toEqual(userService.getUser());
  });

  it('should change the path to the login page', function() {
    scope.logIn();
    expect(location.path).toHaveBeenCalledWith('/login');
  });

  it('should change the path to the signup page', function() {
    scope.signUp();
    expect(location.path).toHaveBeenCalledWith('/signup');
  });

  it('should prompt to log out', function() {
    scope.user = true;

    navigator.notification = {
      confirm: jasmine.createSpy('confirm').andCallFake(function() {
        arguments[1](0);
      })
    };

    scope.logOut();
    expect(navigator.notification.confirm).toHaveBeenCalledWith('Log out?', jasmine.any(Function));
    expect(userService.logOut).not.toHaveBeenCalled();
    expect(scope.user).not.toBeNull();

    navigator.notification = {
      confirm: jasmine.createSpy('confirm').andCallFake(function() {
        arguments[1](1);
      })
    };

    scope.logOut();
    expect(navigator.notification.confirm).toHaveBeenCalledWith('Log out?', jasmine.any(Function));
    expect(userService.logOut).toHaveBeenCalled();
    expect(scope.user).toBeNull();
  });
});

describe('Controller: LoginCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var LoginCtrl,
    scope,
    location,
    userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_) {
    scope = $rootScope.$new();
    location = $location;
    userService = _userService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(userService, 'logIn').andCallThrough();
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
      userService: userService
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

  it('should not log in', function() {
    var steroidsViewNavigationBarSetButtonsCallsLength = steroids.view.navigationBar.setButtons.calls.length;
    var locationPathCallsLength = location.path.calls.length;
    scope.submit();
    expect(userService.logIn).toHaveBeenCalled();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Error!', jasmine.any(Function));
    expect(steroids.view.navigationBar.setButtons.calls.length).toEqual(steroidsViewNavigationBarSetButtonsCallsLength);
    expect(location.path.calls.length).toEqual(locationPathCallsLength);
  });

  it('should log in', function() {
    scope.username = 'username';
    scope.password = 'password';
    scope.submit();
    expect(userService.logIn).toHaveBeenCalledWith(
      scope.username, scope.password,
      jasmine.any(Function), jasmine.any(Function)
    );
    expect(navigator.notification.alert).toHaveBeenCalledWith('Logged in!', jasmine.any(Function));
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
    userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_) {
    scope = $rootScope.$new();
    location = $location;
    userService = _userService_;

    spyOn(location, 'path').andCallThrough();
    spyOn(userService, 'signUp').andCallThrough();
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
      userService: userService
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

  it('should not sign up', function() {
    var steroidsViewNavigationBarSetButtonsCallsLength = steroids.view.navigationBar.setButtons.calls.length;
    var locationPathCallsLength = location.path.calls.length;
    scope.submit();
    expect(userService.signUp).toHaveBeenCalled();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Error!', jasmine.any(Function));
    expect(steroids.view.navigationBar.setButtons.calls.length).toEqual(steroidsViewNavigationBarSetButtonsCallsLength);
    expect(location.path.calls.length).toEqual(locationPathCallsLength);
  });

  it('should sign up', function() {
    scope.age = 'age';
    scope.gender = 'gender';
    scope.city = 'city';
    scope.country = 'country';
    scope.religion = 'religion';
    scope.family = 'family';
    scope.self = 'self';
    scope.community = 'community';
    scope.career = 'career';
    scope.username = 'username';
    scope.email = 'email';
    scope.password = 'password';
    scope.submit();
    expect(userService.signUp).toHaveBeenCalledWith(
      scope.age, scope.gender, scope.city, scope.country,
      scope.religion, scope.family, scope.self, scope.community, scope.career,
      scope.username, scope.email, scope.password,
      jasmine.any(Function), jasmine.any(Function)
    );
    expect(navigator.notification.alert).toHaveBeenCalledWith('Signed up!', jasmine.any(Function));
    expect(steroids.view.navigationBar.setButtons).toHaveBeenCalledWith({left: []});
    expect(location.path).toHaveBeenCalledWith('/main');
  });
});