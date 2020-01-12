'use strict';

angular.module('foodAssistant')
    .controller('LoginCtrl', ['$scope', function($scope) {
        $scope.login = async function (uName) {
        const res = await fetch(SERVER_URL + `/login?userName=${uName}`, {mode: 'cors'})
        .catch((error) => {
          console.error('Error:', error);
        });
        const j = await res.json();
        console.log("Welcome " + j.userName);
    }
}]);