<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="ExportToExcel.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.ExportToExcel" Title="DataGrid - Export to Excel Example" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Export to Excel Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
<br />
    <p>This example demonstrates how to use exporting to excel in the Soby Data Grid. <br />
        "AllowExportData" property states if export functionality is allowed or not.
        <pre class="js">bookGrid.AllowExportData = true; </pre>
    </p>
    <div class="article col-md-9">
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
                <div class="jscode">var items = [
        { ID: 16, Title: "Northanger Abbey", Year: 1817, Price: 1295, Genre: "Gothic parody", ImageUrl:"", WebSiteUrl:"", Author:{Id:1,Name:"Benjamin Disraeli"} },
        { ID: 17, Title: "David Copperfield", Year: 1850, Price: 1500, Genre: "Bildungsroman", ImageUrl:"/Images/Carousel/David Copperfield.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/David_Copperfield", Author:{Id:2,Name:"Charles Dickens"} },
        { ID: 18, Title: "Don Quixote", Year: 1617, Price: 895, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Don Quixote.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Don_Quixote", Author:{Id:3,Name:"Miguel de Cervantes"} },
        { ID: 19, Title: "Moby Dick", Year: 1851, Price: 725, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Moby Dick.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Moby-Dick", Author:{Id:4,Name:"Elizabeth Hardwick"} },
        { ID: 20, Title: "Robinson Crusoe", Year: 1719, Price: 1250, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Robinson Crusoe.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Robinson_Crusoe", Author:{Id:5,Name:"Daniel Defoe"} },
        { ID: 21, Title: "Gulliver’s Travels", Year: 1726, Price: 2150, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Gulliver’s Travels.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Gulliver%27s_Travels", Author:{Id:6,Name:"Jonathan Swift"} },
        { ID: 22, Title: "Clarissa", Year: 1748, Price: 475, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Clarissa.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Clarissa", Author:{Id:7,Name:"Samuel Richardson"} },
        { ID: 23, Title: "Tom Jones", Year: 1749, Price: 880, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Tom Jones.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Tom_Jones", Author:{Id:8,Name:"Henry Fielding"} },
        { ID: 24, Title: "Frankenstein", Year: 1818, Price: 740, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Frankenstein.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Frankenstein", Author:{Id:9,Name:"Mary Shelley"} },
        { ID: 25, Title: "Nightmare Abbey", Year: 1818, Price: 895, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Nightmare Abbey.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Nightmare_Abbey", Author:{Id:10,Name:"Thomas Love Peacock "} },
        { ID: 26, Title: "Sybil", Year: 1845, Price: 720, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Sybil.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Sybil_(novel)", Author:{Id:11,Name:"Benjamin Disraeli"} },
        { ID: 27, Title: "Jane Eyre", Year: 1847, Price: 990, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Jane Eyre.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Jane_Eyre", Author:{Id:12,Name:"Charlotte Brontë"} },
        { ID: 28, Title: "Vanity Fair", Year: 1848, Price: 500, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Vanity Fair.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Vanity_Fair_(novel)", Author:{Id:13,Name:"William Thackeray"} }
    ];


    var bookService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("Title", SobyFieldTypes.Text, null),
        new SobySchemaField("Year", SobyFieldTypes.Number, null),
        new SobySchemaField("Price", SobyFieldTypes.Number, null),
        new SobySchemaField("Genre", SobyFieldTypes.Text, null),
        new SobySchemaField("Author", SobyFieldTypes.Object, null),
        new SobySchemaField("ImageUrl", SobyFieldTypes.Text, null),
        new SobySchemaField("WebSiteUrl", SobyFieldTypes.Text, null)
    ], items);
    bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.AllowExportData = true;
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

    <div class="col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </div>
</asp:Content>
