'use strict';

/*global $:false */

var API_URL = 'https://halalar.com/api/';

angular.module('halalarServices').service('apiService', ['$http', function apiService($http) {
  this.http = function(method, url, params, data, successCallback, errorCallback, headers) {
    $http({
        method: method,
        url: API_URL + url + '/',
        params: params,
        data: data,
        headers: headers
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

  this.get = function(url, data, successCallback, errorCallback) {
    this.http('GET', url, data, {}, successCallback, errorCallback, {});
  };

  this.post = function(url, data, successCallback, errorCallback) {
    this.http('POST', url, {}, $.param(data), successCallback, errorCallback, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  };
}]);