'use strict';

/*global HELP_TEXT:false */
/*global GENDERS:false */
/*global COUNTRIES:false */
/*global DEFAULT_COUNTRY:false */

describe('Controller: SignupCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var SignupCtrl,
    scope,
    timeout,
    userService,
    scrollToService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $timeout, _userService_, _scrollToService_) {
    scope = $rootScope.$new();
    timeout = $timeout;
    userService = _userService_;
    scrollToService = _scrollToService_;

    spyOn(history, 'back').andCallThrough();
    spyOn(userService, 'signUp').andCallFake(function(age, gender, city, country,
                                                      religion, family, self, community, career,
                                                      username, email, password,
                                                      successCallback, errorCallback) {
      if (username) {
        successCallback({});
      } else {
        errorCallback('Error!');
      }
    });
    spyOn(scrollToService, 'scrollToElement').andReturn();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'hide').andCallThrough();
    spyOn(steroids.view.navigationBar, 'update').andCallThrough();
    spyOn(steroids.statusBar, 'hide').andCallThrough();
    spyOn(steroids.statusBar, 'show').andCallThrough();

    navigator.notification = {
      alert: jasmine.createSpy('alert').andCallFake(function() {
        arguments[1]();
      })
    };

    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
      $timeout: timeout,
      userService: userService,
      scrollToService: scrollToService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Sign up');
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({
      buttons: {
        left: [jasmine.any(Object)],
        overrideBackButton: true
      }
    });

    var backButton = steroids.view.navigationBar.update.mostRecentCall.args[0].buttons.left[0];
    expect(backButton.title).toEqual('Back');

    expect(scope.GENDERS).toEqual(GENDERS);
    expect(scope.COUNTRIES).toEqual(COUNTRIES);
    expect(scope.country).toEqual(DEFAULT_COUNTRY);

    backButton.onTap();
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({buttons: {left: []}});
    expect(history.back).toHaveBeenCalled();
  });

  it('should not sign up', function() {
    var steroidsViewNavigationBarUpdateCallsLength = steroids.view.navigationBar.update.calls.length;
    var historyBackCallsLength = history.back.calls.length;
    scope.submit();
    expect(userService.signUp).toHaveBeenCalled();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Error!', jasmine.any(Function));
    expect(steroids.view.navigationBar.update.calls.length).toEqual(steroidsViewNavigationBarUpdateCallsLength);
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
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({buttons: {left: []}});
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
    timeout.flush();
    expect(scrollToService.scrollToElement).toHaveBeenCalledWith(scope.field);
  });
});