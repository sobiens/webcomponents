declare class soby_SharePointService implements soby_ServiceInterface {
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
    PopulateItems(args: Array<any>): void;
    Parse(): void;
    GetFieldNames(): any[];
    ItemPopulated(items: Array<soby_Item>): void;
    ItemBeingPopulated(): void;
    ErrorThrown(errorMessage: string, errorTypeName: string): void;
    UpdateItem(keyNames: Array<string>, keyValues: Array<string>, objectInstance: any): void;
    DeleteItem(keyNames: Array<string>, keyValues: Array<string>): void;
    AddItem(objectInstance: any): void;
    ItemUpdated(args: any): void;
    ItemAdded(args: any): void;
    ItemDeleted(args: any): void;
}
declare class soby_SPSearchBuilder extends soby_WSBuilder {
    SourceId: string;
    Clone(): soby_SPSearchBuilder;
    GetWhereQuery(transport: soby_TransportRequest): string;
    GetViewFieldsQuery(transport: soby_TransportRequest): string;
    GetPagingQuery(transport: soby_TransportRequest): string;
    ParseData(result1: any): any[];
    GetCountQuery(request: soby_TransportRequest): any;
}
declare class soby_SPSearch2010Builder extends soby_WSBuilder {
    Scope: string;
    IsDocument: boolean;
    Clone(): soby_SPSearch2010Builder;
    GetWhereQuery(transport: soby_TransportRequest): string;
    GetViewFieldsQuery(transport: soby_TransportRequest): string;
    GetPagingQuery(transport: soby_TransportRequest): string;
    GetMainQuery(transport: soby_TransportRequest, excludePagingQuery: boolean): string;
    ParseData(result1: any): any[];
    GetCountQuery(request: soby_TransportRequest): any;
}
declare class soby_SPRestBuilder extends soby_WSBuilder {
    Clone(): soby_SPRestBuilder;
    GetWhereQuery(transport: soby_TransportRequest): string;
}
declare class soby_SPCSOMBuilder extends soby_SPRestBuilder {
    ListTitle: string;
    SiteUrl: string;
    UseViewFields: boolean;
    Clone(): soby_SPCSOMBuilder;
    GetCountQuery(request: soby_TransportRequest): any;
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any): void;
}
declare function soby_CamlBuilder(listName: any, viewName: any, rowLimit: any, webUrl: any): void;
declare class sobySPListsObject {
    ApproveListItem(siteUrl: any, listName: any, id: any, callbackFunction: any): void;
    DeleteFile(siteUrl: any, fileSiteRelativeUrl: any, args: any, successCallbackFunction: any, errorCallbackFunction: any): void;
    DeleteItem(siteUrl: any, libraryName: any, itemId: any, successCallbackFunction: any, errorCallbackFunction: any, args: any): void;
    RecycleFile(siteUrl: any, fileSiteRelativeUrl: any, args: any, successCallbackFunction: any, errorCallbackFunction: any): void;
    GetListProperties(webUrl: any, listName: any, callbackFunction: any): void;
    GetListItem(siteUrl: any, listName: any, listItemId: any, callBackFunction: any, _arguments: any): void;
    UpdateList(siteUrl: any, listName: any, listProperties: any, callBackFunction: any, _arguments: any): void;
    UpdateItem(webUrl: any, listName: any, itemID: any, dataFields: any, successCallbackFunction: any, errorCallbackFunction: any, isAsync: any, argumentsx: any): void;
    UploadFile(siteUrl: any, sourceFileUrl: any, destinationFileUrl: any, fieldValues: any, callBackFunction: any, _arguments: any, isAsync: any): void;
    GetLists(siteUrl: any, callbackFunction: any): void;
    GetListAndView(siteUrl: any, listName: any, viewName: any, callbackFunction: any): void;
    GetListFields(siteUrl: any, listName: any): any[];
    CreateList(siteUrl: any, listName: any, templateID: any): void;
    CheckOutFile(siteUrl: any, fileUrl: any, callbackFunction: any, _arguments: any, isAsync: any): void;
    CheckInFile(siteUrl: any, fileUrl: any, comment: any, checkinType: any, callbackFunction: any, _arguments: any, isAsync: any): void;
    UpdateFieldsToList(addAction: any, siteUrl: any, listTemplate: any, fieldTemplates: any, successCallBack: any, errorCallBack: any): void;
    GetListItemAttachments(listName: any, listItemId: any, callbackFunction: any, webUrl: any): void;
}
declare class sobySPUserGroupObject {
    GetGroupInfo(siteUrl: any, groupName: any, callbackFunction: any, async: any, args: any): void;
    CheckGroupContainsUser(siteUrl: any, groupName: any, userId: any, callbackFunction: any, async: any): void;
    CheckUserRolesAndPermissions(siteUrl: any, callbackFunction: any): void;
    GetRolesAndPermissionsForCurrentUser(siteUrl: any, callbackFunction: any): void;
}
declare class sobySPWebsObject {
    GetSites(siteUrl: any, callbackFunction: any): void;
}
declare class sobySPSitesObject {
    CreateSubSite(siteUrl: any, subSiteUrl: any, title: any, callBackFunction: any, _arguments: any): void;
}
declare class sobySPViewsObject {
    GetViews(siteUrl: any, listName: any, callbackFunction: any): void;
}
declare class sobySPWebPartPagesObject {
    AddContentEditorWebPart(siteUrl: any, pageUrl: any, properties: any, callBackFunction: any, _arguments: any): void;
}
declare class sobySPVersionsObject {
    GetVersions(siteUrl: any, filename: any, callbackFunction: any): void;
    GetVersionCollection(siteUrl: any, listID: any, itemID: any, fieldName: any, callbackFunction: any): void;
}
declare class sobySPLibraryObject {
    GetData: (soapEnv: any, callback: any, errorcallback: any, completecallback: any, async: any, siteUrl: any, argsx: any) => void;
    Lists: sobySPListsObject;
    UserGroup: sobySPUserGroupObject;
    Webs: sobySPWebsObject;
    Sites: sobySPSitesObject;
    Views: sobySPViewsObject;
    WebPartPages: sobySPWebPartPagesObject;
    Versions: sobySPVersionsObject;
}
declare class sobyObject {
    SPLibrary: sobySPLibraryObject;
}
declare var soby: sobyObject;
