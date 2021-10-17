<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="WebAPIODataDemo.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.WebAPIODataDemo" Title="Grid - Web API and OData Implementation" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Web API and OData Implementation</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
    <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
    <script src="/media/js/soby.service.js"></script>
    <script src="/media/js/soby.ui.components.js"></script>
    <script src="/Scripts/Tutorials/WebAPI/Grid/filtering.js"></script>   
    <p>This example demonstrates how to use Web API and OData in the Soby Data Grid. <br />
    <div id='soby_TasksDiv'></div>

    <script language="javascript">
        $(function () {
            soby_PopulateTasks();
        });
        function soby_PopulateTasks() {
            var bookDataSourceBuilder = new soby_WSBuilder();
            bookDataSourceBuilder.Filters = new SobyFilters(false);
            bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
            bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
            //            bookDataSourceBuilder.AddSchemaField("DueDate", SobyFieldTypes.DateTime, null);
            bookDataSourceBuilder.AddSchemaField("StatusId", SobyFieldTypes.Lookup, { ModelName: "Status", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Title", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Statuses", "json", "application/json; charset=utf-8", "GET") });
            bookDataSourceBuilder.AddSchemaField("PriorityId", SobyFieldTypes.Lookup, { ModelName: "Priority", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Title", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Priorities", "json", "application/json; charset=utf-8", "GET") });
            bookDataSourceBuilder.AddSchemaField("CategoryId", SobyFieldTypes.Lookup, { ModelName: "Category", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Categories", "json", "application/json; charset=utf-8", "GET") });
            var bookService = new soby_WebServiceService(bookDataSourceBuilder);
            bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Tasks", "json", "application/json; charset=utf-8", "GET");
            bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Tasks", "json", "application/json; charset=utf-8", "POST");
            bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Tasks(#key)", "json", "application/json; charset=utf-8", "PUT");
            bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Tasks(#key)", "json", "application/json; charset=utf-8", "DELETE");
            var bookGrid = new soby_WebGrid("#soby_TasksDiv", "Tasks", bookService, "There is no record found.");
            bookGrid.ImagesFolderUrl = "/media/images";
            bookGrid.AddKeyField("Id");
            bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null);
            //            bookGrid.AddColumn("DueDate", "Due date", SobyShowFieldsOn.All, null, null, true, true, true, null);
            bookGrid.AddColumn("StatusId", "Status", SobyShowFieldsOn.All, function (item) {
                return item.Status.Title;
            }, null, true, true, true, null);
            bookGrid.AddColumn("PriorityId", "Priority", SobyShowFieldsOn.All, function (item) {
                return item.Priority.Title;
            }, null, true, true, true, null);
            bookGrid.AddColumn("CategoryId", "Category", SobyShowFieldsOn.All, function (item) {
                return item.Category.Name;
            }, null, true, true, true, null);
            bookGrid.AddGroupByField("CategoryId", true, function (item) { return item.Category.Name; });
            bookGrid.AddAggregateField("PriorityId", SobyAggregateTypes.Count);
            bookGrid.Initialize(true);
        }
    </script>

    <br />Want to learn more about the grid component? Check out the <a href="/API Documentation/Grid/Grid.aspx">API documentation</a>.

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
