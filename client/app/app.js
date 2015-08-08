angular.module('homeHarmony', [
  'ui.router',
  'homeHarmony.newUser',
  'homeHarmony.login'
]).config(function($stateProvider, $urlRouterProvider) {
  // Set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "./app/auth/login.html",
      controller: 'LoginCtrl',
      controllerAs: 'login',
      //Firebase authentication - resolve - before go to this route
      //we require authentication
      // resolve: {
      //   'currentUser' : ["Auth", function(Auth) {
      //     return Auth.$requireAuth(); //a promise
      //   }]
      // }
    })
    .state('newUser', {
      url: "/newUser",
      templateUrl: "./app/auth/newUser.html",
      controller: 'NewUserCtrl',
      controllerAs: 'newUser'
    })/*
    .run(function ($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
        if (error === 'AUTH_REQUIRED') {
          $state.go('login');
        }
      });
    })
     */
     // start of changes 
    .state('dash', {
      url: "/dash",
      templateUrl: "app/dash/dash.html",
      // controller: "dashCtrl"
    })
    // nested views for dash
    .state('dash.default', {
      url: "/:default",
      templateUrl: "app/dash/partials/default.html",
      // controller: "defaultCtrl"
    })
    .state('dash.newHouse', {
      url: "/:newHouse",
      templateUrl: "app/dash/partials/newHouse.html",
      // controller: "newHouseCtrl"
    })

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/dash");
});
