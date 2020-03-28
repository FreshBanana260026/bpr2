'use strict';

angular.module('foodAssistant')
    .controller('ProfileCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if (!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $scope.profileEmail = statusService.getEmail();
        $scope.newNickname = statusService.getNick();

        $scope.updateProfile = function () {
            $http.put(SERVER_URL + '/profile', {email: statusService.getEmail(), password: $scope.newPassword, nick: $scope.newNickname})
                .then(function () {
                    
                }).catch(function (e) {
                console.error(e);
            });
        }
    }]);