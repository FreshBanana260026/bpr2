'use strict';

angular.module('foodAssistant')
    .controller('HomeCtrl', ['$scope', '$window', 'statusService', function($scope, $window, statusService) {
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
        }
    }]);