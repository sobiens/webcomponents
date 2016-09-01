
$(function () {
    soby_PopulateWebMetroTiles();
});

function soby_PopulateWebMetroTiles() {
    var bookDataSourceBuilder = new soby_WSBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
    bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("ImageUrl", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("WebSiteUrl", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
    var bookService = new soby_WebServiceService(bookDataSourceBuilder);
    bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");

/*
    var dataSourceBuilder = new soby_CamlBuilder("Metro Tiles", "", 100, null);
    dataSourceBuilder.Filters = new SobyFilters(false);
    dataSourceBuilder.AddViewField("ID", "ID", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Title", "Title", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Url", "Url", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Image", "Image", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("OpenInNewWindow", "OpenInNewWindow", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("StartColor", "StartColor", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("EndColor", "EndColor", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Colspan", "Colspan", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Rowspan", "Rowspan", SobyFieldTypes.Text);
    var spService = new soby_SharePointService(dataSourceBuilder);
*/
    var carousel = new soby_MetroTilesGrid("#soby_MetroStyleGridDiv", "Metro Tiles", bookService, "There is no record found.", "ImageUrl", "Title", "WebSiteUrl", "OpenInNewWindow", "StartColor", "EndColor", "Colspan", "Rowspan");
    carousel.MaxWidth = 1000;
    carousel.ItemPopulated = function (items) {
        for (var i = 0; i < items.length; i++) {
            items[i]["OpenInNewWindow"] = 1;
            items[i]["StartColor"] = "red";
            items[i]["EndColor"] = "green";
            items[i]["Colspan"] = "1";
            items[i]["Rowspan"] = "1";
        }
    }
    carousel.Initialize(true);
}

