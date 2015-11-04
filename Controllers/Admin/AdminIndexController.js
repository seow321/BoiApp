

var boiApp = angular.module('boiApp');

boiApp.controller('AdminIndexController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components

        $http.get('Views/Admin/dealer.json')
        .success(function (data) {
            $scope.dealers = data;
        });
        
    });

    $scope.dealers = [];

    $scope.search = false;

    $scope.selected = null;

    $scope.select = function (dealer) {
        $scope.selected = dealer;
    }
});