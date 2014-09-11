'use strict';

angular.module('halalarServices').service('profileService', [function profileService() {
  this.getProfile = function(token) {
    return { // TODO
      age: 23,
      gender: 'male',
      city: 'Louisville',
      country: 'US',
      religion: 'Quinoa art party keffiyeh, brunch YOLO Kickstarter fashion axe paleo hashtag.',
      family: 'Etsy viral master cleanse ethnic mumblecore, Brooklyn try-hard Echo Park 8-bit.',
      self: ' Fingerstache fixie ethical yr. Bespoke pour-over roof party Schlitz swag jean shorts.',
      community: 'Sriracha narwhal typewriter Etsy artisan. Tousled trust fund pork belly, umami seitan keytar cred.',
      career: 'Freegan fixie cred, post-ironic 90\'s seitan sartorial narwhal Wes Anderson literally keytar jean shorts beard lomo scenester.',
      email: 'samad@halalar.com'
    };
  };

  this.editProfile = function(token, age, city, country,
                              religion, family, self, community, career,
                              successCallback, errorCallback) {
    if (age === 18) { // TODO
      successCallback();
    } else {
      errorCallback();
    }
  };

  this.getRandomProfile = function(token) {
    return { // TODO
      age: 21,
      gender: 'female',
      city: 'Seattle',
      country: 'US',
      religion: 'Beard Pitchfork mlkshk craft beer occupy. Fingerstache flannel bicycle rights forage mixtape.',
      family: 'Actually Pinterest small batch irony aesthetic fap, tousled Brooklyn gluten-free Banksy butcher.',
      self: 'Viral meggings Etsy craft beer mustache, deep v flannel Vice PBR put a bird on it cornhole organic Odd Future twee.',
      community: 'American Apparel distillery flannel, biodiesel PBR readymade disrupt chia deep v Echo Park.',
      career: 'Try-hard crucifix Helvetica retro butcher mlkshk. Skateboard selvage Echo Park, sriracha Vice cardigan XOXO Cosby sweater.',
      username: (new Date()).getTime() + ''
    };
  };
}]);