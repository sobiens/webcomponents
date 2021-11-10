(function (angular) {
    'use strict';
    angular.module('sobyChartApp').component('sobyChart', {
        template: '<div id="{{$ctrl.chart.id}}" data-width="{{$ctrl.chart.width}}" data-height="{{$ctrl.chart.height}}">' +
            '<div ng-repeat="dataset in $ctrl.chart.datasets" class="dataset" data-title={{dataset.title}} data-data={{dataset.data}} data-type={{dataset.type}}></div>' +
            '<div class="labels" data-labels={{$ctrl.chart.labels}}></div>' +
            '</div>',
        bindings: {
            chart: '='
        }
    });
})(window.angular);
