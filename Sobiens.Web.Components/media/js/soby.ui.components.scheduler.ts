// VERSION 1.0.7.2
// ********************* ITEM SELECTION *****************************
var soby_Schedulers = new Array();
class SobySchedulerViewTypesObject
{
    Daily: number = 1;
    Weekly: number = 2;
    Monthly: number = 3;
    Yearly: number = 4;
    TaskList: number = 5;
    CustomDates: number = 6;
    AllData: number = 6;
}
var SobySchedulerTypes = new SobySchedulerViewTypesObject();

class SobySchedulerDataItemStatusObject
{
    None: number = 1;
    Added: number = 2;
    Modified: number = 3;
    Deleted: number = 4;
}
var SobySchedulerDataItemStatuses = new SobySchedulerDataItemStatusObject();

function soby_RemoveNoneExistenceScheduler()
{
    var newArray = new Array();
    for (var x in soby_Schedulers)
    {
        if ($(soby_Schedulers[x].ContentDivSelector + "[schedulerid='" + soby_Schedulers[x].SchedulerID + "']").length > 0)
            newArray[soby_Schedulers[x].SchedulerID] = soby_Schedulers[x];
    }

    soby_WebGrids = newArray;
}

function soby_GetActiveScheduler(): soby_Scheduler
{
    soby_RemoveNoneExistenceScheduler();
    var activeGridID = $(".soby_scheduler.active").attr("schedulerid");
    return soby_Schedulers[activeGridID];
}

function soby_GetAllSchedulers()
{
    soby_RemoveNoneExistenceScheduler();
    return soby_Schedulers;
}

class soby_Scheduler
{
    constructor(contentDivSelector, title: string, categoriesTitle: string, year: number, month: number, day: number, emptyDataHtml, idFieldName, titleFieldName, descriptionFieldName, startDateFieldName, endDateFieldName, linkFieldName, imageFieldName, width: number, height: number)
    {
        this.SchedulerID = "soby_scheduler_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.CategoriesTitle = categoriesTitle;

        this.ScheduleItems = new soby_ScheduleItems();
        this.ScheduleCategories = new soby_ScheduleCategories();
        this.EmptyDataHtml = emptyDataHtml;
        this.IdFieldName = idFieldName;
        this.TitleFieldName = titleFieldName;
        this.DescriptionFieldName = descriptionFieldName;
        this.StartDateFieldName = startDateFieldName;
        this.EndDateFieldName = endDateFieldName;
        this.LinkFieldName = linkFieldName;
        this.ImageFieldName = imageFieldName;
        this.EnsureItemSelectionExistency();

        this.Year = year
        this.Month = month - 1
        this.Day = day

        this.Width = width;
        this.Height = height;

        this.GenerateScheduler();
    }

    SchedulerID: string = "";
    ContentDivSelector: string = "";
    MonthNames: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    DayNames: Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    Title: string = "";
    CategoriesTitle: string = "";
    ScheduleItems: soby_ScheduleItems = null;
    OriginalScheduleItems: soby_ScheduleItems = null;
    ChangedScheduleItems: soby_ScheduleItems = new soby_ScheduleItems();
    ScheduleCategories: soby_ScheduleCategories = null;
    AllowMultipleSelections: boolean = true;
    AllowCheckBoxes: boolean = true;
    ViewType = 3; // 1 DAILY  --  2 WEEKLY  --  3 ONE MONTHLY  --  4 YEARLY  --  5 EVENTLY(YEARLY)
    EmptyDataHtml: string = "";
    IdFieldName: string = "";
    TitleFieldName: string = "";
    DescriptionFieldName: string = "";
    StartDateFieldName: string = "";
    EndDateFieldName: string = "";
    SchedulerTableStartDate: Date = null;
    SchedulerTableEndDate: Date = null;
    SchedulerTableTotalDays: number = 1;
    LinkFieldName: string = "";
    ImageFieldName: string = "";
    ImagesFolderUrl: string = "/_layouts/1033/images";
    MinuteWidthWeight: number = 1;
    CellHeight: number = 32;
    //SingleCellLengthAsMinute: number = 15;
    SingleTimeHeadingDurationAsMinute: number = 60;
    SingleScheduleItemDurationAsMinute: number = 20;
    Year: number;
    Month: number;
    Day: number;
    Width: number;
    Height: number;
    ShowNavigation: boolean = true;
    IsDateChangeAllowed: boolean = true;
    IsCategoryChangeAllowed: boolean = true;
    IsInDragState: boolean = false;
    Initialize()
    {
        this.OriginalScheduleItems = this.ScheduleItems.Clone();
        $(this.ContentDivSelector).addClass("soby_scheduler");
        $(this.ContentDivSelector).attr("onclick", "soby_Schedulers['" + this.SchedulerID + "'].Activate()");
        $(this.ContentDivSelector).attr("schedulerid", this.SchedulerID);


        //<div class='schedulercategoriespanel'></div><div class='scheduleritemspanel'></div>
        $(this.ContentDivSelector).html("<div class='viewtypepanel'></div><div class='schedulermainpanel'></div>");
        if (this.ShowNavigation == false || this.ViewType == SobySchedulerTypes.CustomDates)
        {
        }
        else
        {
            this.GenerateViewTypePanel();
            this.SetViewTypeHeaderAsSelected(this.ViewType);
        }
        this.ChangeView(this.ViewType);
        //this.DataService.PopulateItems(null);
    }

