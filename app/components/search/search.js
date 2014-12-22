'use strict';

angular.module('sds.search', [])
    .controller('sdsSearchController', ["$scope", "$location", function($scope, $location){
        $scope.hasNotSelected = true;
        $scope.formData = {};

        // Helper function to display JavaScript value on HTML page.
        function showResponse(response) {
            $scope.videoList = [];
            $scope.hasSearched = true;
            for(var i=0; i < response["items"].length; i++){
                $scope.videoList.push(response["items"][i])
            }
            $scope.$apply();
        }

        $scope.search = function() {
            // Use the JavaScript client library to create a search.list() API call.
            var request = gapi.client.youtube.search.list({
                part: 'snippet',
                q: $scope.artist + " " + $scope.track

            });

            // Send the request to the API server,
            // and invoke onSearchRepsonse() with the response.
            request.execute(onSearchResponse);
        }

        // Called automatically with the response of the YouTube API request.
        function onSearchResponse(response) {
            showResponse(response);
        }

        $scope.submit = function() {
            console.log("Successful selection! Your selection is video ID:");
            console.log($scope.formData.selected);
            var redirect = "/falling/" + $scope.formData.selected;
            $location.path(redirect);
        }
    }])
    .directive('sdsResultDisplayer', [function(){
        return {
            restrict: "E",
            controller: "sdsSearchController",
            template:
                '<input type="text" ng-model="artist" placeholder="Artist Name" required />' +
                '<input type="text" ng-model="track" placeholder="Song Title" required />' +
                '{{artist}} - {{track}}' +
                '<button ng-click="search()">Search</button>' +
                '<div id="response"> </div>'
        };
    }]);