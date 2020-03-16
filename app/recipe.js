'use strict';

angular.module('foodAssistant')
    .controller('RecipeCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $scope.recipe = statusService.getRecipe();
        if($scope.recipe.ingredients) {
            $scope.recipe.ingredients = $scope.recipe.ingredients.split(',');
        }

        
        $scope.updateRecipe = function () {
            let button = $('#updateRecipe');
            let text = $('#recipe-text');
            let name = $('#recipe-name');
            let category = $('#recipe-category');
            let ingredientButton = $('#modifyIngredients');
            if(button.html() === 'Update recipe') {
                text.css("background-color", "white");
                text.attr('contenteditable','true');
                name.css("background-color", "white");
                name.attr('contenteditable','true');
                category.css("background-color", 'rgba(255,255,255,0.1)');
                category.attr('contenteditable','true');
                ingredientButton.show();
                button.html('Send');
            } else {
                const request = {
                    method: 'PUT',
                    url: SERVER_URL + '/updateRecipe',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({recipeid: $scope.recipe.recipeid, email:statusService.getEmail(), recipename: name.text(), category: category.text(), recipetext: text.text(), ingredients: $scope.recipe.ingredients.toString()})
                };
                $http(request).then(function(){

                }, function(e){
                    console.error(e);
                });
                text.css("background-color", "transparent");
                text.attr('contenteditable','false');
                name.css("background-color", "transparent");
                name.attr('contenteditable','false');
                category.css("background-color", "transparent");
                category.attr('contenteditable','false');
                ingredientButton.hide();
                button.html('Update recipe');
            }
        };
        
        $scope.addToShoppingList = function (ingredient) {
            console.log(ingredient);
        };

        $scope.deleteRecipe = function () {
/*            const request = {
                mode: 'cors',
                method: 'DELETE',
                url: SERVER_URL + '/recipe',
                headers: {
                    'Content-Type': 'text/plain',
                },
                data: JSON.stringify($scope.recipe.recipeid)
            };*/
            $http.delete(SERVER_URL + '/recipe' + '?id= ' + $scope.recipe.recipeid).then(function(){
                $window.location.href = "#!recipes";
            }, function(e){
                console.error(e);
            });
        };

        $scope.modifyIngredientsForm = function () {
            const htmlString = '\n' +
                '<div id="ingredients-form">\n' +
                    '<div id="reg-top">\n' +
                        '<b>Ingredients</b>\n' +
                    '</div>' +
                    '<div id="ingredient-content">\n' +
                        '<div id="ingredient-adder">\n' +
                            '<input id="ingredient-input" ng-model="newIngredientInput">\n' +
                        '</div>' +
                        '<ul id="ingredients-list">\n' +
                            '<li ng-repeat="ing in recipe.ingredients track by $index">\n' +
                                '<b>{{ing}}</b> \n' +
                                '<button class="orange-button" ng-click="removeIng($index)">Remove</button>\n' +
                            '</li>' +
                        '</ul>' +
                        '<button id="add-new-ingredient" ng-click="addToIngredients()"></button>' +
                    '</div>' +
                    '<div class="bottom-form dark-bottom">\n' +
                        '<button id="regCancel" ng-click="closeIngredientsForm()"><b>Cancel</b></button>\n' +
                        '<button id="regSubmit" ng-click="saveIngredientsChanges()"><b>Save</b></button>\n' +
                    '</div>\n' +
                '</div>';

            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);
        };

        $scope.addToIngredients = function () {
            $scope.recipe.ingredients.push($scope.newIngredientInput);
            $('#ingredient-input').val('');
        };
        
        $scope.saveIngredientsChanges = function () {
            $('#ingredients-form').fadeOut(500, function () {
                $('#ingredients-form').remove();
            });
        };

        $scope.removeIng = function (index) {
            $scope.recipe.ingredients.splice(index, 1);
        }
    }]);