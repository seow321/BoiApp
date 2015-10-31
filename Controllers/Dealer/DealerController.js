

var boiApp = angular.module('boiApp');

boiApp.controller('AdminIndexController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        
        
    });

    $scope.person = [
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" },
        { name: "Kek Sim" }, { name: "Xiang" }
    ];

    $scope.selected = null;

    $scope.select = function (person) {
        $scope.selected = person;
    }
});