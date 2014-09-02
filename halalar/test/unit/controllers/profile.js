'use strict';

describe('Controller: ProfileCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var ProfileCtrl,
    scope,
    location,
    userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_) {
    scope = $rootScope.$new();
    location = $location;
    userService = _userService_;

    spyOn(history, 'back').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'setButtons').andCallThrough();

    ProfileCtrl = $controller('ProfileCtrl', {
      $scope: scope,
      $location: location,
      userService: userService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Profile');
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
});