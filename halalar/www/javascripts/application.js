// Display the native navigation bar with the title "Hello World!"
steroids.view.navigationBar.show("Halalar");

// Set the WebView background color to white (effective on iOS only)
steroids.view.setBackgroundColor("#FFFFFF");

var halalarApp = angular.module('halalarApp', []);

halalarApp.controller('IndexCtrl', ['$scope', function($scope) {
  $scope.greeting = 'Hello, world!';
}]);