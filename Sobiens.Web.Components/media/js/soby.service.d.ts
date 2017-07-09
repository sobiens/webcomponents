declare function ajaxHelper(uri: any, method: any, data: any, args: any, successCallback: any, errorCallback: any): JQueryPromise<any>;
declare class soby_Transport {
    Read: soby_TransportRequest;
    Add: soby_TransportRequest;
    Update: soby_TransportRequest;
    Delete: soby_TransportRequest;
}
declare class soby_TransportRequest {
    constructor(url: string, dataType: string, contentType: string, type: string);
    Url: string;
    DataType: string;
    ContentType: string;
    Type: string;
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
    GetAggregateTypeName(aggregateType: number): string;
}
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
    Clear(): void;
    AddFilter(fieldName: string, filterValue: string, fieldType: number, filterType: number, lookupID: boolean, shouldBeClearedOnUIFilterAction: boolean): void;
    AddFilterObject(filter: SobyFilter): void;
    AddFilterCollection(sobyFilters: SobyFilters): void;
    ToCaml(): string;
    ToXml(): string;
    ToJson(): string;
    ToQueryString(_type: number): string;
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
    ToQueryString(_type: number): string;
}
declare class SobySchemaFields extends Array<SobySchemaField> {
    toWebAPIString(): string;
}
declare class SobySchemaField {
    FieldName: string;
    FieldType: number;
    Args: any;
    constructor(fieldName: string, fieldType: number, args: any);
}
declare class SobyOrderByFields extends Array<SobyOrderByField> {
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
    ContainsField(fieldName: string): boolean;
}
declare class SobyGroupByFields extends Array<SobyGroupByField> {
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
}
declare class SobyHeader {
    constructor(key: string, value: string);
    Key: string;
    Value: string;
}
declare class SobyArguments extends Array<SobyArgument> {
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
    ErrorThrown(errorMessage: string): any;
    UpdateItem(key: string, objectInstance: any): any;
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>): any;
    AddItem(objectInstance: any): any;
    ItemUpdated(args: any): any;
    ItemAdded(args: any): any;
    ItemDeleted(args: any): any;
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
    GetViewField(fieldName: string): SobySchemaField;
    GetViewFieldByPropertyName(propertyName: string): SobySchemaField;
    AddHeader(key: string, value: string): void;
    AddSchemaField(fieldName: string, fieldType: number, args: any): void;
    AddOrderField(fieldName: string, isAsc: boolean): void;
    AddOrderFields(orderFields: SobyOrderByFields): void;
    GetCountQuery(transport: soby_TransportRequest): string;
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: any): string;
    Clone(): soby_DataSourceBuilderAbstract;
    ParseData(value: string): Array<soby_Item>;
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any): void;
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
    DataSourceBuilderTemp: soby_DataSourceBuilderAbstract;
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
    PopulateItems(args: Array<any>): void;
    Parse(): void;
    GetFieldNames(): any[];
    ItemPopulated(items: Array<soby_Item>): void;
    ItemBeingPopulated(): void;
    ErrorThrown(errorMessage: string): void;
    UpdateItem(key: string, objectInstance: any): void;
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
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any): void;
}
declare class soby_StaticDataService implements soby_ServiceInterface {
    DataSourceBuilder: soby_DataSourceBuilderAbstract;
    DataSourceBuilderTemp: soby_DataSourceBuilderAbstract;
    constructor(dataSourceBuilder: soby_StaticDataBuilder, items: Array<soby_Item>);
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
    PopulateNavigationInformation(): void;
    Sort(orderByFields: SobyOrderByFields): void;
    Filter(filters: SobyFilters, clearOtherFilters: boolean): void;
    SortAndFilter(orderByFields: SobyOrderByFields, filters: SobyFilters, clearOtherFilters: boolean): void;
    GoToPage(pageIndex: any): void;
    CanNavigateToNextPage(): boolean;
    CanNavigateToPreviousPage(): boolean;
    PopulateItems(args: Array<any>): void;
    GetFieldNames(): any[];
    UpdateItem(key: string, objectInstance: any): void;
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>): void;
    AddItem(objectInstance: any): void;
}
declare function WSArgument(fieldName: any, filterValue: any): void;
declare function WSHeader(key: any, value: any): void;
declare class soby_WSBuilder extends soby_DataSourceBuilderAbstract {
    constructor();
    Clone(): soby_WSBuilder;
    GetPagingQuery(transport: soby_TransportRequest): string;
    GetViewFieldsQuery(transport: soby_TransportRequest): string;
    GetOrderByFieldsQuery(transport: soby_TransportRequest): string;
    GetWhereQuery(transport: soby_TransportRequest): string;
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: boolean): string;
    GetCountQuery(transport: soby_TransportRequest): string;
    ParseData(result: any): any;
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any): void;
}
declare var soby_guid: () => string;
declare function soby_LogMessage(message: any): void;
declare function soby_DateToIso(d: any): string;
declare function soby_DateFromISO(d: any): Date;
declare function soby_GetFormatedDateString(date: any): any;
