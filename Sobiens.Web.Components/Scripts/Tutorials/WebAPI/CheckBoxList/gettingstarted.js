$(function () {
    soby_PopulateCheckBoxList();
});
var itemSelection = null;
function soby_PopulateCheckBoxList() {
    var autoCompleteBookDataSourceBuilder = new soby_WSBuilder();
    autoCompleteBookDataSourceBuilder.Filters = new SobyFilters(false);
    autoCompleteBookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
    autoCompleteBookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
    var autoCompleteBookDataService = new soby_WebServiceService(autoCompleteBookDataSourceBuilder);
    autoCompleteBookDataService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
    var financialYearCheckBoxList = new SobyCheckBoxList("soby_BooksDiv", null, null);
    financialYearCheckBoxList.ItemClassName = "financialyear";
    financialYearCheckBoxList.ImagesFolderUrl = "/media/images";
    financialYearCheckBoxList.DataService = autoCompleteBookDataService;
    financialYearCheckBoxList.ValueFieldName = "Title";
    financialYearCheckBoxList.TitleFieldName = "Title";
    //financialYearCheckBoxList.ShowEmptyOption = true;
    financialYearCheckBoxList.ValueChanged = function () {
        //callbackFunction()
    };
    financialYearCheckBoxList.Initialize();
    financialYearCheckBoxList.ValueChanged();
}
