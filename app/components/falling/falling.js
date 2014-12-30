
angular.module('sds.falling', [])
    .controller('fallingController', ["$scope", "$routeParams", function($scope, $routeParams){
        $scope.videoId = $routeParams.videoId;
        var url = $scope.videoId;
        var string = '<div id="bgndVideo" class="player" data-property="{videoURL:\'' + url + '\',containment:\'body\',autoPlay:true, mute:false, startAt:0, opacity:0.5}"></div>';
        $(".player-container").append(string);
        $(".player").YTPlayer();

        setTimeout(function() {
            $('#loading-warning').fadeOut();
            $("#skydiver-with-plane").addClass("-without-plane");
        }, 3000 );
    }]);
