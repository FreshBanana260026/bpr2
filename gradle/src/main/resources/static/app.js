'use strict';

angular.module('foodAssistant', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
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
      .when("/recipe", {
          templateUrl : "recipe.html",
          controller : 'RecipeCtrl',
      })
      .when("/friends", {
          templateUrl : "friends.html",
          controller : 'FriendsCtrl',
      })
      .when("/list", {
          templateUrl : "shoppingList.html",
          controller : 'ShoppingListCtrl',
      })
      .when("/profile", {
          templateUrl : "profile.html",
          controller : 'ProfileCtrl',
      })
      .otherwise({
          /*templateUrl : "login.html",
          controller : 'LoginCtrl'*/
      });
}]);
