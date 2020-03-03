'use strict';

angular.module('foodAssistant', ['ngRoute'])
    .config([/*'$locationProvider', */'$routeProvider', function(/*$locationProvider, */$routeProvider) {
//  $locationProvider.hashPrefix('!');
  $routeProvider
      .when("/", {
          templateUrl : "login.html",
          controller : 'LoginCtrl',
      })
      .when("/home", {
          templateUrl : "home.html",
          controller : 'HomeCtrl',
      })
      .when("/recipes", {
          templateUrl : "recipes.html",
          controller : 'RecipesCtrl',
      })
      .when("/random", {
          templateUrl : "random.html",
          controller : 'RandomCtrl',
      })
      .otherwise({
          /*templateUrl : "login.html",
          controller : 'LoginCtrl'*/
      });
  //$routeProvider.otherwise({redirectTo: '/view1'});
}])
    /*.controller('LoginCtrl', ['$scope', function($scope) {

  $scope.login = async function (uName) {
    const res = await fetch(SERVER_URL + `/login?userName=${uName}`, {mode: 'cors'})
        .catch((error) => {
          console.error('Error:', error);
        });
    const j = await res.json();
    console.log("Welcome " + j.userName);
  }
  
}])*/;
