var mayaNotes = angular.module('mayaNotes', ['ui.router', 'pouchdb', 'angularMoment', 'textAngular']);

mayaNotes.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home'); //quando apri l'app che stato visualizzo? Di solito punta alla home

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/homeView.html',
            controller: 'homeController' //ogni controller gestisce la propria view, ognuno la sua
        })
        .state('details', {
            url: '/details/:id', //possibilità di passare parametri
            templateUrl: 'pages/detailsView.html',
            controller: 'detailsController'
        })
        .state('edit', {
            url: '/edit/:id',
            templateUrl: 'pages/editView.html',
            controller: 'editController'
        })

        .state('insert', {
            url: '/insert/',
            templateUrl: 'pages/insertView.html',
            controller: 'insertController'
        })

        .state('delete', {
            url: '/delete/:id',
            templateUrl: 'pages/deleteView.html',
            controller: 'deleteController'
        })
    ;
});