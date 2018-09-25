
document.write("<div id='soby_BooksDiv'></div>");
$(function ()
{
    soby_PopulateDataRepeaterCustomFormatRefreshData();
});

function soby_PopulateDataRepeaterCustomFormatRefreshData()
{
    var bookDataSourceBuilder = new soby_WSBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
    bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
    bookDataSourceBuilder.RowLimit = 9;

    var bookService = new soby_WebServiceService(bookDataSourceBuilder);
    bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
    bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
    bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");

    var bookGrid = new soby_DataRepeater("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.ShowHeader = false;
    bookGrid.MaxCellCount = 3;
    bookGrid.ImagesFolderUrl = "/media/images";
    bookGrid.AddKeyField("Id");
    bookGrid.TableTagName = "div";
    bookGrid.TBodyTagName = "ul";
    bookGrid.RowTagName = "div";
    bookGrid.CellTagName = "li";
//    bookGrid.AddGroupByField("Genre", true);
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("AuthorId", "Author", SobyShowFieldsOn.All, function (item)
    {
        return item.Author.Name;
    }, null, true, true, true, null, null, null);
    bookGrid.ItemDataBound = function (cellId, dataItem)
    {
        return "<strong>" + dataItem.Title + "</strong><br>" + dataItem.Genre + "<br>" + dataItem.Year + " by " + dataItem.Author.Name;
    };

    bookGrid.Initialize(true);
}


 