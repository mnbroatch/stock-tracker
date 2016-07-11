"use strict;"

var app = angular.module('stockTracker', ['ui.router', 'ngCookies']);

app.constant('TOKENNAME', 'authtoken');

app.run(function(userService) {
  userService.readToken();
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('login', {
      url: '/login',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterController'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterController'
    })

    .state('tracker', {
      url: '/tracker',
      templateUrl: '/html/tracker.html',
      controller: 'trackerController',
      resolve: {
        Portfolio: function(userService) {
          return userService.getPortfolio();
        }
      }
    })

    .state('viewone', {
      url: '/viewone/{symbol}',
      templateUrl: '/html/viewone.html',
      controller: 'viewoneController',
    })

    .state('search', {
      url: '/search',
      templateUrl: '/html/search.html',
      controller: 'searchController',
    })

  $urlRouterProvider.otherwise('/');
});
