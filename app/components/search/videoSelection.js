'use strict';

angular.module('sds.search')
    .controller('videoSelectionCtrl', ["$scope", function($scope){
        $scope.isSelected = false;

        $scope.toggleSelect = function() {
            $scope.isSelected = !$scope.isSelected;
        }
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