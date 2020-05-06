'use strict';

angular.module('foodAssistant')
    .controller('RandomCtrl', ['$scope', '$window', '$http', 'statusService', function($scope, $window, $http, statusService) {

        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }

        $scope.randomCategory = '';
        $scope.randomIngredient = '';
        $scope.randomDifficulty = '';
        $scope.randomRecentRecipes = 0;
        let recipesArr = [];
        let recentArr = [];
        let firstClick = true;
        let rejectedRecipesArr = [];

        $http.get(SERVER_URL + `/getRecipes?email=${statusService.getEmail()}`)
            .then(function (result) {
                recipesArr = result.data;
            }).catch(function (e) {
            console.error(e);
        });

        $http.get(SERVER_URL + `/recentRecipes?email=${statusService.getEmail()}`)
            .then(function (result) {
                recentArr = result.data.map(recipe => recipe.recipeid);
            }).catch(function (e) {
            console.error(e);
        });

        $scope.getRandomRecipe = function () {
            const recentSliced = ($scope.randomRecentRecipes !== 0 && $scope.randomRecentRecipes <= recentArr.length) ? recentArr.slice(0, $scope.randomRecentRecipes) : [];
            $scope.recipesArray = recipesArr.filter(recipe => {
                return (!recentSliced.includes(recipe.recipeid));
            }).filter(recipe => {
                return !rejectedRecipesArr.includes(recipe.recipeid);
            });
            let resultArray = $scope.recipesArray;
            if ($scope.randomCategory !== '') {
                resultArray = resultArray.filter(recipe => {
                    return recipe.category === $scope.randomCategory;
                })
            }
            if ($scope.randomIngredient !== '') {
                resultArray.filter(recipe => {
                    return recipe.ingredients.includes($scope.randomIngredient);
                })
            }
            if ($scope.randomDifficulty !== '') {
                resultArray = resultArray.filter(recipe => {
                    recipe.ingredients.includes(((recipe.preparation + recipe.cooking) <= $scope.randomDifficulty))
                    return ((recipe.preparation + recipe.cooking) <= $scope.randomDifficulty);
                });
            }

            console.log(resultArray)
            $scope.result = resultArray[Math.floor(Math.random() * resultArray.length)];
            if (resultArray.length !== 0)  {
                rejectedRecipesArr.push($scope.result.recipeid);
            }
            statusService.setRecipe($scope.result);
        };

        $scope.openRandomRecipe = function () {
            $http.post(SERVER_URL + '/recentRecipes', {email: statusService.getEmail(), recipeid: $scope.result.recipeid})
                .then(function () {
                    $window.location.href = "#!recipe";
                }).catch(function (e) {
                console.error(e);
            });
        };
    }]);