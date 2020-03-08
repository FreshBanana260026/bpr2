'use strict';

angular.module('foodAssistant')
    .controller('HomeCtrl', ['$scope', '$window', '$compile', '$http', 'statusService', function($scope, $window, $compile, $http, statusService) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        let dropDown = true;
        $scope.openDropDown = function() {
            if (dropDown) {
                $('.drop-down').fadeIn();
                dropDown = false;
            } else {
                $('.drop-down').fadeOut();
                dropDown = true;
            }
        };

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
                '                        <td><b>Recipe:</b></td>\n' +
                '                        <td><textarea type="text" name="recipetext" ng-model="recipetext" id="recipeText"></textarea></td>\n' +
                '                    </tr>\n' +
                '                </table>\n' +
                '                <div class="bottom">\n' +
                '                    <button id="regCancel" ng-click="closeRecipeForm()"><b>Cancel</b></button>\n' +
                '                    <button id="regSubmit" ng-click="addNewRecipe()"><b>Submit</b></button>\n' +
                '                </div>\n' +
                '            </form>\n' +
                '    </div>\n' +
                '</div>';

            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);
        };
        
        $scope.closeRecipeForm = function () {
            $('#recipe-modal').fadeOut(500, function () {
                $('#recipe-modal').remove();
            });
        };
        
        $scope.addNewRecipe = function () {
            const req = {
                method: 'POST',
                url: SERVER_URL + '/addNewRecipe',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({email:statusService.getEmail(), recipename:$scope.recipename, category: $scope.category, recipetext: $scope.recipetext})
            };

            $http(req).then(function(res){
                if (typeof $scope.getRecipes === "function") {
                    $scope.getRecipes();
                }
            }, function(e){
                console.log(e);
            });

            $('#recipe-modal').remove();
        }
    }])
    .directive('topMenu', function () {
        return {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        };
    });