var bookGrid = null;
$(function () {
    soby_PopulateSPDataBindingGrid();
});
function soby_PopulateSPDataBindingGrid() {
    var bookDataSourceBuilder = new soby_SPRestBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
    bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    var bookService = new soby_SharePointService(bookDataSourceBuilder);
    bookService.Transport.Read = new soby_TransportRequest("http://spsiteurl/_vti_bin/listdata.svc/Book", "json", "application/json; charset=utf-8", "GET");
    bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.IsEditable = false;
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.Initialize(true);
}
//# sourceMappingURL=spdatabinding.js.map