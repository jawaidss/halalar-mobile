'use strict';

/*global HELP_TEXT:false */

describe('Controller: ProfileCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var ProfileCtrl,
    scope,
    userService,
    profileService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _userService_, _profileService_) {
    scope = $rootScope.$new();
    userService = _userService_;
    profileService = _profileService_;

    spyOn(history, 'back').andCallThrough();
    spyOn(userService, 'getUser').andReturn({username: 'samad', token: 'temp123'});
    spyOn(profileService, 'getProfile').andCallThrough();
    spyOn(profileService, 'editProfile').andCallThrough();
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

    ProfileCtrl = $controller('ProfileCtrl', {
      $scope: scope,
      $location: location,
      userService: userService,
      profileService: profileService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(userService.getUser).toHaveBeenCalled();
    expect(profileService.getProfile).toHaveBeenCalled();
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('samad');
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

  it('should not edit the current profile', function() {
    var steroidsViewNavigationBarSetButtonsCallsLength = steroids.view.navigationBar.setButtons.calls.length;
    var historyBackCallsLength = history.back.calls.length;
    scope.submit();
    expect(profileService.editProfile).toHaveBeenCalled();
    expect(navigator.notification.alert).toHaveBeenCalledWith('Error!', jasmine.any(Function));
    expect(steroids.view.navigationBar.setButtons.calls.length).toEqual(steroidsViewNavigationBarSetButtonsCallsLength);
    expect(history.back.calls.length).toEqual(historyBackCallsLength);
  });

  it('should edit the current profile', function() {
    scope.age = 18;
    scope.submit();
    expect(profileService.editProfile).toHaveBeenCalledWith(
      'temp123', scope.age, scope.city, scope.country,
      scope.religion, scope.family, scope.self, scope.community, scope.career,
      jasmine.any(Function), jasmine.any(Function)
    );
    expect(navigator.notification.alert).toHaveBeenCalledWith('Saved!', jasmine.any(Function));
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