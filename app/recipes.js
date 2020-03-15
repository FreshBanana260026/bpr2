'use strict';

angular.module('foodAssistant')
    .controller('RecipesCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $('.filter-option').click(function () {
            $('#recipe-filter').html(this.innerHTML);
        });

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
        }
    }]);