document.write("<div id='soby_PieChartDiv'></div>");
$(function () {
    soby_PopulatePieChartRefreshData();
});
function soby_PopulatePieChartRefreshData() {
    var dataSet = new soby_ChartDataset();
    dataSet.Title = "Chart1";
    dataSet.Data = [1, 10, 170, 35, 50, 200];
    var pieChart = new soby_PieChart("#soby_PieChartDiv", "Pie Chart", dataSet, "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    pieChart.Width = 600;
    pieChart.Height = 300;
    pieChart.ImagesFolderUrl = "/media/images";
    pieChart.Initialize();
}
//# sourceMappingURL=doughnutandpiecharts.js.map