    /**
 * Activates the grid.
 * @example
 * // Activates the grid
 * grid.Activate();
 */
    Activate()
    {
        $(this.ContentDivSelector + ".soby_scheduler").addClass("active")
    }

    GenerateCategoriesTable()
    {
        var container = $("<div></div>");
        var header = $("<div class='categoriesheader'></div>");
        header.text(this.CategoriesTitle);
        container.append(header);
        var ul = $("<ul></ul>");
        for (var i = 0; i < this.ScheduleCategories.length; i++)
        {
            var category = this.ScheduleCategories[i];
            var li = $("<li></li>");
            var link = $("<a href='javascript:void(0)' ></a>");
            link.text(category.Title);
            li.append(link);

            var subCategoriesContainer = $("<ul></ul>");
            for (var x = 0; x < category.SubCategories.length; x++)
            {
                var subCategory = category.SubCategories[x];
                var subli = $("<li></li>");
                var sublink = $("<a href='javascript:void(0)' ></a>");
                sublink.text(subCategory.Title);
                subli.append(sublink);
                subCategoriesContainer.append(subli);
                //"<td class='viewtypeheader daily'><a href='javascript:void(0)' onclick=\"soby_Schedulers['" + this.SchedulerID + "'].ChangeView(SobySchedulerTypes.Daily)\">&nbsp;&nbsp;&nbsp;Daily&nbsp;&nbsp;&nbsp;</a></td>" +
            }
            li.append(subCategoriesContainer);


            ul.append(li);
            //"<td class='viewtypeheader daily'><a href='javascript:void(0)' onclick=\"soby_Schedulers['" + this.SchedulerID + "'].ChangeView(SobySchedulerTypes.Daily)\">&nbsp;&nbsp;&nbsp;Daily&nbsp;&nbsp;&nbsp;</a></td>" +
        }
        container.append(ul);
        $(this.ContentDivSelector + " .schedulercategoriespanel").html("");
        $(this.ContentDivSelector + " .schedulercategoriespanel").append(container);

    }
    AddItem(id: string, title: string, description: string, categoryId:string, startDate: Date, endDate: Date)
    {
        var item: soby_ScheduleItem = new soby_ScheduleItem(id, title, description, categoryId, startDate, endDate);
        this.ScheduleItems.push(item);
        return item;
    }
    AddCategory(id: string, title: string)
    {
        var item: soby_ScheduleCategory = new soby_ScheduleCategory(id, title);
        this.ScheduleCategories.push(item);
        return item;
    }

    GetItemData(calendarViewItemId)
    {
        for (var i = 0; i < this.ScheduleItems.length; i++)
        {
            if (this.ScheduleItems[i]["SobyCalendarViewItemId"] == calendarViewItemId)
                return this.ScheduleItems[i];
        }

        return null;
    }

    GetItems(startDate: Date, endDate: Date)
    {
        var items: soby_ScheduleItems = new soby_ScheduleItems();
        for (var i = 0; i < this.ScheduleItems.length; i++)
        {
            var item = this.ScheduleItems[i];
            if (item.EndDate == null)
            {
                if (item.StartDate >= startDate && item.StartDate <= endDate)
                    items.push(item);
            }
            else
            {
                if (
                    (item.StartDate >= startDate && item.StartDate <= endDate)
                    ||
                    (item.EndDate >= startDate && item.EndDate <= endDate)
                   )
                    items.push(item);
            }
        }

        return items;
    }

    GetDateTasks(startDate: Date, endDate: Date)
    {
        var sTable = "";
        var sClass = "";

        var startNo = startDate.getDay()
        if (startNo == 0)
            startNo = 7
        var sClass = "weekday";
        var dNow = new Date()
        if (dNow.getDate() == startDate.getDate() && dNow.getMonth() == startDate.getMonth() && dNow.getFullYear() == startDate.getFullYear())
        {
            sClass = "today"
        }
        else if (startNo == 6)
        {
            sClass = "saturday"
        }
        else if (startNo == 7)
        {
            sClass = "sunday"
        }
        var ul = $("<ul class='tasklist'></ul>");
        var items = this.GetItems(startDate, endDate);

        for (var i = 0; i < items.length; i++)
        {
            var item = items[i];
            var li = $("<li></li>");
            var sImage = ""; //taskValues[4] != '' ? "<img align='absmiddle' src='" + taskValues[4] + "' border=0 height=15>&nbsp;" : ''
            li.append("<a href='javascript:void(0)' title='" + item.Title + "'>" + sImage + item.Title + "</a>");
            ul.append(li);
        }

        return ul;
    }

