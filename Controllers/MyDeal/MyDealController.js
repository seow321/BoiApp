

var boiApp = angular.module('boiApp');

boiApp.controller('MyDealController', function ($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        
        $http.get('Views/MyDeal/my-deal.json')
        .success(function (data) {
            $scope.myDeals = data;
        });
    });

    $scope.search = false;

    $scope.myDeals = [];

    $scope.selected = null;

    $scope.select = function (agent) {
        $scope.selected = agent;
    }
});