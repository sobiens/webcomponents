<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Custom Edit Form.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.CustomEditForm" Title="Grid" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Custom Edit Form Example</h2>
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
        <pre class="js">grid.ActionPaneButtons.Add("CustomActionAdd", "new", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-add", true, function (grid) {
                ShowAddEditDataItemForm();
            }, function (grid) {
                return grid.GetSelectedRowIDs().length === 0 ? true : false;
            });</pre>
                Following code will open a edit record form for the selected row.
        <pre class="js">grid.ActionPaneButtons.Add("CustomActionEdit", "edit", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-edit", true, function (grid) {
        ShowAddEditDataItemForm();
    }, function (grid) {
        return grid.GetSelectedRowIDs().length === 1 ? true : false;
    });</pre>
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
    &lt;div class="classic" id="EditForm" style="display: none;"&gt;
	    &lt;table&gt;
		    &lt;tr&gt;
			    &lt;td&gt;Title&lt;/td&gt;
			    &lt;td &gt;&lt;input type="textbox" id="TitleTextBox" class="sobytextbox"&gt;&lt;/td&gt;
		    &lt;/tr&gt;
		    &lt;tr&gt;
			    &lt;td&gt;Year&lt;/td&gt;
			    &lt;td&gt;&lt;input id="YearTextBox" type="textbox" class="sobytextbox"&gt;&lt;/td&gt;
		    &lt;/tr&gt;
		    &lt;tr&gt;
			    &lt;td&gt;Price&lt;/td&gt;
			    &lt;td&gt;&lt;input id="PriceTextBox" type="textbox" class="sobytextbox"&gt;&lt;/td&gt;
		    &lt;/tr&gt;
		    &lt;tr&gt;
			    &lt;td&gt;Genre&lt;/td&gt;
			    &lt;td&gt;&lt;input id="GenreTextBox" type="textbox" class="sobytextbox"&gt;&lt;/td&gt;
		    &lt;/tr&gt;
		    &lt;tr&gt;
			    &lt;td&gt;Author&lt;/td&gt;
			    &lt;td&gt;&lt;select class="sobylookupselectbox" id="AuthorSelectBox" onchange="soby_EditControls['soby_grid_a5043c0f-1825-dfcb-fcf2-f1f70379823b_fieldeditcell_AuthorId'].ValueChanged()"&gt;&lt;option itemindex="0" class="listitem" value="1"&gt;Jane Austen&lt;/option&gt;&lt;option itemindex="1" class="listitem" value="2"&gt;Charles Dickens&lt;/option&gt;&lt;option itemindex="2" class="listitem" value="3"&gt;Miguel de Cervantes&lt;/option&gt;&lt;option itemindex="3" class="listitem" value="4"&gt;Elizabeth Hardwick&lt;/option&gt;&lt;option itemindex="4" class="listitem" value="5"&gt;Daniel Defoe&lt;/option&gt;&lt;option itemindex="5" class="listitem" value="6"&gt;Jonathan Swift&lt;/option&gt;&lt;option itemindex="6" class="listitem" value="7"&gt;Samuel Richardson&lt;/option&gt;&lt;option itemindex="7" class="listitem" value="8"&gt;Henry Fielding&lt;/option&gt;&lt;option itemindex="8" class="listitem" value="9"&gt;Mary Shelley&lt;/option&gt;&lt;option itemindex="9" class="listitem" value="10"&gt;Thomas Love Peacock &lt;/option&gt;&lt;option itemindex="10" class="listitem" value="11"&gt;Benjamin Disraeli&lt;/option&gt;&lt;option itemindex="11" class="listitem" value="12"&gt;Charlotte Brontë&lt;/option&gt;&lt;option itemindex="12" class="listitem" value="13"&gt;William Thackeray&lt;/option&gt;&lt;/select&gt;&lt;/td&gt;
		    &lt;/tr&gt;
	    &lt;/table&gt;
	    &lt;p align="right"&gt;
		    &lt;input type="button" value="Save" onclick="javascript:AddEditDataItem()"&gt;
		    &lt;input type="button" value="Cancel" onclick="javascript:CancelAddEditDataItemForm()"&gt;
	    &lt;/p&gt;
    &lt;/div&gt;
    &lt;div id='soby_EventDescriptionDiv'&gt;&lt;/div&gt;
    &lt;br /&gt;
    &lt;div id='soby_BooksDiv'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">var items = [
        { Id: 16, Title: "Northanger Abbey", Year: 1817, Price: 1295, Genre: "Gothic parody", ImageUrl:"", WebSiteUrl:"", Author:{Id:1,Name:"Jane Austen"} },
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
        ShowAddEditDataItemForm();
    }, function (grid) {
        return grid.GetSelectedRowIDs().length === 0 ? true : false;
    });
    bookGrid.ActionPaneButtons.Add("CustomActionEdit", "edit", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-edit", true, function (grid) {
        ShowAddEditDataItemForm();
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
    
    var editeditem = null;
    function ShowAddEditDataItemForm(){
      var dataItems = bookGrid.GetSelectedDataItems();
      if(dataItems.length == 0){
        editeditem =null;
      }
      else {
        editeditem = dataItems[0];

        $("#TitleTextBox").val(editeditem.Title);
        $("#YearTextBox").val(editeditem.Year);
        $("#PriceTextBox").val(editeditem.Price);
        $("#GenreTextBox").val(editeditem.Genre);
        $("#AuthorSelectBox option[value='" + editeditem.Author.Id + "']").prop("selected", true);
      }

      $("#soby_BooksDiv").slideUp( "slow", function() {
          $("#EditForm").slideDown( "slow", function() {
          });
      });
    }
    function CancelAddEditDataItemForm(){
      $("#EditForm").slideUp( "slow", function() {
          $("#soby_BooksDiv").slideDown( "slow", function() {
          });
      });
    }
    function AddEditDataItem(){
        var dataItem = {
                        Id: editeditem != null?editeditem.Id:GenerateNewId()
                        , Title: $("#TitleTextBox").val()
                        , Year:  $("#YearTextBox").val()
                        , Price:  $("#PriceTextBox").val()
                        , Genre:  $("#GenreTextBox").val()
                        , ImageUrl:""
                        , WebSiteUrl:""
                        , Author: {
                                    Id:$("#AuthorSelectBox option:selected").val(),
                                    Name:$("#AuthorSelectBox option:selected").text()
                                  }
                      };

        if(editeditem != null)
            bookGrid.UpdateRecord(["Id"], [{Id:dataItem.Id}], dataItem);
        else
            bookGrid.AddNewRecord(dataItem);

      $("#EditForm").slideUp( "slow", function() {
          $("#soby_BooksDiv").slideDown( "slow", function() {
          });
      });
    }

    function GenerateNewId(){
        var maxId = 0;
        for(var i=0;i&lt;bookGrid.Items.length;i++){
            if(bookGrid.Items[i].Id&gt;maxId)
                maxId=bookGrid.Items[i].Id;
        }

        return (maxId+1);
    }
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
