'use strict';

angular.module('foodAssistant')
    .controller('HomeCtrl', ['$scope', '$window', '$compile', 'statusService', function($scope, $window, $compile, statusService) {
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
                '                        <td><input type="text" name="nickname" ng-model="nickname"></td>\n' +
                '                    </tr>\n' +
                '                    <tr>\n' +
                '                        <td><b>Ingredients:</b></td>\n' +
                '                        <td><input type="text" name="email" ng-model="email"></td>\n' +
                '                    </tr>\n' +
                '                    <tr>\n' +
                '                        <td><b>Recipe:</b></td>\n' +
                '                        <td><textarea type="text" ng-model="recipeText" ng-blur="confirmMail()" id="recipeText"></textarea></td>\n' +
                '                    </tr>\n' +
                '                </table>\n' +
                '                <div class="bottom">\n' +
                '                    <button id="regCancel" ng-click="closeRecipeForm()"><b>Cancel</b></button>\n' +
                '                    <button id="regSubmit" ng-click=""><b>Register</b></button>\n' +
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
    }])
    .directive('topMenu', function () {
        return {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        };
    });