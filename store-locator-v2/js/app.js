var storeLocator = angular.module("storeLocator", ['ui.router', 'ngCookies', 'ngDialog']);

storeLocator.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/loginView.html',
            controller: 'loginController'
        })
        .state('list', {
            url: '/list',
            templateUrl: 'views/listView.html',
            controller: 'listController'
        })
        .state('map', {
            url: '/map',
            templateUrl: 'views/mapView.html',
            controller: 'mapController'
        })
        .state('details', {
            url: '/details/:guid',
            templateUrl: 'views/detailsView.html',
            controller: 'detailsController'
        })
    ;
});

$('.carousel').carousel({
    interval: 5000 //changes the speed
});