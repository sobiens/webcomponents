<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="NestedGrids.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.NestedGrids" Title="DataGrid - Nested Grids Example" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Nested Grids Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div>
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
    &lt;div id='soby_AuthorsDiv'&gt;&lt;/div&gt;
    &lt;div id='soby_BooksDiv'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">var items = [
        { ID: 16, Title: "Northanger Abbey", Year: 1817, Price: 1295, Genre: "Gothic parody", ImageUrl:"", WebSiteUrl:"", AuthorId:1 },
        { ID: 17, Title: "David Copperfield", Year: 1850, Price: 1500, Genre: "Bildungsroman", ImageUrl:"/Images/Carousel/David Copperfield.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/David_Copperfield", AuthorId:2 },
        { ID: 18, Title: "Don Quixote", Year: 1617, Price: 895, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Don Quixote.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Don_Quixote", AuthorId:3 },
        { ID: 19, Title: "Moby Dick", Year: 1851, Price: 725, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Moby Dick.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Moby-Dick", AuthorId:4 },
        { ID: 20, Title: "Robinson Crusoe", Year: 1719, Price: 1250, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Robinson Crusoe.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Robinson_Crusoe", AuthorId:5},
        { ID: 21, Title: "Gulliver’s Travels", Year: 1726, Price: 2150, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Gulliver’s Travels.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Gulliver%27s_Travels", AuthorId:6 },
        { ID: 22, Title: "Clarissa", Year: 1748, Price: 475, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Clarissa.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Clarissa", AuthorId:7 },
        { ID: 23, Title: "Tom Jones", Year: 1749, Price: 880, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Tom Jones.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Tom_Jones", AuthorId:8},
        { ID: 24, Title: "Frankenstein", Year: 1818, Price: 740, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Frankenstein.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Frankenstein", AuthorId:9 },
        { ID: 25, Title: "Nightmare Abbey", Year: 1818, Price: 895, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Nightmare Abbey.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Nightmare_Abbey", AuthorId:10},
        { ID: 26, Title: "Sybil", Year: 1845, Price: 720, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Sybil.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Sybil_(novel)", AuthorId:11 },
        { ID: 27, Title: "Jane Eyre", Year: 1847, Price: 990, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Jane Eyre.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Jane_Eyre", AuthorId:12},
        { ID: 28, Title: "Vanity Fair", Year: 1848, Price: 500, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Vanity Fair.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Vanity_Fair_(novel)", AuthorId:13 }
    ];

    var authors = [
                    {Id:1, Name:"Jane Austen"},
                    {Id:2, Name:"Charles Dickens"},
                    {Id:3, Name:"Miguel de Cervantes"},
                    {Id:4, Name:"Elizabeth Hardwick"},
                    {Id:5, Name:"Daniel Defoe"},
                    {Id:6, Name:"Jonathan Swift"},
                    {Id:7, Name:"Samuel Richardson"},
                    {Id:8, Name:"Henry Fielding"},
                    {Id:9, Name:"Mary Shelley"},
                    {Id:10, Name:"Thomas Love Peacock "},
                    {Id:11, Name:"Benjamin Disraeli"},
                    {Id:12, Name:"Charlotte Brontë"},
                    {Id:13, Name:"William Thackeray"}
                  ];
                    
    var bookService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("Title", SobyFieldTypes.Text, null),
        new SobySchemaField("Year", SobyFieldTypes.Number, null),
        new SobySchemaField("Price", SobyFieldTypes.Number, null),
        new SobySchemaField("Genre", SobyFieldTypes.Text, null),
        new SobySchemaField("AuthorId", SobyFieldTypes.Number),
        new SobySchemaField("ImageUrl", SobyFieldTypes.Text, null),
        new SobySchemaField("WebSiteUrl", SobyFieldTypes.Text, null)
    ], items);

    var authorService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("Name", SobyFieldTypes.Text, null)
    ], authors);


    var authorGrid = new soby_WebGrid("#soby_AuthorsDiv", "Authors", authorService, "There is no record found.");
    authorGrid.AddColumn("Name", "Name", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    authorGrid.IsSelectable = true;
    authorGrid.IsEditable = false;

    authorGrid.OnRowSelected = function (grid, rowID) {
        var authorBooksGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
        authorBooksGrid.DisplayTitle = false;
        authorBooksGrid.IsSelectable = false;
        authorBooksGrid.IsEditable = false;
        authorBooksGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        authorBooksGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        authorBooksGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        authorBooksGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        authorBooksGrid.Initialize(false);
        var selectedDataItems = grid.GetSelectedDataItems();
        var authorIds = new Array();
        for (var i = 0; i < selectedDataItems.length; i++) {
            authorIds[authorIds.length] = selectedDataItems[i]["Id"];
        }
        authorBooksGrid.FilterResultWithMultipleValues("AuthorId", authorIds, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
    };

    authorGrid.Initialize(true);

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


</asp:Content>
