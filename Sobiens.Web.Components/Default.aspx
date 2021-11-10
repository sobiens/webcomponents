<%@ Page Title="Overview" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Sobiens.Web.Components._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h2><%: Title %></h2>
                <br />
                <h3>Very rich and powerful javascript component library.</h3>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
    <script src="/media/js/jquery-ui-1.12.0.min.js" type="text/javascript"></script>
    <link href="/media/css/jquery-ui.min.css" rel="stylesheet" />
    <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
    <link href="/media/css/soby.ui.components.calendarview.css" rel="stylesheet" type="text/css" media="all" />
    <script src="/media/js/soby.service.js"></script>
    <script src="/media/js/soby.ui.components.js"></script>
    <script src="/media/js/soby.ui.components.calendar.js"></script>
    <script src="/media/js/soby.ui.components.treeview.js"></script>
    <script src="/media/js/soby.ui.components.charts.js"></script>

    <h3>Here are the components our library provides:</h3>
    <p>
        <div class="row">
            <div class="col-md-3">
                <h5><a href="Tutorials/SobyGrid/Getting Started.aspx">Data Grid</a></h5>
                <br />
                It is designed to ease the exhausting process of implementing the necessary code for sorting, navigation, grouping, searching and real time data editing in a simple data representation object.<br />
                <a href="Tutorials/SobyGrid/Getting Started.aspx">Tutorials</a>
            </div>
            <div class="col-md-9">
                <div id='soby_CustomersDiv'></div>
                <div class='row'>
                    <div class='col-md-6'>
                        <div id='soby_OrdersDiv'></div>
                    </div>
                    <div class='col-md-6'>
                        <div id='soby_AddressesDiv'></div>
                        <div id='soby_PhonesDiv'></div>
                    </div>
                </div>
            </div>
        </div>
    </p>
    <hr />
    <p>
        <div class="row">
            <div class="col-md-3">
                <h5><a href="Tutorials/SobyChart/Getting Started.aspx">Charts</a></h5>
                <br />
                Interactive chart components provide chart functionalities.<br />
                <a href="Tutorials/SobyChart/Getting Started.aspx">Tutorials</a>
            </div>
            <div class="col-md-9">
                <div id="homeLineChartDiv"></div>
                <br />
                <div id="homeBarChartDiv"></div>
            </div>
        </div>
    </p>
    <hr />
    <p>
        <div class="row">
            <div class="col-md-3">
                <h5><a href="Tutorials/SobyCalendarView/Getting Started.aspx">Calendar View</a></h5>
                <br />
                Interactive calendar view component provides item selection in a calendar view style.<br />
                <a href="Tutorials/SobyCalendarView/Getting Started.aspx">Tutorials</a>
            </div>
            <div class="col-md-9">
                <div id="homeCalendarViewDiv"></div>
            </div>
        </div>
    </p>
    <hr />
    <p>
        <div class="row">
            <div class="col-md-3">
                <h5><a href="Tutorials/SobyGrid/Getting Started.aspx">Data Repeater</a></h5>
                <br />
                It is designed to ease the exhausting process of implementing the necessary code for sorting, navigation, grouping, searching and real time data editing in a simple data representation object.<br />
                <a href="Tutorials/SobyDataRepeater/Getting Started.aspx">Tutorials</a>
            </div>
            <div class="col-md-9">
                <div id="homeDataRepeaterDiv"></div>
            </div>
        </div>
    </p>
    <hr />
    <div class="row">
        <div class="col-md-3">
            <h5><a href="Tutorials/SobyTreeView/Getting Started.aspx">Tree View</a></h5>
            <br />
            Interactive tree view component provides item selection in a tree view style.<br />
            <a href="Tutorials/SobyTreeView/Getting Started.aspx">Tutorials</a>
        </div>
        <div class="col-md-9">
            <div id="homeTreeViewDiv"></div>
        </div>
    </div>
    </p>
    <p>
        <hr />
        <p>
            <div class="row">
                <div class="col-md-3">
                    <h5><a href="Tutorials/SobyItemSelection/Getting Started.aspx">Item Selection</a></h5>
                    <br />
                    It allows user to select items from either quick search (auto complete) or advanced search (popup grid).<br />
                    <a href="Tutorials/SobyItemSelection/Getting Started.aspx">Tutorials</a>
                </div>
                <div class="col-md-9">
                    <div id="homeItemSelectionDiv"></div>
                </div>
            </div>





            <%--            <div class="row">
                <div class="col-md-7">
            <h5><a href="Tutorials/SobyCarousel/General.aspx">Carousel</a></h5>
            It is still being implemented.
            <a href="Tutorials/SobyCarousel/General.aspx">Tutorials</a>
                </div>
                <div class="col-md-5"></div>
            </div>
            <div class="row">
                <div class="col-md-7">
                    <h5><a href="Tutorials/SobyScheduler/Getting Started.aspx">Scheduler</a></h5>
                    It is still being implemented.
            <a href="Tutorials/SobyScheduler/Getting Started.aspx">Tutorials</a>
                </div>
                <div class="col-md-5">
                    <a href="Tutorials/SobyScheduler/Getting Started.aspx"><img src="Images/Tutorials/Soby_WebGrid_Aggregates.png" width="350px" /></a></div>
            </div>--%>

    </ol>
    <script language="javascript">
        $(function () {
            soby_PopulateLineChartRefreshData();
            soby_PopulateGridCustomerOrders();
            soby_PopulateDataRepeaterRefreshData();
            soby_PopulateTreeView();
            soby_PopulateCalendarView();
            soby_PopulateItemSelection();
        });

        function soby_PopulateLineChartRefreshData() {
            var dataSet1 = new soby_ChartDataset();
            dataSet1.Title = "Chart1";
            dataSet1.Data = [1, 10, 70, 35, 50, 100];

            var dataSet2 = new soby_ChartDataset();
            dataSet2.Title = "Chart2";
            dataSet2.Data = [12, 15, 17, 71, 22, 50];

            var dataSet3 = new soby_ChartDataset();
            dataSet3.Title = "Chart3";
            dataSet3.Data = [21, 51, 31, 6, 62, 24];

            var lineChart = new soby_LineChart("#homeLineChartDiv", "Line Chart", [dataSet1, dataSet2, dataSet3], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
            lineChart.Width = 600;
            lineChart.Height = 300;
            lineChart.Initialize();

            var barChart = new soby_BarChart("#homeBarChartDiv", "Bar Chart", [dataSet1, dataSet2, dataSet3], "There is no record found.", ["January", "February", "March", "April", "May", "June"]);
            barChart.Width = 600;
            barChart.Height = 300;
            barChart.Initialize();
        }

        function soby_PopulateGridAggregates() {
            var bookDataSourceBuilder = new soby_WSBuilder();
            bookDataSourceBuilder.Filters = new SobyFilters(false);
            bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
            bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
            bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
            bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
            var bookService = new soby_WebServiceService(bookDataSourceBuilder);
            bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
            bookDataSourceBuilder.RowLimit = 40;
            bookGrid = new soby_WebGrid("#homeDataGridDiv", "Books", bookService, "There is no record found.");
            bookGrid.IsGroupable = true;
            bookGrid.IsEditable = false;
            bookGrid.AddKeyField("Id", "Id");
            bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddGroupByField("Genre", true, null);
            //    bookGrid.AddAggregateField("Title", SobyAggregateTypes.Count);
            bookGrid.AddAggregateField("Price", SobyAggregateTypes.Sum);
            bookGrid.AddAggregateField("Year", SobyAggregateTypes.Min);
            //    bookGrid.AddAggregateField("Price", SobyAggregateTypes.Average);
            //    bookGrid.AddAggregateField("Year", SobyAggregateTypes.Min);
            //    bookGrid.AddAggregateField("Year", SobyAggregateTypes.Max);
            bookGrid.Initialize(true);
        }
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

            customerGrid.AddColumn("FirstName", "Name", SobyShowFieldsOn.All, function (item) {

                return item.FirstName + " " + item.LastName;

            }, null, true, true, false, null, null, null);

            customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);

            customerGrid.AddColumn("Age", "Age", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);

            customerGrid.IsSelectable = true;

            customerGrid.IsEditable = false;

            customerGrid.IsGroupable = true;
            customerGrid.AddOrderByField("Sex", true); 
            customerGrid.AddGroupByField("Sex", true, null);
            //customerGrid.AddAggregateField("Age", SobyAggregateTypes.Min);

            customerGrid.OnRowSelected = function (grid, rowID) {

                var selectedDataItems = grid.GetSelectedDataItems();

                var customerIds = new Array();

                for (var i = 0; i < selectedDataItems.length; i++) {

                    customerIds[customerIds.length] = selectedDataItems[i]["Id"];

                }

                soby_PopulateCustomerAndOrderDetails(customerIds);

            };
            customerGrid.OnGridPopulated = function () {
                customerGrid.SelectRowByIndex(4); 
            }
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
        function soby_PopulateDataRepeaterRefreshData() {
            var bookDataSourceBuilder = new soby_WSBuilder();
            bookDataSourceBuilder.Filters = new SobyFilters(false);
            bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
            bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
            bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
            bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
            bookDataSourceBuilder.RowLimit = 9;

            var bookService = new soby_WebServiceService(bookDataSourceBuilder);
            bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
            bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
            bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
            bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");

            var bookGrid = new soby_DataRepeater("#homeDataRepeaterDiv", "Books", bookService, "There is no record found.");
            bookGrid.ShowHeader = false;
            bookGrid.MaxCellCount = 3;
            bookGrid.AddKeyField("Id", "Id");
            bookGrid.AddOrderByField("Title", true);
            //    bookGrid.AddGroupByField("Genre", true);
            bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            bookGrid.AddColumn("AuthorId", "Author", SobyShowFieldsOn.All, function (item) {
                return item.Author.Name;
            }, null, true, true, true, null, null, null);
            bookGrid.ItemDataBound = function (cellId, dataItem) {
                return "<strong>" + dataItem.Title + "</strong><br>" + dataItem.Genre + "<br>" + dataItem.Year + " by " + dataItem.Author.Name;
            };

            bookGrid.Initialize(true);
        }

        var treeView = null
        function soby_PopulateTreeView() {
            var rootDataSourceBuilder = new soby_WSBuilder();
            rootDataSourceBuilder.Filters = new SobyFilters(false);
            rootDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            rootDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            //    rootDataSourceBuilder.Filters.AddFilter("ParentId", "", SobyFieldTypes.Number, SobyFilterTypes.IsNull, false); 
            rootDataSourceBuilder.Filters.AddFilter("ParentId", "0", SobyFieldTypes.Number, SobyFilterTypes.Equal, false, false);
            var premisesRootDataService = new soby_WebServiceService(rootDataSourceBuilder);
            premisesRootDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Premises", "json", "application/json; charset=utf-8", "GET");

            var childrenDataSourceBuilder = new soby_WSBuilder();
            childrenDataSourceBuilder.Filters = new SobyFilters(false);
            childrenDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            childrenDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            var premisesChildrenDataService = new soby_WebServiceService(childrenDataSourceBuilder);
            premisesChildrenDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Premises", "json", "application/json; charset=utf-8", "GET");

            treeView = new soby_TreeView("#homeTreeViewDiv", "Premises", premisesRootDataService, premisesChildrenDataService, "No record", "ParentId", "Id", "Title");
            treeView.Initialize();
            treeView.OnClick = function (treeViewID, treeViewItemId) {
                var itemData = soby_TreeViews[treeViewID].GetItemData(treeViewItemId);
                $("#soby_ResultDiv").html("Clicked node '" + itemData.Title + "'");
            };
            treeView.OnSelectionChanged = function (treeViewID) {
                var selectedItems = soby_TreeViews[treeViewID].GetSelectedItems();
                $("#soby_ResultDiv").html("Selected nodes:");
                for (var i = 0; i < selectedItems.length; i++) {
                    $("#soby_ResultDiv").append(selectedItems[i].Title + ",");
                }
            };
        }

        var calendarView = null
        function soby_PopulateCalendarView() {
            var calendarDataSourceBuilder = new soby_WSBuilder();
            calendarDataSourceBuilder.Filters = new SobyFilters(false);
            calendarDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            calendarDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            calendarDataSourceBuilder.AddSchemaField("DueDate", SobyFieldTypes.DateTime, null);
            //calendarDataSourceBuilder.Filters.AddFilter("ParentId", "0", SobyFieldTypes.Number, SobyFilterTypes.Equal, false); 
            var calendarDataService = new soby_WebServiceService(calendarDataSourceBuilder);
            calendarDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Tasks", "json", "application/json; charset=utf-8", "GET");

            calendarView = new soby_CalendarView("#homeCalendarViewDiv", "Premises", calendarDataService, 2019, 1, 6, "No record", "Id", "Title", "Description", "DueDate", "", "Title", "Title", "500px", "500px");
            calendarView.Initialize();
            calendarView.OnClick = function (calendarViewID, calendarViewItemId) {
                var itemData = soby_CalendarViews[calendarViewID].GetItemData(calendarViewItemId);
                $("#soby_ResultDiv").html("Clicked node '" + itemData.Title + "'");
            };

            calendarView.OnSelectionChanged = function (calendarViewID) {
                var selectedItems = soby_CalendarViews[calendarViewID].GetSelectedItems();
                $("#soby_ResultDiv").html("Selected nodes:");
                for (var i = 0; i < selectedItems.length; i++) {
                    $("#soby_ResultDiv").append(selectedItems[i].Title + ",");
                }
            };
        }

        var itemSelection = null
        function soby_PopulateItemSelection() {
            var autoCompleteBookDataSourceBuilder = new soby_WSBuilder();
            autoCompleteBookDataSourceBuilder.Filters = new SobyFilters(false);
            autoCompleteBookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            autoCompleteBookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            var autoCompleteBookDataService = new soby_WebServiceService(autoCompleteBookDataSourceBuilder);
            autoCompleteBookDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");

            var advancedSearchBookDataSourceBuilder = new soby_WSBuilder();
            advancedSearchBookDataSourceBuilder.RowLimit = 10;
            advancedSearchBookDataSourceBuilder.Filters = new SobyFilters(false);
            advancedSearchBookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            advancedSearchBookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            advancedSearchBookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
            advancedSearchBookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
            advancedSearchBookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
            var advancedSearchBookDataService = new soby_WebServiceService(advancedSearchBookDataSourceBuilder);
            advancedSearchBookDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");

            itemSelection = new soby_ItemSelection("#homeItemSelectionDiv", "Meters", SobyItemSelectorTypes.GridView, autoCompleteBookDataService, advancedSearchBookDataService, null, "No record", "BookSelectionDialog", "/Management/CustomerSelection.html", "Id", "Title", "");
            itemSelection.Initialize();

        }
    </script>
</asp:Content>
