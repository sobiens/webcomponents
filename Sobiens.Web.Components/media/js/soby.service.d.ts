declare var sobyLastReturnData: any;
declare function ajaxHelper(uri: any, method: any, data: any, args: any, successCallback: any, errorCallback: any): JQueryPromise<any>;
declare enum SobyPaginationViewTypes {
    PageNumbers = 0,
    BasicButtons = 1,
    BasicButtons_PageNumbers = 2,
    AdvancedButtons = 3,
    AdvancedButtons_PageNumbers = 4,
    QuickButtons_PageNumbers = 5
}
declare enum SobyPaginationVerticalAlign {
    Left = 0,
    Center = 1,
    Right = 2
}
declare class soby_Transport {
    Read: soby_TransportRequest;
    Add: soby_TransportRequest;
    Update: soby_TransportRequest;
    Delete: soby_TransportRequest;
}
declare class soby_TransportRequest {
    constructor(url: string, dataType: string, contentType: string, type: string, includeCredentials?: boolean);
    Url: string;
    DataType: string;
    ContentType: string;
    Type: string;
    IncludeCredentials: boolean;
}
declare var soby_FilterValueSeperator: string;
declare class SobyFieldTypesObject {
    Text: number;
    Number: number;
    MultiChoice: number;
    Lookup: number;
    Boolean: number;
    Choice: number;
    ModStat: number;
    User: number;
    TaxonomyFieldType: number;
    DateTime: number;
    Integer: number;
    CurrentUserGroups: number;
    DateTimeNowDifferenceAsMinute: number;
    DateTimeRange: number;
    Object: number;
}
declare class SobyFilterTypesObject {
    Equal: number;
    NotEqual: number;
    Contains: number;
    In: number;
    Greater: number;
    Lower: number;
    GreaterEqual: number;
    LowerEqual: number;
    BeginsWith: number;
    Membership: number;
    IsNull: number;
    IsNotNull: number;
}
declare class SobyAggregateTypesObject {
    Average: number;
    Count: number;
    Max: number;
    Min: number;
    Sum: number;
    GetAggregateTypeName(aggregateType: number): "Average" | "Count" | "Max" | "Min" | "Sum";
}
declare class SobyWebServiceDataTypesObject {
    QueryString: number;
    Json: number;
    Soap: number;
}
declare var SobyWebServiceDataTypes: SobyWebServiceDataTypesObject;
declare var SobyFieldTypes: SobyFieldTypesObject;
declare var SobyFilterTypes: SobyFilterTypesObject;
declare var SobyAggregateTypes: SobyAggregateTypesObject;
interface ISobyFilter {
}
declare class SobyFilters implements ISobyFilter {
    IsOr: boolean;
    ShouldBeClearedOnUIFilterAction: boolean;
    constructor(isOr: boolean);
    Filters: any[];
    GetFiltersByFieldName(fieldName: string): any[];
    Clear(): void;
    AddFilter(fieldName: string, filterValue: string, fieldType: number, filterType: number, lookupID: boolean, shouldBeClearedOnUIFilterAction: boolean): void;
    AddFilterObject(filter: SobyFilter): void;
    AddFilterCollection(sobyFilters: SobyFilters): void;
    ToCaml(): string;
    ToXml(): string;
    ToJson(): string;
    ToQueryString(_type: number): string;
    ToSearch2010Xml(): string;
    Clone(): SobyFilters;
}
declare class SobyFilter implements ISobyFilter {
    FieldName: string;
    FilterValue: string;
    FieldType: number;
    FilterType: number;
    LookupID: boolean;
    ShouldBeClearedOnUIFilterAction: boolean;
    constructor(fieldName: string, filterValue: string, fieldType: number, filterType: number, lookupID: boolean);
    ToCaml(): string;
    ToSearch2010Xml(): string;
    ToQueryString(_type: number): string;
}
declare class SobySchemaFields extends Array<SobySchemaField> {
    constructor(items?: Array<SobySchemaField>);
    toWebAPIString(): string;
    GetByFieldName(fieldName: string): SobySchemaField;
}
declare class SobySchemaField {
    FieldName: string;
    FieldType: number;
    Args: any;
    constructor(fieldName: string, fieldType: number, args: any);
}
declare class SobyNavigationInformation {
    ViewType: SobyPaginationViewTypes;
    VerticalAlign: SobyPaginationVerticalAlign;
    PageIndex: number;
    constructor();
}
declare class SobyOrderByFields extends Array<SobyOrderByField> {
    constructor(items?: Array<SobyOrderByField>);
    GetOrderFieldByName(fieldName: string): SobyOrderByField;
    ContainsField(fieldName: string): boolean;
    ContainsFieldAsAsc(fieldName: string): boolean;
}
declare class SobyOrderByField {
    constructor(fieldName: string, isAsc: boolean);
    FieldName: string;
    IsAsc: boolean;
}
declare class SobyAggregateFields extends Array<SobyAggregateField> {
    constructor(items?: Array<SobyAggregateField>);
    ContainsField(fieldName: string): boolean;
}
declare class SobyKeyFields extends Array<SobyKeyField> {
    constructor(items?: Array<SobyKeyField>);
    ContainsField(fieldName: string): boolean;
}
declare class SobyKeyField {
    constructor(fieldName: string, parameterName: string);
    FieldName: string;
    ParameterName: string;
}
declare class SobyGroupByFields extends Array<SobyGroupByField> {
    constructor(items?: Array<SobyGroupByField>);
    ContainsField(fieldName: string): boolean;
}
declare class SobyAggregateField {
    constructor(fieldName: string, aggregateType: number);
    FieldName: string;
    AggregateType: number;
}
declare class SobyGroupByField {
    constructor(fieldName: string, isAsc: boolean, displayFunction: any);
    FieldName: string;
    IsAsc: boolean;
    DisplayFunction: any;
}
declare class SobyHeaders extends Array<SobyHeader> {
    constructor(items?: Array<SobyHeader>);
}
declare class SobyHeader {
    constructor(key: string, value: string);
    Key: string;
    Value: string;
}
declare class SobyArguments extends Array<SobyArgument> {
    constructor(items?: Array<SobyArgument>);
    ToJson(): string;
    ToQueryString(): string;
    Clone(): any;
}
declare class SobyArgument {
}
interface soby_ServiceInterface {
    DataSourceBuilder: soby_DataSourceBuilderAbstract;
    PageIndex: number;
    StartIndex: number;
    EndIndex: number;
    NextPageString: string;
    NextPageExist: boolean;
    Args: Array<any>;
    Transport: soby_Transport;
    GroupBy(orderFields: SobyGroupByFields): any;
    Sort(orderFields: SobyOrderByFields): any;
    Filter(filters: SobyFilters, clearOtherFilters: boolean): any;
    SortAndFilter(orderFields: SobyOrderByFields, filters: SobyFilters, clearOtherFilters: boolean): any;
    GoToPage(pageIndex: number): any;
    CanNavigateToNextPage(): any;
    CanNavigateToPreviousPage(): any;
    PopulateNavigationInformation(): any;
    NavigationInformationBeingPopulated(): any;
    NavigationInformationPopulated(): any;
    PopulateItems(args: Array<any>): any;
    GetFieldNames(): any;
    ItemPopulated(items: Array<soby_Item>): any;
    ItemBeingPopulated(): any;
    ErrorThrown(errorMessage: string, errorTypeName: string): any;
    UpdateItem(keyNames: Array<string>, keyValues: Array<string>, objectInstance: any): any;
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>): any;
    AddItem(objectInstance: any): any;
    ItemUpdated(args: any): any;
    ItemAdded(args: any): any;
    ItemDeleted(args: any): any;
    SetRowLimit(rowLimit: number): any;
}
interface soby_DataSourceBuilderInterface {
    ViewName: string;
    RowLimit: number;
    ItemCount: number;
    PageIndex: number;
    NextPageString: string;
}
declare abstract class soby_DataSourceBuilderAbstract implements soby_DataSourceBuilderInterface {
    ViewName: string;
    RowLimit: number;
    ItemCount: number;
    PageIndex: number;
    NextPageString: string;
    NextPageExist: boolean;
    Filters: SobyFilters;
    SchemaFields: SobySchemaFields;
    OrderByFields: SobyOrderByFields;
    Arguments: SobyArguments;
    Headers: SobyHeaders;
    constructor();
    GetViewField(fieldName: string): SobySchemaField;
    GetViewFieldByPropertyName(propertyName: string): SobySchemaField;
    AddHeader(key: string, value: string): void;
    AddSchemaField(fieldName: string, fieldType: number, args: any): void;
    AddOrderField(fieldName: string, isAsc: boolean): void;
    AddOrderFields(orderFields: SobyOrderByFields): void;
    GetCountQuery(transport: soby_TransportRequest): string;
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: any): string;
    Clone(): soby_DataSourceBuilderAbstract;
    CountQueryBeingGenerated(): void;
    MainQueryBeingGenerated(): void;
    CountQueryGenerated: any;
    MainQueryGenerated: any;
    DataBeingParsed(data: any, parseCompleted: boolean): Array<soby_Item>;
    ParseData(value: string): Array<soby_Item>;
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any, contentType: any, includeCredentials: any): void;
}
declare class soby_Filter {
    FieldName: string;
    Value: string;
    FieldType: number;
    FilterType: number;
    LookupID: boolean;
}
declare class soby_Item {
}
declare class soby_WebServiceService implements soby_ServiceInterface {
    DataSourceBuilder: soby_DataSourceBuilderAbstract;
    constructor(dataSourceBuilder: soby_DataSourceBuilderAbstract);
    NextPageString: string;
    PageIndex: number;
    StartIndex: number;
    EndIndex: number;
    NextPageStrings: Array<string>;
    Args: Array<any>;
    Filters: SobyFilters;
    GroupByFields: SobyGroupByFields;
    OrderByFields: SobyOrderByFields;
    NextPageExist: boolean;
    Transport: soby_Transport;
    ItemBeingPopulated: () => void;
    SetRowLimit(rowLimit: number): void;
    PopulateNavigationInformation(): void;
    NavigationInformationBeingPopulated(): void;
    NavigationInformationPopulated(): void;
    GroupBy(groupByFields: SobyGroupByFields): void;
    Sort(orderByFields: SobyOrderByFields): void;
    Filter(filters: SobyFilters, clearOtherFilters: boolean): void;
    SortAndFilter(orderByFields: SobyOrderByFields, filters: SobyFilters, clearOtherFilters: boolean): void;
    GoToPage(pageIndex: number): void;
    CanNavigateToNextPage(): boolean;
    CanNavigateToPreviousPage(): boolean;
    GetQueriesAppliedDataSourceBuilder(): soby_DataSourceBuilderAbstract;
    PopulateItems(args: Array<any>): void;
    Parse(): void;
    GetFieldNames(): any[];
    ItemPopulated(items: Array<soby_Item>): void;
    ErrorThrown(errorMessage: string, errorTypeName: string): void;
    UpdateItem(keyNames: Array<string>, keyValues: Array<string>, objectInstance: any): void;
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>): void;
    AddItem(objectInstance: any): void;
    ItemUpdated(args: any): void;
    ItemAdded(args: any): void;
    ItemDeleted(args: any): void;
}
declare class soby_StaticDataBuilder extends soby_DataSourceBuilderAbstract {
    constructor();
    Clone(): soby_WSBuilder;
    GetPagingQuery(transport: soby_TransportRequest): string;
    GetViewFieldsQuery(transport: soby_TransportRequest): string;
    GetOrderByFieldsQuery(transport: soby_TransportRequest): string;
    GetWhereQuery(transport: soby_TransportRequest): string;
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: boolean): string;
    GetCountQuery(transport: soby_TransportRequest): string;
    ParseData(result: any): any;
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any, includeCredentials: any): void;
}
declare class soby_StaticDataService implements soby_ServiceInterface {
    DataSourceBuilder: soby_DataSourceBuilderAbstract;
    DataSourceBuilderTemp: soby_DataSourceBuilderAbstract;
    constructor(fields: Array<SobySchemaField>, items: Array<soby_Item>);
    Items: Array<soby_Item>;
    NextPageString: string;
    PageIndex: number;
    StartIndex: number;
    EndIndex: number;
    NextPageStrings: Array<string>;
    Args: Array<any>;
    Filters: SobyFilters;
    GroupByFields: SobyGroupByFields;
    OrderByFields: SobyOrderByFields;
    NextPageExist: boolean;
    Transport: soby_Transport;
    GroupBy(groupByFields: SobyGroupByFields): void;
    NavigationInformationBeingPopulated(): void;
    NavigationInformationPopulated(): void;
    ItemPopulated(items: Array<soby_Item>): void;
    ItemBeingPopulated(): void;
    ErrorThrown(errorMessage: string): void;
    ItemUpdated(args: any): void;
    ItemAdded(args: any): void;
    ItemDeleted(args: any): void;
    SetRowLimit(rowLimit: number): void;
    PopulateNavigationInformation(): void;
    Sort(orderByFields: SobyOrderByFields): void;
    Filter(filters: SobyFilters, clearOtherFilters: boolean): void;
    SortAndFilter(orderByFields: SobyOrderByFields, filters: SobyFilters, clearOtherFilters: boolean): void;
    GoToPage(pageIndex: number): void;
    CanNavigateToNextPage(): boolean;
    CanNavigateToPreviousPage(): boolean;
    PopulateItems(args: Array<any>): void;
    CheckIfMatchFilter(value: any, filter: any): boolean;
    CheckIfMatchFilters(item: soby_Item, filters: SobyFilters): boolean;
    GetFieldNames(): any[];
    UpdateItem(keyNames: Array<string>, keyValues: Array<string>, objectInstance: any): void;
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>): void;
    AddItem(objectInstance: any): void;
}
declare function WSArgument(fieldName: any, filterValue: any): void;
declare function WSHeader(key: any, value: any): void;
declare class soby_WSBuilder extends soby_DataSourceBuilderAbstract {
    WebServiceDataTypes: number;
    MethodName: string;
    CountQuerySupported: boolean;
    constructor();
    Clone(): soby_WSBuilder;
    GetPagingQuery(transport: soby_TransportRequest): string;
    GetViewFieldsQuery(transport: soby_TransportRequest): string;
    GetOrderByFieldsQuery(transport: soby_TransportRequest): string;
    GetWhereQuery(transport: soby_TransportRequest): string;
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: boolean): string;
    GetCountQuery(transport: soby_TransportRequest): string;
    ParseData(result1: any): any;
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any, contentType: any, includeCredentials: any): void;
}
declare var soby_guid: () => string;
declare function soby_LogMessage(message: any): void;
declare function soby_DateToIso(d: any): string;
declare function soby_DateFromISO(d: any): Date;
declare function soby_GetFormatedDateString(date: any): any;
declare function soby_GetDateWithFormat(dateString: any, format: any): Date;
declare function soby_TicksFromDate(date: any): number;
declare function soby_DateFromTicks(ticks: any): Date;
declare function soby_IsNullOrEmpty(value: any): boolean;
