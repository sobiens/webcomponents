document.write("<div id='soby_ColumnChartDiv'></div>");
$(function ()
{
    soby_PopulateColumnChartRefreshData();
});

function soby_PopulateColumnChartRefreshData()
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

    var columnChart = new soby_ColumnChart("#soby_ColumnChartDiv", "Column Chart", [dataSet1, dataSet2, dataSet3], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    columnChart.Width = 600;
    columnChart.Height = 300;
    columnChart.ImagesFolderUrl = "/media/images";
    columnChart.Initialize();
}

