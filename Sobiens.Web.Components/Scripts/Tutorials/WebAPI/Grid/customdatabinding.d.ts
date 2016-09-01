declare class soby_CustomWCFBuilder extends soby_WSBuilder {
    constructor();
    Clone(): soby_CustomWCFBuilder;
    GetPagingQuery(transport: soby_TransportRequest): string;
    GetViewFieldsQuery(transport: soby_TransportRequest): string;
    GetOrderByFieldsQuery(transport: soby_TransportRequest): string;
    GetWhereQuery(transport: soby_TransportRequest): string;
    GetMainQuery(transport: soby_TransportRequest): string;
    GetCountQuery(transport: soby_TransportRequest): any;
    ParseData(result: any): any;
    GetData(data: any, callback: any, errorcallback: any, completecallback: any, async: any, wsUrl: any, headers: any, requestMethod: any, dataType: any): void;
}
declare function soby_PopulateGridWCFDataBinding(): void;
