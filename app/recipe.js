'use strict';

angular.module('foodAssistant')
    .controller('RecipeCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        $scope.recipe = statusService.getRecipe();
        $scope.recipe.ingredients = $scope.recipe.ingredients.split(',');
        
        $scope.updateRecipe = function () {
            let button = $('#updateRecipe');
            let text = $('#recipe-text');
            if(button.html() === 'Update recipe') {
                text.css("background-color", "white");
                text.attr('contenteditable','true');
                button.html('Send');
            } else {/*
                const request = {
                    method: 'POST',
                    url: SERVER_URL + '/updateRecipe',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({email:statusService.getEmail(), recipename:$scope.recipename, category: $scope.category, recipetext: text.innerHTML})
                };
                $http(request).then(function(){

                }, function(e){
                    console.log(e);
                });*/
                text.css("background-color", "transparent");
                text.attr('contenteditable','false');
                button.html('Update recipe');
            }
        };
        
        $scope.addToShoppingList = function (ingredient) {
            console.log(ingredient);
        }
    }]);