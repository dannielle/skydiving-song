'use strict';

angular.module('sds.search')
    .controller('videoSelectionCtrl', ["$scope", function($scope){
        $scope.isSelected = false;

        $scope.toggleSelect = function() {
            console.log("in toggleselect")
            $scope.isSelected = !$scope.isSelected;
        }

        $scope.embedUrl = "http://www.youtube.com/embed/" + $scope.videoId;
    }])

    .directive('videoSelection', [function(){
        return {
            controller: 'videoSelectionCtrl',
            restrict: 'E',
            template:
            '<div>' +
            //'<div ng-click="toggleSelect()" ng-class="{selected: isSelected}">' +
                '<div>In the directive, {{videoId}}</div>' +
                '<div>In the embed url, {{embedUrl}}</div>' +

                '<iframe src="{{embedUrl | trustAsResourceUrl}}"></iframe>' +
            '</div>',
            scope: {
                videoId : '@video'
            }
        }
    }]);


angular.module('filters-module', [])
    .filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }])