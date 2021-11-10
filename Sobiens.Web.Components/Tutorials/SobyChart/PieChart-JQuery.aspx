<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PieChart-JQuery.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyChart.PieChartJQuery" Title="Pie Chart" %>

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
        <div class="article" style="float: left;width: 74%;">
            <script src="/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.ui.components.min.js"></script>

                        <div class='soby_CodeDiv'>
                <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Web DataGrid Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.ui.components.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="soby_ChartDiv" data-width="600" data-height="300"&gt;
        &lt;div class='dataset' data-type="PieChart" data-title="Chart1" data-data="14;#10;#17;#35;#50;#20"&gt;&lt;/div&gt;
        &lt;div class='labels' data-labels="January;#February;#March;#April;#May;#June"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">    
        $("#soby_ChartDiv").sobychart();
</div><div class="codedescription">This example displays all array values</div><div class="resultdescription"></div></div>
<script language="javascript">
    $(function () {
        soby_PopulateCustomizedCodeView();
    });

    function soby_PopulateCustomizedCodeView() {
        var codeView = new soby_CodeView(".soby_CodeDiv", "Examples", SobyCodeViewTypes.HtmlParts);
        codeView.ActiveView = SobyCodeViews.Js;
        codeView.Initialize();
    }
</script>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/modules.html">API documentation</a>.
    </div>
        </div>
    <div class="col-md-3">
        <uc1:SobyChartSideMenuControl runat="server" ID="SobyChartSideMenuControl" />
    </div>
</asp:Content>
