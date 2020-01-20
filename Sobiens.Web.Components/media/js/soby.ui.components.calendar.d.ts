declare var soby_CalendarViews: any[];
declare class SobyCalendarViewTypesObject {
    Daily: number;
    Weekly: number;
    Monthly: number;
    Yearly: number;
    TaskList: number;
}
declare var SobyCalendarViewTypes: SobyCalendarViewTypesObject;
declare class soby_CalendarView {
    constructor(contentDivSelector: any, title: any, dataService: any, year: number, month: number, day: number, emptyDataHtml: any, idFieldName: any, titleFieldName: any, descriptionFieldName: any, startDateFieldName: any, endDateFieldName: any, linkFieldName: any, imageFieldName: any, width: string, height: string);
    CalendarViewID: string;
    ContentDivSelector: string;
    Items: soby_CalendarViewItems;
    MonthNames: Array<string>;
    DayNames: Array<string>;
    Title: string;
    DataService: soby_ServiceInterface;
    AllowMultipleSelections: boolean;
    AllowCheckBoxes: boolean;
    ViewType: number;
    EmptyDataHtml: string;
    IdFieldName: string;
    TitleFieldName: string;
    DescriptionFieldName: string;
    StartDateFieldName: string;
    EndDateFieldName: string;
    LinkFieldName: string;
    ImageFieldName: string;
    ImagesFolderUrl: string;
    Year: number;
    Month: number;
    Day: number;
    Width: string;
    Height: string;
    ShowNavigation: boolean;
    Initialize(): void;
    AddItem(id: string, title: string, description: string, startDate: Date, endDate: Date): void;
    GetItemData(calendarViewItemId: any): any;
    GetItems(startDate: Date, endDate: Date): soby_CalendarViewItems;
    GetDateTasks(startDate: Date, endDate: Date): JQuery;
    GenerateViewTypePanel(): void;
    ShowPopupViewSelection(): void;
    SetViewTypeHeaderAsSelected(viewType: number): void;
    ChangeView(viewType: number): void;
    GenerateCalendar(): void;
    ShowTasklistView(): void;
    ShowYearlyView(): void;
    GetMonthlyViewDayCell(currentStartDate: any): JQuery;
    ShowMonthlyView(): void;
    GetDayOfTheWeek(currentDate: any, dayIndex: any): Date;
    GetDayHeaderClass(date: any): string;
    ConvertDateToShortDateString(): void;
    ShowWeeklyView(): void;
    ShowDailyView(): void;
    JumpYear(yearCount: any): void;
    JumpMonth(monthCount: any): void;
    JumpWeek(weekCount: any): void;
    JumpDay(dayCount: any): void;
    NavigateToDate(year: number, month: number, day: number, viewType: number): void;
    GetSelectedItems(): any[];
    ClickNode(calendarViewItemId: any): void;
    CheckNode(calendarViewItemId: any): void;
    EnsureItemSelectionExistency(): void;
    OnSelectionChanged: any;
    OnClick: any;
}
declare class soby_CalendarViewItems extends Array<soby_CalendarViewItem> {
    constructor(items?: Array<soby_CalendarViewItem>);
}
declare class soby_CalendarViewItem {
    constructor(id: string, title: string, description: string, startDate: Date, endDate: Date);
    Id: string;
    StartDate: Date;
    EndDate: Date;
    Title: string;
    Description: string;
}
