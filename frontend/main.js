'use strict';

var app = angular.module('stocktest', ['ngRoute']);

// app.config(function($routeProvider){
//   $routeProvider.when('/', {
  
//   })
// });

app.controller('testCtrl', ['$scope', 'Tracked', function($scope, Tracked){
  Tracked.read()
  .then(function(res){
    console.log('res:', res.data);
    $scope.trackedStocks = res.data;
  })
  .catch(function(e) {
    console.log('error:', e);
  });

  $scope.addTracked = function() {
    Tracked.add($scope.newSymbol)
    .then(function(res) {
      console.log('res', res);
      $scope.trackedStocks = res.data;
    });
  }; 
}]);

app.constant('apiUrl', 'http://localhost:3000');

app.factory('Tracked', function($http, apiUrl) {
  var Tracked = function(){};

  Tracked.read = function() {
    return $http.get(apiUrl + '/tracked');
  };
  Tracked.add = function(symbol) {
    return $http.post(apiUrl + '/tracked', {newSymbol: symbol});
  };

  return Tracked;
});

