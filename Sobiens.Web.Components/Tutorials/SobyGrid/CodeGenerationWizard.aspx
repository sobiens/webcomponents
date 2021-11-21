<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="CodeGenerationWizard.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.SetupWizard" Title="DataGrid - Code Generation Wizard" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>DataGrid Code Generation Wizard</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <p>
        You can generate your datagrid code with few clicks via using the wizard on the right hand side.
    </p>
    <script src="/media/js/jquery-3.1.0.js" type="text/javascript"></script>
    <script src="/media/js/jquery-ui-1.12.0.min.js"></script>
    <link href="/media/css/jquery-ui.min.css" rel="stylesheet" />
    <link href="/media/css/soby.ui.components.css" rel="stylesheet" type="text/css" media="all" />
    <script src="/Scripts/main.js"></script>
    <script src="/media/js/soby.service.js"></script>
    <script src="/media/js/soby.ui.components.js"></script>
    <style>
        .sobylabel{font-size:0.8em}
        .sobyinput{font-size:0.8em !important}
        .sobybutton{font-size:0.8em !important}
    </style>
    <div class="row">
        <div class="col-md-7" id="soby_wizardselectioncontrols">
            <br />
            <div id='soby_BooksGridDiv'></div>
            <pre id="ViewSourceDiv" class="viewsource html" style="background-color:ivory"></pre>
        </div>
        <div class="col-md-5" id="soby_wizardselecteditems">
            <div id="accordion">
                <h3>Data Source Type</h3>
                <div>
                    <p>
                        <input type="radio" name="DataSourceTypeRadioButton" id="DataSourceTypeStaticRadioButton" checked /><label for="DataSourceTypeStaticRadioButton" class="sobylabel">Static Data</label><br />
                        <input type="radio" name="DataSourceTypeRadioButton" id="DataSourceTypeWebAPIRadioButton" /><label for="DataSourceTypeWebAPIRadioButton" class="sobylabel">Web API</label><br />
                        <input type="radio" name="DataSourceTypeRadioButton" id="DataSourceTypeWebServiceRadioButton" disabled style="display:none"/><label for="DataSourceTypeWebServiceRadioButton" class="sobylabel" style="display:none">Web Service</label><br />
                    </p>
                    <p align="right"><input type="button" value="Next" onclick="sobyNavigateToDataSourceTab()" class="sobybutton" /></p>
                </div>
                <h3>Data Source</h3>
                <div>
                        <div class="row datasourceurl">
                            <div class="col-md-2 sobylabel">Url:</div>
                            <div class="col-md-10"><input type="text" id="UrlTextBox" class="sobyinput" onkeyup="sobyUrlChanged()" style="width:100%" /></div>
                        </div>
                        <div class="row datasourcemetadataurl">
                            <div class="col-md-2 sobylabel">MetaData Url:</div>
                            <div class="col-md-10"><input type="text" id="MetaDataUrlTextBox" class="sobyinput" onkeyup="sobyMetaDataUrlChanged()" style="width:100%" /></div>
                        </div>
                        <div class="row datasourcejsondata">
                            <div class="col-md-2 sobylabel">JSON Data:</div>
                            <div class="col-md-10"><textarea id="JSONDataTextArea" class="sobyinput" onkeyup="sobyJSONDataChanged()" rows="8" style="width:100%" >[
        { ID: 16, Title: "Northanger Abbey", Year: 1817, Price: 1295, Genre: "Gothic parody" },
        { ID: 17, Title: "David Copperfield", Year: 1850, Price: 1500, Genre: "Bildungsroman" },
        { ID: 18, Title: "Don Quixote", Year: 1617, Price: 895, Genre: "Picaresque" },
        { ID: 19, Title: "Moby Dick", Year: 1851, Price: 725, Genre: "Picaresque" },
        { ID: 20, Title: "Robinson Crusoe", Year: 1719, Price: 1250, Genre: "Picaresque" },
        { ID: 21, Title: "Gulliver’s Travels", Year: 1726, Price: 2150, Genre: "Picaresque" },
        { ID: 22, Title: "Clarissa", Year: 1748, Price: 475, Genre: "Picaresque" },
        { ID: 23, Title: "Tom Jones", Year: 1749, Price: 880, Genre: "Picaresque" },
        { ID: 24, Title: "Frankenstein", Year: 1818, Price: 740, Genre: "Picaresque" },
        { ID: 25, Title: "Nightmare Abbey", Year: 1818, Price: 895, Genre: "Picaresque" },
        { ID: 26, Title: "Sybil", Year: 1845, Price: 720, Genre: "Picaresque" },
        { ID: 27, Title: "Jane Eyre", Year: 1847, Price: 990, Genre: "Picaresque" },
        { ID: 28, Title: "Vanity Fair", Year: 1848, Price: 500, Genre: "Picaresque" }
    ];</textarea></div>
                        </div>
                    <br />
                    <p align="right"><input type="button" value="Previous" onclick="sobyNavigateToDataSourceTypeTab()" class="sobybutton" /><input type="button" value="Next" onclick="sobyNavigateToColumnSelectionTab()" class="sobybutton" /></p>
                </div>
                <h3>Column Selection</h3>
                <div>
                    <div id="soby_AddColumnFormDiv" style="display:none">
                        <div class="row">
                            <div class="col-md-5 sobylabel">Name:</div>
                            <div class="col-md-7"><input id="ColumnNameTextBox" class="sobyinput"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 sobylabel">Display Name:</div>
                            <div class="col-md-7"><input id="ColumnDisplayNameTextBox" class="sobyinput"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 sobylabel">Type:</div>
                            <div class="col-md-7"><select id="ColumnTypeSelectBox" style="padding:7px" class="sobyinput"><option value="0">Text</option><option value="1">Number</option><option value="4">Boolean</option><option value="9">Datetime</option></select></div>
                        </div>
                        <p align="right"><input type="button" value="Cancel" onclick="sobyShowColumnSelectionGridPanelDiv()" class="sobybutton" />&nbsp;<input type="button" value="Add" onclick="sobyAddColumn()" class="sobybutton" /></p>
                    </div>
                    <div id="soby_ColumnSelectionGridPanelDiv">
                        <input type="button" value="New Column" onclick="sobyShowNewColumnForm()" class="sobybutton" />
                        <input type="button" value="Delete Column" id="sobyDeleteColumnButton" onclick="sobyDeleteSelectedColumnsFromColumnSelection()" class="sobybutton" style="display:none" />
                        <div id="ColumnSelectionGrid"></div><br />
                        <p align="right"><input type="button" value="Previous" onclick="sobyNavigateToDataSourceTab()" class="sobybutton" /><input type="button" value="Next" onclick="sobyNavigateToGroupingTab()" class="sobybutton" /></p>
                    </div>
                </div>
                <h3>Grouping</h3>
                <div>
                    <select id="GroupingFromSelectBox" style="padding:7px" class="sobyinput"></select>&nbsp;<input type="button" value="Add" onclick="sobyAddGroupingColumn()" class="sobybutton" /><br /><br />
                    <div class="row">
                        <div class="col-md-8">
                            <select id="GroupingSelectBox" size="5" style="width:100%" class="sobyinput"></select>
                        </div>
                        <div class="col-md-4">
                            <input type="button" value="Remove" onclick="sobyRemoveGroupingColumn()" class="sobybutton" />
                        </div>
                    </div><br />
                    <p align="right"><input type="button" value="Previous" onclick="sobyNavigateToColumnSelectionTab()" class="sobybutton" /><input type="button" value="Next" onclick="sobyNavigateToAggregateTab()" class="sobybutton" /></p>
                </div>
                <h3>Aggregates</h3>
                <div>
                    <select id="AggregatesFromSelectBox" style="padding:7px"></select>&nbsp;<select id="AggregateTypeSelectBox" style="padding:7px"><option value="0">Average</option><option value="1">Count</option><option value="2">Max</option><option value="3">Min</option><option value="4">Sum</option></select>&nbsp;<input type="button" value="Add" onclick="sobyAddAggregateColumn()" class="sobybutton" /><br /><br />
                    <div class="row">
                        <div class="col-md-8">
                            <select id="AggregatesSelectBox" size="5" style="width:100%" class="sobyinput"></select>
                        </div>
                        <div class="col-md-4">
                            <input type="button" value="Remove" onclick="sobyRemoveAggregateColumn()" class="sobybutton" />
                        </div>
                    </div><br />
                    <p align="right"><input type="button" value="Previous" onclick="sobyNavigateToGroupingTab()" class="sobybutton" /><input type="button" value="Show Code" onclick="sobyShowCode()" id="ShowCodeButton" class="sobybutton" /></p>
                </div>
            </div>
        </div>
    </div>
    <script language="javascript">
        var columnSelectionGrid = null;
        var groupingSelectionGrid = null;
        var aggregatesSelectionGrid = null;
        var hasMetaDataUrlChanged = false;
        var soby_SchemaXml = null;
        function sobyShowNewColumnForm() {
            $("#soby_ColumnSelectionGridPanelDiv").slideUp("slow", function () {
                $("#soby_AddColumnFormDiv").slideDown("slow");
            });
        }
        function sobyShowColumnSelectionGridPanelDiv() {
            $("#soby_AddColumnFormDiv").slideUp("slow", function () {
                $("#soby_ColumnSelectionGridPanelDiv").slideDown("slow");
            });
        }
        function soby_PopulateColumnsFromMetaData() {
            var metaDataUrl = $("#MetaDataUrlTextBox").val();
            var entitySetName = metaDataUrl.substr(metaDataUrl.lastIndexOf("#")+1);
            $.ajax({
                url: metaDataUrl,
                type: "GET",
                processData: false,
                contentType: "application/json; charset=utf-8",
                complete: function (XMLHttpRequest) {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //            if (errorcallback)
                    //                errorcallback(XMLHttpRequest, textStatus, errorThrown);
                },
                success: function (data) {
                    soby_SchemaXml = $(data);
                    var entitySets = soby_SchemaXml.find("Schema EntitySet");
                    for (var i = 0; i < entitySets.length; i++) {
                        var entitySet = $(entitySets[i]);
                        var _entitySetName = entitySet.attr("Name");
                        var _entitySetType = entitySet.attr("EntityType");
                        if (entitySetName.toLowerCase() == _entitySetName.toLowerCase()) {
                            soby_PopulateEntityGrid(_entitySetName, _entitySetType);
                        }
                    }
                }
            });
        }

        function soby_PopulateEntityGrid(entitySetName, entitySetType) {
            var entityNamespace = entitySetType.substring(0, entitySetType.lastIndexOf("."));
            var entityName = entitySetType.substring(entitySetType.lastIndexOf(".") + 1);

            var entityType = soby_SchemaXml.find("Schema[Namespace='" + entityNamespace + "'] EntityType[Name='" + entityName + "']");
            var properties = entityType.find("Property");

            var keyFieldName = entityType.find("Key PropertyRef").attr("Name");

            var items = [];
            for (var i = 0; i < properties.length; i++) {
                var property = $(properties[i]);
                var name = property.attr("Name");
                var typeName = property.attr("Type");
                var fieldType = SobyFieldTypes.Text;
                if (typeName == "Edm.Int32" || typeName == "Edm.Decimal")
                    fieldType = SobyFieldTypes.Number;
                var referentialConstraint = entityType.find("NavigationProperty ReferentialConstraint[Property='" + name + "']");
                var isEditable = true;
                if (name == keyFieldName)
                    isEditable = false;
                if (referentialConstraint.length == 0) {
                    items[items.length] = { Name: name, DisplayName: name, FieldType: fieldType };
                }
            }

            sobyColumnSelectionGrid(items);
        }
        function soby_PopulateEntityGridFromJSONData() {
            var jsonData = eval($("#JSONDataTextArea").val());
            if (jsonData.length > 0) {
                var firstDataItem = jsonData[0];
                var propertyNames = Object.getOwnPropertyNames(firstDataItem);
                var items = [];
                for (var i = 0; i < propertyNames.length; i++) {
                    var name = propertyNames[i];
                    var fieldType = SobyFieldTypes.Text;
                    if (isNaN(firstDataItem[name]) === false)
                        fieldType = SobyFieldTypes.Number;
                    items[items.length] = { Name: name, DisplayName: name, FieldType: fieldType };
                }

                sobyColumnSelectionGrid(items);
            }
        }

        function sobyShowCode() {
            if ($("#ShowCodeButton").val() == "Show Code") {
                $("#soby_BooksGridDiv").slideUp("slow", function () {
                    $("#ViewSourceDiv").slideDown("slow");
                });
                $("#ShowCodeButton").val("Show Grid");
            }
            else {
                $("#ViewSourceDiv").slideUp("slow", function () {
                    $("#soby_BooksGridDiv").slideDown("slow");
                });
                $("#ShowCodeButton").val("Show Code");
            }
        }
        function sobyRemoveGroupingColumn() {
            $("#GroupingSelectBox option:selected").remove();
            sobyPopulateGrid();
        }
        function sobyRemoveAggregateColumn() {
            $("#AggregatesSelectBox option:selected").remove();
            sobyPopulateGrid();
        }
        function sobyMetaDataUrlChanged() {
            hasMetaDataUrlChanged = true;
        }
        function sobyJSONDataChanged() {
        }
        function sobyUrlChanged() {
            if (hasMetaDataUrlChanged == true)
                return;

            var url = $("#UrlTextBox").val();
            var lastIndex = url.lastIndexOf("/");
            var metaDataUrl = url.substr(0, lastIndex) + "/$metadata#" + url.substr(lastIndex + 1);
            $("#MetaDataUrlTextBox").val(metaDataUrl);
        }
        function sobyAddColumn() {
            var name = $("#ColumnNameTextBox").val();
            var displayName = $("#ColumnDisplayNameTextBox").val();
            var columnType = $("#ColumnTypeSelectBox option:selected").val();
            var item = { Name: name, DisplayName: displayName, FieldType: columnType };
            columnSelectionGrid.DataService.AddItem(item);
            sobyShowColumnSelectionGridPanelDiv();
        }
        function sobyAddGroupingColumn() {
            var option1 = $("<option></option>");
            option1.val($("#GroupingFromSelectBox option:selected").val());
            option1.text($("#GroupingFromSelectBox option:selected").text());
            $("#GroupingSelectBox").append(option1);
            sobyPopulateGrid();
        }
        function sobyAddAggregateColumn() {
            var option1 = $("<option></option>");
            option1.val($("#AggregatesFromSelectBox option:selected").val() + "-" + $("#AggregateTypeSelectBox option:selected").val());
            option1.text($("#AggregatesFromSelectBox option:selected").text());
            $("#AggregatesSelectBox").append(option1);
            sobyPopulateGrid();
        }
        $(function () {
            $("#accordion").accordion();
            $("#accordion").accordion({ event: false });
            if ($("#UrlTextBox").val() == "") {
                $("#UrlTextBox").val(soby_GetTutorialWebAPIUrl() + "/books");
                sobyUrlChanged();
            }
        });
        function sobyNavigateToDataSourceTab() { 
            $("#accordion").accordion("option", "active", 1);
            $(".datasourceurl").hide();
            $(".datasourcemetadataurl").hide();
            $(".datasourcejsondata").hide();
            if ($("#DataSourceTypeStaticRadioButton:checked").length > 0) {
                $(".datasourcejsondata").show();
            }
            else {
                $(".datasourceurl").show();
                $(".datasourcemetadataurl").show();
                $("#UrlTextBox").focus();
            }
        }
        function sobyNavigateToDataSourceTypeTab() {
            $("#accordion").accordion("option", "active", 0);
        }
        function sobyColumnSelectionGrid(items) {
            var columnSelectionDataSourceBuilder = new soby_StaticDataBuilder();
            columnSelectionDataSourceBuilder.Filters = new SobyFilters(false);
            columnSelectionDataSourceBuilder.AddSchemaField("Name", SobyFieldTypes.Text, null);
            columnSelectionDataSourceBuilder.AddSchemaField("DisplayName", SobyFieldTypes.Text, null);
            columnSelectionDataSourceBuilder.AddSchemaField("FieldType", SobyFieldTypes.Number, null);

            var columnSelectionService = new soby_StaticDataService(columnSelectionDataSourceBuilder, items);

            columnSelectionGrid = new soby_WebGrid("#ColumnSelectionGrid", "Column Selection", columnSelectionService, "There is no record found.");
            columnSelectionGrid.IsEditable = false;
            columnSelectionGrid.IsSelectable = true;
            columnSelectionGrid.AddKeyField("Name");
            columnSelectionGrid.AddColumn("Name", "Name", SobyShowFieldsOn.All, null, null, true, true, true, null);
            columnSelectionGrid.AddColumn("DisplayName", "Display Name", SobyShowFieldsOn.All, null, null, true, true, true, null);
            columnSelectionGrid.AddColumn("FieldType", "Type", SobyShowFieldsOn.All, function (item) {
                if (item["FieldType"] == SobyFieldTypes.Number)
                    return "Number";
                else if (item["FieldType"] == SobyFieldTypes.Boolean)
                    return "Boolean";
                else if (item["FieldType"] == SobyFieldTypes.DateTime)
                    return "DateTime";
                return "Text";
            }, null, true, true, true, null);
            columnSelectionGrid.OnRowSelected = function (grid, rowId) {
                if(columnSelectionGrid.GetSelectedDataItems().length>0)
                    $("#sobyDeleteColumnButton").show();
                else
                    $("#sobyDeleteColumnButton").hide();
            }
            columnSelectionGrid.OnGridPopulated = function () {
                sobyPopulateGrid();
                if (columnSelectionGrid.GetSelectedDataItems().length > 0)
                    $("#sobyDeleteColumnButton").show();
                else
                    $("#sobyDeleteColumnButton").hide();
            }
            columnSelectionGrid.Initialize(true);
        }
        function sobyDeleteSelectedColumnsFromColumnSelection() {
            columnSelectionGrid.DeleteSelectedRows();
        }
        function sobyNavigateToColumnSelectionTab() {
            $("#accordion").accordion("option", "active", 2);
            if ($("#DataSourceTypeStaticRadioButton:checked").length > 0) {
                soby_PopulateEntityGridFromJSONData();
            }
            else {
                soby_PopulateColumnsFromMetaData();
            }
        }

        function sobyNavigateToGroupingTab() {
            $("#accordion").accordion("option", "active", 3);
            var items = [];

            $("#GroupingFromSelectBox option").remove();
            $("#AggregatesFromSelectBox option").remove();
            for (var i = 0; i < columnSelectionGrid.Items.length; i++) {
                var item = columnSelectionGrid.Items[i];
                var option1 = $("<option></option>");
                option1.val(item.Name);
                option1.text(item.DisplayName);
                $("#GroupingFromSelectBox").append(option1);
                var option2 = $("<option></option>");
                option2.val(item.Name);
                option2.text(item.DisplayName);
                $("#AggregatesFromSelectBox").append(option2);
            }

            var groupingSelectionDataSourceBuilder = new soby_StaticDataBuilder();
            groupingSelectionDataSourceBuilder.Filters = new SobyFilters(false);
            groupingSelectionDataSourceBuilder.AddSchemaField("Name", SobyFieldTypes.Text, null);
            groupingSelectionDataSourceBuilder.AddSchemaField("DisplayName", SobyFieldTypes.Text, null);
            groupingSelectionDataSourceBuilder.AddSchemaField("FieldType", SobyFieldTypes.Number, null);

            var groupingSelectionService = new soby_StaticDataService(groupingSelectionDataSourceBuilder, items);

            groupingSelectionGrid = new soby_WebGrid("#GroupingGrid", "Grouping Selection", groupingSelectionService, "There is no record found.");
            groupingSelectionGrid.IsEditable = true;
            groupingSelectionGrid.IsSelectable = true;
            groupingSelectionGrid.AddKeyField("Name");
//            groupingSelectionGrid.AddColumn("Name", "Name", SobyShowFieldsOn.All, null, null, true, true, true, null);
            groupingSelectionGrid.AddColumn("DisplayName", "Display Name", SobyShowFieldsOn.All, null, null, true, true, true, null);

            groupingSelectionGrid.Initialize(true);
        }

        function sobyNavigateToAggregateTab() {
            sobyPopulateGrid();
            $("#accordion").accordion("option", "active", 4);
            var items = [];

            for (var i = 0; i < columnSelectionGrid.Items.length; i++) {
                var item = columnSelectionGrid.Items[i];
                items[items.length] = { Name: item.Name, DisplayName: item.DisplayName, FieldType: item.FieldType };
            }

            var aggregateSelectionDataSourceBuilder = new soby_StaticDataBuilder();
            aggregateSelectionDataSourceBuilder.Filters = new SobyFilters(false);
            aggregateSelectionDataSourceBuilder.AddSchemaField("Name", SobyFieldTypes.Text, null);
            aggregateSelectionDataSourceBuilder.AddSchemaField("DisplayName", SobyFieldTypes.Text, null);
            aggregateSelectionDataSourceBuilder.AddSchemaField("FieldType", SobyFieldTypes.Number, null);

            var aggregateSelectionService = new soby_StaticDataService(aggregateSelectionDataSourceBuilder, items);

            aggregateSelectionGrid = new soby_WebGrid("#AggregatesGrid", "Aggregate Selection", aggregateSelectionService, "There is no record found.");
            aggregateSelectionGrid.IsEditable = true;
            aggregateSelectionGrid.IsSelectable = true;
            aggregateSelectionGrid.AddKeyField("Name");
            //            aggregateSelectionGrid.AddColumn("Name", "Name", SobyShowFieldsOn.All, null, null, true, true, true, null);
            aggregateSelectionGrid.AddColumn("DisplayName", "Display Name", SobyShowFieldsOn.All, null, null, true, true, true, null);

            aggregateSelectionGrid.Initialize(true);
        }

        function sobyPopulateGrid() {
            if ($("#DataSourceTypeStaticRadioButton:checked").length > 0) {
                var scriptText = " var items = " + $("#JSONDataTextArea").val() + " \n";
                scriptText += " var bookService = new soby_StaticDataService([ \n";
                for (var i = 0; i < columnSelectionGrid.Items.length; i++) {
                    var item = columnSelectionGrid.Items[i];
                    scriptText += "new SobySchemaField('" + item.Name + "', SobyFieldTypes.Text, null),\n"
                }
                scriptText += "], items); \n ";
            }
            else {
                var scriptText = " \
                                    var bookDataSourceBuilder = new soby_WSBuilder();\n \
                                    bookDataSourceBuilder.Filters = new SobyFilters(false);\n";
                for (var i = 0; i < columnSelectionGrid.Items.length; i++) {
                    var item = columnSelectionGrid.Items[i];
                    scriptText += " bookDataSourceBuilder.AddSchemaField('" + item.Name + "', " + SobyFieldTypes.Text + ", null);\n"
                }

                scriptText += " var bookService = new soby_WebServiceService(bookDataSourceBuilder);\n \
                                bookService.Transport.Read = new soby_TransportRequest('" + soby_GetTutorialWebAPIUrl() + "/Books', 'json', 'application/json; charset=utf-8', 'GET');\n ";
            }

            scriptText += " var bookGrid = new soby_WebGrid('#soby_BooksGridDiv', 'Items', bookService, 'There is no record found.');\n \
                                bookGrid.IsEditable = false;\n "

            for (var i = 0; i < columnSelectionGrid.Items.length;i++){
                var item = columnSelectionGrid.Items[i];
                scriptText += " bookGrid.AddColumn('" + item.Name + "', '" + item.DisplayName + "', " + SobyShowFieldsOn.All + ", null, null, true, true, true, null);\n";
            }

            var groupings = $("#GroupingSelectBox option");
            for (var i = 0; i < groupings.length; i++) {
                var grouping = $(groupings[i]);
                var fieldName = grouping.val();
                scriptText += " bookGrid.AddGroupByField('" + fieldName + "', true);\n";
            }

            var aggregates = $("#AggregatesSelectBox option");
            for (var i = 0; i < aggregates.length; i++) {
                var aggregate = $(aggregates[i]);
                var fieldName = aggregate.val().split("-")[0];
                var aggregateType = aggregate.val().split("-")[1];
                scriptText += " bookGrid.AddAggregateField('" + fieldName + "', " + aggregateType + ");\n";
            }
            
            scriptText += " bookGrid.Initialize(true);";
            eval(scriptText);
            var sourceCodeHtml = " \
&lt;script src='/media/js/jquery-3.1.0.js' type='text/javascript'&gt;&lt;/script&gt;\n \
&lt;script src='/media/js/jquery-ui-1.12.0.min.js'&gt;&lt;/script&gt;\n \
&lt;link href='/media/css/jquery-ui.min.css' rel='stylesheet' /&gt;\n \
&lt;link href='/media/css/soby.ui.components.css' rel='stylesheet' type='text/css' media='all' /&gt;\n \
&lt;script src='/media/js/soby.service.js'&gt;&lt;/script&gt;\n \
&lt;script src='/media/js/soby.ui.components.js'&gt;&lt;/script&gt;\n \
&lt;div id='soby_BooksGridDiv'&gt;&lt;/div&gt;\n \
&lt;script language='javascript'&gt;\n" + scriptText + "\n &lt;/script&gt;";
            $("#ViewSourceDiv").html(sourceCodeHtml);
        }
    </script><br />

        <br />Want to learn more about the grid component? Check out the <a href="../../API Documentation/modules.html">API documentation</a>.
    </div>

</asp:Content>
