<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Customer Orders.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.CustomerOrders" Title="DataGrid - Customer Orders Example" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
        <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Customer Orders Example</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="article col-md-9">
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
    &lt;link rel="stylesheet" href="/css/bootstrap.min.css" &gt;
    &lt;script src="/media/js/jquery-3.1.0.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" /&gt;
    &lt;script src="/media/js/soby.service.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.js"&gt;&lt;/script&gt;
    &lt;script src="/media/js/soby.ui.components.charts.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class='row'&gt;
    &lt;div class='col-md-6'&gt;
        &lt;div id='soby_CustomersDiv' &gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class='col-md-6'&gt;
        &lt;div class="soby_tabletitle" title=""&gt;Genders&lt;/div&gt;
        &lt;div id='soby_CustomersChartDiv' &gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class='row'&gt;
    &lt;div class='col-md-6'&gt;
        &lt;div id='soby_OrdersDiv' &gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class='col-md-6'&gt;
        &lt;div id='soby_AddressesDiv' &gt;&lt;/div&gt;
        &lt;div id='soby_PhonesDiv' &gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
                <div class="csscode"></div>
                <div class="jscode">
function soby_PopulateGridCustomerOrders() {
    var customers = [
                    {Id:1, FirstName:"Serkant", LastName:"Samurkas", Sex:"M", Age:37},
                    {Id:2, FirstName:"Dexter", LastName:"McKenzie", Sex:"M", Age:39},
                    {Id:3, FirstName:"Tricia", LastName:"Cooper", Sex:"F", Age:21},
                    {Id:4, FirstName:"Debra", LastName:"Drinian", Sex:"F", Age:39},
                    {Id:5, FirstName:"Catherine", LastName:"Lyla", Sex:"F", Age:24},
                    {Id:6, FirstName:"Michele", LastName:"Kane", Sex:"F", Age:26}
                  ];

    var customerService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("FirstName", SobyFieldTypes.Text, null),
        new SobySchemaField("LastName", SobyFieldTypes.Text, null),
        new SobySchemaField("Sex", SobyFieldTypes.Text, null),
        new SobySchemaField("Age", SobyFieldTypes.Text, null)
    ], customers);

    var customerGrid = new soby_WebGrid("#soby_CustomersDiv", "Customers", customerService, "There is no record found.");
    customerGrid.AddColumn("FirstName", "Name", SobyShowFieldsOn.All, function (item) {
        return item.FirstName + " " + item.LastName;
    }, null, true, true, false, null, null, null);
    customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    customerGrid.AddColumn("Age", "Age", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    customerGrid.IsSelectable = true;
    customerGrid.IsEditable = false;
    customerGrid.IsGroupable = true;
    customerGrid.OnRowSelected = function (grid, rowID) {
        var selectedDataItems = grid.GetSelectedDataItems();
        var customerIds = new Array();
        for (var i = 0; i < selectedDataItems.length; i++) {
            customerIds[customerIds.length] = selectedDataItems[i]["Id"];
        }
        soby_PopulateCustomerAndOrderDetails(customerIds);
    };
    customerGrid.OnGridPopulated = function () {
        customerGrid.SelectRowByIndex(1);

        var maleCount =0;
        var femaleCount =0;
        for(var i=0;i&lt;customerGrid.Items.length;i++){
            if(customerGrid.Items[i]["Sex"] == "M")
                maleCount++;
            else
                femaleCount++;
        }
        var dataSet = new soby_ChartDataset();
        dataSet.Title = "Gender";
        dataSet.Data = [maleCount, femaleCount];

        var pieChart = new soby_PieChart("#soby_CustomersChartDiv", "Pie Chart", [dataSet], "There is no record found.", ["Male", "Female"]);
        pieChart.Width = 300;
        pieChart.Height = 200;
        pieChart.Initialize();
    };
    customerGrid.Initialize(true);
}

