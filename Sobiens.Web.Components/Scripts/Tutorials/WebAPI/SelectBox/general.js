$(function () {
    soby_PopulateSelectBoxGeneral();
});
function soby_PopulateSelectBoxGeneral() {
    var bookDataSourceBuilder = new soby_WSBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
    //    bookDataSourceBuilder.Filters.AddFilter("Title", "test", SobyFieldTypes.Text, SobyFilterTypes.Equal, null);
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
    var bookGrid = new SobySelectBox("soby_BooksDiv");
    bookGrid.ImagesFolderUrl = "/media/images";
    bookGrid.DataService = bookService;
    bookGrid.TitleFieldName = "Title";
    bookGrid.ValueFieldName = "Id";
    bookGrid.FocusToNextItemAfterItemSelection = false;
    bookGrid.Initialize();
}
