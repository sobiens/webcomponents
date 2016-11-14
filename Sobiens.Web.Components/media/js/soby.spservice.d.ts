declare class soby_SharePointService implements soby_ServiceInterface {
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
declare class soby_SPRestBuilder extends soby_WSBuilder {
    Clone(): soby_SPRestBuilder;
    GetWhereQuery(transport: soby_TransportRequest): string;
}
declare function soby_CamlBuilder(listName: any, viewName: any, rowLimit: any, webUrl: any): void;
declare var sobyObject: () => void;
declare var soby: any;
