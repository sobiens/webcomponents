$(function () {
    soby_PopulateItemSelectionAsTreeView();
});
var itemSelection = null;
function soby_PopulateItemSelectionAsTreeView() {
    var autoCompleteBookDataSourceBuilder = new soby_WSBuilder();
    /*
    autoCompleteBookDataSourceBuilder.DataBeingParsed = function (data)
    {
        return data.value;
    }
    */
    autoCompleteBookDataSourceBuilder.Filters = new SobyFilters(false);
    autoCompleteBookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    autoCompleteBookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    var autoCompleteBookDataService = new soby_WebServiceService(autoCompleteBookDataSourceBuilder);
    autoCompleteBookDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Premises", "json", "application/json; charset=utf-8", "GET");
    var advancedSearchRootDataSourceBuilder = new soby_WSBuilder();
    advancedSearchRootDataSourceBuilder.Filters = new SobyFilters(false);
    advancedSearchRootDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    advancedSearchRootDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    advancedSearchRootDataSourceBuilder.Filters.AddFilter("ParentId", "0", SobyFieldTypes.Number, SobyFilterTypes.Equal, false, false);
    var advancedSearchRootDataDataService = new soby_WebServiceService(advancedSearchRootDataSourceBuilder);
    advancedSearchRootDataDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Premises", "json", "application/json; charset=utf-8", "GET");
    var advancedSearchChildrenDataSourceBuilder = new soby_WSBuilder();
    advancedSearchChildrenDataSourceBuilder.Filters = new SobyFilters(false);
    advancedSearchChildrenDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    advancedSearchChildrenDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    var advancedSearchChildrenDataDataService = new soby_WebServiceService(advancedSearchChildrenDataSourceBuilder);
    advancedSearchChildrenDataDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Premises", "json", "application/json; charset=utf-8", "GET");
    itemSelection = new soby_ItemSelection("#soby_BooksDiv", "Meters", SobyItemSelectorTypes.TreeView, autoCompleteBookDataService, advancedSearchChildrenDataDataService, advancedSearchChildrenDataDataService, "No record", "BookSelectionDialog", "/Management/CustomerSelection.html", "Id", "Title", "ParentId");
    itemSelection.WaterMark = "Please start typing";
    itemSelection.AllowMultipleSelections = true;
    itemSelection.ImagesFolderUrl = "/media/images";
    itemSelection.Initialize();
}
//# sourceMappingURL=treeviewselection.js.map