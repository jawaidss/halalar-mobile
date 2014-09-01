'use strict';

/*global HELP_TEXT:false */

describe('Controller: SignupCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var SignupCtrl,
    scope,
    userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _userService_) {
    scope = $rootScope.$new();
    userService = _userService_;

    spyOn(history, 'back').andCallThrough();
    spyOn(userService, 'signUp').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'hide').andCallThrough();
    spyOn(steroids.view.navigationBar, 'setButtons').andCallThrough();
    spyOn(steroids.statusBar, 'hide').andCallThrough();
    spyOn(steroids.statusBar, 'show').andCallThrough();

    navigator.notification = {
      alert: jasmine.createSpy('alert').andCallFake(function() {
        arguments[1]();
      })
    };

    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
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
    expect(history.back).toHaveBeenCalled();
  });

  it('should not sign up', function() {
    var steroidsViewNavigationBarSetButtonsCallsLength = steroids.view.navigationBar.setButtons.calls.length;
    var historyBackCallsLength = history.back.calls.length;
    scope.submit();
    expect(userService.signUp).toHaveBeenCalled();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Error!', jasmine.any(Function));
    expect(steroids.view.navigationBar.setButtons.calls.length).toEqual(steroidsViewNavigationBarSetButtonsCallsLength);
    expect(history.back.calls.length).toEqual(historyBackCallsLength);
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
    expect(history.back).toHaveBeenCalled();
  });

  it('should show and hide a modal', function() {
    scope.showModal('religion', 'Religion');
    expect(steroids.statusBar.hide).toHaveBeenCalled();
    expect(steroids.view.navigationBar.hide).toHaveBeenCalled();
    expect(scope.modal).toBeTruthy();
    expect(scope.field).toEqual('religion');
    expect(scope.fieldTitle).toEqual('Religion');
    expect(scope.fieldHelpText).toEqual(HELP_TEXT.religion);
    expect(scope.temporaryField).toEqual(scope.religion);

    scope.temporaryField = 'Test';
    scope.hideModal();
    expect(steroids.statusBar.show).toHaveBeenCalled();
    expect(steroids.view.navigationBar.show.calls.length).toEqual(2);
    expect(scope.religion).toEqual('Test');
  });
});