document.write("<div id='soby_BarChartDiv'></div>");
$(function () {
    soby_PopulateBarChartRefreshData();
});
function soby_PopulateBarChartRefreshData() {
    var dataSet1 = new soby_ChartDataset();
    dataSet1.Title = "Chart1";
    dataSet1.Data = [1, 10, 70, 35, 50, 100];
    var dataSet2 = new soby_ChartDataset();
    dataSet2.Title = "Chart2";
    dataSet2.Data = [12, 15, 17, 71, 22, 50];
    var dataSet3 = new soby_ChartDataset();
    dataSet3.Title = "Chart3";
    dataSet3.Data = [21, 51, 31, 6, 62, 24];
    var barChart = new soby_BarChart("#soby_BarChartDiv", "Bar Chart", [dataSet1, dataSet2, dataSet3], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    barChart.Width = 600;
    barChart.Height = 300;
    barChart.ImagesFolderUrl = "/media/images";
    barChart.Initialize();
}
//# sourceMappingURL=barchart.js.map