    GenerateViewTypePanel()
    {
        var html = "<table class='viewtypetabs'>" +
            "<td class='viewtypeheader daily'><a href='javascript:void(0)' onclick=\"soby_Schedulers['" + this.SchedulerID + "'].ChangeView(SobySchedulerTypes.Daily)\">&nbsp;&nbsp;&nbsp;Daily&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader weekly'><a href='javascript:void(0)' onclick=\"soby_Schedulers['" + this.SchedulerID + "'].ChangeView(SobySchedulerTypes.Weekly)\">&nbsp;&nbsp;&nbsp;Weekly&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader monthly' style='display:none'><a href='javascript:void(0)' onclick=\"soby_Schedulers['" + this.SchedulerID + "'].ChangeView(SobySchedulerTypes.Monthly)\">&nbsp;&nbsp;&nbsp;Monthly&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader yearly' style='display:none'><a href='javascript:void(0)' onclick=\"soby_Schedulers['" + this.SchedulerID + "'].ChangeView(SobySchedulerTypes.Yearly)\">&nbsp;&nbsp;&nbsp;Yearly&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader tasklist' style='display:none'><a href='javascript:void(0)' onclick=\"soby_Schedulers['" + this.SchedulerID + "'].ChangeView(SobySchedulerTypes.TaskList)\">&nbsp;&nbsp;&nbsp;Show All Events&nbsp;&nbsp;&nbsp;</a></td>" +
            "</table>"
        $(this.ContentDivSelector + " .viewtypepanel").html(html);
    }

    ShowPopupViewSelection()
    {
        var html = "<table bgcolor=#D4D0C8 bordercolor=black border=1 cellspacing=0 cellpadding=0>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma;cursor:default' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"objToolx.fnSetVisibility('idPopup',false);soby_Schedulers['" + this.SchedulerID + "'].Month=" + this.Month + ";soby_Schedulers['" + this.SchedulerID + "'].Day=" + this.Day + ";soby_Schedulers['" + this.SchedulerID + "'].ViewType=1;soby_Schedulers['" + this.SchedulerID + "'].GenerateScheduler()\">&nbsp;&nbsp;&nbsp;Show This Day&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma;cursor:default' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"objToolx.fnSetVisibility('idPopup',false);soby_Schedulers['" + this.SchedulerID + "'].Month=" + this.Month + ";soby_Schedulers['" + this.SchedulerID + "'].Day=" + this.Day + ";soby_Schedulers['" + this.SchedulerID + "'].ViewType=2;soby_Schedulers['" + this.SchedulerID + "'].GenerateScheduler()\">&nbsp;&nbsp;&nbsp;Show This Week&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"javascript:objToolx.fnSetVisibility('idPopup',false);soby_Schedulers['" + this.SchedulerID + "'].Month=" + this.Month + ";soby_Schedulers['" + this.SchedulerID + "'].ViewType=3;soby_Schedulers['" + this.SchedulerID + "'].GenerateScheduler()\">&nbsp;&nbsp;&nbsp;Show This Month&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"javascript:objToolx.fnSetVisibility('idPopup',false);soby_Schedulers['" + this.SchedulerID + "'].ViewType=4;soby_Schedulers['" + this.SchedulerID + "'].GenerateScheduler()\">&nbsp;&nbsp;&nbsp;Show This Year&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"javascript:objToolx.fnSetVisibility('idPopup',false);soby_Schedulers['" + this.SchedulerID + "'].ViewType=5;soby_Schedulers['" + this.SchedulerID + "'].GenerateScheduler()\">&nbsp;&nbsp;&nbsp;Show All Event In This Year&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "</table>"
        $(this.ContentDivSelector + " .viewtypepanel").html(html);
    }

    SetViewTypeHeaderAsSelected(viewType: number)
    {
        $(".viewtypeheader").removeClass("selected");
        switch (viewType)
        {
            case SobySchedulerTypes.Daily:
                $(".viewtypeheader.daily").addClass("selected");
                break;
            case SobySchedulerTypes.Weekly:
                $(".viewtypeheader.weekly").addClass("selected");
                break;
            case SobySchedulerTypes.Monthly:
                $(".viewtypeheader.monthly").addClass("selected");
                break;
            case SobySchedulerTypes.Yearly:
                $(".viewtypeheader.yearly").addClass("selected");
                break;
            case SobySchedulerTypes.TaskList:
                $(".viewtypeheader.tasklist").addClass("selected");
                break;
        }
    }

    ChangeView(viewType: number)
    {
        this.ViewType = viewType;
        this.SetViewTypeHeaderAsSelected(viewType);
        this.GenerateCategoriesTable();
        this.GenerateScheduler();
    }

    GenerateScheduler()
    {
        switch (this.ViewType)
        {
            case SobySchedulerTypes.Yearly: // YEARLY SHOWING
                //this.ShowYearlyView();
                break;
            case SobySchedulerTypes.Monthly: // MONTHLY SHOWING
                //this.ShowMonthlyView();
                break;
            // 1 DAILY  --  2 WEEKLY  --  3 ONE MONTHLY  --  4 YEARLY  --  5 EVENTLY(YEARLY)
            case SobySchedulerTypes.Daily: // DAILY SHOWING
                this.ShowFifteenMinutesView();
                break;
            case SobySchedulerTypes.Weekly: // WEEKLY SHOWING
                this.ShowFifteenMinutesView();
                break;
            case SobySchedulerTypes.TaskList: // ALL EVENT(YEARLY) SHOWING
                this.ShowTasklistView();
                break;
            case SobySchedulerTypes.CustomDates: // ALL EVENT(YEARLY) SHOWING
                this.ShowFifteenMinutesView();
                break;

        }
    }

