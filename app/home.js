'use strict';

angular.module('foodAssistant')
    .controller('HomeCtrl', ['$scope', '$window', '$compile', '$http', 'statusService', '$interval', function($scope, $window, $compile, $http, statusService, $interval) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        let dropDown = true;
        let notificationDropDown = true;
        let noOfNotifications = 0;
        $scope.ingredientsList = [];
        $scope.currentNotification = {};
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

        $http.get(SERVER_URL + `/notifications?email=${statusService.getEmail()}`).then(function(response) {
            $scope.notificationsArr = response.data.reverse();
            noOfNotifications = response.data.length;
        });

        const notificationInterval = $interval(function(){
            $http.get(SERVER_URL + `/notifications?email=${statusService.getEmail()}`).then(function(response) {
                $scope.notificationsArr = response.data.reverse();
                if (noOfNotifications < response.data.length) {
                    $('#notifications-button').addClass('notification-warning');
                    noOfNotifications = response.data.length;
                }
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
                '                        <td><b>Time:</b></td>\n' +
                '                        <td><div class="time-content"><div class="time"><b>Preparation: </b><input ng-model="preparation" placeholder="minutes"></div><div class="time"><b>&nbsp;&nbsp;Cooking: </b><input ng-model="cooking" placeholder="minutes"></div></div></td>\n' +
                '                    </tr>\n' +
                '                    <tr>\n' +
                '                        <td valign="top"><b>Recipe:</b></td>\n' +
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
                data: JSON.stringify({email:statusService.getEmail(), recipename:$scope.recipename, category: $scope.category, recipetext: $scope.recipetext, ingredients: $scope.ingredients, preparation: $scope.preparation, cooking: $scope.cooking})
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
                $('#notifications-button').removeClass('notification-warning');
                notificationDropDown = true;
            }

        };
        
        $scope.notificationClick = function (notification) {
            $scope.currentNotification = notification;
            
            if (document.getElementById('notification-popup')) {
                $('.notification-popup').remove();
            }

            const htmlString = '\n' +
                '<div class="notification-popup">\n' +
                    '<div id="notification-top"><b>Notification</b>\n' +
                    '</div>' +
                    '<div id="notification-middle">\n' +
                        `You have received a new ${notification.category} ` + '\n' +
                        `from the user: ${notification.origin}.<br><br><br>` + '\n' +
                        `<span id="recipe-status">What would you like to do?</span><br><br>` + '\n' +
                        `<button class="orange-button" ng-click="confirmRequest()">`+'Confirm</button>\n' +
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
            $('.notification-popup').fadeOut(500, function () {
                $('.notification-popup').remove();
            });
        };

        $scope.confirmRequest = function () {
            const statusText = $('#recipe-status');
            statusText.text('Processing...');
            statusText.css('color', '#ffe300');
            if ($scope.currentNotification.category === 'friend request') {
                $http.post(SERVER_URL + '/friend', {useremail: statusService.getEmail(), friendemail: $scope.currentNotification.origin}).then(function(){
                    statusText.text('Confirmation was successful!');
                    statusText.css('color', '#009900');
                    $scope.closeNotificationPopup();
                    $scope.deleteFriendRequest($scope.currentNotification.id);
                }).catch(function (e) {
                    statusText.text('Error! Try again later!');
                    statusText.css('color', '#ff1f00');
                    console.error(e);
                });
            }
            else if ($scope.currentNotification.category === 'recipe') {
                $http.get(SERVER_URL + '/recipe?id=' + $scope.currentNotification.content).then(function (result) {
                    $http.post(SERVER_URL + '/addNewRecipe', JSON.stringify({email:statusService.getEmail(), recipename:result.data.recipename, category: result.data.category, recipetext: result.data.recipetext, ingredients: result.data.ingredients, preparation: result.data.preparation, cooking: result.data.cooking})).then(function () {
                        statusText.text('Confirmation was successful!');
                        statusText.css('color', '#009900');
                        $scope.closeNotificationPopup();
                        $scope.deleteFriendRequest($scope.currentNotification.id);
                    }).catch(function (e) {
                        statusText.text('Error! Try again later!');
                        statusText.css('color', '#ff1f00');
                        console.error(e);
                    })
                }).catch(function (e) {
                    statusText.text('Error! Try again later!');
                    statusText.css('color', '#ff1f00');
                    console.error(e);
                })
            }
            else {
                console.error("Unknown notification type.");
            }
        };

        $scope.deleteFriendRequest = function (id) {
            $http.delete(SERVER_URL + '/notifications' + '?id= ' + id).then(function(){
                noOfNotifications--;
                $scope.closeNotificationPopup();
            }, function(e){
                console.error(e);
            });
        };

        $scope.$on('$destroy', function closeHome() {
            $interval.cancel(notificationInterval);
        })
    }])
    .directive('topMenu', function () {
        return {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        };
    });