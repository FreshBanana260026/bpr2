'use strict';

angular.module('foodAssistant')
    .controller('FriendsCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if (!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }

        $scope.getFriends = function () {
            $http.get(SERVER_URL + `/friends?email=${statusService.getEmail()}`).then(function(response) {
                $scope.friendsArray = response.data;
            }).then(function (e) {
                console.error(e);
            });
        };
        $scope.getFriends();

        $scope.addFriendForm = function () {
            const htmlString = '\n' +
                '<div id="friend-form">\n' +
                    '<div id="friend-form-top">New Friend\n' +
                    '</div>\n' +
                    '<div id="friend-form-middle">Enter email address:\n' +
                        '<input ng-model="recipientData">\n' +
                        '<div id="friend-form-buttons">\n' +
                            '<button id="friend-form-left-button" class="orange-button" ng-click="closeFriendForm()">Close form\n' +
                            '</button>\n' +
                            '<button id="friend-form-right-button" class="orange-button" ng-click="sendFriendRequest()">Send request\n' +
                            '</button>\n' +
                        '</div>\n' +
                    '</div>\n' +
                    '<div id="friend-form-bottom">\n' +
                    '</div>\n' +
                '</div>';
            const html = $compile(htmlString)($scope);
            angular.element(document.body).append(html);
        };

        $scope.closeFriendForm = function () {
            $('#friend-form').fadeOut(500, function () {
                $('#friend-form').remove();
            });
        };

        $scope.sendFriendRequest = function () {
            $http.post(SERVER_URL + '/notification', JSON.stringify({category: "friend request", recipient: $scope.recipientData, origin: statusService.getEmail(), content: "You have a new friend request!"})).then(function (result) {
                $scope.closeFriendForm();
            });
        }
    }]);