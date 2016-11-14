$(function () {
    soby_PopulateGridStaticDataBinding();
});

function soby_PopulateGridStaticDataBinding() {
    var items = [
        { ID: 1, FirstName: "Serkant", LastName: "Samurkas", Age: 37, Sex: "M" },
        { ID: 2, FirstName: "Dexter", LastName: "McKenzie", Age: 39, Sex: "M" },
        { ID: 3, FirstName: "Tricia", LastName: "Cooper", Age: 31, Sex: "F" },
        { ID: 4, FirstName: "Debra", LastName: "Drinian", Age: 39, Sex: "F" },
        { ID: 5, FirstName: "Alex", LastName: "Long", Age: 24, Sex: "M" },
        { ID: 6, FirstName: "Michele", LastName: "Kane", Age: 26, Sex: "F" }
    ];

    var customerDataSourceBuilder = new soby_StaticDataBuilder();
    customerDataSourceBuilder.Filters = new SobyFilters(false);
    customerDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("FirstName", SobyFieldTypes.Text, null);
    customerDataSourceBuilder.AddSchemaField("LastName", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Age", SobyFieldTypes.Number, null);
    customerDataSourceBuilder.AddSchemaField("Sex", SobyFieldTypes.Text, null);
    
    var customerService = new soby_StaticDataService(customerDataSourceBuilder, items);
        
    var customerGrid = new soby_WebGrid("#soby_CustomersDiv", "Customers", customerService, "There is no record found.");
    customerGrid.ImagesFolderUrl = "/media/images";
    customerGrid.IsEditable = false;
    customerGrid.IsSelectable = false;
    customerGrid.AddKeyField("ID");
    customerGrid.AddColumn("FirstName", "FirstName", SobyShowFieldsOn.All, null, null, true, true, true, null);
    customerGrid.AddColumn("LastName", "LastName", SobyShowFieldsOn.All, null, null, true, true, true, null);
    customerGrid.AddColumn("Age", "Age", SobyShowFieldsOn.All, null, null, true, true, true, null);
    customerGrid.AddColumn("Sex", "Sex", SobyShowFieldsOn.All, null, null, true, true, true, null);

    customerGrid.Initialize(true);
}

 