describe('TopMenuCtrl', function() {
    beforeEach(function () {
        window.module('foodAssistant');
    });

    let $controller, $rootScope, statusService;

    beforeEach(inject(function(_$controller_, _$rootScope_, _statusService_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        statusService= _statusService_;
    }));

    describe('should', function() {
        let $scope, controller;

        beforeEach(function() {
            $scope = $rootScope.$new();
            controller = $controller('TopMenuCtrl', { $scope: $scope, statusService: statusService});
        });

        it('drop down menu', function() {
            $scope.openDropDown();
            expect(controller.dropDown).toEqual(false);
        });

        it('closes drop down menu', function() {
            $scope.openDropDown();
            $scope.openDropDown();
            expect(controller.dropDown).toEqual(true);
        });

        it('add ingredient to list', function() {
            $scope.ingredientInput = 'water';
            $scope.addToList();
            expect($scope.ingredientsList).toEqual(['water']);
        });

        it('remove ingredient from the list', function() {
            $scope.ingredientsList = ['water', 'milk', 'flour'];
            $scope.removeIngredient(1);
            expect($scope.ingredientsList).toEqual(['water', 'flour']);
        });

        it('save ingredients from the list', function() {
            $scope.ingredientsList = ['water', 'milk', 'flour'];
            $scope.saveIngredients();
            expect($scope.ingredients).toContain('water');
        });

        it('log out the user', function() {
            $scope.logOut();
            expect(statusService.getLoggedIn()).toBe(false);
        });
    });
});