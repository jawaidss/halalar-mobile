'use strict';

/*global API_URL:false */
/*global $:false */

describe('Service: apiService', function() {

  // load the service's module
  beforeEach(module('halalarApp'));

  // instantiate service
  var apiService,
    httpBackend,
    http;

  beforeEach(inject(function(_apiService_, $httpBackend, $http) {
    apiService = _apiService_;
    httpBackend = $httpBackend;
    httpBackend.when('POST', API_URL + 'good-url/', $.param({foo: 'bar'})).respond('{"status": "success", "data": {"baz": 123}}');
    httpBackend.when('POST', API_URL + 'good-url/', $.param({})).respond('{"status": "error", "message": "Error!"}');
    httpBackend.when('POST', API_URL + 'weird-url/', $.param({})).respond('foobar');
    httpBackend.when('POST', API_URL + 'bad-url/', $.param({})).respond(500);
    http = $http;
  }));

  it('should post the data and call the success callback on the response data', function() {
    var url = 'good-url';
    var data = {foo: 'bar'};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.post(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).toHaveBeenCalledWith({baz: 123});
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('should post the data and call the error callback on the response message', function() {
    var url = 'good-url';
    var data = {};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.post(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('Error!');
  });

  it('should post the data and call the error callback on the malformed response', function() {
    var url = 'weird-url';
    var data = {};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.post(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('"foobar"');
  });

  it('should post the data and call the error callback', function() {
    var url = 'bad-url';
    var data = {};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.post(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('Are you connected to the Internet?');
  });
});