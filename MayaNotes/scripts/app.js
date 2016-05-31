var mayaNotes = angular.module('mayaNotes', ['ui.router', 'pouchdb', 'angularMoment', 'truncate', 'ngTagsInput', 'angularUUID2']);

// AMAZON AWS UPLOAD
AWS.config.region="eu-west-1";
AWS.config.update({
        accessKeyId: 'AKIAJWVPLIL77277XEZQ', secretAccessKey: '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'
});

$(document).ready(function(){
    $(".navbar-toggle").click(function(){
        if ($(".sidebar-offcanvas").hasClass("active")) {
            $(".sidebar-offcanvas").removeClass("active");
        } else {
            $(".sidebar-offcanvas").addClass("active");
        }});
});
$(document).ready(function(){
    $(".content, li, .sidebar-offcanvas").click(function(){
        $(".sidebar-offcanvas").removeClass("active");
    });
});

mayaNotes.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/homeView.html',
            controller: 'homeController'
        })
        .state('details', {
            url: '/details/:id/:rev',
            templateUrl: 'pages/detailsView.html',
            controller: 'detailsController'
        })
        .state('edit', {
            url: '/edit/:id/:rev',
            templateUrl: 'pages/editView.html',
            controller: 'editController'
        })

        .state('insert', {
            url: '/insert/',
            templateUrl: 'pages/insertView.html',
            controller: 'insertController'
        })

        .state('contacts', {
            url: '/contacts/',
            templateUrl: 'pages/contactsView.html',
            controller: 'contactsController'
        });
    
});