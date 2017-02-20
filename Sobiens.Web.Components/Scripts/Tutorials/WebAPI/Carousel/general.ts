$(function () {
    soby_PopulateWebCarousel();
});

function soby_PopulateWebCarousel() {
    var bookDataSourceBuilder = new soby_WSBuilder();
    bookDataSourceBuilder.Filters = new SobyFilters(false);
    bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("ImageUrl", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
    bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
    bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET") });
    var bookService = new soby_WebServiceService(bookDataSourceBuilder);
    bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    var carousel = new soby_Carousel("#soby_CarouselDiv", "Carousel", bookService, "There is no record found.", "ImageUrl", "Title", "Genre", false);
    carousel.MaxWidth = 600;
    carousel.ItemDataBound = function (cellIndex, dataItem)
    {
        var container = $("<div></div>");
        var imageSrc = dataItem[this.ImageFieldName];
        var caption = dataItem[this.CaptionFieldName];
        var image = $("<img alt='...' class='carouselimage'>");
        image.attr("src", imageSrc);
        container.append(image);
        var captionDiv = $("<div class='carousel-caption'></div>");
        var h3 = $("<h3></h3>");
        h3.html(caption);
        captionDiv.append(h3);
        container.append(captionDiv);
        return container.html();
    }
    carousel.Initialize(true);
}

 