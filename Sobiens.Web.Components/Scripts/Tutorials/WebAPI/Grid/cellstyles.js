$(function () {
    soby_PopulateGridCellStyles();
});
function soby_PopulateGridCellStyles() {
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
    bookGrid.ImagesFolderUrl = "/media/images";
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, "font-size:15px", null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, "font-weight:bold", null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, "background-color:red", null);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, "width:20px", null);
    bookGrid.Initialize(true);
}
