

var boiApp = angular.module('boiApp');

boiApp.controller('DealerController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        
        $http.get('Views/Dealer/agents.json')
        .success(function (data) {
            $scope.agents = data;
        });
    });

    $scope.search = false;

    $scope.agents = [];

    $scope.selected = null;

    $scope.select = function (agent) {
        $scope.selected = agent;
    }
});