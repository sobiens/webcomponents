document.write("<div id='soby_BooksDiv'></div>");
$(function () {
    soby_PopulateGridRefreshData();
});
function soby_PopulateGridRefreshData() {
    var bookDataSourceBuilder = new soby_WSBuilder();
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
    bookGrid.ActionPaneButtons.Add("CustomAction", "new", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-add", true, function (grid) {
        grid.EditNewRow();
    }, function (grid) {
        return grid.GetSelectedRowIDs().length === 0 ? true : false;
    });
    bookGrid.ActionPaneButtons.Add("CustomAction", "edit", 0, "/media/images/formatmap16x16.png?rev=43", "soby-list-edit", true, function (grid) {
        grid.EditSelectedRow();
    }, function (grid) {
        return grid.GetSelectedRowIDs().length === 1 ? true : false;
    });
    bookGrid.Initialize(true);
}
//# sourceMappingURL=editing.js.map