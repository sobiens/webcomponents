<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="RefreshData.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.RefreshData" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Filtering Example</h2>
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

    <p>This example demonstrates how to use refresh button in the Soby Data Grid. <br />
        "ShowRefreshButton" property states whether refresh button should be visible or not.
        <pre class="js">bookGrid.ShowRefreshButton = true; </pre>
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
    &lt;div id='soby_BooksDiv'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">    var bookDataSourceBuilder = new soby_WSBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
    bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
    var bookService = new soby_WebServiceService(bookDataSourceBuilder);
    bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
    bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
    bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");
    bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.ShowRefreshButton = true;
    bookGrid.AddKeyField("Id", "Id");
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("AuthorId", "Author", SobyShowFieldsOn.All, function (item) {
        return item.Author.Name;
    }, null, true, true, true, null, null, null);
    bookGrid.Initialize(true);
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
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </div>
</asp:Content>
