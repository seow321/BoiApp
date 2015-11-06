

var boiApp = angular.module('boiApp');

boiApp.controller('JobController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        
        $http.get('Views/Job/job.json')
        .success(function (data) {
            $scope.jobs = data;
        });
    });

    $scope.search = false;

    $scope.jobs = [];

    $scope.selected = null;

    $scope.select = function (agent) {
        $scope.selected = agent;
    }
});