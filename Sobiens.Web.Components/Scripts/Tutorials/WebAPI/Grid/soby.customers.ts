
document.write("<div id='soby_CustomerDiv'></div>");
$(function () {
    soby_PopulateWebHeader();
});

function soby_PopulateWebHeader() {
    /*
    dataSourceBuilder.AddHeader("AuthCode", $.cookie("AuthCode"));
    dataSourceBuilder.Arguments = new WSArguments(false);
    dataSourceBuilder.Arguments.AddArgument("Name", "");
    dataSourceBuilder.Arguments.AddArgument("showActives", active);
    dataSourceBuilder.Arguments.AddArgument("showInActives", inactive);

    dataSourceBuilder.AddSchemaField("CustomerId", "CustomerId", SobyFieldTypes.Text);
    dataSourceBuilder.AddSchemaField("Name", "Name", SobyFieldTypes.Text);
    dataSourceBuilder.AddOrderField("Name", true);

    var wsService = new soby_WebServiceService(dataSourceBuilder);
    meterCustomerGrid = new soby_WebGrid("#MeterCustomersGrid", maGetLanguageValue("Customers"), wsService, maGetLanguageValue("NoRecordFound"));
    meterCustomerGrid.EventGridPopulated = function () {
        $("#MeterCustomersGrid .soby_griddatarow td:first-child").css("width", "60px")
        $("#idNewMeterCustomerButton").remove()
        $("<a id='idNewMeterCustomerButton' class='ms-heroCommandLink' href='javascript:void(0)' onclick=\"ShowCommonDialog('MeterCustomerEdit.html?IsDlg=1', '" + maGetLanguageValue("AddNewMeterCustomer") + "', 'MeterCustomerEditDialog', PopulateMeterCustomers)\" target=\"_self\"><span class='sma-addnew'><img id='idHomePageNewItem-img' src='../Images/smacommon.png?ctag=6' class='sma-addnew-img'></span><span class='lv' resource='AddNewMeterCustomer'>" + maGetLanguageValue("AddNewMeterCustomer") + "</span></a>").insertBefore("#MeterCustomersGrid .soby_grid");

    }
    meterCustomerGrid.IsSelectable = false;
    meterCustomerGrid.DisplayTitle = true;
    meterCustomerGrid.AddColumn("CustomerId", "", function (item) {
        return "<div id='deletemeterCustomerdiv_" + item.CustomerId + "'><a href='javascript:void(0)' onclick=\"maDeleteMeterCustomer('" + item.CustomerId + "')\"><img src='/images/delete.gif'></a>" +
        "<a href='javascript:void(0)' onclick=\"ShowCommonDialog('MeterCustomerEdit.html?IsDlg=1&amp;ID=" + item.CustomerId + "', 'Add MeterCustomer', 'MeterCustomerEditDialog', PopulateMeterCustomers)\"><img src='/images/edit.gif' border='0'></a>" +
        "</div>"
    });
    meterCustomerGrid.AddColumn("Name", maGetLanguageValue("Name"), function (item) {
        var container = $("<div></div>");
        var link = $("<a href-'javascript:void(0)'></a>").text(item.Name);
        container.append(link);
        return container.html();
    });
    meterCustomerGrid.Initialize(true)
    */
    var dataSourceBuilder = new soby_WSBuilder();
    dataSourceBuilder.Filters = new SobyFilters(false);
    dataSourceBuilder.AddSchemaField("ID", SobyFieldTypes.Text, null);
    dataSourceBuilder.AddSchemaField("FirstName", SobyFieldTypes.Text, null);
    dataSourceBuilder.AddSchemaField("LastName", SobyFieldTypes.Text, null);
    dataSourceBuilder.AddSchemaField("Age", SobyFieldTypes.Text, null);
    dataSourceBuilder.AddSchemaField("Sex", SobyFieldTypes.Text, null);
    var spService = new soby_WebServiceService(dataSourceBuilder);

    var customerGrid = new soby_WebGrid("#soby_CustomerDiv", "Customers", spService, "There is no record found.");
    customerGrid.ImagesFolderUrl = "/media/images";
    customerGrid.AddColumn("ID", "ID", SobyShowFieldsOn.All, null, null, true, true, false, null);
    customerGrid.AddColumn("FirstName", "Full Name", SobyShowFieldsOn.All, function (item) {
        return item.FirstName + " " + item.LastName;
    }, null, true, true, false, null);
    customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, null, null, true, true, false, null);
    customerGrid.AddColumn("Age", "Age", SobyShowFieldsOn.All, null, null, true, true, false, null);

    var dataSourceBuilder1 = new soby_WSBuilder();
    dataSourceBuilder1.Filters = new SobyFilters(false);
    dataSourceBuilder1.AddSchemaField("ID", SobyFieldTypes.Text, null);
    dataSourceBuilder1.AddSchemaField("PhoneType", SobyFieldTypes.Text, null);
    dataSourceBuilder1.AddSchemaField("Number", SobyFieldTypes.Text, null);
    var spService = new soby_WebServiceService(dataSourceBuilder1);

    var customerPhonesGrid = new soby_WebGrid("#soby_CustomerPhonesDiv", "Phones", spService, "There is no record found.");
    customerPhonesGrid.ImagesFolderUrl = "/media/images";
    customerPhonesGrid.DisplayTitle = false;
    customerPhonesGrid.IsSelectable = false;
    customerPhonesGrid.AddColumn("PhoneType", "Phone Type", SobyShowFieldsOn.All, null, null, true, true, false, null);
    customerPhonesGrid.AddColumn("Number", "Phone", SobyShowFieldsOn.All, null, null, true, true, false, null);
    /*
        customerPhonesGrid.AddColumn("Title", "Phone", function(item){
            var content = $("<div></div>");
            var link =$("<a href='javascript:void(0)' onclick='soby_PopulateCustomerPhones(" + item.ID + ")'></a>").text(item.Title);
            content.append(link);
            return content.html();
        });
    */
    customerGrid.AddDataRelation("Title", "ID", customerPhonesGrid.GridID, "customerId")

    var dataSourceBuilder2 = new soby_WSBuilder();
