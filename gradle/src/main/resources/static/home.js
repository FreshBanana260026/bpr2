'use strict';

angular.module('foodAssistant')
    .controller('HomeCtrl', ['$scope', '$window', '$compile', 'statusService', '$http', function($scope, $window, $compile, statusService, $http) {
        let currentSlide = 0;
        let oldSlide = 0;
        const slides = $('.slide');

        function startSlideShow() {
            $(slides[oldSlide]).fadeOut( 1000, function () {
                currentSlide++;

                if (currentSlide > slides.length) {
                    currentSlide = 1
                }
                $(slides[currentSlide-1]).fadeIn(500);
                oldSlide = currentSlide-1;
            });

            setTimeout(startSlideShow, 8000);
        }
        startSlideShow();
    }]);