'use strict';

// Declare app level module which depends on views, and components
angular.module('sdsApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'sds.search',
  'sds.falling',
  'filters-module'
])
.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
      when("/search.html", {
        templateUrl: 'partials/search.html',
        controller: 'sdsSearchController'
      }).
      when("/falling/:videoId", {
        templateUrl: "partials/falling.html",
        controller: 'fallingController'
      }).
      otherwise({redirectTo: "/search.html"});
}])

