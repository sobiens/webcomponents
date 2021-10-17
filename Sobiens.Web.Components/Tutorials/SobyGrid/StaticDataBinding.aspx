<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="StaticDataBinding.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.StaticDataBinding" Title="DataGrid - Static DataBinding Example" %>


<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Static DataBinding Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
            <p>This example demonstrates how to bind static data into the Soby Data Grid. <br />
        "soby_StaticDataService" class takes json data as parameter. You will also need to define the properties with "SobySchemaField" class. You can check the following code;
</p>

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
    &lt;div id='soby_CustomersDiv'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">    var items = [
        { ID: 1, FirstName: "Serkant", LastName: "Samurkas", Age: 37, Sex: "M" },
        { ID: 2, FirstName: "Dexter", LastName: "McKenzie", Age: 39, Sex: "M" },
        { ID: 3, FirstName: "Tricia", LastName: "Cooper", Age: 31, Sex: "F" },
        { ID: 4, FirstName: "Debra", LastName: "Drinian", Age: 39, Sex: "F" },
        { ID: 5, FirstName: "Alex", LastName: "Long", Age: 24, Sex: "M" },
        { ID: 6, FirstName: "Michele", LastName: "Kane", Age: 26, Sex: "F" }
    ];

    var customerService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("FirstName", SobyFieldTypes.Text, null),
        new SobySchemaField("LastName", SobyFieldTypes.Text, null),
        new SobySchemaField("Age", SobyFieldTypes.Number, null),
        new SobySchemaField("Sex", SobyFieldTypes.Text, null)
    ], items);
    var customerGrid = new soby_WebGrid("#soby_CustomersDiv", "Customers", customerService, "There is no record found.");
    customerGrid.IsEditable = false;
    customerGrid.IsSelectable = false;
    customerGrid.AddKeyField("ID", "ID");
    customerGrid.AddColumn("FirstName", "FirstName", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddColumn("LastName", "LastName", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddColumn("Age", "Age", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.Initialize(true);

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

    <div class="col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" id="SobyGridSideMenuControl" />
    </div>
</asp:Content>
