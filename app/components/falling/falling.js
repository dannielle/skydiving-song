
angular.module('sds.falling', [])
    .controller('fallingController', ["$scope", "$routeParams", function($scope, $routeParams){
        $scope.videoId = $routeParams.videoId;
        var url = $scope.videoId;
        var string = '<div id="bgndVideo" class="player" data-property="{videoURL:\'' + url + '\',containment:\'body\',autoPlay:true, mute:false, startAt:0, opacity:1}"></div>';
        $(".player-container").append(string);
        $(".player").YTPlayer();
        console.log("gets here")
    }]);
