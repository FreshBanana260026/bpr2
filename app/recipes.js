'use strict';

angular.module('foodAssistant')
    .controller('RecipesCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $('.filter-option').click(function () {
            $('#recipe-filter').html(this.innerHTML);
        });
        $scope.searchArray = [];

        /*async function alo () {
            const res = await fetch(SERVER_URL + `/getRecipes?email=mail@test.com`, {mode: 'cors'})
                .catch((error) => {
                    console.error('Error:', error);
                });
            const jsonRes = await res.json();
            $scope.$apply(function(){
                $scope.recipesArray = jsonRes;
            });
        }
        alo();*/
        
        $scope.getRecipes = function () {
            $http.get(SERVER_URL + `/getRecipes?email=${statusService.getEmail()}`).then(function(response) {
                $scope.recipesArray = response.data;
            });
        };
        $scope.getRecipes();

        $scope.recipeClick = function (recipe) {
            statusService.setRecipe(recipe);
            $window.location.href = "#!recipe";
        };
        
        $scope.searchRecipes = function () {
            const parameter = $('#recipe-filter').text();
            if (parameter === 'name') {
                $scope.searchArray = $scope.recipesArray.filter( rec => {
                    return !rec.recipename.localeCompare($scope.searchParameter, 'en', {sensitivity: 'base'});
                });
            } else if (parameter === 'category') {
                $scope.searchArray = $scope.recipesArray.filter( rec => {
                    return !rec.category.localeCompare($scope.searchParameter, 'en', {sensitivity: 'base'});
                });
            } else if (parameter === 'ingredient') {
                $scope.searchArray = $scope.recipesArray.filter( rec => {
                    return rec.ingredients.includes($scope.searchParameter);
                });
            }

            const htmlString = '\n' +
                '<div id="search-result">\n' +
                    '<div id="search-result-top"><b>Search Results</b></div>\n' +
                    '<ul>\n' +
                        '<li ng-repeat="recipe in searchArray" ng-click="searchResultClick(recipe)">{{recipe.recipename}}</li>\n' +
                    '</ul>\n' +
                '<div id="search-result-bottom"><button class="orange-button" ng-click="closeSearchResults()">Close</button></div>\n' +
                '</div>';
            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);
        };

        $scope.searchResultClick = function (recipe) {
            $('#search-result').remove();
            $scope.recipeClick(recipe);
        };

        $scope.closeSearchResults = function () {
            $('#search-result').fadeOut(500, function () {
                $('#search-result').remove();
            });
        }

    }]);