    ShowTasklistView()
    {
    }

    GetDayOfTheWeek(currentDate, dayIndex) // 0 - MONDAY ; 1 - TUEDAY ; 2 - WEDNESDAY; 3-THURSDAY ; 4-FRIDAY ; 5-SATURDAY; 6-SUNDAY 
    {
        var day = currentDate.getDay();
        var diff = currentDate.getDate() - day + (day == dayIndex ? -6 : 1); // adjust when day is sunday
        return new Date(currentDate.setDate(diff));
    }

    GetDayHeaderClass(date)
    {
        var startNo = date.getDay();
        if (startNo == 0)
            startNo = 7

        var className = "weekday";
        var dNow = new Date()
        if (dNow.getDate() == date.getDate() && dNow.getMonth() == date.getMonth() && dNow.getFullYear() == date.getFullYear())
        {
            className = "today"
        }
        else if (startNo == 6)
        {
            className = "saturday"
        }
        else if (startNo == 7)
        {
            className = "sunday"
        }

        return className;
    }

    ShowFifteenMinutesView()
    {
        var date = new Date(this.Year, this.Month, this.Day);
        if (this.ViewType == SobySchedulerTypes.Daily)
        {
            this.SchedulerTableStartDate = new Date(this.Year, this.Month, this.Day, 0, 0, 0, 0);
            this.SchedulerTableEndDate = new Date(this.Year, this.Month, this.Day + 1, 0, 0, 0, 0);
        }
        else if (this.ViewType == SobySchedulerTypes.Weekly)
        {
            var today = new Date(this.Year, this.Month, this.Day, 0, 0, 0, 0);
            this.SchedulerTableStartDate = this.GetDayOfTheWeek(today, 0);
            this.SchedulerTableEndDate = new Date(this.SchedulerTableStartDate.getFullYear(), this.SchedulerTableStartDate.getMonth(), this.SchedulerTableStartDate.getDate() + 6, 0, 0, 0, 0);
            this.SchedulerTableTotalDays = 7;
        }
        else if (this.ViewType == SobySchedulerTypes.Monthly)
        {
            this.SchedulerTableStartDate = new Date(this.Year, this.Month, this.Day, 0, 0, 0, 0);
            this.SchedulerTableEndDate = new Date(this.Year, this.Month, this.Day + 1, 0, 0, 0, 0);
        }
        else if (this.ViewType == SobySchedulerTypes.CustomDates)
        {
            //this.SchedulerTableStartDate = this.GetDayOfTheWeek(today, 0);
            //this.SchedulerTableEndDate = new Date(this.SchedulerTableStartDate.getFullYear(), this.SchedulerTableStartDate.getMonth(), this.SchedulerTableStartDate.getDate() + 6, 0, 0, 0, 0);
            var timeDiff = Math.abs(this.SchedulerTableEndDate.getTime() - this.SchedulerTableStartDate.getTime());
            this.SchedulerTableTotalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
        


        var oneDayCellCount = 24 * 60 / this.SingleScheduleItemDurationAsMinute;
        var cellCount = this.SchedulerTableTotalDays * oneDayCellCount;
        var table = $("<table width= " + this.Width + " class='soby_maintable' ></table>");
        var tbody = $("<tbody class='scheduler-body'></tbody>");

        if (this.ShowNavigation == true && this.ViewType != SobySchedulerTypes.CustomDates)
        {
            tbody.append("<tr class='navigationpanelrow'><td></td><td class='navigationpanel' colspan='" + oneDayCellCount + "'><a href='javascript:void(0)' onclick=\"javascript:soby_Schedulers['" + this.SchedulerID + "'].JumpDay(-1)\">&lt;</a><span class='navigationheader'>" + soby_GetFormatedDateString(date) + "</class><a href='javascript:void(0)' onclick=\"javascript:soby_Schedulers['" + this.SchedulerID + "'].JumpDay(1)\">&gt;</a></td></tr>");
        }

        var bodyRow = $("<tr></tr>");
        var bodyCategoryCell = $("<td class='scheduler-category-area'></td>");
        bodyRow.append(bodyCategoryCell);

        var bodyTimeCell = $("<td class='scheduler-time-area'></td>");
        bodyRow.append(bodyTimeCell);

        tbody.append(bodyRow);

        table.append(tbody);

        var timeHeadingTable = $("<table></table>");
        var tbody = $("<tbody></tbody>");
        var colGroup = $("<colgroup></colgroup>");
        timeHeadingTable.append(colGroup);
        timeHeadingTable.append(tbody);

        $(this.ContentDivSelector + " .schedulermainpanel").html("");
        $(this.ContentDivSelector + " .schedulermainpanel").append(table);

        this.PopulateCategoryRows();
        this.PopulateScheduleItemElements();
    }

    GetSchedulerItemTableWidth()
    {
        return this.MinuteWidthWeight * 60 * 24 * this.SchedulerTableTotalDays;
    }

    PopulateCategoryRows()
    {
        var schedulerCategoryArea = $(this.ContentDivSelector + " .scheduler-body .scheduler-category-area");
        var schedulerTimeArea = $(this.ContentDivSelector + " .scheduler-body .scheduler-time-area");

        var categoriesLabelScrollerClip = $("<div class='scheduler-scroller-clip'></div>");
        var categoriesLabelScroller = $("<div class='scheduler-scroller' style= 'margin: 0px;'></div>");
        var categoriesLabelScrollerCanvas = $("<div class='scheduler-scroller-canvas'></div>");
        var categoriesLabelContent = $("<div class='scheduler-content' ></div>");
        var categoriesLabelRows = $("<div class='scheduler-rows' ></div>");


        var categoriesTimeScrollerClip = $("<div class='scheduler-scroller-clip'></div>");
        var categoriesTimeScroller = $("<div class='scheduler-scroller' style= 'overflow: auto; margin: 0px;width:" + (this.Width-100) + "px'></div>");
        var categoriesTimeScrollerCanvas = $("<div class='scheduler-scroller-canvas' style='min-width: 0px;'></div>");
        categoriesTimeScrollerCanvas.css("width", this.GetSchedulerItemTableWidth() + "px");

        var categoriesTimeContent = $("<div class='scheduler-content' ></div>");
        var categoriesTimeRows = $("<div class='scheduler-rows' ></div>");


        var categoriesLabelTable = $("<table style='width: 100%;margin-top: 11px;border: solid 1px;'></table>");
        var categoryLabelRow1 = $("<tr></tr>");
        var categoryLabelCell1 = $("<th class='categoriesheader' colspan='2' style='height:" + (this.CellHeight*2) + "px;' nowrap></td>");
        categoryLabelCell1.text(this.CategoriesTitle);
        categoryLabelRow1.append(categoryLabelCell1);
        categoriesLabelTable.append(categoryLabelRow1);

        var categoriesTimeRowsDragEffectDiv = $("<div class='scheduler-rows-drageffect' >&nbsp;</div>");
        var categoriesTimeTable = $("<table></table>");

        var dayHeadingRow = $("<tr class='dayheaderrow'></tr>");
        var timeHeadingRow = $("<tr class='timeheaderrow'></tr>");
        var currentDate = null;
        var currentEndDate = null;
        var oneDayTotalLabelCount = 24 * 60 / this.SingleTimeHeadingDurationAsMinute;
        for (var i = 0; i < this.SchedulerTableTotalDays * oneDayTotalLabelCount; i++)
        {
            currentDate = new Date(this.SchedulerTableStartDate.getFullYear(), this.SchedulerTableStartDate.getMonth(), this.SchedulerTableStartDate.getDate(), 0, i * this.SingleTimeHeadingDurationAsMinute, 0, 0);
            currentEndDate = new Date(this.SchedulerTableStartDate.getFullYear(), this.SchedulerTableStartDate.getMonth(), this.SchedulerTableStartDate.getDate(), 0, (i+1) * this.SingleTimeHeadingDurationAsMinute, 0, 0);
            var timeAsHour = currentDate.getHours();
            var timeAsMinute = currentDate.getMinutes();
            var endTimeAsHour = currentEndDate.getHours();
            var endTimeAsMinute = currentEndDate.getMinutes();
            if (timeAsMinute == 0)
            {
                var dayHeadingCell = $("<th colspan='" + (oneDayTotalLabelCount) + "' class='dayheader'></th>");
                dayHeadingCell.text(soby_GetFormatedDateString(currentDate));
                dayHeadingRow.append(dayHeadingCell);
            }


            var timeHeadingCell = $("<th colspan='1' class='timeheader'></th>");
            timeHeadingCell.attr("width", (this.SingleTimeHeadingDurationAsMinute * this.MinuteWidthWeight) + "px");
            timeHeadingCell.attr("height", this.CellHeight + "px");

            var timeLabel = "";
            if (this.SingleTimeHeadingDurationAsMinute == 60)
            {
                timeLabel = (timeAsHour > 9 ? timeAsHour.toString():"0" + timeAsHour);
            }
            else
            {
                timeLabel = (timeAsHour > 9 ? timeAsHour.toString() : "0" + timeAsHour) + ":" + (timeAsMinute > 9 ? timeAsMinute.toString() : "0" + timeAsMinute) +
                    " - " + (endTimeAsHour > 9 ? endTimeAsHour.toString() : "0" + endTimeAsHour) + ":" + (endTimeAsMinute > 9 ? endTimeAsMinute.toString() : "0" + endTimeAsMinute);
            }
            timeHeadingCell.text(timeLabel);

            timeHeadingRow.append(timeHeadingCell);
        }
        categoriesTimeTable.append(dayHeadingRow);
        categoriesTimeTable.append(timeHeadingRow);

        var oneDayCellCount = 24 * 60 / this.SingleScheduleItemDurationAsMinute;
        var cellCount = this.SchedulerTableTotalDays * oneDayCellCount;
        var totalCategoryCount = 0;
        for (var i = 0; i < this.ScheduleCategories.length; i++)
        {
            totalCategoryCount++;
            var category = this.ScheduleCategories[i];

            var categoryLabelRow1 = $("<tr></tr>");
            var categoryLabelCell1 = $("<td class='categorieslabelcell' style='height:" + this.CellHeight + "px;' nowrap></td>");
            categoryLabelCell1.text(category.Title);
            categoryLabelRow1.append(categoryLabelCell1);
            categoriesLabelTable.append(categoryLabelRow1);

            var categoryTimeRow1 = $("<tr class='categorytimerow'><td class='categorytimecell' colspan='" + cellCount + "'></td></tr>");
            categoryTimeRow1.attr("categoryid", category.Id);
            categoryTimeRow1.attr("categoryindex", totalCategoryCount - 1);
            categoriesTimeTable.append(categoryTimeRow1);

            for (var x = 0; x < category.SubCategories.length; x++)
            {
                totalCategoryCount++;
                var subCategory = category.SubCategories[x];
                var categoryLabelRow2 = $("<tr></tr>");
                var categoryLabelCell2 = $("<td class='categorieslabelcell' style='padding-left:30px;height:" + this.CellHeight + "px;' nowrap>&nbsp;</td>");
                categoryLabelCell2.text(subCategory.Title);

                categoryLabelRow2.append(categoryLabelCell2);

                categoriesLabelTable.append(categoryLabelRow2);

                var categoryTimeRow2 = $("<tr class='categorytimerow'><td class='categorytimecell' colspan='" + cellCount + "'></td></tr>");
                categoryTimeRow2.attr("categoryid", subCategory.Id);
                categoryTimeRow2.attr("categoryindex", totalCategoryCount-1);
                categoriesTimeTable.append(categoryTimeRow2);
            }
        }

        var maintableHeight = (totalCategoryCount + 2) * this.CellHeight;
        var tableHeight = (totalCategoryCount + 1) * this.CellHeight;
        categoriesLabelScroller.css("height", maintableHeight + "px");
        categoriesTimeScroller.css("height", maintableHeight + "px");
        categoriesTimeTable.css("height", tableHeight + "px");

        categoriesLabelScrollerClip.append(categoriesLabelScroller);
        categoriesLabelScroller.append(categoriesLabelScrollerCanvas);
        categoriesLabelScrollerCanvas.append(categoriesLabelContent);
        categoriesLabelContent.append(categoriesLabelRows);
        categoriesLabelRows.append(categoriesLabelTable)
        schedulerCategoryArea.append(categoriesLabelScrollerClip);

        categoriesTimeScrollerClip.append(categoriesTimeScroller);
        categoriesTimeScroller.append(categoriesTimeScrollerCanvas);
        categoriesTimeScrollerCanvas.append(categoriesTimeContent);
        categoriesTimeContent.append(categoriesTimeRows);
        categoriesTimeRows.append(categoriesTimeTable)
        categoriesTimeRows.append(categoriesTimeRowsDragEffectDiv);
        schedulerTimeArea.append(categoriesTimeScrollerClip);
    }

    PopulateScheduleItemElements()
    {
        for (var i = 0; i < this.ScheduleItems.length; i++)
        {
            var scheduleItem = this.ScheduleItems[i];
            if (
                (scheduleItem.StartDate >= this.SchedulerTableStartDate && scheduleItem.StartDate <= this.SchedulerTableEndDate)
                ||
                (this.SchedulerTableStartDate >= scheduleItem.StartDate && this.SchedulerTableStartDate <= scheduleItem.EndDate)
            )
            {
                this.DrawScheduleItemElement(i, scheduleItem);
            }
        }
    }

    DrawScheduleItemElement(itemIndex: number, scheduleItem: soby_ScheduleItem)
    {
        var startMinutes = scheduleItem.StartDate.getHours() * 60 + scheduleItem.StartDate.getMinutes();
        var endMinutes = scheduleItem.EndDate.getHours() * 60 + scheduleItem.EndDate.getMinutes();

        var categoryTimeRow = this.GetCategoryTimeRow(scheduleItem.CategoryId);
        var categoryIndex = parseInt( $(".categorytimerow[categoryid=" + scheduleItem.CategoryId + "]").attr("categoryindex") );
        var top = this.CellHeight * (categoryIndex+2) +1;
        var left = (startMinutes * this.MinuteWidthWeight) + "px";
        var width = ((endMinutes - startMinutes) * this.MinuteWidthWeight) + "px";
        var linkId = "soby_ScheduleItem_" + scheduleItem.Id;
        var randomNumber = itemIndex%10;
        var link = $("<a id='" + linkId + "' class='schedulitemlink " + "style" + randomNumber + "'></a>");
        link.text(scheduleItem.Title);
        link.attr("title", scheduleItem.Description);
        link.attr("scheduleitemid", scheduleItem.Id);
        link.css("top", top);
        link.css("left", left);
        link.css("width", width);
        categoryTimeRow.find("td").append(link);
        var scheduler = this;
        $("#" + linkId).draggable({
            cursor: "move", cursorAt: { top: 10, left: 10 },
            start: function ()
            {
                $(".scheduler-rows-drageffect").show();
                scheduler.IsInDragState = true;
            },
            drag: function (a, b)
            {
                var link = $(this);
                var scheduleItemId = link.attr("scheduleitemid");
                var top = parseInt(link.css("top").replace(/px/gi, ""));
                var left = parseInt(link.css("left").replace(/px/gi, ""));
                var categoryIndex = Math.round(top / scheduler.CellHeight) - 2;
                var categoryId = $(".categorytimerow[categoryindex='" + categoryIndex + "']").attr("categoryid");
                var startMinute = (left / scheduler.MinuteWidthWeight);
                startMinute = startMinute - (startMinute % scheduler.SingleScheduleItemDurationAsMinute);
                //var endMinute = startMinute + scheduler.SingleScheduleItemDurationAsMinute;
                /*
                var scheduleItem = scheduler.ScheduleItems.GetItemById(scheduleItemId);
                var differenceAsMinute = (scheduleItem.EndDate.getTime() - scheduleItem.StartDate.getTime()) / 1000;
                differenceAsMinute /= 60;
                differenceAsMinute = Math.abs(Math.round(differenceAsMinute));
                var endMinute = startMinute + differenceAsMinute;
                var tempDate = new Date(scheduleItem.StartDate.getFullYear(), scheduleItem.StartDate.getMonth(), scheduleItem.StartDate.getDate(), 0, 0, 0, 0);
                var startDate: Date = new Date(tempDate.getTime() + startMinute * 60000);
                var endDate: Date = new Date(tempDate.getTime() + endMinute * 60000);
                */
                var dragTop = scheduler.CellHeight * (categoryIndex + 2) + 1;
                var dragLeft = (startMinute * scheduler.MinuteWidthWeight) + "px";
                var dragWidth = (scheduler.SingleScheduleItemDurationAsMinute * scheduler.MinuteWidthWeight) + "px";


                $(".scheduler-rows-drageffect").css("top", dragTop);
                $(".scheduler-rows-drageffect").css("left", dragLeft);
                $(".scheduler-rows-drageffect").css("width", dragWidth);
            },
            stop: function ()
            {
                $(".scheduler-rows-drageffect").hide();
                scheduler.IsInDragState = false;
                var link = $(this);
                var scheduleItemId = link.attr("scheduleitemid");
                var top = parseInt( link.css("top").replace(/px/gi, ""));
                var left = parseInt(link.css("left").replace(/px/gi, ""));
                var categoryIndex = Math.round(top / scheduler.CellHeight) - 2;
                var categoryId = $(".categorytimerow[categoryindex='" + categoryIndex + "']").attr("categoryid");
                var startMinute = (left / scheduler.MinuteWidthWeight);
                startMinute = startMinute - (startMinute % scheduler.SingleScheduleItemDurationAsMinute);
                var scheduleItem = scheduler.ScheduleItems.GetItemById(scheduleItemId);
                var differenceAsMinute = (scheduleItem.EndDate.getTime() - scheduleItem.StartDate.getTime()) / 1000;
                differenceAsMinute /= 60;
                differenceAsMinute = Math.abs(Math.round(differenceAsMinute));
                var endMinute = startMinute + differenceAsMinute;
                var tempDate = new Date(scheduleItem.StartDate.getFullYear(), scheduleItem.StartDate.getMonth(), scheduleItem.StartDate.getDate(), 0, 0, 0, 0);
                var startDate: Date = new Date(tempDate.getTime() + startMinute * 60000);
                var endDate: Date = new Date(tempDate.getTime() + endMinute * 60000);
                var category: soby_ScheduleCategory = scheduler.ScheduleCategories.GetCategoryById(categoryId);
                if (category.CanContainScheduleItems == false)
                {
                    alert("This category can not contain a schedule item");
                    scheduler.ChangeView(scheduler.ViewType);
                    return;
                }

                if (scheduler.IsCategoryChangeAllowed == false && scheduleItem.CategoryId != categoryId)
                {
                    alert("Category change is not allowed.");
                    scheduler.ChangeView(scheduler.ViewType);
                    return;
                }

                if (scheduler.IsDateChangeAllowed == false &&
                    (scheduleItem.StartDate.toISOString() != startDate.toISOString() || scheduleItem.EndDate.toISOString() != endDate.toISOString())
                )
                {
                    alert("Date change is not allowed.");
                    scheduler.ChangeView(scheduler.ViewType);
                    return;
                }

                var categoryScheduleItems: soby_ScheduleItems = scheduler.ScheduleItems.GetItemsByCategoryId(categoryId);
                for (var i = 0; i < categoryScheduleItems.length; i++)
                {
                    if (categoryScheduleItems[i].Id == scheduleItemId)
                        continue;
                    if (
                        (categoryScheduleItems[i].StartDate >= startDate && categoryScheduleItems[i].StartDate <= endDate)
                        ||
                        (startDate >= categoryScheduleItems[i].StartDate && startDate <= categoryScheduleItems[i].EndDate)
                    )
                    {
                        alert("Conflict exist, please select a different date");
                        scheduler.ChangeView(scheduler.ViewType);
                        return;
                    }
                }

                scheduleItem.StartDate = new Date(tempDate.getTime() + startMinute * 60000);
                scheduleItem.EndDate = new Date(tempDate.getTime() + endMinute * 60000);
                scheduleItem.CategoryId = categoryId;
                scheduler.ChangeScheduleDataItemStatus(scheduleItem, SobySchedulerDataItemStatuses.Modified);
                scheduler.ChangeView(scheduler.ViewType);
            }
        });
    }

    ChangeScheduleDataItemStatus(dataItem: soby_ScheduleItem, status: number)
    {
        if (dataItem.Id == null || dataItem.Id == "")
        {
            var newDataItem = dataItem.Clone();
            dataItem.DataItemStatus = status;
            this.ChangedScheduleItems.push(dataItem);
        }
        else
        {
            var changedItem = this.ChangedScheduleItems.GetItemById(dataItem.Id);
            if (changedItem == null)
                this.ChangedScheduleItems.push(dataItem);
            else
                changedItem.DataItemStatus = status;
        }
    }

    GetCategoryTimeRow(categoryId)
    {
        return $(this.ContentDivSelector + " .categorytimerow[categoryid='" + categoryId + "']");
    }

    JumpYear(yearCount)
    {
        var dDueDate = new Date(this.Year + yearCount, this.Month, this.Day)
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.GenerateScheduler();
    }
    JumpMonth(monthCount)
    {
        var dDueDate = new Date(this.Year, this.Month + monthCount, this.Day)
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.GenerateScheduler();
    }
    JumpWeek(weekCount)
    {
        var dDueDate = new Date(this.Year, this.Month, this.Day + (weekCount * 7));
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.Day = dDueDate.getDate();
        this.GenerateScheduler();
    }
    JumpDay(dayCount)
    {
        var dDueDate = new Date(this.Year, this.Month, this.Day + (dayCount));
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.Day = dDueDate.getDate();
        this.GenerateScheduler();
    }
    NavigateToDate(year: number, month: number, day: number, viewType: number)
    {
        this.Year = year;
        this.Month = month;
        this.Day = day;
        this.ViewType = viewType;
        this.GenerateScheduler();
    }
    GetSelectedItems() {
        var selectedItems = new Array();
        var selectedInputs = $("input[name='checkbox_" + this.SchedulerID + "']:checked");
        if(this.AllowCheckBoxes == false)
            selectedInputs = $("input[name='checkbox_" + this.SchedulerID + "']:checked");
        for (var i = 0; i < selectedInputs.length; i++) {
            selectedItems[selectedItems.length] = this.GetItemData($(selectedInputs[i]).val());
        }

        return selectedItems;
    }
    ClickNode(calendarViewItemId) {
        if (this.OnClick != null)
            this.OnClick(this.SchedulerID, calendarViewItemId);
    }
    CheckNode(calendarViewItemId) {
        if (this.OnSelectionChanged != null)
            this.OnSelectionChanged(this.SchedulerID);
    }
    EnsureItemSelectionExistency() {
        for (var key in soby_Schedulers) {
            if (key == this.SchedulerID)
                return;
        }

        soby_Schedulers[this.SchedulerID] = this;
    }
    OnSelectionChanged = null;
    OnClick = null;
}

class soby_ScheduleCategories extends Array<soby_ScheduleCategory>
{
    GetCategoryById(categoryId)
    {
        for (var i = 0; i < this.length; i++)
        {
            if (this[i].Id == categoryId)
                return this[i];

            var category = this[i].SubCategories.GetCategoryById(categoryId);
            if (category != null)
                return category;
        }

        return null;
    }
}

class soby_ScheduleItems extends Array<soby_ScheduleItem>
{
    Clone(): soby_ScheduleItems
    {
        var newItems = new soby_ScheduleItems();
        for (var i = 0; i < this.length; i++)
        {
            newItems.push(this[i].Clone());
        }
        return newItems;
    }

