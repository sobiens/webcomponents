$(function () {
    soby_PopulateItemSelectionSingle();
});
var itemSelection = null;
function soby_PopulateItemSelectionSingle() {
    var autoCompleteBookDataSourceBuilder = new soby_WSBuilder();
    autoCompleteBookDataSourceBuilder.Filters = new SobyFilters(false);
    autoCompleteBookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    autoCompleteBookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    var autoCompleteBookDataService = new soby_WebServiceService(autoCompleteBookDataSourceBuilder);
    autoCompleteBookDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    var advancedSearchBookDataSourceBuilder = new soby_WSBuilder();
    advancedSearchBookDataSourceBuilder.RowLimit = 10;
    advancedSearchBookDataSourceBuilder.Filters = new SobyFilters(false);
    advancedSearchBookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    advancedSearchBookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    advancedSearchBookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    advancedSearchBookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    advancedSearchBookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    var advancedSearchBookDataService = new soby_WebServiceService(advancedSearchBookDataSourceBuilder);
    advancedSearchBookDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    itemSelection = new soby_ItemSelection("#soby_BooksDiv", "Meters", SobyItemSelectorTypes.GridView, autoCompleteBookDataService, advancedSearchBookDataService, null, "No record", "BookSelectionDialog", "/Management/CustomerSelection.html", "Id", "Title", "");
    itemSelection.AllowMultipleSelections = false;
    itemSelection.Initialize();
}
//# sourceMappingURL=singleselection.js.map