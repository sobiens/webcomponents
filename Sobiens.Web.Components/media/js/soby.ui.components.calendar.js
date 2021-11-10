var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// VERSION 1.0.8.1
// ********************* ITEM SELECTION *****************************
var soby_CalendarViews = new Array();
var SobyCalendarViewTypesObject = /** @class */ (function () {
    function SobyCalendarViewTypesObject() {
        this.Daily = 1;
        this.Weekly = 2;
        this.Monthly = 3;
        this.Yearly = 4;
        this.TaskList = 5;
    }
    return SobyCalendarViewTypesObject;
}());
var SobyCalendarViewTypes = new SobyCalendarViewTypesObject();
var soby_CalendarView = /** @class */ (function () {
    function soby_CalendarView(contentDivSelector, title, dataService, year, month, day, emptyDataHtml, idFieldName, titleFieldName, descriptionFieldName, startDateFieldName, endDateFieldName, linkFieldName, imageFieldName, width, height) {
        this.CalendarViewID = "";
        this.ContentDivSelector = "";
        this.Items = new soby_CalendarViewItems();
        this.MonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.DayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.Title = "";
        this.DataService = null;
        this.AllowMultipleSelections = true;
        this.AllowCheckBoxes = true;
        this.ViewType = 3; // 1 DAILY  --  2 WEEKLY  --  3 ONE MONTHLY  --  4 YEARLY  --  5 EVENTLY(YEARLY)
        this.EmptyDataHtml = "";
        this.IdFieldName = "";
        this.TitleFieldName = "";
        this.DescriptionFieldName = "";
        this.StartDateFieldName = "";
        this.EndDateFieldName = "";
        this.LinkFieldName = "";
        this.ImageFieldName = "";
        this.SVGImages = new soby_SVGImages();
        this.ShowNavigation = true;
        this.OnSelectionChanged = null;
        this.OnClick = null;
        this.CalendarViewID = "soby_itemselection_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.DataService = dataService;
        this.EmptyDataHtml = emptyDataHtml;
        this.IdFieldName = idFieldName;
        this.TitleFieldName = titleFieldName;
        this.DescriptionFieldName = descriptionFieldName;
        this.StartDateFieldName = startDateFieldName;
        this.EndDateFieldName = endDateFieldName;
        this.LinkFieldName = linkFieldName;
        this.ImageFieldName = imageFieldName;
        this.EnsureItemSelectionExistency();
        this.Year = year;
        this.Month = month - 1;
        this.Day = day;
        this.Width = width;
        this.Height = height;
        var calendarView = this;
        if (this.DataService != null) {
            this.DataService.ItemPopulated = function (items) {
                var calendarItems = new soby_CalendarViewItems();
                for (var i = 0; i < items.length; i++) {
                    var id = items[i][calendarView.IdFieldName];
                    var title = items[i][calendarView.TitleFieldName];
                    var description = items[i][calendarView.TitleFieldName];
                    var startDate = items[i][calendarView.StartDateFieldName];
                    var endDate = null;
                    if (calendarView.EndDateFieldName != null && calendarView.EndDateFieldName != "") {
                        endDate = items[i][calendarView.EndDateFieldName];
                    }
                    var calendarItem = new soby_CalendarViewItem(id, title, description, startDate, endDate);
                    calendarItems.push(calendarItem);
                }
                calendarView.Items = calendarItems;
                calendarView.GenerateCalendar();
            };
        }
    }
    soby_CalendarView.prototype.Initialize = function () {
        $(this.ContentDivSelector).addClass("soby_calendarview");
        $(this.ContentDivSelector).html("<div class='viewtypepanel'></div><div class='calendarviewpanel'></div>");
        if (this.ShowNavigation == true) {
            this.GenerateViewTypePanel();
            this.SetViewTypeHeaderAsSelected(this.ViewType);
        }
        this.DataService.PopulateItems(null);
    };
    soby_CalendarView.prototype.AddItem = function (id, title, description, startDate, endDate) {
        var item = new soby_CalendarViewItem(id, title, description, startDate, endDate);
        this.Items.push(item);
    };
    soby_CalendarView.prototype.GetItemData = function (calendarViewItemId) {
        for (var i = 0; i < soby_CalendarViewItems.length; i++) {
            if (soby_CalendarViewItems[i]["SobyCalendarViewItemId"] == calendarViewItemId) {
                return soby_CalendarViewItems[i];
            }
        }
        return null;
    };
    soby_CalendarView.prototype.GetItems = function (startDate, endDate) {
        var items = new soby_CalendarViewItems();
        for (var i = 0; i < this.Items.length; i++) {
            var item = this.Items[i];
            if (item.EndDate == null) {
                if (item.StartDate >= startDate && item.StartDate <= endDate) {
                    items.push(item);
                }
            }
            else {
                if ((item.StartDate >= startDate && item.StartDate <= endDate)
                    ||
                        (item.EndDate >= startDate && item.EndDate <= endDate)) {
                    items.push(item);
                }
            }
        }
        return items;
    };
    soby_CalendarView.prototype.GetDateTasks = function (startDate, endDate) {
        var sTable = "";
        var sClass = "";
        var startNo = startDate.getDay();
        if (startNo == 0) {
            startNo = 7;
        }
        var sClass = "weekday";
        var dNow = new Date();
        if (dNow.getDate() == startDate.getDate() && dNow.getMonth() == startDate.getMonth() && dNow.getFullYear() == startDate.getFullYear()) {
            sClass = "today";
        }
        else if (startNo == 6) {
            sClass = "saturday";
        }
        else if (startNo == 7) {
            sClass = "sunday";
        }
        var ul = $("<ul class='tasklist'></ul>");
        var items = this.GetItems(startDate, endDate);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var li = $("<li></li>");
            var sImage = ""; //taskValues[4] != '' ? "<img align='absmiddle' src='" + taskValues[4] + "' border=0 height=15>&nbsp;" : ''
            li.append("<a href='javascript:void(0)' title='" + item.Title + "'>" + sImage + item.Title + "</a>");
            ul.append(li);
        }
        return ul;
    };
    soby_CalendarView.prototype.GenerateViewTypePanel = function () {
        var html = "<table class='viewtypetabs'>" +
            "<td class='viewtypeheader daily'><a href='javascript:void(0)' onclick=\"soby_CalendarViews['" + this.CalendarViewID + "'].ChangeView(SobyCalendarViewTypes.Daily)\">&nbsp;&nbsp;&nbsp;Daily&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader weekly'><a href='javascript:void(0)' onclick=\"soby_CalendarViews['" + this.CalendarViewID + "'].ChangeView(SobyCalendarViewTypes.Weekly)\">&nbsp;&nbsp;&nbsp;Weekly&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader monthly'><a href='javascript:void(0)' onclick=\"soby_CalendarViews['" + this.CalendarViewID + "'].ChangeView(SobyCalendarViewTypes.Monthly)\">&nbsp;&nbsp;&nbsp;Monthly&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader yearly'><a href='javascript:void(0)' onclick=\"soby_CalendarViews['" + this.CalendarViewID + "'].ChangeView(SobyCalendarViewTypes.Yearly)\">&nbsp;&nbsp;&nbsp;Yearly&nbsp;&nbsp;&nbsp;</a></td>" +
            "<td class='viewtypeheader tasklist'><a href='javascript:void(0)' onclick=\"soby_CalendarViews['" + this.CalendarViewID + "'].ChangeView(SobyCalendarViewTypes.TaskList)\">&nbsp;&nbsp;&nbsp;Show All Events&nbsp;&nbsp;&nbsp;</a></td>" +
            "</table>";
        $(this.ContentDivSelector + " .viewtypepanel").html(html);
    };
    soby_CalendarView.prototype.ShowPopupViewSelection = function () {
        var html = "<table bgcolor=#D4D0C8 bordercolor=black border=1 cellspacing=0 cellpadding=0>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma;cursor:default' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"objToolx.fnSetVisibility('idPopup',false);soby_CalendarViews['" + this.CalendarViewID + "'].Month=" + this.Month + ";soby_CalendarViews['" + this.CalendarViewID + "'].Day=" + this.Day + ";soby_CalendarViews['" + this.CalendarViewID + "'].ViewType=1;soby_CalendarViews['" + this.CalendarViewID + "'].GenerateCalendar()\">&nbsp;&nbsp;&nbsp;Show This Day&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma;cursor:default' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"objToolx.fnSetVisibility('idPopup',false);soby_CalendarViews['" + this.CalendarViewID + "'].Month=" + this.Month + ";soby_CalendarViews['" + this.CalendarViewID + "'].Day=" + this.Day + ";soby_CalendarViews['" + this.CalendarViewID + "'].ViewType=2;soby_CalendarViews['" + this.CalendarViewID + "'].GenerateCalendar()\">&nbsp;&nbsp;&nbsp;Show This Week&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"javascript:objToolx.fnSetVisibility('idPopup',false);soby_CalendarViews['" + this.CalendarViewID + "'].Month=" + this.Month + ";soby_CalendarViews['" + this.CalendarViewID + "'].ViewType=3;soby_CalendarViews['" + this.CalendarViewID + "'].GenerateCalendar()\">&nbsp;&nbsp;&nbsp;Show This Month&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"javascript:objToolx.fnSetVisibility('idPopup',false);soby_CalendarViews['" + this.CalendarViewID + "'].ViewType=4;soby_CalendarViews['" + this.CalendarViewID + "'].GenerateCalendar()\">&nbsp;&nbsp;&nbsp;Show This Year&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "<tr><td bgcolor=#D4D0C8 style='font-size:13;font-face:tahoma' onmouseover=\"this.style.backgroundColor='MidnightBlue'\" onmouseout=\"this.style.backgroundColor='#D4D0C8';this.style.color='black'\"><a onmouseover=\"this.style.color='white'\" onmouseout=\"this.style.color='black'\" href='javascript:void(0)' onclick=\"javascript:objToolx.fnSetVisibility('idPopup',false);soby_CalendarViews['" + this.CalendarViewID + "'].ViewType=5;soby_CalendarViews['" + this.CalendarViewID + "'].GenerateCalendar()\">&nbsp;&nbsp;&nbsp;Show All Event In This Year&nbsp;&nbsp;&nbsp;</a></td></tr>" +
            "</table>";
        $(this.ContentDivSelector + " .viewtypepanel").html(html);
    };
    soby_CalendarView.prototype.SetViewTypeHeaderAsSelected = function (viewType) {
        $(".viewtypeheader").removeClass("selected");
        switch (viewType) {
            case SobyCalendarViewTypes.Daily:
                $(".viewtypeheader.daily").addClass("selected");
                break;
            case SobyCalendarViewTypes.Weekly:
                $(".viewtypeheader.weekly").addClass("selected");
                break;
            case SobyCalendarViewTypes.Monthly:
                $(".viewtypeheader.monthly").addClass("selected");
                break;
            case SobyCalendarViewTypes.Yearly:
                $(".viewtypeheader.yearly").addClass("selected");
                break;
            case SobyCalendarViewTypes.TaskList:
                $(".viewtypeheader.tasklist").addClass("selected");
                break;
        }
    };
    soby_CalendarView.prototype.ChangeView = function (viewType) {
        this.ViewType = viewType;
        this.SetViewTypeHeaderAsSelected(viewType);
        this.GenerateCalendar();
    };
    soby_CalendarView.prototype.GenerateCalendar = function () {
        switch (this.ViewType) {
            case 4: // YEARLY SHOWING
                this.ShowYearlyView();
                break;
            case 3: // MONTHLY SHOWING
                this.ShowMonthlyView();
                break;
            // 1 DAILY  --  2 WEEKLY  --  3 ONE MONTHLY  --  4 YEARLY  --  5 EVENTLY(YEARLY)
            case 1: // DAILY SHOWING
                this.ShowDailyView();
                break;
            case 2: // WEEKLY SHOWING
                this.ShowWeeklyView();
                break;
            case 5: // ALL EVENT(YEARLY) SHOWING
                this.ShowTasklistView();
                break;
        }
    };
    soby_CalendarView.prototype.ShowTasklistView = function () {
        var bookGrid = new soby_WebGrid(this.ContentDivSelector + " .calendarviewpanel", "", this.DataService, "There is no record found.");
        bookGrid.IsEditable = false;
        bookGrid.IsSelectable = false;
        bookGrid.AddColumn(this.TitleFieldName, "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        bookGrid.AddColumn(this.DescriptionFieldName, "Description", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        bookGrid.AddColumn(this.StartDateFieldName, "Start Date", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        bookGrid.AddColumn(this.EndDateFieldName, "End Date", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
        bookGrid.Initialize(true);
    };
    soby_CalendarView.prototype.ShowYearlyView = function () {
        var sTable = "";
        sTable = "<table border=2 width='100%' cellspacing=0 cellpadding=3 bordercolor='#9999CC'><tr>";
        sTable += "<tr><td class='currentdaterange' colspan='3'><a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpYear(-1)\">" + this.SVGImages.GetLeftCircle() + "</a> <a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpYear(1)\">" + this.SVGImages.GetRightCircle() + "</a><font size=2>&nbsp;" + this.Year + "</font></td></tr>";
        sTable += "</tr></table>";
        sTable += "<table border=2 width='100%' height='100%' cellspacing=0 cellpadding=3 bordercolor='#9999CC'><tr>";
        sTable += "<td id='idCalendar1'></td>";
        sTable += "<td id='idCalendar2'></td>";
        sTable += "<td id='idCalendar3'></td>";
        sTable += "<td id='idCalendar4'></td>";
        sTable += "</tr><tr>";
        sTable += "<td id='idCalendar5'></td>";
        sTable += "<td id='idCalendar6'></td>";
        sTable += "<td id='idCalendar7'></td>";
        sTable += "<td id='idCalendar8'></td>";
        sTable += "</tr><tr>";
        sTable += "<td id='idCalendar9'></td>";
        sTable += "<td id='idCalendar10'></td>";
        sTable += "<td id='idCalendar11'></td>";
        sTable += "<td id='idCalendar12'></td>";
        sTable += "</tr>";
        sTable += "</table>";
        $(this.ContentDivSelector + " .calendarviewpanel").html("<div width=" + this.Width + " height=" + this.Height + " class='soby_maintable'>" + sTable + "</div>");
        var asdxCalendar = new Array();
        for (var nX = 1; nX < 13; nX++) {
            var calendarDataSourceBuilder = new soby_WSBuilder();
            calendarDataSourceBuilder.Filters = new SobyFilters(false);
            calendarDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            calendarDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            calendarDataSourceBuilder.Filters.AddFilter("ParentId", "0", SobyFieldTypes.Number, SobyFilterTypes.Equal, false, false);
            var calendarDataService = new soby_WebServiceService(calendarDataSourceBuilder);
            calendarDataService.Transport.Read = this.DataService.Transport.Read;
            var calendarView = new soby_CalendarView("#idCalendar" + nX, "Premises", calendarDataService, this.Year, nX, this.Day, "No record", this.IdFieldName, this.TitleFieldName, this.DescriptionFieldName, this.StartDateFieldName, this.EndDateFieldName, this.LinkFieldName, this.ImageFieldName, '100%', '100%');
            calendarView.ShowNavigation = false;
            calendarView.Initialize();
            //calendarView.fnSetDayName("Pzt", "Sl", "Çrş", "Prş", "Cm", "Cmt", "Pzr");
            //calendarView.GenerateCalendar();
            /*
            calendarView.OnClick = function (calendarViewID, calendarViewItemId)
            {
                var itemData = soby_CalendarViews[calendarViewID].GetItemData(calendarViewItemId);
                $("#soby_ResultDiv").html("Clicked node '" + itemData.Title + "'");
            }
            calendarView.OnSelectionChanged = function (calendarViewID)
            {
                var selectedItems = soby_CalendarViews[calendarViewID].GetSelectedItems();
                $("#soby_ResultDiv").html("Selected nodes:");
                for (var i = 0; i < selectedItems.length; i++)
                {
                    $("#soby_ResultDiv").append(selectedItems[i].Title + ",");
                }

            }
            */
        }
    };
    soby_CalendarView.prototype.GetMonthlyViewDayCell = function (currentStartDate) {
        var currentEndDate = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), currentStartDate.getDate() + 1, 0, 0, 0, -1);
        var sDay = currentStartDate.getDate().toString();
        sDay = sDay.toString().length == 1 ? "0" + sDay.toString() : sDay.toString();
        //        var containerId = 
        var cell = $("<td valign='top' width='14%' class='" + this.GetDayHeaderClass(currentStartDate) + "' height='20%'><div align=right><a href=\"javascript:void(0)\" onclick=\"soby_CalendarViews['" + this.CalendarViewID + "'].NavigateToDate(" + currentStartDate.getFullYear() + "," + currentStartDate.getMonth() + "," + currentStartDate.getDate() + ",1)\">" + sDay + "</a></div>");
        var taskContainer = this.GetDateTasks(currentStartDate, currentEndDate);
        cell.append(taskContainer);
        return cell;
    };
    soby_CalendarView.prototype.ShowMonthlyView = function () {
        var table = $("<table width=" + this.Width + " height=" + this.Height + " class='soby_maintable'></table>");
        $(this.ContentDivSelector + " .calendarviewpanel").html("");
        $(this.ContentDivSelector + " .calendarviewpanel").append(table);
        var currentStartDate = new Date(this.Year, this.Month, 1, 0, 0, 0, 0);
        //        var currentEndDate = new Date(this.Year, this.Month, 2, 0, 0, 0, -1);
        var lastDate = new Date(this.Year, this.Month + 1, 0);
        var nLastDay = lastDate.getDate();
        var sDue = "<a style='display:none' href=\"#\" onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].ViewType=4;soby_CalendarViews['" + this.CalendarViewID + "'].GenerateCalendar()\">^</a>";
        if (this.ShowNavigation) {
            table.append("<tr><td class='currentdaterange'><a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpMonth(-1)\">" + this.SVGImages.GetLeftCircle() + "</a> <a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpMonth(1)\">" + this.SVGImages.GetRightCircle() + "</a>" + sDue + "<font size=2>&nbsp;" + this.MonthNames[currentStartDate.getMonth()] + " " + currentStartDate.getFullYear() + "</font></td></tr>");
        }
        else {
            table.append("<tr><td colspan=7 nowrap class='currentdaterange'><font size=2>" + this.MonthNames[currentStartDate.getMonth()] + " " + currentStartDate.getFullYear() + "</font></td></tr>");
        }
        table.append("<tr><td class='weekdayheader' align='center'>" + this.DayNames[0] + "</td><td class='weekdayheader' align='center'>" + this.DayNames[1] + "</td><td class='weekdayheader' align='center'>" + this.DayNames[2] + "</td><td class='weekdayheader' align='center'>" + this.DayNames[3] + "</td><td class='weekdayheader' align='center'>" + this.DayNames[4] + "</td><td class='saturdayheader' align='center'>" + this.DayNames[5] + "</td><td class='sundayheader' align='center'>" + this.DayNames[6] + "</td></tr>");
        // 0 SUNDAY TO 6 SATURDAY
        var startNo = currentStartDate.getDay();
        if (startNo == 0) {
            startNo = 7;
        }
        var row = $("<tr>");
        for (var nX = 0; nX < startNo - 1; nX++) {
            row.append("<td class='prevmonthday'>&nbsp;</td>");
        }
        for (var nX = 0; nX < 7 - (startNo - 1); nX++) {
            var cell = this.GetMonthlyViewDayCell(currentStartDate);
            row.append(cell);
            currentStartDate = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), currentStartDate.getDate() + 1, 0, 0, 0, 0);
        }
        table.append(row);
        for (var nY = 0; nY < 6; nY++) {
            if (currentStartDate > lastDate) {
                break;
            }
            row = $("<tr>");
            if (nLastDay - currentStartDate.getDate() > 6) {
                for (nX = 0; nX < 7; nX++) {
                    var cell = this.GetMonthlyViewDayCell(currentStartDate);
                    row.append(cell);
                    currentStartDate = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), currentStartDate.getDate() + 1, 0, 0, 0, 0);
                }
            }
            else {
                var nFirstNo = nLastDay - currentStartDate.getDate() + 1, nLastNo = 7 - nFirstNo;
                for (var nX = 0; nX < nFirstNo; nX++) {
                    var cell = this.GetMonthlyViewDayCell(currentStartDate);
                    row.append(cell);
                    currentStartDate = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), currentStartDate.getDate() + 1, 0, 0, 0, 0);
                }
                for (var nX = 0; nX < nLastNo; nX++) {
                    row.append("<td class='nextmonthday'>&nbsp;</td>");
                }
            }
            table.append(row);
        }
    };
    soby_CalendarView.prototype.GetDayOfTheWeek = function (currentDate, dayIndex) {
        var day = currentDate.getDay();
        var diff = currentDate.getDate() - day + (day == dayIndex ? -6 : 1); // adjust when day is sunday
        return new Date(currentDate.setDate(diff));
    };
    soby_CalendarView.prototype.GetDayHeaderClass = function (date) {
        var startNo = date.getDay();
        if (startNo == 0) {
            startNo = 7;
        }
        var className = "weekday";
        var dNow = new Date();
        if (dNow.getDate() == date.getDate() && dNow.getMonth() == date.getMonth() && dNow.getFullYear() == date.getFullYear()) {
            className = "today";
        }
        else if (startNo == 6) {
            className = "saturday";
        }
        else if (startNo == 7) {
            className = "sunday";
        }
        return className;
    };
    soby_CalendarView.prototype.ConvertDateToShortDateString = function () { };
    soby_CalendarView.prototype.ShowWeeklyView = function () {
        var today = new Date(this.Year, this.Month, this.Day, 0, 0, 0, 0);
        var firstDateOfTheWeek = this.GetDayOfTheWeek(today, 0);
        var lastDateOfTheWeek = new Date(firstDateOfTheWeek.getFullYear(), firstDateOfTheWeek.getMonth(), firstDateOfTheWeek.getDate() + 6, 0, 0, 0, 0);
        ;
        var currentDate = this.GetDayOfTheWeek(today, 0);
        var table = $("<table width= " + this.Width + " height= " + this.Height + " class='soby_maintable' ></table>");
        $(this.ContentDivSelector + " .calendarviewpanel").html("");
        $(this.ContentDivSelector + " .calendarviewpanel").append(table);
        table.append("<tr><td class='currentdaterange' colspan='6'><a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpWeek(-1)\">" + this.SVGImages.GetLeftCircle() + "</a> <a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpWeek(1)\">" + this.SVGImages.GetRightCircle() + "</a><font size=2>&nbsp;" + soby_GetFormatedDateString(firstDateOfTheWeek) + " - " + soby_GetFormatedDateString(lastDateOfTheWeek) + "</font></td></tr>");
        var row = $("<tr></tr>");
        row.append("<td>&nbsp;</td>");
        for (var i = 0; i < 7; i++) {
            var className = this.GetDayHeaderClass(currentDate);
            var cell1 = $("<td class='weeklyviewdaynameheader' width='14%'><a href=\"javascript:void(0)\" onclick=\"soby_CalendarViews['" + this.CalendarViewID + "'].NavigateToDate(" + currentDate.getFullYear() + "," + currentDate.getMonth() + "," + currentDate.getDate() + ",1)\">" + currentDate.getDate() + " " + this.DayNames[i] + "</a></td>");
            cell1.addClass(className);
            row.append(cell1);
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        }
        table.append(row);
        currentDate = this.GetDayOfTheWeek(today, 0);
        for (var i = 0; i < 24; i++) {
            var row = $("<tr></tr>");
            var timeLabel = "0" + i;
            if (i > 9) {
                timeLabel = i.toString();
            }
            currentDate = this.GetDayOfTheWeek(today, 0);
            row.append("<td class='hourlabel'>" + timeLabel + "</td>");
            for (var x = 0; x < 7; x++) {
                var currentStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), i, 0, 0, 0);
                var currentEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), i + 1, 0, 0, -1);
                var className = this.GetDayHeaderClass(currentDate);
                var cell1 = $("<td class='hourdata' valign='top'>&nbsp;</td>");
                cell1.addClass(className);
                var taskContainer = this.GetDateTasks(currentStartDate, currentEndDate);
                cell1.append(taskContainer);
                row.append(cell1);
                //                this.PopulateDateTasks("", currentDate, x, true);
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
            }
            table.append(row);
        }
    };
    soby_CalendarView.prototype.ShowDailyView = function () {
        var date = new Date(this.Year, this.Month, this.Day);
        var table = $("<table width= " + this.Width + " height= " + this.Height + " class='soby_maintable' ></table>");
        table.append("<tr><td class='currentdaterange' colspan='3'><a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpDay(-1)\">" + this.SVGImages.GetLeftCircle() + "</a> <a href='javascript:void(0)' onclick=\"javascript:soby_CalendarViews['" + this.CalendarViewID + "'].JumpDay(1)\">" + this.SVGImages.GetRightCircle() + "</a><font size=2>&nbsp;" + soby_GetFormatedDateString(date) + "</font></td></tr>");
        for (var i = 0; i < 24; i++) {
            var currentStartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0, 0);
            var currentEndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i + 1, 0, 0, -1);
            var row = $("<tr></tr>");
            var cell1 = $("<td class='hourlabel' width='10%'></td>");
            var cell2 = $("<td class='hourdata' width='90%' valign='top' colspan='4'></td>");
            var timeLabel = "0" + i;
            if (i > 9) {
                timeLabel = i.toString();
            }
            cell1.text(timeLabel);
            var taskContainer = this.GetDateTasks(currentStartDate, currentEndDate);
            cell2.append(taskContainer);
            row.append(cell1);
            row.append(cell2);
            table.append(row);
        }
        $(this.ContentDivSelector + " .calendarviewpanel").html("");
        $(this.ContentDivSelector + " .calendarviewpanel").append(table);
    };
    soby_CalendarView.prototype.JumpYear = function (yearCount) {
        var dDueDate = new Date(this.Year + yearCount, this.Month, this.Day);
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.GenerateCalendar();
    };
    soby_CalendarView.prototype.JumpMonth = function (monthCount) {
        var dDueDate = new Date(this.Year, this.Month + monthCount, this.Day);
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.GenerateCalendar();
    };
    soby_CalendarView.prototype.JumpWeek = function (weekCount) {
        var dDueDate = new Date(this.Year, this.Month, this.Day + (weekCount * 7));
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.Day = dDueDate.getDate();
        this.GenerateCalendar();
    };
    soby_CalendarView.prototype.JumpDay = function (dayCount) {
        var dDueDate = new Date(this.Year, this.Month, this.Day + (dayCount));
        this.Year = dDueDate.getFullYear();
        this.Month = dDueDate.getMonth();
        this.Day = dDueDate.getDate();
        this.GenerateCalendar();
    };
    soby_CalendarView.prototype.NavigateToDate = function (year, month, day, viewType) {
        this.Year = year;
        this.Month = month;
        this.Day = day;
        this.ViewType = viewType;
        this.GenerateCalendar();
    };
    soby_CalendarView.prototype.GetSelectedItems = function () {
        var selectedItems = new Array();
        var selectedInputs = $("input[name='checkbox_" + this.CalendarViewID + "']:checked");
        if (this.AllowCheckBoxes == false) {
            selectedInputs = $("input[name='checkbox_" + this.CalendarViewID + "']:checked");
        }
        for (var i = 0; i < selectedInputs.length; i++) {
            selectedItems[selectedItems.length] = this.GetItemData($(selectedInputs[i]).val());
        }
        return selectedItems;
    };
    soby_CalendarView.prototype.ClickNode = function (calendarViewItemId) {
        if (this.OnClick != null) {
            this.OnClick(this.CalendarViewID, calendarViewItemId);
        }
    };
    soby_CalendarView.prototype.CheckNode = function (calendarViewItemId) {
        if (this.OnSelectionChanged != null) {
            this.OnSelectionChanged(this.CalendarViewID);
        }
    };
    soby_CalendarView.prototype.EnsureItemSelectionExistency = function () {
        for (var key in soby_CalendarViews) {
            if (key == this.CalendarViewID) {
                return;
            }
        }
        soby_CalendarViews[this.CalendarViewID] = this;
    };
    return soby_CalendarView;
}());
var soby_CalendarViewItems = /** @class */ (function (_super) {
    __extends(soby_CalendarViewItems, _super);
    function soby_CalendarViewItems(items) {
        var _this = _super.call(this) || this;
        if (items) {
            _this.push.apply(_this, items);
        }
        Object.setPrototypeOf(_this, Object.create(soby_CalendarViewItems.prototype));
        return _this;
    }
    return soby_CalendarViewItems;
}(Array));
var soby_CalendarViewItem = /** @class */ (function () {
    function soby_CalendarViewItem(id, title, description, startDate, endDate) {
        this.Id = "";
        this.StartDate = null;
        this.EndDate = null;
        this.Title = "";
        this.Description = "";
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.StartDate = startDate;
        this.EndDate = endDate;
    }
    return soby_CalendarViewItem;
}());
// ************************************************************
//# sourceMappingURL=soby.ui.components.calendar.js.map