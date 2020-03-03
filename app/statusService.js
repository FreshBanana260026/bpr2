angular.module('foodAssistant')
    .service('statusService', function () {
        let loggedIn = true;

        return {
            getLoggedIn: function () {
                return loggedIn;
            },
            setLoggedIn: function(value) {
                loggedIn = value;
            }
        };
    });