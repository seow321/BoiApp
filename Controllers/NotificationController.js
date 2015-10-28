'use strict';

var boiApp = angular.module('boiApp');

boiApp.controller('NotificationController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        
    });

    $scope.notificationList = [
        { title: "New Deal", details: "Agent 3344 made a deal with Client 5566." },
        { title: "New Deal", details: "Agent 3344 made a deal with Client 5566." },
        { title: "New Deal", details: "Agent 3344 made a deal with Client 5566." },
        { title: "New Deal", details: "Agent 3344 made a deal with Client 5566." },
        { title: "New Deal", details: "Agent 3344 made a deal with Client 5566." },
    ];
});