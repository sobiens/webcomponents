<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="LineChart.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyChart.LineChart" Title="Line Chart" %>

<%@ Register Src="~/Controls/SobyChartSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyChartSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Line Chart Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">

                        <div class="article" style="float: left;width: 100%;">
                        <div id='soby_CodeLanguagesTabsDiv'>
                <ul>
                    <li><a href="#tabs-1">Javascript</a></li>
                    <li><a href="#tabs-2">jQuery</a></li>
                    <li><a href="#tabs-3">VueJS</a></li>
                    <li><a href="#tabs-4">AngularJS</a></li>
                    <li><a href="#tabs-5">ReactJS</a></li>
                </ul>
                <div id="tabs-1">
                    <div class='soby_JavascriptCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Line Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.ui.components.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="soby_ChartDiv" &gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode">    var dataSet1 = new soby_ChartDataset();
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
    lineChart.SeriesPosition = SobyChartElementPosition.Top;
    lineChart.SeriesVerticalAligment = SobyChartVerticalAligment.Bottom;
    lineChart.SeriesHorizontalAligment = SobyChartHorizontalAligment.Right;
    lineChart.Initialize();
                        </div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>
                </div>
                <div id="tabs-2">
                    <div class='soby_JQueryCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Line Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.ui.components.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="soby_ChartDiv" data-width="600" data-height="300"&gt;
        &lt;div class='dataset' data-type="LineChart" data-title="Chart1" data-data="1;#10;#70;#35;#50;#100"&gt;&lt;/div&gt;
        &lt;div class='dataset' data-type="LineChart" data-title="Chart2" data-data="12;#15;#17;#71;#22;#50"&gt;&lt;/div&gt;
        &lt;div class='dataset' data-type="LineChart" data-title="Chart3" data-data="21;#51;#31;#6;#62;#24"&gt;&lt;/div&gt;
        &lt;div class='labels' data-labels="January;#February;#March;#April;#May;#June"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode">$("#soby_ChartDiv").sobychart();
                        </div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>
                </div>
                <div id="tabs-3">
                    <div class='soby_VueCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Line Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="https://cdn.jsdelivr.net/npm/vue@2" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.ui.components.min.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.extension.vue.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="soby_ChartVueDiv"&gt;
    &lt;soby-chart id="soby_ChartDiv" width="600" height="300"&gt;
        &lt;dataset type="LineChart" title="Chart1" data="1;#10;#70;#35;#50;#100"&gt;&lt;/dataset&gt;
        &lt;dataset type="LineChart" title="Chart2" data="12;#15;#17;#71;#22;#50"&gt;&lt;/dataset&gt;
        &lt;dataset type="LineChart" title="Chart3" data="21;#51;#31;#6;#62;#24"&gt;&lt;/dataset&gt;
        &lt;labels labels="January;#February;#March;#April;#May;#June"&gt;&lt;/labels&gt;
    &lt;/soby-chart&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode">var app = new Vue({ el: '#soby_ChartVueDiv' })
                        </div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>
                </div>
                <div id="tabs-4">
                                        <div class='soby_AngularCodeDiv'>
                        <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Line Chart Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.ui.components.min.js"&gt;&lt;/script&gt;
    &lt;script language="javascript"&gt;
          (function (angular) {
              'use strict';
              angular.module('sobyChartApp', []).controller('MainCtrl', function MainCtrl($scope) {
                  this.chart = {
                      id: 'sobyChartDiv_' + soby_guid(),
                      width: 400,
                      height: 200,
                      datasets: [{ type: "LineChart", title: "Chart1", data: "1;#10;#70;#35;#50;#100" }
                                 , { type: "LineChart", title: "Chart2", data: "12;#15;#17;#71;#22;#50" }
                                 , { type: "LineChart", title: "Chart3", data: "21;#51;#31;#6;#62;#24" }],
                      labels: "January;#February;#March;#April;#May;#June"
                  };

                  var chartId = this.chart.id;
                  setTimeout(function () {
                      sobyGenerateChartFromHtmlElement(chartId);
                  }, 1000);
              });
          })(window.angular);
    &lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.extension.angular.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body ng-app="sobyChartApp" &gt;
&lt;div ng-controller="MainCtrl as ctrl" &gt;
  &lt;soby-chart chart="ctrl.chart"&gt;&lt;/soby-chart&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode"></div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>



                </div>
                <div id="tabs-5">Not implemented yet</div>
                            </div>


            <script src="/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.ui.components.min.js"></script>
            <script language="javascript">
                $(function () {
                    soby_PopulateCustomizedCodeView();
                });

                function soby_PopulateCustomizedCodeView() {
                    var codeView1 = new soby_CodeView(".soby_JQueryCodeDiv", "jQuery Examples", SobyCodeViewTypes.HtmlParts);
                    codeView1.ActiveView = SobyCodeViews.Js;
                    codeView1.Initialize();

                    var codeView2 = new soby_CodeView(".soby_JavascriptCodeDiv", "javascript Examples", SobyCodeViewTypes.HtmlParts);
                    codeView2.ActiveView = SobyCodeViews.Js;
                    codeView2.Initialize();

                    var codeView3 = new soby_CodeView(".soby_VueCodeDiv", "VueJS Examples", SobyCodeViewTypes.HtmlParts);
                    codeView3.ActiveView = SobyCodeViews.Html;
                    codeView3.Initialize();

                    var codeView4 = new soby_CodeView(".soby_AngularCodeDiv", "AngularJS Examples", SobyCodeViewTypes.HtmlParts);
                    codeView4.ActiveView = SobyCodeViews.Html;
                    codeView4.Initialize();

                    var tabs = new soby_Tab("#soby_CodeLanguagesTabsDiv");
                    tabs.Initialize();
                }
            </script>

        <br />Want to learn more about the chart component? Check out the <a href="../../API Documentation/modules.html">API documentation</a>.
    </div>



        </div>
    <div class="col-md-3">
        <uc1:SobyChartSideMenuControl runat="server" ID="SobyChartSideMenuControl" />
    </div>
</asp:Content>
