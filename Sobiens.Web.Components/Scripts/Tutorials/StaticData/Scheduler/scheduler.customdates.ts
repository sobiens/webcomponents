$(function ()
{
    soby_PopulateSchedulerCustomDates();
});
var scheduler: soby_Scheduler = null
function soby_PopulateSchedulerCustomDates()
{
    var dateNow = new Date();
    scheduler = new soby_Scheduler("#soby_SchedulerDiv", "Premises", "Arabalar", dateNow.getFullYear(), dateNow.getMonth() + 1, dateNow.getDate(), "No record", "Id", "Title", "Description", "DueDate", "", "Title", "Title", 1000, 800);
    scheduler.IsDateChangeAllowed = false;
    scheduler.SingleTimeHeadingDurationAsMinute = 6 * 60;
    scheduler.SingleScheduleItemDurationAsMinute = 15;
    scheduler.ViewType = SobySchedulerTypes.CustomDates;
    scheduler.SchedulerTableStartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0, 0);
    scheduler.SchedulerTableEndDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()+15, 0, 0, 0, 0);
    scheduler.ImagesFolderUrl = "/media/images";
    var category1 = scheduler.AddCategory("1", "Fiat");
    category1.CanContainScheduleItems = false;
    var category2 = scheduler.AddCategory("2", "Ford");
    category2.CanContainScheduleItems = false;
    var category3 = scheduler.AddCategory("3", "Honda");
    category3.CanContainScheduleItems = false;

    var category4 = category1.AddCategory("4", "Brava");
    var category5 = category2.AddCategory("5", "Mustang");
    var category6 = category2.AddCategory("6", "Mondeo");
    var category7 = category3.AddCategory("7", "Civic");

    var item1StartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 2, 30, 0, 0);
    var item1EndDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 2, 44, 0, 0);

    var item2StartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 4, 15, 0, 0);
    var item2EndDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 4, 44, 0, 0);

    var item3StartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 8, 0, 0, 0);
    var item3EndDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 8, 44, 0, 0);

    var item4StartDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 10, 15, 0, 0);
    var item4EndDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 10, 29, 0, 0);

    var schedule1 = scheduler.AddItem("1", "Schedule 1", "Schedule 1", "4", item1StartDate, item1EndDate);
    var schedule2 = scheduler.AddItem("2", "Schedule 2", "Schedule 2", "5", item2StartDate, item2EndDate);
    var schedule3 = scheduler.AddItem("3", "Schedule 3", "Schedule 3", "5", item3StartDate, item3EndDate);
    var schedule4 = scheduler.AddItem("4", "Schedule 4", "Schedule 4", "7", item4StartDate, item4EndDate);
    scheduler.Initialize();
    /*
    scheduler.OnClick = function (calendarViewID, calendarViewItemId) {
        var itemData = soby_CalendarViews[calendarViewID].GetItemData(calendarViewItemId);
        $("#soby_ResultDiv").html("Clicked node '" + itemData.Title + "'");
    }
    scheduler.OnSelectionChanged = function (calendarViewID) {
        var selectedItems = soby_CalendarViews[calendarViewID].GetSelectedItems();
        $("#soby_ResultDiv").html("Selected nodes:");
        for (var i = 0; i < selectedItems.length; i++) {
            $("#soby_ResultDiv").append(selectedItems[i].Title + ",");
        }

    }
    */
}

function DisplayCustomDatesScheduleChanges()
{
    var changes = "";
    for (var i = 0; i < scheduler.ChangedScheduleItems.length; i++)
    {
        var scheduleItem = scheduler.ChangedScheduleItems[i];
        changes += "Start Date:" + scheduleItem.StartDate + " --- End Date:" + scheduleItem.EndDate + " --- CategoryId:" + scheduleItem.CategoryId + "<br>";
    }
    $("#soby_SchedulerChangesDiv").html(changes);
}

 