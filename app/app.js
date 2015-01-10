'use strict';

// Declare app level module which depends on views, and components
angular.module('sdsApp', [
  'ngRoute',
  'sds.search',
  'sds.falling',
  'filters-module',
  'firebase'//,  'appControllers'
])
.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
      when("/search.html", {
        templateUrl: 'partials/search.html',
        controller: 'sdsSearchController'
      }).
      when("/falling/:videoId/", {
        templateUrl: "partials/falling.html",
        controller: 'fallingController'
      }).
      otherwise({redirectTo: "/search.html"});
}]);

