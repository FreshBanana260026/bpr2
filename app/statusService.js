angular.module('foodAssistant')
    .service('statusService', ['$http', function ($http) {
        let loggedIn = false;
        let email = '';
        let nick = '';
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
            },
            getNick: function () {
                return nick;
            },
            setNick: function() {
                $http.get('http://localhost:8080/nick?email=mail@test.com').then(function (result) {
                    nick = result.data.nick;
                }).catch(function (e) {
                    console.error(e)
                });
            }
        };
    }]);


