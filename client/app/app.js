var totalDb = {};
var userDb = {};
var currentUser = 'notI';
var currentUserId = 'notThisNumber';
var currentHouseId = 'notHere';

angular.module('homeHarmony', [
  'ui.router',
  'homeHarmony.auth',
  'homeHarmony.newUser',
  'homeHarmony.login',
  'homeHarmony.newHouse'
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
    .state('tasks', {
      url: "/tasks",
      templateUrl: "./app/tasks/tasks.html",
      // controller: "tasksCtrl"
    })
    .state('issues', {
      url: "/issues",
      templateUrl: "./app/issues/issues.html",
      // controller: "issuesCtrl"
    })
    .state('expenses', {
      url: "/expenses",
      templateUrl: "./app/expenses/expenses.html",
      // controller: "expensesCtrl"
    })
     // start of changes 
    .state('task', {
      url: "/task",
      templateUrl: "./app/task/task.html",
      // controller: "taskCtrl"
    })
    .state('chat', {
      url: "/chat",
      templateUrl: "./app/chat/chat.html",
      // controller: "chatCtrl"
    })
    .state('budget', {
      url: "/budget",
      templateUrl: "./app/budget/budget.html",
      // controller: "budgetCtrl"
    })
    .state('dash', {
      url: "/dash",
      templateUrl: "./app/dash/dash.html",
      // controller: "dashCtrl"
    })
    // nested views for dash
    .state('dash.default', {
      url: "/:default",
      templateUrl: "./app/dash/partials/default.html",
      // controller: "defaultCtrl"
    })
    .state('dash.newHouse', {
      url: "/:newHouse",
      templateUrl: "./app/dash/partials/newHouse.html",
      // controller: "newHouseCtrl"
    })

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/dash");
});