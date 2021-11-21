$(function () {
    $.fn.sobychart = function () {
        return sobyGenerateChartFromHtmlElement(this.attr("id"));
    };

    $.fn.sobymenu = function () {
        return sobyGenerateMenuFromHtmlElement(this.attr("id"));
    };
});