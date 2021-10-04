$(function () {
    soby_PopulateRadarChartRefreshData();
});
function soby_PopulateRadarChartRefreshData() {
    var dataSet = new soby_ChartDataset();
    dataSet.Title = "Chart1";
    dataSet.Data = [1, 10, 170, 35, 50, 200];
    var radarChart = new soby_RadarChart("#soby_ChartDiv", "Radar Chart", [dataSet], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    radarChart.Width = 600;
    radarChart.Height = 300;
    radarChart.ImagesFolderUrl = "/media/images";
    radarChart.Initialize();
}
//# sourceMappingURL=radarchart.js.map