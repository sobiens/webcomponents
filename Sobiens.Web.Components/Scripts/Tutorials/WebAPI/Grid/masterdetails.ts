
$(function () {
    soby_PopulateGridMasterDetails();
});

function soby_PopulateGridMasterDetails() {
    var authorDataSourceBuilder = new soby_WSBuilder();
    authorDataSourceBuilder.Filters = new SobyFilters(false);
    authorDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    authorDataSourceBuilder.AddSchemaField("Name", SobyFieldTypes.Text, null);
    var authorService = new soby_WebServiceService(authorDataSourceBuilder);
    authorService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET");


    var authorGrid = new soby_WebGrid("#soby_AuthorsDiv", "Authors", authorService, "There is no record found.");
    authorGrid.AddColumn("Name", "Name", SobyShowFieldsOn.All, null, null, true, true, false, null, null, null);
    authorGrid.IsSelectable = false;
    authorGrid.IsEditable = false;

    var authorBooksDataSourceBuilder = new soby_WSBuilder();
    authorBooksDataSourceBuilder.Filters = new SobyFilters(false);
    authorBooksDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    authorBooksDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    authorBooksDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    authorBooksDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    authorBooksDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    authorBooksDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Number, null);
    var authorBooksService = new soby_WebServiceService(authorBooksDataSourceBuilder);
    authorBooksService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");

    var authorBooksGrid = new soby_WebGrid("#soby_CustomerPhonesDiv", "Books", authorBooksService, "There is no record found.");
    authorBooksGrid.DisplayTitle = false;
    authorBooksGrid.IsSelectable = false;
    authorBooksGrid.IsEditable = false;
    authorBooksGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    authorBooksGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    authorBooksGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    authorBooksGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    authorGrid.AddDataRelation("Title", "Id", authorBooksGrid.GridID, "AuthorId")

    authorGrid.Initialize(true);
}

 