    GetItemById(id)
    {
        for (var i = 0; i < this.length; i++)
        {
            if (this[i].Id == id)
                return this[i];
        }

        return null;
    }

    GetItemsByCategoryId(categoryId)
    {
        var newItems = new soby_ScheduleItems();
        for (var i = 0; i < this.length; i++)
        {
            if (this[i].CategoryId == categoryId)
                newItems.push(this[i]);
        }

        return newItems;
    }
}

class soby_ScheduleItem
{
    constructor(id: string, title: string, description: string, categoryId:string, startDate: Date, endDate: Date)
    {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.CategoryId = categoryId;
        this.StartDate = startDate;
        this.EndDate = endDate;
    }
    Id: string = "";
    Title: string = "";
    Description: string = "";
    CategoryId: string = "";
    StartDate: Date = null;
    EndDate: Date = null;
    DataItemStatus: number = SobySchedulerDataItemStatuses.None;

    Clone(): soby_ScheduleItem
    {
        return new soby_ScheduleItem(this.Id, this.Title, this.Description, this.CategoryId, this.StartDate, this.EndDate);
    }

}
class soby_ScheduleCategory
{
    constructor(id: string, title: string)
    {
        this.Id = id;
        this.Title = title;
        this.SubCategories = new soby_ScheduleCategories();
    }
    Id: string = "";
    Title: string = "";
    CanContainScheduleItems: boolean = true;
    SubCategories: soby_ScheduleCategories = null;

    AddCategory(id: string, title: string)
    {
        var category = new soby_ScheduleCategory(id, title);
        this.SubCategories.push(category);
    }
}
// ************************************************************
