/* BOI App */
var boiApp = angular.module("boiApp", [
    "ui.router",
    "oc.lazyLoad",
    "ngAnimate"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
boiApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);



boiApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        loading: false
    };

    $rootScope.settings = settings;

    var spinners = document.querySelectorAll('paper-spinner');
    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.settings.loading = true;
        var drawerPanel = document.querySelector('#paperDrawerPanel');
        if (drawerPanel.narrow) {
            drawerPanel.closeDrawer();
        }
    });

    // hide the spinner on rounte change success(after the content loaded)
    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.settings.loading = false;
        document.querySelector('boi-main').show();
    });

    // handle errors
    $rootScope.$on('$stateNotFound', function () {
        $rootScope.settings.loading = false;
        document.querySelector('boi-main').show();
    });

    // handle errors
    $rootScope.$on('$stateChangeError', function () {
        $rootScope.settings.loading = false;
        document.querySelector('boi-main').show();
    });

    return settings;
}]);


/* Setup App Main Controller */
//boiApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
//    $scope.$on('$viewContentLoaded', function () {

//    });
//}]);

boiApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/");

    $stateProvider

        // Default
        .state('home', {
            url: "/",
            templateUrl: "Views/Home.html",
            data: { pageTitle: 'Index' },
            controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'boiApp',
                        files: [

                            'Controllers/HomeController.js',
                            'http://echarts.baidu.com/build/dist/echarts.js'
                        ]
                    });
                }]
            }
        })

        .state('about', {
            url: "/about",
            templateUrl: "Views/About.html",
            data: { pageTitle: 'About' },
            controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'boiApp',
                        files: [

                            'Controllers/HomeController.js',
                        ]
                    });
                }]
            }
        })
     .state('Dealer-List', {
         url: "/Dealer",
         templateUrl: "Views/Admin/Index.html",
         data: { pageTitle: 'Dealer List' },
         controller: "AdminIndexController",
         resolve: {
             deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                 return $ocLazyLoad.load({
                     name: 'boiApp',
                     files: [

                         'Controllers/Admin/AdminIndexController.js',
                     ]
                 });
             }]
         }
     })

    .state('Agent-List', {
        url: "/Agent",
        templateUrl: "Views/Dealer/Index.html",
        data: { pageTitle: 'Agent List' },
        controller: "DealerController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'boiApp',
                    files: [

                        'Controllers/Dealer/DealerController.js',
                    ]
                });
            }]
        }
    })

    .state('Tests-Index', {
        url: "/Tests",
        templateUrl: "Views/Tests/Index.html",
        data: { pageTitle: 'Admin' },
        controller: "TestController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'boiApp',
                    files: [
                        "Views/Tests/TestController.js",
                    ]
                });
            }]
        }
    })

    //// Master Data - Customer Profile - home
    //.state('masterdata-customerprofile-home', {
    //    url: "/master-data/customer-profile",
    //    templateUrl: "views/settings/master_data/customer_profile/home.html",
    //    data: { pageTitle: 'Master Settings - Customer Profie - Home' },
    //    controller: "CustomerProfileController",
    //    resolve: {
    //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
    //            return $ocLazyLoad.load([{
    //                name: 'MetronicApp',
    //                files: [
    //					'css/general_home.css',
    //					'css/master_data-customer_profile.css',
    //					'js/pages/master_data-customer_profile.js',
    //					'js/controllers/CustomerProfileController.js'
    //                ]
    //            }]);
    //        }]
    //    }
    //})


    // // Error 404
    //.state("error404", {
    //    url: "/error404",
    //    templateUrl: "views/error404.html",
    //    data: { pageTitle: 'Error 404' },
    //    resolve: {
    //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
    //            return $ocLazyLoad.load([{
    //                name: 'MetronicApp',
    //                files: [
    //					'css/error404.css'
    //                ]
    //            }]);
    //        }]
    //    }
    //})

}]);

//Custom Directives that allow polymer and angular binding
boiApp.directive('bindPolymer', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        compile: function bindPolymerCompile(el, attr) {
            var attrMap = {};
            for (var prop in attr) {
                if (angular.isString(attr[prop])) {
                    var _match = attr[prop].match(/\{\{\s*([\.\w]+)\s*\}\}/);
                    if (_match) {
                        attrMap[prop] = $parse(_match[1]);
                    }
                }
            }
            return function bindPolymerLink(scope, element, attrs) {
                Object.keys(attrMap).forEach(function (key) {
                    element.on(key + '-changed', function (event) {
                        scope.$evalAsync(function () {
                            if (attrMap[key](scope) === event.detail.value) return;
                            attrMap[key].assign(scope, event.detail.value);
                        });
                    });
                });
            };
        }
    };
}]);

/* Init global settings and run the app */
boiApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);