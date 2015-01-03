angular.module('sds.falling', [])
    .controller('fallingController', ["$scope", "$routeParams", function($scope, $routeParams){
        $scope.videoId = $routeParams.videoId;
        var url = $scope.videoId;
        //var string = '<div id="bgndVideo" class="player" data-property="{videoURL:\'' + url + '\',containment:\'body\',autoPlay:true, mute:false, startAt:0, opacity:0.5}"></div>';
        //$("#player-container").append(string);
        //$(".player").YTPlayer();

        $scope.puddleList = [];
        var videos = [{videoURL: url,containment:'body',autoPlay:true, mute:false, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}];

        //GET the list of video IDs, the names, and other information
        var videoArray = [];

        //iterate through the result list
        for(var i=0; i <= videoArray.length; i++) {
            if (videoArray[i] != null) {
                //make the puddle array and save it into $scope.puddleList
                // [{videoId: foo, name: bar, passion: baz}, {}]
                $scope.puddleList.push(videoArray[i]);
                //add to the videos array
                videos.push({
                    videoURL: videoArray[i]["videoId"],
                    containment: "body",
                    autoPlay: true,
                    mute: false,
                    startAt: 0,
                    opacity: 1,
                    loop: false,
                    ratio: "4/3",
                    addRaster: true
                });
            }
        }
        //end iterate

        //play the video array
        jQuery("#player-container").YTPlaylist(videos, false);

        setTimeout(function() {
            $('#loading-warning').fadeOut();
            $("#skydiver-with-plane").addClass("-without-plane");
        }, 3000 );
    }])
    .directive('puddle', [function(){
        return {
          restrict: 'E',
          controller: 'fallingController',
          scope : {
              videoId: '@videoId',
              name: '@name'
          },
          template: '<div>' +
              '<p>name: {{name}} videoId: {{videoId}}</p>' +
              '</div>'
      };
}])

;