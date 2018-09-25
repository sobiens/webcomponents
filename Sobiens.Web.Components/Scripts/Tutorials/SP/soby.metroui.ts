document.write("<div id='soby_MetroTilesDiv'></div>");
$(function () {
    soby_PopulateSPMetroTiles();
});

function soby_PopulateSPMetroTiles() {
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

    var carousel = new soby_MetroTilesGrid("#soby_MetroTilesDiv", "Metro Tiles", spService, "There is no record found.", "Image", "Title", "Url", "OpenInNewWindow", "StartColor", "EndColor", "Colspan", "Rowspan");
    carousel.MaxWidth = "600px";
    carousel.Initialize(true);
}

