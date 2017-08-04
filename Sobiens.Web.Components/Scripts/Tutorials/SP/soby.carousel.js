document.write("<div id='soby_CarouselDiv'></div>");
$(function () {
    var inDesignMode = eval("document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value");
    if (inDesignMode == "1") {
        $("#soby_CarouselDiv").remove();
        return;
    }
    soby_PopulateSPCarousel();
});
function soby_PopulateSPCarousel() {
    //    var sobyConfig = new sobyConfig("http://localhost:7287");
    var dataSourceBuilder = new soby_CamlBuilder("Carousel", "", 10, null);
    dataSourceBuilder.Filters = new SobyFilters(false);
    dataSourceBuilder.AddViewField("ID", "ID", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Title", "Title", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Body", "Body", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Image", "Image", SobyFieldTypes.Text);
    var spService = new soby_SharePointService(dataSourceBuilder);
    var carousel = new soby_Carousel("#soby_CarouselDiv", "Carousel", spService, "There is no record found.", "Image", "Title", "Body", false);
    carousel.MaxWidth = 600;
    carousel.Initialize(true);
}
