$(function () {
    soby_PopulateTreeView();
});
var treeView = null;
function soby_PopulateTreeView() {
    var rootDataSourceBuilder = new soby_WSBuilder();
    rootDataSourceBuilder.Filters = new SobyFilters(false);
    rootDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    rootDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    rootDataSourceBuilder.Filters.AddFilter("ParentId", "0", SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
    var premisesRootDataService = new soby_WebServiceService(rootDataSourceBuilder);
    premisesRootDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Premises", "json", "application/json; charset=utf-8", "GET");
    var childrenDataSourceBuilder = new soby_WSBuilder();
    childrenDataSourceBuilder.Filters = new SobyFilters(false);
    childrenDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    childrenDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    var premisesChildrenDataService = new soby_WebServiceService(childrenDataSourceBuilder);
    premisesChildrenDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Premises", "json", "application/json; charset=utf-8", "GET");
    treeView = new soby_TreeView("#soby_PremisesDiv", "Premises", premisesRootDataService, premisesChildrenDataService, "No record", "ParentId", "Id", "Title");
    treeView.ImagesFolderUrl = "/media/images";
    treeView.Initialize();
    treeView.OnClick = function (treeViewID, treeViewItemId) {
        var itemData = soby_TreeViews[treeViewID].GetItemData(treeViewItemId);
        $("#soby_ResultDiv").html("Clicked node '" + itemData.Title + "'");
    };
    treeView.OnSelectionChanged = function (treeViewID) {
        var selectedItems = soby_TreeViews[treeViewID].GetSelectedItems();
        $("#soby_ResultDiv").html("Selected nodes:");
        for (var i = 0; i < selectedItems.length; i++) {
            $("#soby_ResultDiv").append(selectedItems[i].Title + ",");
        }
    };
}
