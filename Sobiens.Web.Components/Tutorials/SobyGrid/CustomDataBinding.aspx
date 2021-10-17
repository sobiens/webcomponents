<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="CustomDataBinding.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.CustomDataBinding" Title="DataGrid - WSBuilder Usage Example" %>


<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>WSBuilder Usage Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
            <p>This example demonstrates how to use soby_WSBuilder class to apply custom api. <br />
        "soby_WSBuilder" class can be initialized and "GetPagingQuery", "GetOrderByFieldsQuery", "GetViewFieldsQuery", "GetWhereQuery", "GetMainQuery", "DataBeingParsed" functions can be overwritten to apply parameters required for your custom api. You can check the following code;

                                            <p>"RowLimit" property states number of records will be displayed per page.
        <pre class="js">customerDataSourceBuilder.RowLimit = 3; </pre>
    </p>

                    <p>"CountQuerySupported" property states whether total item count will be retrieve throught another api call or retrieved from the main call. 
                    <br />"false" value means component will NOT make an api call to retrieve the total item count.
                    <br />"true" value means component will make an an api call to retrieve the total item count.
        <pre class="js">customerDataSourceBuilder.CountQuerySupported = false; </pre>
    </p>

                                    <p>"GetPagingQuery" function is used to get data will be sent to api for paging information. "GetPagingQuery" function is being called if "CountQuerySupported" property is set true. The following example checks if api is a "POST" call than sends JSON string and if it is "GET" call than send querystring parameter.
                <pre class="js">customerDataSourceBuilder.GetPagingQuery = function(transport) {
        if (transport.Type == "POST"){
            return "'pageIndex': " + this.PageIndex + "," + "'pageItemCount': " + this.RowLimit;
        }
        else {
            return "pageIndex=" + this.PageIndex + "&pageItemCount=" + this.RowLimit;
        }
    } </pre>
    </p>

                                            <p>"GetOrderByFieldsQuery" function is used to get data will be sent to api for sorting information. The following example checks if api is a "POST" call than sends JSON string and if it is "GET" call than send querystring parameter.
                <pre class="js">    customerDataSourceBuilder.GetOrderByFieldsQuery = function(transport) {
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
    } </pre>
    </p>

                                            <p>"GetViewFieldsQuery" function is used to get data will be sent to api for including fields information. The following example returns empty string but you can either send something like "viewfields=Id,Title" or "viewfields:Id,Title" depending or api Type.
                <pre class="js">    customerDataSourceBuilder.GetViewFieldsQuery = function(transport) {
        return "";
    } </pre>
    </p>

                                            <p>"GetWhereQuery" function is used to get data will be sent to api for filtering information. The following example checks if api is a "POST" call than sends JSON string and if it is "GET" call than send querystring parameter.
                <pre class="js">    customerDataSourceBuilder.GetWhereQuery = function(transport) {
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
    }</pre>
    </p>

                                                    <p>"GetMainQuery" function combines "GetPagingQuery", "GetOrderByFieldsQuery", "GetViewFieldsQuery" and "GetWhereQuery" function return values and pass into api.
                <pre class="js">    customerDataSourceBuilder.GetMainQuery = function(transport) {
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
    }</pre>
    </p>

                                                            <p>Api return data is passed into "DataBeingParsed" function and "NextPageExist" and "ItemCount" properties needs to be set within this function. <br />"NextPageExist" property states whether there is another page exists or not. <br />"ItemCount" property states number of items will be displayed on the current page.
                <pre class="js">customerDataSourceBuilder.DataBeingParsed = function(result, parseCompleted){
        this.NextPageExist = result.NextPageExist;
        this.ItemCount = result.Data.length;
        return result.Data;
    }</pre>
    </p>

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
                <div class="jscode">function soby_PopulateGridWCFDataBinding() {
    var customerDataSourceBuilder = new soby_WSBuilder();
    customerDataSourceBuilder.Filters = new SobyFilters(false);
    customerDataSourceBuilder.AddSchemaField("ID", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("FirstName", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.AddSchemaField("LastName", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Age", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Sex", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.RowLimit = 3;
    customerDataSourceBuilder.CountQuerySupported = false;
    customerDataSourceBuilder.GetPagingQuery = function(transport) {
        if (transport.Type == "POST"){
            return "'pageIndex': " + this.PageIndex + "," + "'pageItemCount': " + this.RowLimit;
        }
        else {
            return "pageIndex=" + this.PageIndex + "&pageItemCount=" + this.RowLimit;
        }
    }
    customerDataSourceBuilder.GetOrderByFieldsQuery = function(transport) {
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
    customerDataSourceBuilder.GetViewFieldsQuery = function(transport) {
        return "";
    }

    customerDataSourceBuilder.GetWhereQuery = function(transport) {
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
    customerDataSourceBuilder.GetMainQuery = function(transport) {
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
    customerDataSourceBuilder.DataBeingParsed = function(result, parseCompleted){
        this.NextPageExist = result.NextPageExist;
        this.ItemCount = result.Data.length;
        return result.Data;
    }

    function soby_GetTutorialWCFUrl() {
        if (window.location.href.indexOf("http://webcomponents.sobiens.com/") > -1)
            return "http://webcomponentsservices.sobiens.com/wcf";
        else if (window.location.href.indexOf("https://webcomponents.sobiens.com/") > -1)
            return "https://webcomponentsservices.sobiens.com/wcf";
        else
            return "http://localhost:7287/wcf";
    }

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
