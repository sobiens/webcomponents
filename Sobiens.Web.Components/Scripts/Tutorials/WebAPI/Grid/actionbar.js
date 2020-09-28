var bookGrid = null;
document.write("<div id='soby_BooksDiv'></div>");
$(function () {
    soby_PopulateGridActionBar();
});
function soby_PopulateGridActionBar() {
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
    bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.ImagesFolderUrl = "/media/images";
    bookGrid.AddKeyField("Id", "Id");
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("AuthorId", "Author", SobyShowFieldsOn.All, function (item) {
        return item.Author.Name;
    }, null, true, true, true, null, null, null);
    bookGrid.ActionPaneButtons.Add("CustomAction", "show selected items", 0, bookGrid.ImagesFolderUrl + "/formatmap16x16.png?rev=43", "soby-list-warning", true, function (grid) {
        var text = "Selected items: ";
        var selectedItems = grid.GetSelectedDataItems();
        for (var i = 0; i < selectedItems.length; i++) {
            text += selectedItems[i].Title + ",";
        }
        alert(text);
    }, function (grid) {
        return grid.GetSelectedRowIDs().length > 0 ? true : false;
    });
    bookGrid.ActionPaneButtons.Add("CustomAction", "<span style='color:red;font-weight:bold'>please select an item</span>", 0, null, null, true, null, function (grid) {
        return grid.GetSelectedRowIDs().length == 0 ? true : false;
    });
    bookGrid.IsEditable = false;
    bookGrid.ShowRefreshButton = true;
    bookGrid.Initialize(true);
}
//# sourceMappingURL=actionbar.js.map