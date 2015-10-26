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
        spinner: {
            toggle: function () {
                var spinners = document.querySelectorAll('paper-spinner');
                Array.prototype.forEach.call(spinners, function (spinner) {
                    spinner.active = !spinner.active;
                });
            }
        }
    };

    $rootScope.settings = settings;

    var spinners = document.querySelectorAll('paper-spinner');
    $rootScope.$on('$stateChangeStart', function () {
        Array.prototype.forEach.call(spinners, function (spinner) {
            spinner.active = true;
        });
        var drawerPanel = document.querySelector('#paperDrawerPanel');
        if (drawerPanel.narrow) {
            drawerPanel.closeDrawer();
        }
    });

    // hide the spinner on rounte change success(after the content loaded)
    $rootScope.$on('$stateChangeSuccess', function () {
        Array.prototype.forEach.call(spinners, function (spinner) {
            spinner.active = false;
        });
        document.querySelector('boi-main').show();
    });

    // handle errors
    $rootScope.$on('$stateNotFound', function () {
        Array.prototype.forEach.call(spinners, function (spinner) {
            spinner.active = false;
        });
        document.querySelector('boi-main').show();
    });

    // handle errors
    $rootScope.$on('$stateChangeError', function () {
        Array.prototype.forEach.call(spinners, function (spinner) {
            spinner.active = false;
        });
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
     .state('Admin-Index', {
         url: "/Admin",
         templateUrl: "Views/Admin/Index.html",
         data: { pageTitle: 'Admin' },
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

/* Init global settings and run the app */
boiApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);