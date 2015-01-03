angular.module('sds.falling', [])
    .controller('fallingController', ["$scope", "$routeParams", function($scope, $routeParams){
        $scope.videoId = $routeParams.videoId;
        var url = $scope.videoId;
        var string = '<div id="bgndVideo" class="player" data-property="{videoURL:\'' + url + '\',containment:\'body\',autoPlay:true, mute:false, startAt:0, opacity:0.5}"></div>';
        $("#player-container").append(string);
        $(".player").YTPlayer();

        //GET the list of video IDs, the names, and other information
        //make the info array
        // [{videoId: foo, name: bar, passion: baz}, {}]
        //make the video array
        var videos = [
            {videoURL:"VuaJAgx0x_4",containment:'body',autoPlay:true, mute:false, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true},
            {videoURL: "3ovA7zeviRo",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:false},
            {videoURL: "u9k1FaMIYTs",containment:'body',autoPlay:true, mute:false, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}
        ];
        //play the video array
        //jQuery("#player-container").YTPlaylist(videos, true);

        //POST to save video ID, name, and info


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