document.write("<div id='soby_CustomerDiv'></div>");
$(function () {
    var inDesignMode = eval("document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value");
    if (inDesignMode == "1") {
        $("#soby_CustomerDiv").remove();
        return;
    }
    soby_PopulateSPHeader();
});
function soby_PopulateSPHeader() {
    var dataSourceBuilder = new soby_CamlBuilder("Customers", "", 5, "https://soby.sharepoint.com");
    dataSourceBuilder.Filters = new SobyFilters(false);
    dataSourceBuilder.AddViewField("ID", "ID", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Title", "Title", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Full_x0020_Name", "FullName", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Job_x0020_Title", "JobTitle", SobyFieldTypes.Text);
    var spService = new soby_SharePointService(dataSourceBuilder);
    var customerGrid = new soby_WebGrid("#soby_CustomerDiv", "Customers", spService, "There is no record found.");
    customerGrid.AddColumn("FullName", "Full Name", SobyShowFieldsOn.All, null, null, true, true, false, null);
    customerGrid.AddColumn("JobTitle", "Job Title", SobyShowFieldsOn.All, null, null, true, true, false, null);
    var camlBuilder = new soby_CamlBuilder("Customer Phones", "", 2, "https://soby.sharepoint.com");
    camlBuilder.Filters = new SobyFilters(false);
    camlBuilder.AddViewField("ID", "ID", SobyFieldTypes.Text);
    camlBuilder.AddViewField("Phone_x0020_Type", "PhoneType", SobyFieldTypes.Text);
    camlBuilder.AddViewField("Title", "Title", SobyFieldTypes.Text);
    var spService = new soby_SharePointService(camlBuilder);
    var customerPhonesGrid = new soby_WebGrid("#soby_CustomerPhonesDiv", "Phones", spService, "There is no record found.");
    customerPhonesGrid.DisplayTitle = false;
    customerPhonesGrid.IsSelectable = false;
    customerPhonesGrid.AddColumn("PhoneType", "Phone Type", SobyShowFieldsOn.All, null, null, true, true, false, null);
    customerPhonesGrid.AddColumn("Title", "Phone", SobyShowFieldsOn.All, null, null, true, true, false, null);
    /*
        customerPhonesGrid.AddColumn("Title", "Phone", function(item){
            var content = $("<div></div>");
            var link =$("<a href='javascript:void(0)' onclick='soby_PopulateCustomerPhones(" + item.ID + ")'></a>").text(item.Title);
            content.append(link);
            return content.html();
        });
    */
    customerGrid.AddDataRelation("Title", "ID", customerPhonesGrid.GridID, "Customer");
    var camlBuilder = new soby_CamlBuilder("Customer Addresses", "", 2, "https://soby.sharepoint.com");
    camlBuilder.Filters = new SobyFilters(false);
    camlBuilder.AddViewField("ID", "ID", SobyFieldTypes.Text);
    camlBuilder.AddViewField("town", "Town", SobyFieldTypes.Text);
    camlBuilder.AddViewField("Title", "Title", SobyFieldTypes.Text);
    camlBuilder.AddViewField("PostCode", "PostCode", SobyFieldTypes.Text);
    camlBuilder.AddViewField("Address1", "Address1", SobyFieldTypes.Text);
    var spService = new soby_SharePointService(camlBuilder);
    var customerAddressesGrid = new soby_WebGrid("#soby_CustomerAddressesDiv", "Addresses", spService, "There is no record found.");
    customerAddressesGrid.DisplayTitle = false;
    customerAddressesGrid.IsSelectable = false;
    var cellTemplate1 = { TemplateType: "CellContent", PopupLinkText: "More info", Template: "<div><div style='background-color: blue;color: white;padding: 5px;float: left;'><strong>PostCode:</strong></div><div style='background-color: black;color: white;padding: 5px;float: left;'>#{PostCode}</div></div>" };
    var cellTemplate2 = { TemplateType: "PopupContent", PopupLinkText: "More info", Template: "<table><tr><td><strong>Address Line1:</strong></td><td>#{Address1}</td></tr><tr><td><strong>City:</strong></td><td>#{Title}</td></tr><tr><td><strong>Town:</strong></td><td>#{Town}</td></tr><tr><td><strong>PostCode:</strong></td><td>#{PostCode}</td></tr></table>" };
    customerAddressesGrid.AddColumn("Title", "City", SobyShowFieldsOn.All, null, cellTemplate1, true, true, false, null);
    customerAddressesGrid.AddColumn("Town", "Town", SobyShowFieldsOn.All, null, null, true, true, false, null);
    customerAddressesGrid.AddColumn("Town", "Town", SobyShowFieldsOn.All, null, cellTemplate2, true, true, false, null);
    customerGrid.AddDataRelation("Title", "ID", customerAddressesGrid.GridID, "Customer");
    //customerGrid.PopulateGrid();
    customerGrid.Initialize(true);
}
//# sourceMappingURL=soby.customers.js.map