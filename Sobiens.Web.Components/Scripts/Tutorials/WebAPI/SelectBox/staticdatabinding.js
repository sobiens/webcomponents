$(function () {
    soby_PopulateSelectBoxStaticDataBinding();
});
function soby_PopulateSelectBoxStaticDataBinding() {
    /*
    const items = [
        { ID: 1, FirstName: "Serkant", LastName: "Samurkas", Age: 37, Sex: "M" },
        { ID: 2, FirstName: "Dexter", LastName: "McKenzie", Age: 39, Sex: "M" },
        { ID: 3, FirstName: "Tricia", LastName: "Cooper", Age: 31, Sex: "F" },
        { ID: 4, FirstName: "Debra", LastName: "Drinian", Age: 39, Sex: "F" },
        { ID: 5, FirstName: "Alex", LastName: "Long", Age: 24, Sex: "M" },
        { ID: 6, FirstName: "Michele", LastName: "Kane", Age: 26, Sex: "F" }
    ];
    */
    var items = [];
    for (var i = 1; i < 201; i++) {
        items.push({ ID: i, FirstName: "Serkant" + i, LastName: "Samurkas", Age: 37, Sex: "M" });
    }
    var customerService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("FirstName", SobyFieldTypes.Text, null),
        new SobySchemaField("LastName", SobyFieldTypes.Text, null),
        new SobySchemaField("Age", SobyFieldTypes.Number, null),
        new SobySchemaField("Sex", SobyFieldTypes.Text, null)
    ], items);
    customerService.DataSourceBuilder.RowLimit = 100;
    /*
    var bookDataSourceBuilder = new soby_WSBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
//    bookDataSourceBuilder.Filters.AddFilter("Title", "test", SobyFieldTypes.Text, SobyFilterTypes.Equal, null);
    bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET")});
    var bookService = new soby_WebServiceService(bookDataSourceBuilder);
    bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
    bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
    bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");
        */
    var selectbox = new SobySelectBox("soby_BooksDiv");
    selectbox.DataService = customerService;
    selectbox.TitleFieldName = "FirstName";
    selectbox.ValueFieldName = "ID";
    selectbox.FocusToNextItemAfterItemSelection = false;
    selectbox.SearchOnDemand = false;
    selectbox.SearchParameterName = "FirstName";
    selectbox.AllowMultipleSelections = true;
    selectbox.Initialize();
}
//# sourceMappingURL=staticdatabinding.js.map