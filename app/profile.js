'use strict';

angular.module('foodAssistant')
    .controller('ProfileCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if (!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $scope.profileEmail = statusService.getEmail();

        $scope.updatePassword = function () {
            $http.put(SERVER_URL + '/password', {email: statusService.getEmail(), password: $scope.newPassword, nick: ''})
                .then(function () {
                    
                }).catch(function (e) {
                console.error(e);
            });
        }
    }]);