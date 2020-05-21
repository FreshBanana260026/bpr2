describe('RecipesCtrl', function() {
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
            controller = $controller('RecipesCtrl', { $scope: $scope, statusService: statusService});
            $scope.recipesArray = [];
            $scope.recipesArray.push({
                email: 'test@test.com',
                recipename: 'recipe1',
                category: 'healthy',
                recipetext: 'some text',
                ingredients: 'water, milk, bread',
                preparation: 10,
                cooking: 10
            });
            $scope.recipesArray.push({
                email: 'test@test.com',
                recipename: 'recipe2',
                category: 'other',
                recipetext: 'some text',
                ingredients: 'eggs, apples',
                preparation: 10,
                cooking: 10
            })
        });

        it('filter by name', function() {
            $scope.parameter = 'name';
            $scope.searchParameter = 'recipe1';
            $scope.searchRecipes();
            expect($scope.searchArray[0].recipename).toEqual('recipe1');
        });

        it('filter by category', function() {
            $scope.parameter = 'category';
            $scope.searchParameter = 'healthy';
            $scope.searchRecipes();
            expect($scope.searchArray[0].category).toEqual('healthy');
        });

        it('filter by ingredient', function() {
            $scope.parameter = 'ingredient';
            $scope.searchParameter = 'water';
            $scope.searchRecipes();
            expect($scope.searchArray[0].ingredients).toEqual('water, milk, bread');
        });
    });
});