<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Getting Started.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyRangeSelection.GettingStarted" Title="Range Selection - Getting Started" %>

<%@ Register Src="~/Controls/SobyRangeSelectionSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyRangeSelectionSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Sorting Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <script language="javascript">
        function sobyApplySorting() {
            var sortFieldName = $("#SortBySelectBox").val();
            var isAsc = true;
            if ($("#DescendingRadioButton:checked").length > 0)
                isAsc = false;
            bookGrid.SortResult(sortFieldName, isAsc);

        }
    </script>    <div class="article col-md-9">
    <p>This example demonstrates how to use sorting in the Soby Data Grid. <br />
        "AddOrderByField" method takes two parameters. First one is the name of the field. Second one is a boolean value to state whether it should be sorted as ascending or descending. This method does not trigger data population, it just adds the orderbyfield which will be used on population.
        <pre class="js">bookGrid.AddOrderByField("Title", true); </pre>
    </p>
    <p>        Below functionality uses "SortResult" method which takes two parameters. First one is the name of the field. Second one is a boolean value to state whether it should be sorted as ascending or descending. This method triggers the data population.
        <pre class="js">bookGrid.SortResult("Title", true); </pre>
</p>
        <div class="article" style="float: left;width: 100%;">
            <script src="/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/media/js/soby.ui.components.codeview.js"></script>
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
    &lt;script src="/media/js/soby.service.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id='soby_SaleRangeSelectionDiv'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">var rangeSelection = new soby_RangeSelection("#soby_SaleRangeSelectionDiv", "Sale range selection", SobyRangeSelectionViewTypes.NumericRange, "400", "200", 0, 100, 1, 10, [23,37]);
    rangeSelection.Initialize();
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
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>
        </div>
        <div class="col-md-3">

        <uc1:SobyRangeSelectionSideMenuControl runat="server" ID="SobyRangeSelectionSideMenuControl" />
    </div>
</asp:Content>
