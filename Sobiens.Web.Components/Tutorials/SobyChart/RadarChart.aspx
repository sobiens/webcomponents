<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="RadarChart.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyChart.RadarChart" Title="Radar Chart" %>

<%@ Register Src="~/Controls/SobyChartSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyChartSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Radar Chart Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <script language="javascript">
        function sobyApplyFiltering() {
            var filterFieldName = $("#SortBySelectBox").val();
            var filterValue = $("#FilterValueTextBox").val();
            
            bookGrid.FilterResult(filterFieldName, filterValue, SobyFieldTypes.Text, SobyFilterTypes.Contains);

        }
    </script>    <div class="article col-md-9">

<%--    <p>This example demonstrates how to use filtering in the Soby Data Grid. <br />
        "AddFilterField" method takes four parameters. First one is the name of the field. Second one is filter value. Third one is type of the field. Fourth one is type of the filter. This method does not trigger data population, it just adds the filterfield which will be used on population.
        <pre class="js">bookGrid.AddFilterField("Genre", "Picaresque", SobyFieldTypes.Text, SobyFilterTypes.Equal); </pre>
    </p>
    <p>        Below functionality uses "FilterResult" method which takes four parameters. First one is the name of the field. Second one is filter value. Third one is type of the field. Fourth one is type of the filter. This method triggers the data population.
        <pre class="js">bookGrid.FilterResult("Genre", "Picaresque", SobyFieldTypes.Text, SobyFilterTypes.Equal); </pre>
</p>
    <p>Filter by 
        <select id="SortBySelectBox"><option value="Title">Title</option><option value="Year" style="display:none">Year</option><option value="Price" style="display:none">Price</option><option value="Genre">Genre</option></select>
         as contains <input type="text" id="FilterValueTextBox" />
        <input type="button" value="Apply" onclick="sobyApplyFiltering()" />
    </p>--%>

        <div class="article" style="float: left;width: 74%;">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.charts.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Chart/radarchart.js"></script>
            <div id='soby_BooksDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/WebAPI/Chart/radarchart.js" style="display:none;background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.charts.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_BooksDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>
        </div>
    <div class="col-md-3">
        <uc1:SobyChartSideMenuControl runat="server" ID="SobyChartSideMenuControl" />
    </div>
</asp:Content>
