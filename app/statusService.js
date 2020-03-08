angular.module('foodAssistant')
    .service('statusService', function () {
        let loggedIn = true;
        let email = '';
        let recipe = {};

        return {
            getLoggedIn: function () {
                return loggedIn;
            },
            setLoggedIn: function(value) {
                loggedIn = value;
            },
            getEmail: function () {
                return email;
            },
            setEmail: function(value) {
                email = value;
            },
            getRecipe: function () {
                return recipe;
            },
            setRecipe: function(value) {
                recipe = value;
            }
        };
    });