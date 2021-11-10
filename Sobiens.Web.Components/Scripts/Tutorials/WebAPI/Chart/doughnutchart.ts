$(function ()
{
    soby_PopulateDoughnutChartRefreshData();
});

function soby_PopulateDoughnutChartRefreshData()
{
    var dataSet = new soby_ChartDataset();
    dataSet.Title = "Chart1";
    dataSet.Data = [14, 10, 17, 35, 50, 20];

    var pieChart = new soby_DoughnutChart("#soby_ChartDiv", "Doughnut Chart", [dataSet], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
    pieChart.Width = 600;
    pieChart.Height = 300;
    pieChart.Initialize();
}

