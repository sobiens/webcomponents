document.write("<div id='soby_PolarAreaChartDiv'></div>");
$(function ()
{
    soby_PopulatePolarAreaChartRefreshData();
});

function soby_PopulatePolarAreaChartRefreshData()
{
    var dataSet = new soby_ChartDataset();
    dataSet.Title = "Chart1";
    dataSet.Data = [19, 10, 17, 35, 25, 20];

    var polarAreaChart = new soby_PolarAreaChart("#soby_PolarAreaChartDiv", "Polar Area Chart", [dataSet], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    polarAreaChart.Width = 600;
    polarAreaChart.Height = 300;
    polarAreaChart.ImagesFolderUrl = "/media/images";
    polarAreaChart.Initialize();
}