//    var camlBuilder = new soby_CamlBuilder("Customer Addresses", "", 2, "https://soby.sharepoint.com");
    dataSourceBuilder2.Filters = new SobyFilters(false);
    dataSourceBuilder2.AddSchemaField("ID", SobyFieldTypes.Text, null);
    dataSourceBuilder2.AddSchemaField("Town", SobyFieldTypes.Text, null);
    dataSourceBuilder2.AddSchemaField("Title", SobyFieldTypes.Text, null);
    dataSourceBuilder2.AddSchemaField("PostCode", SobyFieldTypes.Text, null);
    dataSourceBuilder2.AddSchemaField("Address1", SobyFieldTypes.Text, null);

    var spService = new soby_WebServiceService(dataSourceBuilder2);
    var customerAddressesGrid = new soby_WebGrid("#soby_CustomerAddressesDiv", "Addresses", spService, "There is no record found.");
    customerAddressesGrid.ImagesFolderUrl = "/media/images";
    customerAddressesGrid.DisplayTitle = false;
    customerAddressesGrid.IsSelectable = false;
    var cellTemplate1 = { TemplateType: "CellContent", PopupLinkText: "More info", Template: "<div><div style='background-color: blue;color: white;padding: 5px;float: left;'><strong>PostCode:</strong></div><div style='background-color: black;color: white;padding: 5px;float: left;'>#{PostCode}</div></div>" }
    var cellTemplate2 = { TemplateType: "PopupContent", PopupLinkText: "More info", Template: "<table><tr><td><strong>Address Line1:</strong></td><td>#{Address1}</td></tr><tr><td><strong>City:</strong></td><td>#{Title}</td></tr><tr><td><strong>Town:</strong></td><td>#{Town}</td></tr><tr><td><strong>PostCode:</strong></td><td>#{PostCode}</td></tr></table>" }
    customerAddressesGrid.AddColumn("Title", "City", SobyShowFieldsOn.All, null, cellTemplate1, true, true, false, null);
    customerAddressesGrid.AddColumn("Town", "Town", SobyShowFieldsOn.All, null, null, true, true, false, null);
    customerAddressesGrid.AddColumn("Town", "Town", SobyShowFieldsOn.All, null, cellTemplate2, true, true, false, null);

    customerGrid.AddDataRelation("Title", "ID", customerAddressesGrid.GridID, "customerId")

    //customerGrid.PopulateGrid();
    customerGrid.Initialize(true);
}

 