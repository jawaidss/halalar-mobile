'use strict';

/*global $:false */

var API_URL = 'http://192.168.1.117:8000/api/'; // TODO

angular.module('halalarServices').service('apiService', ['$http', function apiService($http) {
  this.post = function(url, data, successCallback, errorCallback) {
    $http({
        method: 'POST',
        url: API_URL + url + '/',
        data: $.param(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).
    success(function(data, status, headers, config) {
      if (data.status === 'success') {
        successCallback(data.data);
      } else if (data.status === 'error') {
        errorCallback(data.message);
      } else {
        errorCallback(JSON.stringify(data));
      }
    }).
    error(function(data, status, headers, config) {
      errorCallback('Are you connected to the Internet?');
    });
  };
}]);