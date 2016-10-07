<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Aggregates.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.Aggregates" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Aggregates Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <script language="javascript">
        function sobyApplyAggregates() {
            var aggregateFieldName = $("#AggregateBySelectBox").val();
            var aggregateType = parseInt( $("#AggregateTypeSelectBox").val());
            
            bookGrid.AggregateBy(aggregateFieldName, aggregateType);

        }
    </script><br />
    <p>This example demonstrates how to use aggregation in the Soby Data Grid. <br />
        "AddAggregateField" method takes two parameters. First one is the name of the field. Second one is type of the aggregation. This method does not trigger data population, it just adds the orderbyfield which will be used on population.
        <pre class="js">bookGrid.AddAggregateField("Price", SobyAggregateTypes.Sum); </pre>
    </p>
    <p>        Below functionality uses "AggregateBy" method which takes two parameters. First one is the name of the field. Second one is type of the aggregation. This method triggers the data population.
        <pre class="js">bookGrid.AggregateBy("Price", SobyAggregateTypes.Sum) </pre>
</p>
    <p>Aggregate by 
        <select id="AggregateBySelectBox"><option value="Title">Title</option><option value="Year">Year</option><option value="Price">Price</option><option value="Genre">Genre</option></select>
         as 
        <select id="AggregateTypeSelectBox"><option value="0">Average</option><option value="1">Count</option><option value="2">Max</option><option value="3">Min</option><option value="4">Sum</option></select>
        <input type="button" value="Apply" onclick="sobyApplyAggregates()" />
    </p>

    <div class="article" style="float: left;width: 74%;">
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/Scripts/Tutorials/WebAPI/Grid/aggregates.js"></script>
            <div id='soby_BooksDiv'></div>
        <a href="javascript:void(0)" onclick="soby_ShowHideViewSource()">
            <img src="/Images/viewsource.png" border="0" width="20px" /> View source
        </a>
        <pre id="ViewSourceDiv" class="viewsource html" codefile="/Scripts/Tutorials/WebAPI/Grid/aggregates.js" style="display:none;background-color:ivory">
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/jquery-3.1.0.js"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/javascript"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;link</span> <span class="attr_name">href</span>=<span class="attr_value">"/media/css/soby.ui.components.css"</span> <span class="attr_name">rel</span>=<span class="attr_value">"stylesheet"</span> <span class="attr_name">type</span>=<span class="attr_value">"text/css"</span> <span class="attr_name">media</span>=<span class="attr_value">"all"</span> <span class="tag_start">/&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.service.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;script</span> <span class="attr_name">src</span>=<span class="attr_value">"/media/js/soby.ui.components.js"</span> <span class="tag_start">&gt;&lt;/script&gt;</span>
<span class="tag_start">&lt;div</span> <span class="attr_name">id</span>=<span class="attr_value">'soby_BooksDiv'</span> <span class="tag_start">&gt;&lt;/div&gt;</span>
            <div class="viewsourcecodefileoutput"></div>
        </pre>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
