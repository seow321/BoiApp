'use strict';

var boiApp = angular.module('boiApp');

boiApp.controller('TestController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        
    });
    
    $scope.model = [
        { name: "Victor", phone: "0143427201" },
        { name: "Victor", phone: "0143427202" },
        { name: "Victor", phone: "0143427203" },
        { name: "Victor", phone: "0143427204" }
    ];

    $scope.doAlert = function () {
        console.log($scope.model);
    };
});