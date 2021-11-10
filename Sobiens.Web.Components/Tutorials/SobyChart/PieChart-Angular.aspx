<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PieChart-Angular.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyChart.PieChartAngular" Title="Pie Chart" %>

<%@ Register Src="~/Controls/SobyChartSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyChartSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %></h1>
                <br />
                <h2>Pie Chart JQuery Example</h2>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
        <div class="article" style="float: left; width: 74%;">
            <!doctype html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
          <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
    <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
    <script src="/media/js/soby.service.js"></script>
    <script src="/media/js/soby.ui.components.js"></script>
    <script src="/media/js/soby.ui.components.charts.js"></script>
      <script language="javascript">
          (function (angular) {
              'use strict';
              angular.module('sobyChartApp', []).controller('MainCtrl', function MainCtrl($scope) {
                  this.chart = {
                      id: 'sobyChartDiv_' + soby_guid(),
                      width: 400,
                      height: 200,
                      datasets: [{ type: "PieChart", title: "Chart1", data: "14;#10;#17;#35;#50;#20" }, { type: "PieChart", title: "Chart2", data: "14;#10;#17;#35;#50;#20" }],
                      labels: "January;#February;#March;#April;#May;#June"
                  };

                  var chartId = this.chart.id;
                  setTimeout(function () {
                      sobyGenerateChartFromHtmlElement(chartId);
                  }, 1000);
              });
          })(window.angular);
      </script>
    <script src="/media/js/soby.ui.components.charts.angular.js"></script>
  </head>
<body ng-app="sobyChartApp" >
<div ng-controller="MainCtrl as ctrl" >
  <soby-chart chart="ctrl.chart"></soby-chart>
</div>
</body>
</html>



            <script src="/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/media/js/soby.ui.components.codeview.js"></script>
                                <div class='soby_AngularCodeDiv'>
                        <div class="htmlcode">&lt;!doctype html&gt;
&lt;html ng-app&gt;
&lt;head&gt;
    &lt;script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div &gt;
      &lt;label&gt;Name:&lt;/label&gt;
      &lt;input type="text" ng-model="yourName" placeholder="Enter a name here"&gt;
      &lt;hr&gt;
      &lt;h1&gt;Hello {{yourName}}!&lt;/h1&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                        <div class="csscode"></div>
                        <div class="jscode">
                        </div>
                        <div class="codedescription">This example displays all array values</div>
                        <div class="resultdescription"></div>
                    </div>
            <script language="javascript">
                $(function () {
                    soby_PopulateCustomizedCodeView();
                });

                function soby_PopulateCustomizedCodeView() {
                    var codeView1 = new soby_CodeView(".soby_AngularCodeDiv", "Angular Examples", SobyCodeViewTypes.HtmlParts);
                    codeView1.ActiveView = SobyCodeViews.Js;
                    //codeView1.Initialize();
                }
            </script>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/modules.html">API documentation</a>.
        </div>
    </div>
    <div class="col-md-3">
        <uc1:SobyChartSideMenuControl runat="server" ID="SobyChartSideMenuControl" />
    </div>
</asp:Content>
