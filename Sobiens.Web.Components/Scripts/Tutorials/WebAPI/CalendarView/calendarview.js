$(function () {
    soby_PopulateCalendarView();
});
var calendarView = null;
function soby_PopulateCalendarView() {
    var calendarDataSourceBuilder = new soby_WSBuilder();
    calendarDataSourceBuilder.Filters = new SobyFilters(false);
    calendarDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    calendarDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    calendarDataSourceBuilder.AddSchemaField("DueDate", SobyFieldTypes.DateTime, null);
    //calendarDataSourceBuilder.Filters.AddFilter("ParentId", "0", SobyFieldTypes.Number, SobyFilterTypes.Equal, false); 
    var calendarDataService = new soby_WebServiceService(calendarDataSourceBuilder);
    calendarDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Tasks", "json", "application/json; charset=utf-8", "GET");
    calendarView = new soby_CalendarView("#soby_CalendarDiv", "Premises", calendarDataService, 2016, 12, 6, "No record", "Id", "Title", "Description", "DueDate", "", "Title", "Title", "500px", "500px");
    calendarView.ImagesFolderUrl = "/media/images";
    calendarView.Initialize();
    calendarView.OnClick = function (calendarViewID, calendarViewItemId) {
        var itemData = soby_CalendarViews[calendarViewID].GetItemData(calendarViewItemId);
        $("#soby_ResultDiv").html("Clicked node '" + itemData.Title + "'");
    };
    calendarView.OnSelectionChanged = function (calendarViewID) {
        var selectedItems = soby_CalendarViews[calendarViewID].GetSelectedItems();
        $("#soby_ResultDiv").html("Selected nodes:");
        for (var i = 0; i < selectedItems.length; i++) {
            $("#soby_ResultDiv").append(selectedItems[i].Title + ",");
        }
    };
}
//# sourceMappingURL=calendarview.js.map