'use strict';

angular.module('halalarServices').service('conversationService', [function conversationService() {
  this.getConversations = function(token) {
    return [ // TODO
      {
        username: 'monica100',
        timestamp: '7:44 PM',
        message: 'Irish skinny, grinder affogato, dark, sweet carajillo, flavour seasonal aroma single origin cream. Percolator, foam, arabica, decaffeinated bar brewed aromatic.'
      },
      {
        username: 'all_that_jelly',
        timestamp: 'Yesterday',
        message: 'Jelly-o sesame snaps halvah croissant oat cake cookie. Cheesecake bear claw topping. Chupa chups apple pie carrot cake chocolate cake caramels.'
      },
      {
        username: 'no_toast',
        timestamp: '8/30/14',
        message: 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar.'
      }
    ];
  };

  this.getConversation = function(token, username) {
    return [ // TODO
      {
        username: 'monica100',
        timestamp: '8/30/14',
        message: 'Salaam'
      },
      {
        username: 'samad',
        timestamp: 'Yesterday',
        message: 'Wasalaam'
      },
      {
        username: 'monica100',
        timestamp: '7:44 PM',
        message: 'What\'s up?'
      }
    ];
  };

  this.sendMessage = function(token, username, message,
                              successCallback, errorCallback) {
    if (message) { // TODO
      successCallback();
    } else {
      errorCallback();
    }
  };
}]);