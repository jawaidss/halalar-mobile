'use strict';

/*global GENDERS:false */
/*global COUNTRIES:false */

describe('Controller: BrowseCtrl', function() {

  // load the controller's module
  beforeEach(module('halalarApp'));

  var BrowseCtrl,
    scope,
    location,
    anchorScroll,
    userService,
    profileService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location, _userService_, _profileService_) {
    scope = $rootScope.$new();
    location = $location;
    anchorScroll = jasmine.createSpy('$anchorScroll');
    userService = _userService_;
    profileService = _profileService_;

    spyOn(history, 'back').andCallThrough();
    spyOn(userService, 'getUser').andReturn({username: 'samad', token: 'temp123'});
    spyOn(profileService, 'getRandomProfile').andCallThrough();
    spyOn(steroids.view.navigationBar, 'show').andCallThrough();
    spyOn(steroids.view.navigationBar, 'update').andCallThrough();

    BrowseCtrl = $controller('BrowseCtrl', {
      $scope: scope,
      $location: location,
      $anchorScroll: anchorScroll,
      userService: userService,
      profileService: profileService
    });
  }));

  it('should change the navigation bar title and buttons', function() {
    expect(steroids.view.navigationBar.show).toHaveBeenCalledWith('Browse');
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({
      buttons: {
        left: [jasmine.any(Object)],
        overrideBackButton: true
      }
    });

    var backButton = steroids.view.navigationBar.update.calls[0].args[0].buttons.left[0];
    expect(backButton.title).toEqual('Back');

    expect(scope.GENDERS).toEqual(GENDERS);
    expect(scope.COUNTRIES).toEqual(COUNTRIES);

    backButton.onTap();
    expect(steroids.view.navigationBar.update).toHaveBeenCalledWith({buttons: {left: []}});
    expect(history.back).toHaveBeenCalled();
  });

  it('should attach a profile to the scope and change the navigation bar title', function() {
    expect(userService.getUser).toHaveBeenCalled();
    expect(profileService.getRandomProfile).toHaveBeenCalledWith('temp123');
    expect(scope.profile).toEqual(jasmine.any(Object));
    expect(steroids.view.navigationBar.update.mostRecentCall.args[0]).toEqual(jasmine.any(String));
    expect(anchorScroll).toHaveBeenCalled();

    scope.next();
    expect(profileService.getRandomProfile.calls.length).toEqual(2);
    expect(steroids.view.navigationBar.update.calls.length).toEqual(3);
    expect(anchorScroll.calls.length).toEqual(2);
  });
});