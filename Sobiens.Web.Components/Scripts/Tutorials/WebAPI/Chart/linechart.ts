$(function ()
{
    soby_PopulateLineChartRefreshData();
});

function soby_PopulateLineChartRefreshData()
{
    var dataSet1 = new soby_ChartDataset();
    dataSet1.Title = "Chart1";
    dataSet1.Data = [1, 10, 70, 35, 50, 100];

    var dataSet2 = new soby_ChartDataset();
    dataSet2.Title = "Chart2";
    dataSet2.Data = [12, 15, 17, 71, 22, 50];

    var dataSet3 = new soby_ChartDataset();
    dataSet3.Title = "Chart3";
    dataSet3.Data = [21, 51, 31, 6, 62, 24];

    var lineChart = new soby_LineChart("#soby_ChartDiv", "Line Chart", [dataSet1, dataSet2, dataSet3], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    lineChart.Width = 600;
    lineChart.Height = 300;
    lineChart.ImagesFolderUrl = "/media/images";
    lineChart.Initialize();
}

