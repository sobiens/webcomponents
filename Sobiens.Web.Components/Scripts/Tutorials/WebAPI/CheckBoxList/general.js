$(function () {
    soby_PopulateCheckBoxList();
});
var financialYearCheckBoxList = null;
function soby_PopulateCheckBoxList() {
    var dataSourceBuilder = new soby_WSBuilder();
    dataSourceBuilder.Filters = new SobyFilters(false);
    dataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    dataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    var dataService = new soby_WebServiceService(dataSourceBuilder);
    dataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    var checkBoxList = new SobyCheckBoxList("soby_BooksDiv", null, null);
    checkBoxList.ItemClassName = "financialyear";
    checkBoxList.DataService = dataService;
    checkBoxList.ValueFieldName = "Title";
    checkBoxList.TitleFieldName = "Title";
    //financialYearCheckBoxList.ShowEmptyOption = true;
    checkBoxList.ListItemStateChanged = function (affectedItem, isChecked) {
        if (affectedItem != null)
            $("#soby_ActionDiv").html("<strong>Take action:</strong>" + affectedItem.Text + " " + (isChecked == true ? "selected" : "deselected"));
    };
    checkBoxList.ValueChanged = function () {
        var selectedItemsString = "<strong>Selected Items:</strong>";
        var selectedItems = checkBoxList.GetValue();
        for (var i = 0; i < selectedItems.length; i++) {
            selectedItemsString += selectedItems[i].Text + "; ";
        }
        $("#soby_SelectionsDiv").html(selectedItemsString);
    };
    checkBoxList.Initialize();
    checkBoxList.ValueChanged();
}
//# sourceMappingURL=general.js.map