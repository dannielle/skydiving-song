angular.module('sds.falling', [])
    .controller('fallingController', ["$scope", "$routeParams", "$animate", "$firebase", function($scope, $routeParams, $animate, $firebase){
        $scope.videoId = $routeParams.videoId;
        $scope.player = jQuery("#player-container");
        $scope.puddleList = [];
        var videoArray = [];
        var url = $scope.videoId;
        var puddleListOnce = false;
        var videos = [{videoURL: url,containment:'body',autoPlay:true, mute:false, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}];

        //GET the list of video IDs, the names, and other information
        var ref = new Firebase("https://noparachute.firebaseio.com/playlist");

        //Add a callback to our firebase to retrieve the new list when a new song is added to the database.
        //ref.on('child_added', function(childSnapshot, prevChildName) {
        //    console.log("child added");
        //    console.log($scope.puddleList);
        //    //$scope.puddleList = $firebase(ref).$asArray();
        //    //$scope.puddleList.push(childSnapshot.val());
        //    //$scope.player.setVideos(createVideos($scope.puddleList));
        //    //console.log($scope.player);
        //    //videoArray = $scope.puddleList;
        //    $scope.$apply();
        //});

        //Get videos as an array and wrap it in a AngularFire object to create three way sync.
        //When the initial data is loaded we call function(x) {{createVideosPlay(x)} to create generate a video list for the YTPlayer
        //videoArray = $firebase(ref).$asArray();
        //videoArray.$loaded( function(x){createVideosPlay(x)}, function(error) { console.log("Error: ", error); });
        $scope.puddleList = $firebase(ref).$asArray();
        $scope.puddleList.$loaded( function(x){createVideosPlay(x)}, function(error) { console.log("Error: ", error); });

        //Every time a song ends, set a new videos list in the YTPlayer given the puddleList from firebase database.
        $scope.player.on("YTPEnd",function(e){
            var currentTime = e.time;
            console.log("firebase update");
            $scope.updateVideos();
            //$scope.player.getVideoData().videos = createVideos($scope.puddleList);
            //$scope.player.setVideos(createVideos($scope.puddleList));
            //$scope.player.YTPlaylist(videos, false); //videos.reverse()?
            //$scope.player.playIndex($scope.player.getVideoData().videoCounter)
            //jQuery.shuffle(videos);
        });
        $scope.updateVideos = function() {
            //$scope.player.getVideoData().videos = createVideos($scope.puddleList);
            console.log("update videos list");
            console.log($scope.player.getVideos());
            $scope.player.setVideos(createVideos($scope.puddleList));
            console.log($scope.player.getVideos());
        }

        //Experimenting with animations that coincide with video duration etc..
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

        //Creates a video list for the YTPlayer given the list of users/videos from firebase database
        function createVideos(puddleList) {
            console.log("puddleList");
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

        //Used once to create the YTPlayer after initial data load.
        function createVideosPlay(puddlelist) {
            var videos = createVideos(puddlelist);
            console.log("videos -createVideosPlay()");
            console.log(videos);
            $scope.player.YTPlaylist(videos, false, function(){}, videos.length-1);
            $scope.player.setVideosIndex($scope.player.getVideos().length-1);
            console.log("videos YTPlaylist)");
            console.log($scope.player);
            puddleListOnce = true;
        }

        //YTPlayer Controls
        $scope.playNext = function(){
            $scope.updateVideos();
            $scope.player.playPrev();
        }
        $scope.playPrevious = function(){
            $scope.updateVideos();
            $scope.player.playNext();
        }
        $scope.playSelectedSong = function(puddle, index){
            console.log("playSelectedSong()");
            console.log(puddle.videoId);
            $scope.player.setVideosIndex(index);
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

        //Experimenting with skydiver animations..
        setTimeout(function() {
            $('#loading-warning').fadeOut();
            $("#skydiver-with-plane").addClass("-without-plane");
        }, 3000 );

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
    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });

//Called once after data is get. AngularJS acts weird if this assignment is included in the loaded() function.
//Sets puddleList after data is recieved
//var puddleSet = setInterval(function() {
//
//    if (puddleListOnce) {
//        console.log("puddleListOnce");
//        console.log(puddleListOnce);
//        videoArray.forEach(function(puddle) {
//            //$scope.puddleList.add(puddle);
//            //$scope.$apply();
//        })
//
//        //$scope.player.YTPlaylist(videos, false);
//        $scope.$apply();
//        puddleListOnce = false;
//        console.log("puddleList");
//        console.log($scope.puddleList);
//        console.log("videoPlayer");
//        console.log($scope.player);
//        clearInterval(puddleSet);
//    }
//}, 50);