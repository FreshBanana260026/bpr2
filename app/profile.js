'use strict';

angular.module('foodAssistant')
    .controller('ProfileCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if (!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $scope.profileEmail = statusService.getEmail();
    }]);