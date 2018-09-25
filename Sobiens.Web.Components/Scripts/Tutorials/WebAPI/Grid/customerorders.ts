
$(function () {
    soby_PopulateGridCustomerOrders();
});

function soby_PopulateGridCustomerOrders() {
    var customerDataSourceBuilder = new soby_WSBuilder();
    customerDataSourceBuilder.Filters = new SobyFilters(false);
    customerDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("FirstName", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.AddSchemaField("LastName", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.AddSchemaField("Sex", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.AddSchemaField("Age", SobyFieldTypes.Text, null);
    var customerService = new soby_WebServiceService(customerDataSourceBuilder);
    customerService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/CustomersOData", "json", "application/json; charset=utf-8", "GET");

    var customerGrid = new soby_WebGrid("#soby_CustomersDiv", "Customers", customerService, "There is no record found.");
    customerGrid.ImagesFolderUrl = "/media/images";
    customerGrid.AddColumn("FirstName", "Name", SobyShowFieldsOn.All, function (item) {
        return item.FirstName + " " + item.LastName;
    }, null, true, true, false, null, null, null);
    customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    customerGrid.AddColumn("Age", "Age", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    customerGrid.IsSelectable = true;
    customerGrid.IsEditable = false;
    customerGrid.IsGroupable = true;
    customerGrid.OnRowSelected = function (grid, rowID)
    {
        var selectedDataItems = grid.GetSelectedDataItems();
        var customerIds = new Array();
        for (var i = 0; i < selectedDataItems.length; i++)
        {
            customerIds[customerIds.length] = selectedDataItems[i]["Id"];
        }
        soby_PopulateCustomerAndOrderDetails(customerIds);
    };
    customerGrid.Initialize(true);
}

function soby_PopulateCustomerAndOrderDetails(customerIds) {
    var customerAddressesDataSourceBuilder = new soby_WSBuilder();
    customerAddressesDataSourceBuilder.Filters = new SobyFilters(false);
    customerAddressesDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    customerAddressesDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    customerAddressesDataSourceBuilder.AddSchemaField("Town", SobyFieldTypes.Number, null);
    customerAddressesDataSourceBuilder.AddSchemaField("PostCode", SobyFieldTypes.Number, null);
    customerAddressesDataSourceBuilder.AddSchemaField("Address1", SobyFieldTypes.Text, null);
    customerAddressesDataSourceBuilder.AddSchemaField("CustomerId", SobyFieldTypes.Number, null);
    var customerAddressesService = new soby_WebServiceService(customerAddressesDataSourceBuilder);
    customerAddressesService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/CustomerAddressesOData", "json", "application/json; charset=utf-8", "GET");

    var customerAddressesGrid = new soby_WebGrid("#soby_AddressesDiv", "Addresses", customerAddressesService, "There is no record found.");
    customerAddressesGrid.ImagesFolderUrl = "/media/images";
    customerAddressesGrid.DisplayTitle = true;
    customerAddressesGrid.IsSelectable = false;
    customerAddressesGrid.IsEditable = false;
    customerAddressesGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("Town", "Town", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("PostCode", "PostCode", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.AddColumn("Address1", "Address1", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerAddressesGrid.FilterResultWithMultipleValues("CustomerId", customerIds, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
    customerAddressesGrid.Initialize(true);

    var customerPhonesDataSourceBuilder = new soby_WSBuilder();
    customerPhonesDataSourceBuilder.Filters = new SobyFilters(false);
    customerPhonesDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    customerPhonesDataSourceBuilder.AddSchemaField("Number", SobyFieldTypes.Text, null);
    customerPhonesDataSourceBuilder.AddSchemaField("PhoneType", SobyFieldTypes.Text, null);
    customerPhonesDataSourceBuilder.AddSchemaField("CustomerId", SobyFieldTypes.Number, null);
    var customerPhonesService = new soby_WebServiceService(customerPhonesDataSourceBuilder);
    customerPhonesService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/CustomerPhonesOData", "json", "application/json; charset=utf-8", "GET");

    var customerPhonesGrid = new soby_WebGrid("#soby_PhonesDiv", "Phones", customerPhonesService, "There is no record found.");
    customerPhonesGrid.ImagesFolderUrl = "/media/images";
    customerPhonesGrid.DisplayTitle = true;
    customerPhonesGrid.IsSelectable = false;
    customerPhonesGrid.IsEditable = false;
    customerPhonesGrid.AddColumn("Number", "Number", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerPhonesGrid.AddColumn("PhoneType", "PhoneType", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    customerPhonesGrid.FilterResultWithMultipleValues("CustomerId", customerIds, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
    customerPhonesGrid.Initialize(true);





    var orderDataSourceBuilder = new soby_WSBuilder();
    orderDataSourceBuilder.Filters = new SobyFilters(false);
    orderDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    orderDataSourceBuilder.AddSchemaField("OrderDate", SobyFieldTypes.DateTime, null);
    var orderService = new soby_WebServiceService(orderDataSourceBuilder);
    orderService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Orders", "json", "application/json; charset=utf-8", "GET");


    var orderGrid = new soby_WebGrid("#soby_OrdersDiv", "Orders", orderService, "There is no record found.");
    orderGrid.ImagesFolderUrl = "/media/images";
    orderGrid.AddColumn("OrderDate", "OrderDate", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    orderGrid.IsSelectable = false;
    orderGrid.IsEditable = false;

    var orderItemsDataSourceBuilder = new soby_WSBuilder();
    orderItemsDataSourceBuilder.Filters = new SobyFilters(false);
    orderItemsDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    orderItemsDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Text, null);
//    orderItemsDataSourceBuilder.AddSchemaField("OrderId", SobyFieldTypes.Lookup, { ModelName: "Order", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
    orderItemsDataSourceBuilder.AddSchemaField("ProductId", SobyFieldTypes.Lookup, { ModelName: "Product", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Title", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Products", "json", "application/json; charset=utf-8", "GET") });
    orderItemsDataSourceBuilder.AddSchemaField("OrderId", SobyFieldTypes.Number, null);
//    orderItemsDataSourceBuilder.AddSchemaField("ProductId", SobyFieldTypes.Number, null);
    var orderItemsService = new soby_WebServiceService(orderItemsDataSourceBuilder);
    orderItemsService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/OrderItems", "json", "application/json; charset=utf-8", "GET");

    var orderItemsGrid = new soby_WebGrid("#soby_CustomerPhonesDiv", "Order Items", orderItemsService, "There is no record found.");
    orderItemsGrid.ImagesFolderUrl = "/media/images";
    orderItemsGrid.DisplayTitle = false;
    orderItemsGrid.IsSelectable = false;
    orderItemsGrid.IsEditable = false;
    orderItemsGrid.AddColumn("ProductId", "Product", SobyShowFieldsOn.All, function (item) {
        return item.Product.Title;
    }, null, true, true, true, null, null, null);
    orderItemsGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    orderGrid.AddDataRelation("Price", "Id", orderItemsGrid.GridID, "OrderId")
    orderGrid.FilterResultWithMultipleValues("CustomerId", customerIds, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);

    orderGrid.Initialize(true);

}
