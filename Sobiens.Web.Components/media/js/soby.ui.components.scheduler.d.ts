declare var soby_Schedulers: any[];
declare class SobySchedulerViewTypesObject {
    Daily: number;
    Weekly: number;
    Monthly: number;
    Yearly: number;
    TaskList: number;
    CustomDates: number;
    AllData: number;
}
declare var SobySchedulerTypes: SobySchedulerViewTypesObject;
declare class SobySchedulerDataItemStatusObject {
    None: number;
    Added: number;
    Modified: number;
    Deleted: number;
}
declare var SobySchedulerDataItemStatuses: SobySchedulerDataItemStatusObject;
declare function soby_RemoveNoneExistenceScheduler(): void;
declare function soby_GetActiveScheduler(): soby_Scheduler;
declare function soby_GetAllSchedulers(): any[];
declare class soby_Scheduler {
    constructor(contentDivSelector: any, title: string, categoriesTitle: string, year: number, month: number, day: number, emptyDataHtml: any, idFieldName: any, titleFieldName: any, descriptionFieldName: any, startDateFieldName: any, endDateFieldName: any, linkFieldName: any, imageFieldName: any, width: number, height: number);
    SchedulerID: string;
    ContentDivSelector: string;
    MonthNames: Array<string>;
    DayNames: Array<string>;
    Title: string;
    CategoriesTitle: string;
    ScheduleItems: soby_ScheduleItems;
    OriginalScheduleItems: soby_ScheduleItems;
    ChangedScheduleItems: soby_ScheduleItems;
    ScheduleCategories: soby_ScheduleCategories;
    AllowMultipleSelections: boolean;
    AllowCheckBoxes: boolean;
    ViewType: number;
    EmptyDataHtml: string;
    IdFieldName: string;
    TitleFieldName: string;
    DescriptionFieldName: string;
    StartDateFieldName: string;
    EndDateFieldName: string;
    SchedulerTableStartDate: Date;
    SchedulerTableEndDate: Date;
    SchedulerTableTotalDays: number;
    LinkFieldName: string;
    ImageFieldName: string;
    ImagesFolderUrl: string;
    MinuteWidthWeight: number;
    CellHeight: number;
    SingleTimeHeadingDurationAsMinute: number;
    SingleScheduleItemDurationAsMinute: number;
    Year: number;
    Month: number;
    Day: number;
    Width: number;
    Height: number;
    ShowNavigation: boolean;
    IsDateChangeAllowed: boolean;
    IsCategoryChangeAllowed: boolean;
    IsInDragState: boolean;
    Initialize(): void;
    /**
 * Activates the grid.
 * @example
 * // Activates the grid
 * grid.Activate();
 */
    Activate(): void;
    GenerateCategoriesTable(): void;
    AddItem(id: string, title: string, description: string, categoryId: string, startDate: Date, endDate: Date): soby_ScheduleItem;
    AddCategory(id: string, title: string): soby_ScheduleCategory;
    GetItemData(calendarViewItemId: any): soby_ScheduleItem;
    GetItems(startDate: Date, endDate: Date): soby_ScheduleItems;
    GetDateTasks(startDate: Date, endDate: Date): JQuery;
    GenerateViewTypePanel(): void;
    ShowPopupViewSelection(): void;
    SetViewTypeHeaderAsSelected(viewType: number): void;
    ChangeView(viewType: number): void;
    GenerateScheduler(): void;
    ShowTasklistView(): void;
    GetDayOfTheWeek(currentDate: any, dayIndex: any): Date;
    GetDayHeaderClass(date: any): string;
    ShowFifteenMinutesView(): void;
    GetSchedulerItemTableWidth(): number;
    PopulateCategoryRows(): void;
    PopulateScheduleItemElements(): void;
    DrawScheduleItemElement(itemIndex: number, scheduleItem: soby_ScheduleItem): void;
    ChangeScheduleDataItemStatus(dataItem: soby_ScheduleItem, status: number): void;
    GetCategoryTimeRow(categoryId: any): JQuery;
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
declare class soby_ScheduleCategories extends Array<soby_ScheduleCategory> {
    GetCategoryById(categoryId: any): any;
}
declare class soby_ScheduleItems extends Array<soby_ScheduleItem> {
    Clone(): soby_ScheduleItems;
    GetItemById(id: any): soby_ScheduleItem;
    GetItemsByCategoryId(categoryId: any): soby_ScheduleItems;
}
declare class soby_ScheduleItem {
    constructor(id: string, title: string, description: string, categoryId: string, startDate: Date, endDate: Date);
    Id: string;
    Title: string;
    Description: string;
    CategoryId: string;
    StartDate: Date;
    EndDate: Date;
    DataItemStatus: number;
    Clone(): soby_ScheduleItem;
}
declare class soby_ScheduleCategory {
    constructor(id: string, title: string);
    Id: string;
    Title: string;
    CanContainScheduleItems: boolean;
    SubCategories: soby_ScheduleCategories;
    AddCategory(id: string, title: string): void;
}
