<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Editing.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.Editing" Title="DataGrid - Editing Example" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Editing Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div>
            <p>This example demonstrates how to use editing in the Soby Data Grid. <br />
                "IsEditable" property allows/disallows editing on the DataGrid. Pressing "F2" will open an edit form for the selected row.
        The DataGrid limits the number of records displayed on the pages. This feature improves the performance on both client side (number of records rendered) and server side (if paging enabled api is in used on the datagrid).
        <pre class="js">bookGrid.IsEditable = true; </pre>
                Following code will open a new record form.
        <pre class="js">grid.EditNewRow(); </pre>
                Following code will open a edit record form for the selected row.
        <pre class="js">grid.EditSelectedRow();</pre>
        The following events can be used to send changes to another system via calling an API or taking necessary actions
        <pre class="js">
        bookGrid.OnItemAdded = function(dataItem){
            $("#soby_EventDescriptionDiv").html("&lt;strong&gt;Event:&lt;/strong&gt;" + dataItem["Title"] + " has been added");
        }
        bookGrid.OnItemUpdated = function(rowId, dataItem){
            $("#soby_EventDescriptionDiv").html("&lt;strong&gt;Event:&lt;/strong&gt;" + dataItem["Title"] + " has been updated");
        }
        bookGrid.OnItemsDeleted = function(dataItems){
            var deletedItemTitles = "";
            for(var i=0;i&lt;dataItems.length;i++){
                deletedItemTitles += dataItems[i]["Title"] + "; ";
            }
        
            $("#soby_EventDescriptionDiv").html("&lt;strong&gt;Event:&lt;/strong&gt;" + deletedItemTitles + " has been deleted");
        }
        </pre>
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
    &lt;div id='soby_EventDescriptionDiv'&gt;&lt;/div&gt;
    &lt;br /&gt;
    &lt;div id='soby_BooksDiv'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">var items = [
        { Id: 16, Title: "Northanger Abbey", Year: 1817, Price: 1295, Genre: "Gothic parody", ImageUrl:"", WebSiteUrl:"", Author:{Id:1,Name:"Benjamin Disraeli"} },
        { Id: 17, Title: "David Copperfield", Year: 1850, Price: 1500, Genre: "Bildungsroman", ImageUrl:"/Images/Carousel/David Copperfield.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/David_Copperfield", Author:{Id:2,Name:"Charles Dickens"} },
        { Id: 18, Title: "Don Quixote", Year: 1617, Price: 895, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Don Quixote.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Don_Quixote", Author:{Id:3,Name:"Miguel de Cervantes"} },
        { Id: 19, Title: "Moby Dick", Year: 1851, Price: 725, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Moby Dick.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Moby-Dick", Author:{Id:4,Name:"Elizabeth Hardwick"} },
        { Id: 20, Title: "Robinson Crusoe", Year: 1719, Price: 1250, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Robinson Crusoe.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Robinson_Crusoe", Author:{Id:5,Name:"Daniel Defoe"} },
        { Id: 21, Title: "Gulliver’s Travels", Year: 1726, Price: 2150, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Gulliver’s Travels.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Gulliver%27s_Travels", Author:{Id:6,Name:"Jonathan Swift"} },
        { Id: 22, Title: "Clarissa", Year: 1748, Price: 475, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Clarissa.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Clarissa", Author:{Id:7,Name:"Samuel Richardson"} },
        { Id: 23, Title: "Tom Jones", Year: 1749, Price: 880, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Tom Jones.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Tom_Jones", Author:{Id:8,Name:"Henry Fielding"} },
        { Id: 24, Title: "Frankenstein", Year: 1818, Price: 740, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Frankenstein.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Frankenstein", Author:{Id:9,Name:"Mary Shelley"} },
        { Id: 25, Title: "Nightmare Abbey", Year: 1818, Price: 895, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Nightmare Abbey.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Nightmare_Abbey", Author:{Id:10,Name:"Thomas Love Peacock "} },
        { Id: 26, Title: "Sybil", Year: 1845, Price: 720, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Sybil.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Sybil_(novel)", Author:{Id:11,Name:"Benjamin Disraeli"} },
        { Id: 27, Title: "Jane Eyre", Year: 1847, Price: 990, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Jane Eyre.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Jane_Eyre", Author:{Id:12,Name:"Charlotte Brontë"} },
        { Id: 28, Title: "Vanity Fair", Year: 1848, Price: 500, Genre: "Picaresque", ImageUrl:"/Images/Carousel/Vanity Fair.jpg", WebSiteUrl:"https://en.wikipedia.org/wiki/Vanity_Fair_(novel)", Author:{Id:13,Name:"William Thackeray"} }
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
        new SobySchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", Items:authors }),
        new SobySchemaField("ImageUrl", SobyFieldTypes.Text, null),
        new SobySchemaField("WebSiteUrl", SobyFieldTypes.Text, null)
    ], items);

    var bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.AddKeyField("Id", "Id");
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("AuthorId", "Author", SobyShowFieldsOn.All, function (item) {
        return item.Author.Name;
    }, null, true, true, true, null, null, null);
    bookGrid.IsEditable = true;
    bookGrid.ActionPaneButtons.Add("CustomActionAdd", "new", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-add", true, function (grid) {
        grid.EditNewRow();
    }, function (grid) {
        return grid.GetSelectedRowIDs().length === 0 ? true : false;
    });
    bookGrid.ActionPaneButtons.Add("CustomActionEdit", "edit", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-edit", true, function (grid) {
                    grid.EditSelectedRow();
    }, function (grid) {
        return grid.GetSelectedRowIDs().length === 1 ? true : false;
    });
    bookGrid.ActionPaneButtons.Add("CustomActionDelete", "delete", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-delete", true, function (grid) {
                    grid.DeleteSelectedRows();
    }, function (grid) {
        return grid.GetSelectedRowIDs().length &gt; 0 ? true : false;
    });
    bookGrid.OnItemAdded = function(dataItem){
        $("#soby_EventDescriptionDiv").html("&lt;strong&gt;Event:&lt;/strong&gt;" + dataItem["Title"] + " has been added");
    }
    bookGrid.OnItemUpdated = function(rowId, dataItem){
        $("#soby_EventDescriptionDiv").html("&lt;strong&gt;Event:&lt;/strong&gt;" + dataItem["Title"] + " has been updated");
    }
    bookGrid.OnItemsDeleted = function(dataItems){
        var deletedItemTitles = "";
        for(var i=0;i&lt;dataItems.length;i++){
            deletedItemTitles += dataItems[i]["Title"] + "; ";
        }
        
        $("#soby_EventDescriptionDiv").html("&lt;strong&gt;Event:&lt;/strong&gt;" + deletedItemTitles + " has been deleted");
    }
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
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/modules.html">API documentation</a>.
    </div>


</asp:Content>