function soby_PopulateCustomerAndOrderDetails(customerIds) {
    var customerAddresses = [
        {Id:1, Title:"Home", Town:"Beckenham", PostCode:"BR1 5GE", Address1:"43A High street", CustomerId:1},
        {Id:2, Title:"Office", Town:"Canada Water", PostCode:"CN1 4ET", Address1:"6C High street", CustomerId:2}
    ];

    var customerAddressesService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("Title", SobyFieldTypes.Text, null),
        new SobySchemaField("Town", SobyFieldTypes.Text, null),
        new SobySchemaField("PostCode", SobyFieldTypes.Text, null),
        new SobySchemaField("Address1", SobyFieldTypes.Text, null),
        new SobySchemaField("CustomerId", SobyFieldTypes.Number, null)
    ], customerAddresses);

    var customerPhones =[
                    {Id:1, PhoneType:"Mobile", Number:"07776214325", CustomerId:1},
                    {Id:2, PhoneType:"Home", Number:"07777854982", CustomerId:2}
                    ];

    var customerPhonesService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("Number", SobyFieldTypes.Text, null),
        new SobySchemaField("PhoneType", SobyFieldTypes.Text, null),
        new SobySchemaField("CustomerId", SobyFieldTypes.Number, null)
    ], customerPhones);

    var orders = [
                    {Id:1, OrderDate:new Date("2018-12-28 12:43:47.6466667 +00:00"), CustomerId:1},
                    {Id:2, OrderDate:new Date("2018-12-27 12:43:47.6466667 +00:00"), CustomerId:2},
                    {Id:3, OrderDate:new Date("2018-12-26 12:43:47.6466667 +00:00"), CustomerId:3},
                    {Id:4, OrderDate:new Date("2018-12-25 12:43:47.6466667 +00:00"), CustomerId:4},
                    {Id:5, OrderDate:new Date("2018-12-24 12:43:47.6466667 +00:00"), CustomerId:5},
                    {Id:6, OrderDate:new Date("2018-12-23 12:43:47.6466667 +00:00"), CustomerId:6},
                    {Id:7, OrderDate:new Date("2018-12-22 12:43:47.6466667 +00:00"), CustomerId:1},
                    {Id:8, OrderDate:new Date("2018-12-21 12:43:47.6466667 +00:00"), CustomerId:2},
                    {Id:9, OrderDate:new Date("2018-12-20 12:43:47.6466667 +00:00"), CustomerId:3},
                    {Id:10, OrderDate:new Date("2018-12-19 12:43:47.6466667 +00:00"), CustomerId:4},
                    {Id:11, OrderDate:new Date("2018-12-18 12:43:47.6466667 +00:00"), CustomerId:5},
                    {Id:12, OrderDate:new Date("2018-12-17 12:43:47.6466667 +00:00"), CustomerId:6}
                ];
    var orderService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("OrderDate", SobyFieldTypes.DateTime, null),
        new SobySchemaField("CustomerId", SobyFieldTypes.Number, null)
    ], orders);

    var orderItems = [
                        {Id:1, Price:"16.00", OrderId:1, ProductId:1, ProductTitle:"Pride and Prejudice"},
                        {Id:2, Price:"12.95", OrderId:2, ProductId:2, ProductTitle:"Northanger Abbey"},
                        {Id:3, Price:"16.00", OrderId:3, ProductId:1, ProductTitle:"Pride and Prejudice"},
                        {Id:4, Price:"12.95", OrderId:4, ProductId:2, ProductTitle:"Northanger Abbey"},
                        {Id:5, Price:"11.00", OrderId:5, ProductId:3, ProductTitle:"David Copperfield"},
                        {Id:6, Price:"11.00", OrderId:6, ProductId:3, ProductTitle:"David Copperfield"},
                        {Id:7, Price:"14.00", OrderId:7, ProductId:7, ProductTitle:"Moby Dick"},
                        {Id:8, Price:"21.00", OrderId:8, ProductId:8, ProductTitle:"Tom Jones"},
                        {Id:9, Price:"19.00", OrderId:9, ProductId:9, ProductTitle:"Frankenstein"},
                        {Id:10, Price:"14.00", OrderId:10, ProductId:7, ProductTitle:"Moby Dick"},
                        {Id:11, Price:"21.00", OrderId:11, ProductId:8, ProductTitle:"Tom Jones"},
                        {Id:12, Price:"21.00", OrderId:12, ProductId:8, ProductTitle:"Tom Jones"}
                    ];

    var orderItemsService = new soby_StaticDataService([
        new SobySchemaField("Id", SobyFieldTypes.Number, null),
        new SobySchemaField("Price", SobyFieldTypes.Number, null),
        new SobySchemaField("OrderId", SobyFieldTypes.Number, null),
        new SobySchemaField("ProductId", SobyFieldTypes.Number, null)
    ], orderItems);

    var customerAddressesGrid = new soby_WebGrid("#soby_AddressesDiv", "Addresses", customerAddressesService, "There is no record found.");
    customerAddressesGrid.DisplayTitle = true;
    customerAddressesGrid.IsSelectable = false;
    customerAddressesGrid.IsEditable = false;
    customerAddressesGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("Town", "Town", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("PostCode", "PostCode", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("Address1", "Address1", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.FilterResultWithMultipleValues("CustomerId", customerIds, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
    customerAddressesGrid.Initialize(true);

    var customerPhonesGrid = new soby_WebGrid("#soby_PhonesDiv", "Phones", customerPhonesService, "There is no record found.");
    customerPhonesGrid.DisplayTitle = true;
    customerPhonesGrid.IsSelectable = false;
    customerPhonesGrid.IsEditable = false;
    customerPhonesGrid.AddColumn("Number", "Number", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerPhonesGrid.AddColumn("PhoneType", "PhoneType", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerPhonesGrid.FilterResultWithMultipleValues("CustomerId", customerIds, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
    customerPhonesGrid.Initialize(true);

    var orderGrid = new soby_WebGrid("#soby_OrdersDiv", "Orders", orderService, "There is no record found.");
    orderGrid.AddColumn("OrderDate", "OrderDate", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    orderGrid.IsSelectable = false;
    orderGrid.IsEditable = false;

    var orderItemsGrid = new soby_WebGrid("#soby_CustomerPhonesDiv", "Order Items", orderItemsService, "There is no record found.");
    orderItemsGrid.DisplayTitle = false;
    orderItemsGrid.IsSelectable = false;
    orderItemsGrid.IsEditable = false;
    orderItemsGrid.AddColumn("ProductId", "Product", SobyShowFieldsOn.All, function (item) {
        return item.Product.Title;
    }, null, true, true, true, null, null, null);
    orderItemsGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    orderGrid.AddDataRelation("Price", "Id", orderItemsGrid.GridID, "OrderId");
    orderGrid.FilterResultWithMultipleValues("CustomerId", customerIds, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
    orderGrid.Initialize(true);
}

soby_PopulateGridCustomerOrders();
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
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </div>
</asp:Content>
