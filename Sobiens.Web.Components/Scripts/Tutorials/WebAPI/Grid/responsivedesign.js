$(function () {
    soby_PopulateGridResponsiveDesign();
});
function soby_PopulateGridResponsiveDesign() {
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
    var responsiveCondition1 = new sobyResponsiveCondition(function (width, height) {
        if (width < 600)
            return false;
        else
            return true;
    });
    var responsiveCondition2 = new sobyResponsiveCondition(function (width, height) {
        if (width >= 600)
            return false;
        else
            return true;
    });
    var bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.ImagesFolderUrl = "/media/images";
    bookGrid.AddKeyField("Id");
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null, responsiveCondition1);
    bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null, responsiveCondition1);
    bookGrid.RowDetailDisplayFunction = function (grid, rowId, item) {
        var container = $("<div></div>");
        container.append("<strong>Year:</strong>" + item.Year + "<br>");
        container.append("<strong>Genre:</strong>" + item.Genre);
        return container.html();
    };
    bookGrid.ResponsiveConditions.push(responsiveCondition2);
    bookGrid.RowDetailDisplayViewResponsiveCondition = responsiveCondition2;
    bookGrid.ShowHeader = true;
    bookGrid.IsEditable = false;
    bookGrid.ShowRefreshButton = false;
    bookGrid.DisplayTitle = false;
    bookGrid.IsSelectable = true;
    bookGrid.IsEditable = false;
    bookGrid.Initialize(true);
}
//# sourceMappingURL=responsivedesign.js.map