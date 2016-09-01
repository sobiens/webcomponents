
$(function () {
    soby_PopulateGridSorting();
});

function soby_PopulateGridSorting() {
    var bookDataSourceBuilder = new soby_WSBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
    bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    var bookService = new soby_WebServiceService(bookDataSourceBuilder);
    bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");

    var bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.IsEditable = false;
    bookGrid.ImagesFolderUrl = "/Images";
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null);

    bookGrid.Initialize(true);}

 