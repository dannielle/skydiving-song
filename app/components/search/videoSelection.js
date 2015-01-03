'use strict';

angular.module('sds.search')
    .controller('videoSelectionCtrl', ["$scope", function($scope){
        $scope.isSelected = false;

        $scope.toggleSelect = function() {
            console.log("in toggleselect")
            $scope.isSelected = !$scope.isSelected;
        }

        $scope.embedUrl = "https://www.youtube.com/embed/" + $scope.videoId;
    }])

    .directive('videoSelection', [function(){
        return {
            controller: 'videoSelectionCtrl',
            restrict: 'E',
            template:
            '<span>' +
                '<img src="{{thumbnailUrl}}" />'+
            '</span>',
            scope: {
                videoId : '@video',
                thumbnailUrl : '@thumbnail'
            }
        }
    }]);