angular.module('sds.falling', [])
    .controller('fallingController', ["$scope", "$routeParams", "$animate", "$firebase", function($scope, $routeParams, $animate, $firebase){
        $scope.videoId = $routeParams.videoId;
        $scope.player = jQuery("#player-container");
        var videoArray = [];
        var url = $scope.videoId;
        $scope.puddleList = [];
        var puddleListOnce = false;

        //Called once after data is get. AngularJS acts weird if this assignment is included in the loaded() function.

        var videos = [{videoURL: url,containment:'body',autoPlay:true, mute:false, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}];

        //GET the list of video IDs, the names, and other information

        var ref = new Firebase("https://noparachute.firebaseio.com/playlist");

        //Add a callback to our firebase to retrieve new songs added.
        ref.on('child_added', function(childSnapshot, prevChildName) {
            console.log("child added");
            $scope.puddleList = $firebase(ref).$asArray();
            videoArray = $scope.puddleList;
            $scope.$apply();
        });

        //GET MESSAGES AS AN ARRAY
        //$scope.playlist = $firebase(ref).$asArray();

        videoArray = $firebase(ref).$asArray();
        videoArray.$loaded( function(x){createVideosPlay(x)}, function(error) { console.log("Error: ", error); });


        function createVideos(puddleList) {
            //x === list; // true

            console.log("x");
            console.log(puddleList);
            //console.log("videoArray");
            //console.log(videoArray);

            var videos = [];
            //iterate through the result list
            for(var i=0; i <= puddleList.length; i++) {
                if (puddleList[i] != null) {
                    //make the puddle array and save it into $scope.puddleList
                    // [{videoId: foo, name: bar, passion: baz}, {}]
                    //$scope.puddleList.push(videoArray[i]);
                    //add to the videos array
                    videos.push({
                        videoURL: puddleList[i]["videoId"],
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
            return videos;
        }

        function createVideosPlay(puddlelist) {
            var videos = createVideos(puddlelist);
            console.log("videos -createVideosPlay()");
            console.log(videos);
            $scope.player.YTPlaylist(videos, false);
            puddleListOnce = true;
        }

        //Sets puddleList after data is recieved
        var puddleSet = setInterval(function() {

            if (puddleListOnce) {
                console.log("puddleListOnce");
                console.log(puddleListOnce);
                videoArray.forEach(function(puddle) {
                    $scope.puddleList.add(puddle);
                    $scope.$apply();
                })

                //$scope.player.YTPlaylist(videos, false);
                $scope.$apply();
                puddleListOnce = false;
                console.log("puddleList");
                console.log($scope.puddleList);
                console.log("videoPlayer");
                console.log($scope.player);
                clearInterval(puddleSet);
            }
        }, 50);

        setTimeout(function() {
            $('#loading-warning').fadeOut();
            $("#skydiver-with-plane").addClass("-without-plane");
        }, 3000 );

        $scope.playNext = function(){
            $scope.player.playNext();
        }
        $scope.playPrevious = function(){
            $scope.player.playPrev();
        }
        $scope.playSelectedSong = function(puddle){
            console.log("playSelectedSong()");
            console.log(puddle.videoId);
            $scope.player.changeMovie(
            {
                videoURL: puddle.videoId,
                    containment: "body",
                autoPlay: true,
                mute: false,
                startAt: 0,
                opacity: 1,
                loop: false,
                ratio: "4/3",
                addRaster: true
            }
            );
           // $scope.player.
        }

        $scope.player.on("YTPEnd",function(e){
            var currentTime = e.time;
            $scope.player.getVideoData().videos = createVideos($scope.puddleList);
            $scope.player.YTPlaylist(videos, false);
            //$scope.player.playIndex($scope.player.getVideoData().videoCounter)
            //jQuery.shuffle(videos);
        });


        $scope.player.on("YTPTime",function(e){
            var currentTime = e.time;
            //console.log("duration");
            //console.log($scope.player);
            if(currentTime > 0) {
                if (!jQuery("#skydiver").hasClass("falling")) {
                    jQuery("#skydiver").addClass("falling");
                    jQuery("#skydiver").css({transition : 'top ' + $scope.player.getVideoData().duration + 's ease'});
                    jQuery("#skydiver").css({top: '900px'});
                }
            }
        });
        var count = 0;
        var time = 0;
        var skydiverDrift = setInterval(function() {
            var leftVal = jQuery("#skydiver").css('left');
            time += (new Date().getMilliseconds() - time);
            count = 10 * Math.sin(((time/(100/36)) * (Math.PI / 180)));
            var sum = leftVal + count;
            jQuery("#skydiver").css({left: count})
        }, 10);
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
    }]).filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });