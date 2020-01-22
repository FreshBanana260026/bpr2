'use strict';

angular.module('foodAssistant')
    .controller('LoginCtrl', ['$scope', '$window', 'statusService', function($scope, $window, statusService) {
        $scope.login2 = async function (uName) {
        const res = await fetch(SERVER_URL + `/login?userName=${uName}`, {mode: 'cors'})
        .catch((error) => {
          console.error('Error:', error);
        });
        const j = await res.json();
        console.log("Welcome " + j.userName);
        };

        $scope.openRegForm = function () {
            $('.modal-bg').fadeIn(500);
        };

        $scope.closeRegForm = function () {
            $('.modal-bg').fadeOut(500);
        };

        $scope.register = async function () {
            if ($scope.confirmEmail === $scope.email ) {
                const res = await fetch(SERVER_URL + '/register', {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email:$scope.email, password:$scope.password, nick:$scope.nickname})
                });
                const content = await res.json();
                console.log(content);
            } else {
                console.log('not matching info')
            }

        };

        $scope.login = async function () {
            const res = await fetch(SERVER_URL + '/login', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:$scope.emailLogin, password:$scope.passwordLogin})
            });
            const result = await res.json();
            if (result) {
                statusService.setLoggedIn(true);
                $window.location.href = "#!home";
            }
        };

        $scope.confirmMail = function () {
            if ($scope.confirmEmail === $scope.email) {
                $('#confirmEmail').css('background-color', '#cfffb8');
            } else {
                $('#confirmEmail').css('background-color', '#ffa692');
            }
        };

        $scope.confirmPass = function () {
            if ($scope.confirmPassword === $scope.password) {
                $('#confirmPassword').css('background-color', '#cfffb8');
            } else {
                $('#confirmPassword').css('background-color', '#ffa692');
            }
        };
    }]);