$(function () {
    soby_PopulatePieChartRefreshData();
});
function soby_PopulatePieChartRefreshData() {
    var dataSet = new soby_ChartDataset();
    dataSet.Title = "Chart1";
    dataSet.Data = [14, 10, 17, 35, 50, 20];
    var pieChart = new soby_PieChart("#soby_ChartDiv", "Pie Chart", [dataSet], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    pieChart.Width = 600;
    pieChart.Height = 300;
    pieChart.ImagesFolderUrl = "/media/images";
    pieChart.Initialize();
}
//# sourceMappingURL=piechart.js.map