angular.module('foodAssistant')
    .service('notificationService', ['$scope', '$http', 'statusService', function ($scope, $http, statusService) {

        let notificationsArray = [];

        $interval(function(){
            $http.get(SERVER_URL + `/notifications?email=${statusService.getEmail()}`).then(function(response) {
                notificationsArray = response.data;
            });
        }, 5000);

        return {
            getNotificationArray: function () {
                return notificationsArray;
            }
        };
    }]);