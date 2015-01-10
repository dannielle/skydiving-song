'use strict';

angular.module('sds.search', [])
    .controller('sdsSearchController', ["$scope", "$location", "$firebase", function($scope, $location, $firebase){
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

        var ref = new Firebase("https://noparachute.firebaseio.com/playlist");

        $scope.submit = function() {
            console.log("Successful selection! Your selection is video ID:");
            console.log($scope.formData.selected);

            var ref = new Firebase("https://noparachute.firebaseio.com/playlist");

            // GET MESSAGES AS AN ARRAY
            $scope.playlist = $firebase(ref).$asArray();
            // Add Name, Passion and youtube song id to database
            console.log("Connection established");
            $scope.$parent.newPuddle = {
                name: $scope.user.name,
                love: $scope.user.love,
                videoTitle: $scope.formData.selected.snippet.title,
                videoThumbnail: $scope.formData.selected.snippet.thumbnails.medium.url,
                videoId: $scope.formData.selected.id.videoId
            }
            $scope.playlist.$add($scope.$parent.newPuddle);

            var redirect = "/falling/" + $scope.formData.selected.id.videoId;
            $location.path(redirect);
        }


        /**Skydiver**/
        $(document).scroll(function() {
            if (isElementInViewport($("#no-parachute"))) {
                $("#skydiver-with-plane").addClass("-without-plane");
            }

            $('.transparent').each( function(i) {

                var bottom_of_object = $(this).position().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                if (bottom_of_window > bottom_of_object) {
                    $(this).animate({'opacity': '1'}, 1000);
                }
            });
        });


        function isElementInViewport (el) {
            //special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }

            var rect = el.getBoundingClientRect();

            return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            );
        }

}]);