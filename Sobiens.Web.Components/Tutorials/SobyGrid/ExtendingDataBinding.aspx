<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="ExtendingDataBinding.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.ExtendingDataBinding" Title="DataGrid - Extending DataBinding Example" %>


<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Extending DataBinding Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
            <p>This example demonstrates how to create a new DataBuilder class to use in your project for the Soby Data Grid. <br />
        "soby_WSBuilder" class can be used to inherit a new class where you can change the data before you post. You can check the following code;
                <script src="/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
            <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
            <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/media/js/soby.service.js"></script>
            <script src="/media/js/soby.ui.components.js"></script>
            <script src="/media/js/soby.ui.components.codeview.js"></script>
                        <div class='soby_CodeDiv'>
                <div class="htmlcode">&lt;!DOCTYPE html&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;title&gt;Soby Web DataGrid Demo&lt;/title&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.service.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id='soby_CustomersDiv'&gt;&lt;/div&gt;
    &lt;div id='soby_CustomerAddressesDiv'&gt;&lt;/div&gt;
    &lt;div id='soby_CustomerPhonesDiv'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">class soby_CustomWCFBuilder extends soby_WSBuilder {
    constructor() {
        super();
        this.RowLimit = 100;
    }

    Clone() {
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
    }

    GetPagingQuery(transport) {
        if (transport.Type == "POST")
            return "'pageIndex': " + this.PageIndex + ","
                + "'pageItemCount': " + this.RowLimit;
        else {
            return "pageIndex=" + this.PageIndex + "&pageItemCount=" + this.RowLimit;
        }
    }
    GetViewFieldsQuery(transport) {
        return "";
    }
    GetOrderByFieldsQuery(transport) {
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
    }
    GetWhereQuery(transport) {
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
    }
    GetMainQuery(transport) {
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
    }
    GetCountQuery(transport) {
        return null;
    }
    ParseData(result) {
        this.NextPageExist = result.NextPageExist;
        this.ItemCount = result.Data.length;
        return result.Data;
    }
    GetData(data, callback, errorcallback, completecallback, async, wsUrl, headers, requestMethod, dataType) {
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
}

function soby_GetTutorialWCFUrl() {
    if (window.location.href.indexOf("http://webcomponents.sobiens.com/") > -1)
        return "http://webcomponentsservices.sobiens.com/wcf";
    else if (window.location.href.indexOf("https://webcomponents.sobiens.com/") > -1)
        return "https://webcomponentsservices.sobiens.com/wcf";
    else
        return "http://localhost:7287/wcf";
}

function soby_PopulateGridWCFDataBinding() {
    var customerDataSourceBuilder = new soby_CustomWCFBuilder();
    customerDataSourceBuilder.Filters = new SobyFilters(false);
    customerDataSourceBuilder.AddSchemaField("ID", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("FirstName", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.AddSchemaField("LastName", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Age", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Sex", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.RowLimit = 3;
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
    customerGrid.AddDataRelation("Title", "Id", customerAddressesGrid.GridID, "CustomerId")

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
    customerGrid.AddDataRelation("Title", "Id", customerPhonesGrid.GridID, "CustomerId")

    customerGrid.Initialize(true);
}

soby_PopulateGridWCFDataBinding();
</div><div class="codedescription">This example displays all array values</div><div class="resultdescription"></div></div>
<script language="javascript">
    $(function () {
        soby_PopulateCustomizedCodeView();
    });

    function soby_PopulateCustomizedCodeView() {
        var codeView = new soby_CodeView(".soby_CodeDiv", "Examples", SobyCodeViewTypes.HtmlParts);
        codeView.ActiveView = SobyCodeViews.Js;
        codeView.Initialize();
    }
</script>
        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/Grid/Grid.aspx">API documentation</a>.
    </div>

    <div class="col-md-3">
        <uc1:SobyGridSideMenuControl runat="server" id="SobyGridSideMenuControl" />
    </div>
</asp:Content>
