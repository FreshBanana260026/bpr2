angular.module('foodAssistant')
    .service('statusService', function () {
        let loggedIn = false;

        return {
            getLoggedIn: function () {
                return loggedIn;
            },
            setLoggedIn: function(value) {
                loggedIn = value;
            }
        };
    });