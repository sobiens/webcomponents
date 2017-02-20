document.write("<div id='soby_BOEDiv' style='margin:auto;max-width:980px'></div>");
$(function () {
    var inDesignMode = eval("document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value");
    if (inDesignMode == "1") {
        $("#soby_BOEDiv").remove();
        return;
    }
    soby_PopulateWebNews();
});
function soby_PopulateWebNews() {
    var dataSourceBuilder = new soby_CamlBuilder("News", "", 5, null);
    dataSourceBuilder.Filters = new SobyFilters(false);
    dataSourceBuilder.AddViewField("ID", "ID", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Title", "Title", SobyFieldTypes.Text);
    dataSourceBuilder.AddViewField("Body", "Body", SobyFieldTypes.Text);
    var spService = new soby_SharePointService(dataSourceBuilder);
    var newsGrid = new soby_WebGrid("#soby_BOEDiv", "Addresses", spService, "There is no record found.");
    newsGrid.DisplayTitle = false;
    newsGrid.IsSelectable = false;
    newsGrid.ShowHeader = false;
    newsGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, function (item) {
        var content = $("<div></div>");
        var panel = $("<div style='width:940px'></div>");
        var header = $("<h2></h2>").text(item.Title);
        panel.append(header);
        var middleContentPanel = $("<div><div id='soby_newsImageDiv_" + item.ID + "' style='float:left;width:33%'></div><div id='soby_newsBody_" + item.ID + "' style='float:left;padding: 10px;width:60%'></div></div>");
        panel.append(middleContentPanel);
        panel.append("<hr style='display:block;clear:both'><div class='row'><div class='col-md-6'>25 September 2014</div><div class='col-md-6' style='text-align:right'><a href='#'>Read more &gt;</a></div></div><hr>");
        middleContentPanel.find("#soby_newsBody_" + item.ID).html(item.Body);
        content.append(panel);
        return content.html();
    }, null, true, true, false, null, null, null);
    newsGrid.ItemCreated = function (rowID, item) {
        soby_PopulateWebNewsImages(item.ID);
    };
    newsGrid.Initialize(true);
}
function soby_PopulateWebNewsImages(itemID) {
    soby.SPLibrary.Lists.GetSPListItemAttachments("News", itemID, function (itemID, attachments) {
        soby_LogMessage(attachments);
        if (attachments.length == 0)
            return;
        if (attachments.length == 1) {
            $("#soby_newsImageDiv_" + itemID).html("<img src='" + attachments[0] + "' alt='' style='width:320px;height:202px'>");
            return;
        }
        var items = new Array();
        for (var i = 0; i < attachments.length; i++) {
            items[items.length] = { Image: attachments[i], Title: "", Body: "" };
        }
        var dataSourceBuilder = new soby_StaticDataBuilder();
        dataSourceBuilder.Filters = new SobyFilters(false);
        dataSourceBuilder.AddSchemaField("ID", SobyFieldTypes.Text, null);
        dataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
        dataSourceBuilder.AddSchemaField("Body", SobyFieldTypes.Text, null);
        var staticDataService = new soby_StaticDataService(dataSourceBuilder, items);
        var carousel = new soby_Carousel("#soby_newsImageDiv_" + itemID, "Carousel", staticDataService, "There is no record found.", "Image", "Title", "Body", false);
        carousel.MaxWidth = 600;
        carousel.Initialize(true);
    });
}
