'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(true).toBeTruthy();
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