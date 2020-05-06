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

        fetch(SERVER_URL + '/image?email=' + statusService.getEmail() + '&id=' + $scope.recipe.recipeid + '.jpg').then(function (response) {
            return response.blob();
        }).then(function (imageBlob) {
            const image = URL.createObjectURL(imageBlob);
            $('#recipe-image').attr('src',  image);
        }).catch(function (e) {
            console.error(e);
        });

        $scope.updateRecipe = function () {
            let button = $('#updateRecipe');
            let text = $('#recipe-text');
            let name = $('#recipe-name');
            let category = $('#recipe-category');
            let ingredientButton = $('#modifyIngredients');
            let preparation = $('#recipe-preparation');
            let cooking = $('#recipe-cooking');

            if(button.html() === 'Update recipe') {
                text.css("background-color", "white");
                text.attr('contenteditable','true');
                name.css("background-color", "white");
                name.attr('contenteditable','true');
                category.css("background-color", 'rgba(255,255,255,0.1)');
                category.attr('contenteditable','true');
                preparation.css("background-color", 'rgba(255,255,255,0.1)');
                preparation.attr('contenteditable','true');
                cooking.css("background-color", 'rgba(255,255,255,0.1)');
                cooking.attr('contenteditable','true');
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
                    data: JSON.stringify({recipeid: $scope.recipe.recipeid, email:statusService.getEmail(), recipename: name.text(), category: category.text(), recipetext: text.text(), ingredients: $scope.recipe.ingredients.toString(), preparation: preparation.text(), cooking: cooking.text()})
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
                preparation.css("background-color", "transparent");
                preparation.attr('contenteditable','false');
                cooking.css("background-color", "transparent");
                cooking.attr('contenteditable','false');
                ingredientButton.hide();
                button.html('Update recipe');
            }
        };
        
        $scope.addToShoppingList = function (ingredient, event) {
            const htmlString = '\n' +
                '<div id="quantity-input">\n' +
                    'Quantity: <input type="text" id="add-item-input" ng-model="itemQuantity" ng-init="0">\n' +
                    `<button id="addItemButton" class="orange-button" ng-click="addItem('${ingredient}')">` + 'Add</button>\n' +
                '</div>';

            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);

            $('#quantity-input').css({ top: event.clientY, left: event.clientX });
            const inputField = $('#add-item-input');
            inputField.focus();
            inputField.focusout(function (e) {
                if (e.relatedTarget === null || e.relatedTarget.id !== 'addItemButton') {
                    $('#quantity-input').remove();
                }
            });
        };

        $scope.addItem = function (ing) {
            $http.post(SERVER_URL + '/item', {email: statusService.getEmail(), ingredient: ing, quantity: $scope.itemQuantity})
                .then(function (result) {
                    $('#add-item-input').val('');
                    $scope.itemQuantity = '';
                    $('#quantity-input').fadeOut(500, function () {
                        $('#quantity-input').remove();
                    });
            }).catch(function (e) {
                console.error(e);
            });
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
            $http.delete(SERVER_URL + '/recipe' + '?id=' + $scope.recipe.recipeid + '&email=' + statusService.getEmail()).then(function(){
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
        };
        
        $scope.shareRecipe = function () {

            $http.get(SERVER_URL + `/friends?email=${statusService.getEmail()}`).then(function(response) {
                const friendsArray = response.data.map(friend => friend.friendEmail);
                $("#friend-autocomplete").autocomplete({
                    source: friendsArray
                });
            }).catch(function (e) {
                console.error(e);
            });

            $('.notification-popup').show();

            /*const htmlString = '\n' +
                '<div id="notification-popup">\n' +
                '<div id="notification-top"><b>Share Recipe</b>\n' +
                '</div>' +
                '<div id="notification-middle">\n' +
                'Select your friend: <input id="friend-autocomplete">\n' +
                '</div>' +
                '<div id="notification-bottom">\n' +
                '<button class="orange-button" ng-click="closeNotificationPopup()">Close</button>\n' +
                '</div>' +
                '</div>';

            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);*/

            /*$("#friend-autocomplete").autocomplete({
                source: $scope.friendsArray
            });*/
        };

        $scope.sendRecipe = function () {
            const status = $('#recipe-share-status');
            status.show();
            $http.post(SERVER_URL + '/notification', JSON.stringify({category: "recipe", recipient: $scope.shareAddress, origin: statusService.getEmail(), content: $scope.recipe.recipeid}))
                .then(function (result) {
                    status.text('Recipe successfully sent!');
                    status.css('color', '#009900');
            });
        };

        $scope.closeShareRecipe = function () {
            $('.notification-popup').hide();
        }
    }]);