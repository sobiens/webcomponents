
$(function () {
    soby_PopulateGridCellTemplate();
});
function soby_PopulateGridCellTemplate() {
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
    bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
    bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
    bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");

    var bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
    bookGrid.ImagesFolderUrl = "/media/images";
    bookGrid.AddKeyField("Id");
    bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
    var cellTemplate1 = { TemplateType: "CellContent", PopupLinkText: "More info", Template: "<div><div style='background-color: blue;color: white;padding: 5px;float: left;width:150px'><strong>#{Genre} - #{Year}</strong></div><div style='background-color: black;color: white;padding: 5px;float: left;text-align:right;width:30px'>$#{Price}</div></div>" };
    var cellTemplate2 = { TemplateType: "PopupContent", PopupLinkText: "More info", Template: "<div><div style='background-color: blue;color: white;padding: 5px;float: left;width:150px'><strong>#{Genre} - #{Year}</strong></div><div style='background-color: black;color: white;padding: 5px;float: left;text-align:right;width:30px'>$#{Price}</div></div>" }
    bookGrid.AddColumn("Year", "Description", SobyShowFieldsOn.All, null, cellTemplate1, true, true, true, null, null, null);
    bookGrid.AddColumn("Year", "Description", SobyShowFieldsOn.All, null, cellTemplate2, true, true, true, null, null, null);
    bookGrid.Initialize(true);
}