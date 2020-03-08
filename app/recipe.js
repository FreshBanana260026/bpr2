'use strict';

angular.module('foodAssistant')
    .controller('RecipeCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        $scope.recipe = statusService.getRecipe();
    }]);