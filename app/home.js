'use strict';

angular.module('foodAssistant')
    .controller('HomeCtrl', ['$scope', '$window', '$compile', '$http', 'statusService', '$interval', function($scope, $window, $compile, $http, statusService, $interval) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        let dropDown = true;
        let notificationDropDown = true;
        $scope.ingredientsList = [];
        $scope.openDropDown = function() {
            if (dropDown) {
                $('.drop-down').fadeIn();
                $('#side-menu').css('background-color', '#FFB700');
                dropDown = false;
            } else {
                $('.drop-down').fadeOut();
                $('#side-menu').css('background-color', 'transparent');
                dropDown = true;
            }
        };

        $interval(function(){
            $http.get(SERVER_URL + `/notifications?email=${statusService.getEmail()}`).then(function(response) {
                $scope.notificationsArr = response.data;
            });
        }, 3000);

        $scope.logOut = function() {
            statusService.setLoggedIn(false);
            $window.location.href = "#!/";
        };

        $scope.recipeForm = function () {
            const htmlString = '\n' +
                '<div id="recipe-modal">\n' +
                '    <div class="recipe-content">\n' +
                '        <div id="reg-top"><b>Add Recipe</b></div>\n' +
                '            <form novalidate>\n' +
                '                <table>\n' +
                '                    <tr>\n' +
                '                        <td><b>Recipe name:</b></td>\n' +
                '                        <td><input type="text" name="recipename" ng-model="recipename"></td>\n' +
                '                    </tr>\n' +
                '                    <tr>\n' +
                '                        <td><b>Category:</b></td>\n' +
                '                        <td><input type="text" name="category" ng-model="category"></td>\n' +
                '                    </tr>\n' +
                '                    <tr>\n' +
                '                        <td><b>Ingredients:</b></td>\n' +
                '                        <td><button type="text" name="ingredients" ng-model="ingredients" class="add-ingredients" ng-click="ingredientsForm()"></button></td>\n' +
                '                    </tr>\n' +
                '                    <tr>\n' +
                '                        <td><b>Recipe:</b></td>\n' +
                '                        <td><textarea type="text" name="recipetext" ng-model="recipetext" id="recipeText"></textarea></td>\n' +
                '                    </tr>\n' +
                '                </table>\n' +
                '                <div class="bottom-form dark-bottom">\n' +
                '                    <button id="regCancel" ng-click="closeRecipeForm()"><b>Cancel</b></button>\n' +
                '                    <button id="regSubmit" ng-click="addNewRecipe()"><b>Submit</b></button>\n' +
                '                </div>\n' +
                '            </form>\n' +
                '    </div>\n' +
                '</div>';

            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);
        };

        $scope.ingredientsForm = function () {
            const htmlString = '\n' +
                '<div id="ingredients-form">\n' +
                    '<div id="reg-top"><b>Ingredients</b>\n' +
                    '</div>' +
                    '<div id="ingredient-content">\n' +
                        '<div id="ingredient-adder">\n' +
                            '<input id="ingredient-input" ng-model="ingredientInput">\n' +
                        '</div>' +
                        '<ul id="ingredients-list">\n' +
                            '<li ng-repeat="ing in ingredientsList track by $index"><b>{{ing}}</b> <button class="orange-button" ng-click="removeIngredient($index)">Remove</button>\n' +
                            '</li>' +
                        '</ul>' +
                        '<button id="add-new-ingredient" ng-click="addToList()">\n' +
                        '</button>' +
                    '</div>' +
                    '<div class="bottom-form dark-bottom">\n' +
                        '<button id="regCancel" ng-click="closeIngredientsForm()"><b>Cancel</b></button>\n' +
                        '<button id="regSubmit" ng-click="saveIngredients()"><b>Save</b></button>\n' +
                    '</div>\n' +
                '</div>';

            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);
        };
        
        $scope.closeRecipeForm = function () {
            $('#recipe-modal').fadeOut(500, function () {
                $('#recipe-modal').remove();
            });
        };

        $scope.closeIngredientsForm = function () {
            $('#ingredients-form').fadeOut(500, function () {
                $('#ingredients-form').remove();
            });
        };

        $scope.addToList = function () {
            $scope.ingredientsList.push($scope.ingredientInput);
            $('#ingredient-input').val('');
        };

        $scope.removeIngredient = function (position) {
            $scope.ingredientsList.splice(position, 1);
        };

        $scope.saveIngredients = function () {
            let ingredientsString = '';
            $scope.ingredientsList.forEach(ing => {
                ingredientsString += ing + ',';
            });
            $scope.ingredients = ingredientsString.slice(0, -1);
            $scope.closeIngredientsForm();
        };
        
        $scope.addNewRecipe = function () {
            const req = {
                method: 'POST',
                url: SERVER_URL + '/addNewRecipe',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({email:statusService.getEmail(), recipename:$scope.recipename, category: $scope.category, recipetext: $scope.recipetext, ingredients: $scope.ingredients})
            };

            $http(req).then(function(res){
                if (typeof $scope.getRecipes === "function") {
                    $scope.getRecipes();
                }
            }, function(e){
                console.log(e);
            });

            $('#recipe-modal').remove();
        };

        $scope.notificationMenu = function() {
            if(notificationDropDown === true) {
                $('#notifications-drop-down').show();
                notificationDropDown = false;
            } else {
                $('#notifications-drop-down').hide();
                notificationDropDown = true;
            }

        };
        
        $scope.notificationClick = function (notification) {
            
            if (document.getElementById('notification-popup')) {
                $('#notification-popup').remove();
            }

            const htmlString = '\n' +
                '<div id="notification-popup">\n' +
                    '<div id="notification-top"><b>Notification</b>\n' +
                    '</div>' +
                    '<div id="notification-middle">\n' +
                        `You have received a new ${notification.category} ` + '\n' +
                        `from the user: ${notification.origin}.<br><br>` + '\n' +
                        `Content: ${notification.content}<br><br>` + '\n' +
                        `<button class="orange-button" ng-click="confirmFriendRequest('${notification.origin}')">`+'Confirm</button>\n' +
                        `<button class="orange-button" ng-click="deleteFriendRequest('${notification.id}')">` + 'Delete</button>\n' +
                    '</div>' +
                    '<div id="notification-bottom">\n' +
                        '<button class="orange-button" ng-click="closeNotificationPopup()">Close</button>\n' +
                    '</div>' +
                '</div>';

            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);
        };
        
        $scope.closeNotificationPopup = function () {
            $('#notification-popup').fadeOut(500, function () {
                $('#notification-popup').remove();
            });
        };

        $scope.confirmFriendRequest = function (frEmail) {
            $http.post(SERVER_URL + '/friend', {useremail: statusService.getEmail(), friendemail: frEmail}).then(function(){
                $scope.closeNotificationPopup();
            }, function(e){
                console.error(e);
            });
        };

        $scope.deleteFriendRequest = function (id) {
            $http.delete(SERVER_URL + '/notifications' + '?id= ' + id).then(function(){
                $scope.closeNotificationPopup();
            }, function(e){
                console.error(e);
            });
        };
    }])
    .directive('topMenu', function () {
        return {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        };
    });