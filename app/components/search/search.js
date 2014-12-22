'use strict';

angular.module('sds.search', [])
    .controller('sdsSearchController', ["$scope", function($scope){
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
            //var firstId = response["items"][0]["id"]["videoId"];
            //for(var i = 0; i < response["items"].length; i++){
            //    var prefix = '<iframe width="560" height="315" src="';
            //    var suffix = '" frameborder="0" allowfullscreen></iframe>';
            //    var ytlink = 'https://www.youtube.com/embed/' + response["items"][i]["id"]["videoId"];
            //    document.getElementById('response').innerHTML += prefix + ytlink + suffix + "<br/>";
            //}
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
            $(function(){
                var url = $scope.formData.selected;
                var string = '<div id="bgndVideo" class="player" data-property="{videoURL:\'' + url + '\',containment:\'body\',autoPlay:true, mute:false, startAt:0, opacity:1}"></div>';
                $(".player-container").append(string);
                $(".player").YTPlayer();
            })
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