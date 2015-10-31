

var boiApp = angular.module('boiApp');

boiApp.controller('DealerController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        
        
    });

    $scope.agents = [
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" }
    ];

    $scope.selected = null;

    $scope.select = function (agent) {
        $scope.selected = agent;
    }
});