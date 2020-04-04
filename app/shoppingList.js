angular.module('foodAssistant')
    .controller('ShoppingListCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        if(!statusService.getLoggedIn()) {
            $window.location.href = "#!/";
        }
        $http.get(SERVER_URL + '/items' + '?email=' + statusService.getEmail())
            .then(function (result) {
                $scope.shoppingListArray = result.data;
        }).catch(function (e) {
            console.error(e);
        });

        $scope.deleteItem = function (position, item) {
            $http.delete(SERVER_URL + '/item' + '?id=' + item.id).then(function () {
                $scope.shoppingListArray.splice(position, 1);
            }).catch(function () {

            });
        };

        $scope.addItemToList = function () {
            const item = {email: statusService.getEmail(), ingredient: $scope.newItem, quantity: $scope.newQuantity};
            $http.post(SERVER_URL + '/item', item)
                .then(function () {
                    $scope.shoppingListArray.push(item);
                    $scope.newItem = '';
                    $scope.newQuantity = '';
                }).catch(function (e) {
                console.error(e);
            });
        };
    }]);