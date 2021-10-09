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
var soby_CustomWCFBuilder = /** @class */ (function (_super) {
    __extends(soby_CustomWCFBuilder, _super);
    function soby_CustomWCFBuilder() {
        var _this = _super.call(this) || this;
        _this.RowLimit = 100;
        return _this;
    }
    soby_CustomWCFBuilder.prototype.Clone = function () {
        var builder = new soby_CustomWCFBuilder();
        builder.RowLimit = this.RowLimit;
        for (var i = 0; i < this.SchemaFields.length; i++) {
            var viewField = this.SchemaFields[i];
            builder.AddSchemaField(viewField.FieldName, viewField.FieldType, viewField.Args);
        }
        for (var i = 0; i < this.Headers.length; i++) {
            var header = this.Headers[i];
            builder.AddHeader(header.Key, header.Value);
        }
        for (var i = 0; i < this.OrderByFields.length; i++) {
            var orderByField = this.OrderByFields[i];
            builder.AddOrderField(orderByField.FieldName, orderByField.IsAsc);
        }
        //builder.Arguments = this.Arguments != null ? this.Arguments.Clone() : null;
        return builder;
    };
    soby_CustomWCFBuilder.prototype.GetPagingQuery = function (transport) {
        if (transport.Type == "POST")
            return "'pageIndex': " + this.PageIndex + ","
                + "'pageItemCount': " + this.RowLimit;
        else {
            return "pageIndex=" + this.PageIndex + "&pageItemCount=" + this.RowLimit;
        }
    };
    soby_CustomWCFBuilder.prototype.GetViewFieldsQuery = function (transport) {
        return "";
    };
    soby_CustomWCFBuilder.prototype.GetOrderByFieldsQuery = function (transport) {
        var jsonString = "";
        for (var i = 0; i < this.OrderByFields.length; i++) {
            jsonString += this.OrderByFields[i].FieldName + " " + (this.OrderByFields[i].IsAsc == true ? "asc" : "desc") + ",";
        }
        if (jsonString != "")
            jsonString = jsonString.substr(0, jsonString.length - 1);
        if (transport.Type == "POST") {
            if (jsonString == "")
                jsonString = "null";
            jsonString = "'sort': \"" + jsonString + "\"";
        }
        else
            jsonString = "sort=" + jsonString;
        return jsonString;
    };
    soby_CustomWCFBuilder.prototype.GetWhereQuery = function (transport) {
        var query = "";
        if (transport.Type == "POST") {
            query = this.Filters.ToJson();
        }
        else {
            query = this.Filters.ToQueryString(0);
            if (query != "")
                query = "filter=" + query;
        }
        return query;
    };
    soby_CustomWCFBuilder.prototype.GetMainQuery = function (transport) {
        var selectFieldsEnvelope = this.GetViewFieldsQuery(transport);
        var whereQuery = this.GetWhereQuery(transport);
        var orderByFieldsQuery = this.GetOrderByFieldsQuery(transport);
        var pagingQuery = this.GetPagingQuery(transport);
        if (transport.Type == "POST") {
            return "{" + whereQuery + ", " + orderByFieldsQuery + ", " + pagingQuery + "}";
        }
        else {
            var envelope = whereQuery;
            if (envelope != "" && selectFieldsEnvelope != "")
                envelope += "&";
            envelope += selectFieldsEnvelope;
            if (envelope != "" && orderByFieldsQuery != "")
                envelope += "&";
            envelope += orderByFieldsQuery;
            if (envelope != "" && pagingQuery != "")
                envelope += "&";
            envelope += pagingQuery;
            return envelope;
        }
    };
    soby_CustomWCFBuilder.prototype.GetCountQuery = function (transport) {
        return null;
    };
    soby_CustomWCFBuilder.prototype.ParseData = function (result) {
        /*
        for (var i = 0; i < result.length; i++) {
            for (var x = 0; x < this.SchemaFields.length; x++) {
                if (this.SchemaFields[x].FieldType == SobyFieldTypes.DateTime) {
                    var propertyName = this.SchemaFields[x].FieldName;
                    var value = result[i][propertyName];
                    if (value != null && value != "")
                        result[i][propertyName] = new Date(value.match(/\d+/)[0] * 1);
                }
            }
        }
        */
        this.NextPageExist = result.NextPageExist;
        //        this.
        return result.Data;
    };
    soby_CustomWCFBuilder.prototype.GetData = function (data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType) {
        if (requestMethod == null || requestMethod == "")
            requestMethod = "POST";
        $.ajax({
            async: (async != null ? async : true),
            url: wsUrl,
            type: requestMethod,
            dataType: dataType,
            data: data,
            processData: false,
            contentType: "application/json; charset=utf-8",
            complete: function (XMLHttpRequest) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (errorcallback)
                    errorcallback(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function (data) {
                var data = data;
                if (data.d != null)
                    data = data.d;
                if (callback)
                    callback(data);
            },
            beforeSend: function (xhr) {
                if (headers == null)
                    return;
                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].Key, headers[i].Value);
                }
            }
        });
    };
    ;
    return soby_CustomWCFBuilder;
}(soby_WSBuilder));
$(function () {
    soby_PopulateGridWCFDataBinding();
});
function soby_PopulateGridWCFDataBinding() {
    var customerDataSourceBuilder = new soby_CustomWCFBuilder();
    customerDataSourceBuilder.Filters = new SobyFilters(false);
    customerDataSourceBuilder.AddSchemaField("ID", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("FirstName", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.AddSchemaField("LastName", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Age", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Sex", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.RowLimit = 3;
    //    customerDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
    var customerService = new soby_WebServiceService(customerDataSourceBuilder);
    customerService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWCFUrl() + "/Customers", "json", "application/json; charset=utf-8", "GET");
    var customerGrid = new soby_WebGrid("#soby_CustomersDiv", "Customers", customerService, "There is no record found.");
    customerGrid.IsEditable = false;
    customerGrid.IsSelectable = false;
    customerGrid.AddKeyField("ID", "ID");
    customerGrid.AddColumn("FirstName", "FirstName", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddColumn("LastName", "LastName", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddColumn("Age", "Age", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    /*
    customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, function (item) {
        return item.Author.Name;
    }, null, true, true, true, null);
    */
    var customerAddressesDataSourceBuilder = new soby_CustomWCFBuilder();
    customerAddressesDataSourceBuilder.Filters = new SobyFilters(false);
    customerAddressesDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    customerAddressesDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    customerAddressesDataSourceBuilder.AddSchemaField("Town", SobyFieldTypes.Number, null);
    customerAddressesDataSourceBuilder.AddSchemaField("PostCode", SobyFieldTypes.Number, null);
    customerAddressesDataSourceBuilder.AddSchemaField("Address1", SobyFieldTypes.Text, null);
    customerAddressesDataSourceBuilder.AddSchemaField("CustomerId", SobyFieldTypes.Number, null);
    var customerAddressesService = new soby_WebServiceService(customerAddressesDataSourceBuilder);
    customerAddressesService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWCFUrl() + "/CustomerAddresses", "json", "application/json; charset=utf-8", "GET");
    var customerAddressesGrid = new soby_WebGrid("#soby_CustomerAddressesDiv", "Addresses", customerAddressesService, "There is no record found.");
    customerAddressesGrid.DisplayTitle = false;
    customerAddressesGrid.IsSelectable = false;
    customerAddressesGrid.IsEditable = false;
    customerAddressesGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("Town", "Town", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("PostCode", "PostCode", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("Address1", "Address1", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddDataRelation("Title", "Id", customerAddressesGrid.GridID, "CustomerId");
    var customerPhonesDataSourceBuilder = new soby_CustomWCFBuilder();
    customerPhonesDataSourceBuilder.Filters = new SobyFilters(false);
    customerPhonesDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    customerPhonesDataSourceBuilder.AddSchemaField("Number", SobyFieldTypes.Text, null);
    customerPhonesDataSourceBuilder.AddSchemaField("CustomerId", SobyFieldTypes.Number, null);
    var customerPhonesService = new soby_WebServiceService(customerPhonesDataSourceBuilder);
    customerPhonesService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWCFUrl() + "/customerPhones", "json", "application/json; charset=utf-8", "GET");
    var customerPhonesGrid = new soby_WebGrid("#soby_CustomerPhonesDiv", "Phones", customerPhonesService, "There is no record found.");
    customerPhonesGrid.DisplayTitle = false;
    customerPhonesGrid.IsSelectable = false;
    customerPhonesGrid.IsEditable = false;
    customerPhonesGrid.AddColumn("Number", "Number", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerPhonesGrid.AddColumn("PhoneType", "PhoneType", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerGrid.AddDataRelation("Title", "Id", customerPhonesGrid.GridID, "CustomerId");
    customerGrid.Initialize(true);
}
//# sourceMappingURL=customdatabinding.js.map