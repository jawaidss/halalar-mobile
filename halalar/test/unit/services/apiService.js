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
    spyOn(apiService, 'post').andCallThrough();
    httpBackend = $httpBackend;
    httpBackend.whenGET(API_URL + 'good-url/?' + $.param({foo: 'bar'})).respond('{"status": "success", "data": {"baz": 123}}');
    httpBackend.whenGET(API_URL + 'good-url/').respond('{"status": "error", "message": "Error!"}');
    httpBackend.whenGET(API_URL + 'weird-url/').respond('foobar');
    httpBackend.whenGET(API_URL + 'bad-url/').respond(500);
    httpBackend.whenPOST(API_URL + 'good-url/', $.param({foo: 'bar'})).respond('{"status": "success", "data": {"baz": 123}}');
    httpBackend.whenPOST(API_URL + 'good-url/', $.param({})).respond('{"status": "error", "message": "Error!"}');
    httpBackend.whenPOST(API_URL + 'weird-url/', $.param({})).respond('foobar');
    httpBackend.whenPOST(API_URL + 'bad-url/', $.param({})).respond(500);
    httpBackend.whenPOST(API_URL + 'good-file-url/', $.param({foo: 'bar'})).respond('{"status": "success", "data": {"baz": 123}}');
    httpBackend.whenPOST(API_URL + 'good-file-url/', $.param({foo: 'bar', 'baz-clear': true})).respond('{"status": "success", "data": {"baz": 456}}');
    http = $http;

    window.FileUploadOptions = jasmine.createSpy('FileUploadOptions').andCallFake(function() {
      return {};
    });

    window.FileTransfer = jasmine.createSpy('FileTransfer').andCallFake(function() {
      return {
        upload: jasmine.createSpy('upload').andCallFake(function(filePath, server, successCallback, errorCallback, options) {
          if (server.indexOf('good-url') > -1) {
            successCallback({response: '{"status": "error", "message": "Error!"}'});
          } else if (server.indexOf('weird-url') > -1) {
            successCallback({response: '"foobar"'});
          } else if (server.indexOf('bad-url') > -1) {
            errorCallback('Are you connected to the Internet?');
          } else {
            successCallback({response: '{"status": "success", "data": {"baz": 789}}'});
          }
        })
      };
    });
  }));

  it('should get the data and call the success callback on the response data', function() {
    var url = 'good-url';
    var data = {foo: 'bar'};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.get(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).toHaveBeenCalledWith({baz: 123});
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('should get the data and call the error callback on the response message', function() {
    var url = 'good-url';
    var data = {};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.get(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('Error!');
  });

  it('should get the data and call the error callback on the malformed response', function() {
    var url = 'weird-url';
    var data = {};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.get(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('"foobar"');
  });

  it('should get the data and call the error callback', function() {
    var url = 'bad-url';
    var data = {};
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.get(url, data, successCallback, errorCallback);
    httpBackend.flush();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('Are you connected to the Internet?');
  });

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

  it('should post the data and file and call the success callback on the response data', function() {
    var url = 'good-file-url';
    var data = {foo: 'bar'};
    var fileKey = 'baz';
    var fileURI = 'file';
    var fileClear = false;
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.postFile(url, data, fileKey, fileURI, fileClear, successCallback, errorCallback);
    expect(apiService.post).not.toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalledWith({baz: 789});
    expect(errorCallback).not.toHaveBeenCalled();

    fileURI = null;
    apiService.postFile(url, data, fileKey, fileURI, fileClear, successCallback, errorCallback);
    httpBackend.flush();
    expect(apiService.post).toHaveBeenCalledWith(url, data, successCallback, errorCallback);
    expect(successCallback).toHaveBeenCalledWith({baz: 123});
    expect(errorCallback).not.toHaveBeenCalled();

    fileClear = true;
    apiService.postFile(url, data, fileKey, fileURI, fileClear, successCallback, errorCallback);
    httpBackend.flush();
    var expectedData = {foo: 'bar', 'baz-clear': true};
    expect(apiService.post).toHaveBeenCalledWith(url, expectedData, successCallback, errorCallback);
    expect(successCallback).toHaveBeenCalledWith({baz: 456});
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('should post the data and file and call the error callback on the response message', function() {
    var url = 'good-url';
    var data = {};
    var fileKey = 'baz';
    var fileURI = 'file';
    var fileClear = false;
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.postFile(url, data, fileKey, fileURI, fileClear, successCallback, errorCallback);
    expect(apiService.post).not.toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('Error!');
  });

  it('should post the data and file and call the error callback on the malformed response', function() {
    var url = 'weird-url';
    var data = {};
    var fileKey = 'baz';
    var fileURI = 'file';
    var fileClear = false;
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.postFile(url, data, fileKey, fileURI, fileClear, successCallback, errorCallback);
    expect(apiService.post).not.toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('"foobar"');
  });

  it('should post the data and file and call the error callback', function() {
    var url = 'bad-url';
    var data = {};
    var fileKey = 'baz';
    var fileURI = 'file';
    var fileClear = false;
    var successCallback = jasmine.createSpy('successCallback');
    var errorCallback = jasmine.createSpy('errorCallback');
    apiService.postFile(url, data, fileKey, fileURI, fileClear, successCallback, errorCallback);
    expect(apiService.post).not.toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledWith('Are you connected to the Internet?');
  });
});