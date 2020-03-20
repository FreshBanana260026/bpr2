angular.module('foodAssistant')
    .controller('ShoppingListCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $http.get(SERVER_URL + '/items' + '?email=' + statusService.getEmail())
            .then(function (result) {
                $scope.shoppingListArray = result.data;
                console.log($scope.shoppingListArray)
        }).catch(function (e) {
            console.error(e);
        });

        $scope.deleteItem = function (position, item) {
            $http.delete(SERVER_URL + '/item' + '?id=' + item.id).then(function () {
                $scope.shoppingListArray.splice(position, 1);
            }).catch(function () {

            });
        }
    }]);