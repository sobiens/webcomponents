// VERSION 1.0.1.3 

// ********************* SOBY EDIT CONTROLS *****************************
var soby_EditControls = new Array();
var SobyTextBox = (function () {
    function SobyTextBox(containerClientId, fieldType, args) {
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
    }
    SobyTextBox.prototype.GetValue = function () {
        var value = $("#" + this.ContainerClientId + " input.sobytextbox").val();
        if (this.FieldType == SobyFieldTypes.Number) {
            if (isNaN(value) == true) {
                value = null;
            }
            else {
                value = parseInt(value);
            }
        }
        return value;
    };
    SobyTextBox.prototype.SetValue = function (value) {
        $("#" + this.ContainerClientId + " input.sobytextbox").val(value);
    };
    SobyTextBox.prototype.Initialize = function () {
        $("#" + this.ContainerClientId).html("<input type='textbox' class='sobytextbox'>");
        soby_EditControls[this.ContainerClientId] = this;
        this.Initialized();
    };
    SobyTextBox.prototype.Initialized = function () { };
    SobyTextBox.prototype.ValueBeingChanged = function () { };
    SobyTextBox.prototype.ValueChanged = function () { };
    SobyTextBox.prototype.Validate = function () {
        return true;
    };
    return SobyTextBox;
})();
var SobyLookupSelectBox = (function () {
    function SobyLookupSelectBox(containerClientId, fieldType, args) {
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
    }
    SobyLookupSelectBox.prototype.GetValue = function () {
        var value = $("#" + this.ContainerClientId + " select.sobyselectbox").val();
        if (this.Args.ValueFieldType == SobyFieldTypes.Number)
            value = parseInt(value);
        return value;
    };
    SobyLookupSelectBox.prototype.SetValue = function (value) {
        $("#" + this.ContainerClientId + " select.sobyselectbox").val(value);
    };
    SobyLookupSelectBox.prototype.Initialize = function () {
        $("#" + this.ContainerClientId).html("<select class='sobyselectbox'></select>");
        soby_EditControls[this.ContainerClientId] = this;
        var readTransport = this.Args.ReadTransport;
        var customerDataSourceBuilder = new soby_WSBuilder();
        customerDataSourceBuilder.Filters = new SobyFilters(false);
        customerDataSourceBuilder.AddSchemaField(this.Args.ValueFieldName, SobyFieldTypes.Text, null);
        customerDataSourceBuilder.AddSchemaField(this.Args.TitleFieldName, SobyFieldTypes.Text, null);
        var customerService = new soby_WebServiceService(customerDataSourceBuilder);
        customerService.Transport.Read = new soby_TransportRequest(readTransport.Url, readTransport.DataType, readTransport.ContentType, readTransport.Type);
        customerService.PopulateItems();
        var editControl = this;
        customerService.ItemPopulated = function (items) {
            var selectbox = $("#" + editControl.ContainerClientId + " select.sobyselectbox");
            selectbox.find("option").remove();
            for (var i = 0; i < items.length; i++) {
                var option = $("<option></option>");
                option.attr("value", items[i][editControl.Args.ValueFieldName]);
                option.text(items[i][editControl.Args.TitleFieldName]);
                selectbox.append(option);
            }
            editControl.Initialized();
        };
    };
    SobyLookupSelectBox.prototype.Initialized = function () { };
    SobyLookupSelectBox.prototype.ValueBeingChanged = function () { };
    SobyLookupSelectBox.prototype.ValueChanged = function () { };
    SobyLookupSelectBox.prototype.Validate = function () {
        return true;
    };
    return SobyLookupSelectBox;
})();
var SobyEditControlFactory = (function () {
    function SobyEditControlFactory() {
    }
    SobyEditControlFactory.prototype.CreateEditControl = function (containerClientId, fieldType, args) {
        var editControl = null;
        if (fieldType == SobyFieldTypes.Text) {
            editControl = new SobyTextBox(containerClientId, SobyFieldTypes.Text, args);
        }
        else if (fieldType == SobyFieldTypes.Number) {
            editControl = new SobyTextBox(containerClientId, SobyFieldTypes.Number, args);
        }
        else if (fieldType == SobyFieldTypes.Lookup) {
            editControl = new SobyLookupSelectBox(containerClientId, SobyFieldTypes.Lookup, args);
        }
        return editControl;
    };
    SobyEditControlFactory.prototype.GetEditControl = function (containerClientId) {
        return soby_EditControls[containerClientId];
    };
    return SobyEditControlFactory;
})();
var sobyEditControlFactory = new SobyEditControlFactory();
// **********************************************************************
// ********************* SOBY GRID *****************************
var soby_WebGrids = new Array();
var soby_IsCtrlOnHold = false;
var SobyShowFieldsOnObject = (function () {
    function SobyShowFieldsOnObject() {
        this.All = 0;
        this.ListOnly = 1;
        this.EditOnly = 2;
        this.NewOnly = 3;
        this.ListEdit = 4;
        this.ListNew = 5;
        this.EditNew = 6;
    }
    return SobyShowFieldsOnObject;
})();
var SobyShowFieldsOn = new SobyShowFieldsOnObject();
$("form").click(function () {
    $(".sobygridmenu").hide();
});
function soby_RemoveNoneExistenceGrid() {
    var newArray = new Array();
    for (var x in soby_WebGrids) {
        if ($(soby_WebGrids[x].ContentDivSelector + "[gridid='" + soby_WebGrids[x].GridID + "']").length > 0)
            newArray[soby_WebGrids[x].GridID] = soby_WebGrids[x];
    }
    soby_WebGrids = newArray;
}
document.onkeydown = function (event) {
    if (event.keyCode == 17)
        soby_IsCtrlOnHold = true;
};
document.onkeyup = function (event) {
    //    soby_LogMessage(event.keyCode)
    if (event.keyCode == 17)
        soby_IsCtrlOnHold = false;
    var activeGrid = soby_GetActiveDataGrid();
    if (activeGrid == null)
        return;
    if (event.keyCode == 113 && activeGrid.IsEditable == true) {
        activeGrid.EditSelectedRow();
    }
    var selectedCellID = activeGrid.GetSelectedCellID();
    var rowID;
    var cellIndex;
    var rowIndex;
    if (selectedCellID != null) {
        rowID = $("#" + selectedCellID).attr("rowid");
        cellIndex = parseInt($("#" + selectedCellID).attr("cellindex"));
        rowIndex = parseInt($("#" + selectedCellID).parent().attr("rowindex"));
    }
    if (event.keyCode == 37) {
        if (cellIndex > 0) {
            cellIndex--;
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode == 38) {
        if (rowIndex > 0) {
            rowIndex--;
            rowID = $(activeGrid.ContentDivSelector + " tr[rowindex='" + rowIndex + "'").attr("id");
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode == 39) {
        if (cellIndex < activeGrid.Columns.length - 1) {
            cellIndex++;
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode == 40) {
        if (rowIndex < $(activeGrid.ContentDivSelector + " .soby_griddatarow").length - 1) {
            rowIndex++;
            rowID = $(activeGrid.ContentDivSelector + " tr[rowindex='" + rowIndex + "'").attr("id");
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
};
function soby_GetActiveDataGrid() {
    soby_RemoveNoneExistenceGrid();
    var activeGridID = $(".soby_grid.active").attr("id");
    return soby_WebGrids[activeGridID];
}
function soby_GetAllGrids() {
    soby_RemoveNoneExistenceGrid();
    return soby_WebGrids;
}
function soby_RefreshAllGrids() {
    var grids = soby_GetAllGrids();
    for (var x in grids) {
        soby_WebGrids[x].Initialize(true);
    }
}
var soby_WebGrid = (function () {
    /************************************ END EVENTS *********************************/
    /************************************ CONSTRUCTORS *******************************/
    /**
     * Represents a webgrid.
     * @constructor
     * @param {string} contentDivSelector - The author of the book.
     * @param {string} title - The title of the grid.
     * @param {string} dataService - The dataservice of the grid.
     * @param {string} emptyDataHtml - Html content which will be displayed if there is no record.
     * @example
     * // Creates the grid object
     * var bookDataSourceBuilder = new soby_WSBuilder();
     * bookDataSourceBuilder.Filters = new SobyFilters(false);
     * bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
     * bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
     * bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
     * bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
     * bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
     * bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET")});
     * var bookService = new soby_WebServiceService(bookDataSourceBuilder);
     * bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
     * bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
     * bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
     * bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");
        
     * var bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
     * bookGrid.ImagesFolderUrl = "/Images";
     * bookGrid.AddKeyField("Id");
     * bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null);
     * bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null);
     * bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null);
     * bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null);
     * bookGrid.AddColumn("AuthorId", "Author", SobyShowFieldsOn.All, function (item) {
     *    return item.Author.Name;
     * }, null, true, true, true, null);
    
     * bookGrid.Initialize(true);
     */
    function soby_WebGrid(contentDivSelector, title, dataService, emptyDataHtml) {
        /************************************ MEMBERS *************************************/
        /**
         * @property {boolean}                  ActionInProgress            - States whether an action is in progress or not.
         * @property {boolean}                  Active                      - States whether the grid is active or not.
         * @property {number}                   CellCount                   - Total cell count.
         * @property {Array}                    Columns                     - Columns of the grid.
         * @property {string}                   ContentDivSelector          - Jquery selector sring for the grid main container.
         * @property {Array}                    DataRelations               - Relations with other grids.
         * @property {soby_ServiceInterface}    DataService                 - The service to provide data to the grid.
         * @property {boolean}                  DisplayTitle                - States whether it should display the title or not.
         * @property {string}                   EmptyDataHtml               - The html content which will be displayed when there is no record in the grid result.
         * @property {SobyFilters}              Filters                     - Filters of the grid.
         * @property {Array}                    FilterControls              - Controls for filter fields.
         * @property {string}                   GridID                      - ID string of the grid.
         * @property {SobyGroupByFields}        GroupByFields               - Group by fields.
         * @property {string}                   ImagesFolderUrl             - Url of the grid images folder.
         * @property {boolean}                  IsSelectable                - States whether rows should be selectable or not.
         * @property {boolean}                  IsEditable                  - States whether rows should be editable or not.
         * @property {boolean}                  IsGroupable                 - States whether fields should be groupable or not.
         * @property {string}                   ItemDialogClientID          - Client id of the item (edit/new) dialog.
         * @property {Array}                    Items                       - Populated items of the grid.
         * @property {Array<string>}            KeyFields                   - Key fields.
         * @property {SobyOrderByFields}        OrderByFields               - Order by fields.
         * @property {number}                   PageIndex                   - Index of the current page.
         * @property {boolean}                  ShowHeader                  - States whether headers should be visible or not.
         * @property {string}                   Title                       - Title of the grid.
         */
        this.ActionInProgress = false;
        this.Active = false;
        this.GridID = "";
        this.ContentDivSelector = "";
        this.ItemDialogClientID = "";
        this.Title = "";
        this.DisplayTitle = true;
        this.DataService = null;
        this.EmptyDataHtml = "";
        this.OrderByFields = new SobyOrderByFields();
        this.Filters = new SobyFilters(false);
        this.FilterControls = new Array();
        this.GroupByFields = new SobyGroupByFields();
        this.KeyFields = new Array();
        this.PageIndex = 0;
        this.CellCount = 0;
        this.DataRelations = new Array();
        this.Columns = new Array();
        this.IsSelectable = true;
        this.IsEditable = true;
        this.IsGroupable = false;
        this.Items = null;
        this.ShowHeader = true;
        this.ImagesFolderUrl = "/_layouts/1033/images";
        /************************************ END MEMBERS ********************************/
        /************************************ EVENTS *************************************/
        /**
         * Item creation event.
         *
         * @event soby_WebGrid#ItemCreated
         * @type {object}
         * @property {object} rowID - Identifier of the row.
         * @property {object} item - Data item related with the row.
         */
        this.ItemCreated = null;
        /**
         * Grid population event.
         *
         * @event soby_WebGrid#OnGridPopulated
         * @type {object}
         */
        this.OnGridPopulated = null;
        /**
         * Row selection event.
         *
         * @event soby_WebGrid#OnRowSelected
         * @type {object}
         */
        this.OnRowSelected = null;
        /**
         * Cell selection event.
         *
         * @event soby_WebGrid#OnCellSelected
         * @type {object}
         * @property {soby_WebGrid} grid - Current grid object.
         * @property {object} rowID - Identifier of the row.
         * @property {object} cellIndex - Index of the cell.
         */
        this.OnCellSelected = null;
        this.GridID = "soby_grid_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.ItemDialogClientID = this.GridID + "_dialog";
        this.Title = title;
        this.DataService = dataService;
        this.EmptyDataHtml = emptyDataHtml;
        this.EnsureGridExistency();
    }
    /************************************ END CONSTRUCTORS ***************************/
    /************************************ METHODS ************************************/
    /**
     * Ensures grid is in the global grid array.
     *
     * @example
     * // Ensures grid is in the global grid array.
     * grid.EnsureGridExistency();
     */
    soby_WebGrid.prototype.EnsureGridExistency = function () {
        for (var key in soby_WebGrids) {
            if (key == this.GridID)
                return;
        }
        soby_WebGrids[this.GridID] = this;
    };
    /**
     * Get the value of the given rowindex and fieldname.
     *
     * @rowIndex Index of the grid row.
     * @fieldName Name of the field.
     * @example
     * // Returns the value of Title field which is in row with index number 1.
     * grid.GetItemFieldValue(1, 'Title');
     */
    soby_WebGrid.prototype.GetItemFieldValue = function (rowIndex, fieldName) {
        return this.Items[rowIndex][fieldName];
    };
    /**
     * Hides edit/new item form dialog.
     * @example
     * // Hides edit/new item form dialog.
     * grid.HideItemDialog();
     */
    soby_WebGrid.prototype.HideItemDialog = function () {
        $("#" + this.ItemDialogClientID).hide();
    };
    /**
     * Ensures edit/new item form dialog exists in the body.
     * @example
     * // Ensures edit/new item form dialog exists in the body.
     * grid.EnsureItemDialogContainer(1, 'Title');
     */
    soby_WebGrid.prototype.EnsureItemDialogContainer = function () {
        var dialog = $("#" + this.ItemDialogClientID);
        if (dialog.length == 0) {
            dialog = $("<div class='sobyitemdialog'></div>");
            dialog.attr("id", this.ItemDialogClientID);
            $("body").append(dialog);
        }
        else {
            dialog.html("");
        }
        return dialog;
    };
    /**
     * Populate edit controls for edit/new item form.
     *
     * @isEditForm States whether it is an edit item form or new item form.
     * @rowId Identifier of the row.
     * @example
     * // Populates new item form
     * grid.PopulateEditControlsOnNewEditForm(false, null);
     * @example
     * // Populates edit item form for row id as soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b
     * grid.PopulateEditControlsOnNewEditForm(true, 'soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b');
     */
    soby_WebGrid.prototype.PopulateEditControlsOnNewEditForm = function (isEditForm, rowId) {
        var dialog = this.EnsureItemDialogContainer();
        var row;
        var table = $("<table></table>");
        dialog.append(table);
        for (var i = 0; i < this.Columns.length; i++) {
            var column = this.Columns[i];
            if (column.Editable == false)
                continue;
            var fieldRow = $("<tr></tr>");
            var fieldLabelCell = $("<td></td>");
            fieldLabelCell.text(column.DisplayName);
            var fieldEditControlCell = $("<td></td>");
            var cellId = this.GridID + "_fieldeditcell_" + column.FieldName;
            fieldEditControlCell.attr("id", cellId);
            fieldRow.append(fieldLabelCell);
            fieldRow.append(fieldEditControlCell);
            table.append(fieldRow);
            var viewField = this.DataService.DataSourceBuilder.GetViewFieldByPropertyName(column.FieldName);
            var fieldType = viewField.FieldType;
            var editControl = sobyEditControlFactory.CreateEditControl(cellId, fieldType, viewField.Args);
            var grid = this;
            editControl.Initialized = function () {
                if (isEditForm == true) {
                    row = $("#" + rowId);
                    var rowIndex = parseInt(row.attr("rowindex"));
                    var fieldValue = grid.GetItemFieldValue(rowIndex, column.FieldName);
                    editControl.SetValue(fieldValue);
                }
            };
            editControl.Initialize();
        }
        if (isEditForm == true) {
            rowId = "'" + rowId + "'";
        }
        else {
            rowId = "null";
        }
        var actionPanel = $("<p align='right'></p>");
        var saveButton = $("<input type='button' value='Save' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SaveItemDetail(" + rowId + ")\">");
        var cancelButton = $("<input type='button' value='Cancel' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].HideItemDialog()\">");
        actionPanel.append(saveButton);
        actionPanel.append(cancelButton);
        dialog.append(actionPanel);
        if (isEditForm == false)
            row = $(this.ContentDivSelector + " .actionpane");
        var position = row.offset();
        dialog.css("top", position.top + 35);
        dialog.css("left", position.left + row.width() - row.width());
        dialog.show();
    };
    /**
     * Edits selected row.
     * @example
     * // Edits selected row.
     * grid.EditSelectedRow();
     */
    soby_WebGrid.prototype.EditSelectedRow = function () {
        var selectedRowIDs = this.GetSelectedRowIDs();
        if (selectedRowIDs.length != 1)
            return;
        var rowID = selectedRowIDs[0];
        this.PopulateEditControlsOnNewEditForm(true, rowID);
    };
    /**
     * Edits new row.
     * @example
     * // Edits new row.
     * grid.EditNewRow();
     */
    soby_WebGrid.prototype.EditNewRow = function () {
        this.PopulateEditControlsOnNewEditForm(false, "");
    };
    /**
     * Saves currently edited item.
     *
     * @rowId Identifier of the row.
     * @example
     * // Saves edited item with row id as soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b.
     * grid.SaveItemDetail('soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b');
     */
    soby_WebGrid.prototype.SaveItemDetail = function (rowId) {
        var dialog = $("#" + this.ItemDialogClientID);
        var dbInstance = null;
        if (rowId != null && rowId != "") {
            var row = $("#" + rowId);
            var rowIndex = parseInt(row.attr("rowindex"));
            dbInstance = this.Items[rowIndex];
        }
        else {
            dbInstance = {};
            var viewFields = this.DataService.DataSourceBuilder.SchemaFields;
            for (var i = 0; i < viewFields.length; i++) {
                dbInstance[viewFields[i].FieldName] = null;
            }
        }
        for (var i = 0; i < this.Columns.length; i++) {
            var column = this.Columns[i];
            if (column.Editable == false)
                continue;
            var fieldType = column.FieldType;
            var cellId = this.GridID + "_fieldeditcell_" + column.FieldName;
            //            var fieldOldValue = this.GetItemFieldValue(rowIndex, column.FieldName);
            var editControl = sobyEditControlFactory.GetEditControl(cellId);
            var fieldNewValue = editControl.GetValue();
            dbInstance[column.FieldName] = fieldNewValue;
        }
        if (rowId != null && rowId != "") {
            var dbInstanceId = dbInstance[this.KeyFields[0]];
            this.DataService.UpdateItem(dbInstanceId, dbInstance);
        }
        else {
            dbInstance[this.KeyFields[0]] = 0;
            this.DataService.AddItem(dbInstance);
        }
    };
    /**
    * Deletes selected rows.
    * @example
    * // Deletes selected rows
    * grid.DeleteSelectedRows();
    */
    soby_WebGrid.prototype.DeleteSelectedRows = function () {
        if (confirm("Are you sure you want to delete the selected item(s)") == false)
            return;
        var selectedRowIDs = this.GetSelectedRowIDs();
        for (var i = 0; i < selectedRowIDs.length; i++) {
            var row = $("#" + selectedRowIDs[i]);
            var rowIndex = parseInt(row.attr("rowindex"));
            var dbInstance = this.Items[rowIndex];
            var dbInstanceId = dbInstance[this.KeyFields[0]];
            this.DataService.DeleteItem(dbInstanceId);
        }
    };
    /**
     * Not implemented yet.
     */
    soby_WebGrid.prototype.EditOffOnEditedCells = function () {
        var editedCells = $(this.ContentDivSelector + " .edited");
        for (var i = 0; i < editedCells.length; i++) {
            var cellId = $(editedCells[i]).attr("id");
            this.EditOffCell(cellId);
        }
    };
    /**
     * Not implemented yet.
     */
    soby_WebGrid.prototype.EditSelectedCell = function () {
        this.EditOffOnEditedCells();
        var cellId = this.GetSelectedCellID();
        this.EditCell(cellId);
    };
    /**
     * Not implemented yet.
     */
    soby_WebGrid.prototype.EditOffCell = function (cellId) {
        $("#" + cellId).removeClass("edited");
        /*
        var textBox = new SobyTextBox(cellId, SobyFieldTypes.Text);
        textBox.Initialize();
        textBox.SetValue("Hasan");
        */
    };
    /**
    * Not implemented yet.
    */
    soby_WebGrid.prototype.EditCell = function (cellId) {
        $("#" + cellId).addClass("edited");
        var columnIndex = parseInt($("#" + cellId).attr("columnindex"));
        var fieldType = this.Columns[columnIndex].FieldType;
        //        var editControl = sobyEditControlFactory.GetEditControl(cellId, fieldType);
        //        editControl.Initialize();
        //        editControl.SetValue("Hasan");
    };
    /**
     * Activates the grid.
     * @example
     * // Activates the grid
     * grid.Activate();
     */
    soby_WebGrid.prototype.Activate = function () {
        $(this.ContentDivSelector + " .soby_grid").addClass("active");
        this.HideHeaderRowMenu(null);
    };
    /**
    * De-activates the grid.
    * @example
    * // De-Activates the grid
    * grid.Activate();
    */
    soby_WebGrid.prototype.DeActivate = function () {
        $(this.ContentDivSelector + " .soby_grid").removeClass("active");
    };
    /**
     * Adds key field.
     *
     * @fieldName Name of the field.
     * @example
     * // Adds ID as key field
     * grid.AddKeyField("ID");
     */
    soby_WebGrid.prototype.AddKeyField = function (fieldName) {
        this.KeyFields[this.KeyFields.length] = fieldName;
    };
    /**
    * Not implemented yet.
    */
    soby_WebGrid.prototype.AddFilterControl = function (fieldName, displayName, fieldType) {
        this.FilterControls[this.FilterControls.length] = { FieldName: fieldName, DisplayName: displayName, FieldType: fieldType };
    };
    /**
     * Adds a column
     *
     * @fieldName Name of the field.
     * @displayName Display name of the field.
     * @showFieldsOn States to be displayed on different layouts.
     * @displayFunction The function to be evaulated on display.
     * @cellTemplate Html template of the cell.
     * @sortable States whether it is sortable or not.
     * @filterable States whether it is filterable or not.
     * @editable States whether it is editable or not.
     * @filterControl The control which will be displayed for filtering purpose.
     * @example
     * // Adds Title as a column
     * grid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null);
     */
    soby_WebGrid.prototype.AddColumn = function (fieldName, displayName, showFieldsOn, displayFunction, cellTemplate, sortable, filterable, editable, filterControl) {
        this.Columns[this.Columns.length] = { FieldName: fieldName, DisplayName: displayName, ShowFieldsOn: showFieldsOn, DisplayFunction: displayFunction, CellTemplate: cellTemplate, Sortable: sortable, Filterable: filterable, Editable: editable, FilterControl: filterControl };
    };
    /**
     * Adds a data relation
     *
     * @masterFieldDisplayName Display name of the master field.
     * @masterFieldValueName Field name of the master field.
     * @detailGridID Identifier of the detail grid.
     * @detailFieldName Field name of the detail grid.
     * @example
     * // Adds a data relation on Id field with AuthorId on detail grid
     * authorGrid.AddDataRelation("Title", "Id", authorBooksGrid.GridID, "AuthorId");
     */
    soby_WebGrid.prototype.AddDataRelation = function (masterFieldDisplayName, masterFieldValueName, detailGridID, detailFieldName) {
        this.DataRelations[this.DataRelations.length] = { MasterFieldDisplayName: masterFieldDisplayName, MasterFieldValueName: masterFieldValueName, DetailGridID: detailGridID, DetailFieldName: detailFieldName };
    };
    /**
     * Gets row identifiers
     * @example
     * // returns ["soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec", "soby_griddatarow_f0b7f7e8-6b89-accf-0446-88eda73e0bee"]
     * grid.GetRowIds()
     */
    soby_WebGrid.prototype.GetRowIds = function () {
        var rowIds = new Array();
        var rowsSelectors = $(this.ContentDivSelector + " .soby_griddatarow");
        for (var i = 0; i < rowsSelectors.length; i++) {
            rowIds[rowIds.length] = $(rowsSelectors[i]).attr("id");
        }
        return rowIds;
    };
    /**
     * Gets selected row identifier
     * @example
     * // returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
     * grid.GetSelectedRowID()
     */
    soby_WebGrid.prototype.GetSelectedRowID = function () {
        var selectedRow = $(this.ContentDivSelector + " .soby_griddatarow.selected");
        if (selectedRow.length > 0)
            return selectedRow.attr("id");
        return $(this.ContentDivSelector + " .soby_griddatarow").attr("id");
    };
    /**
     * Gets active row identifier
     * @example
     * // returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
     * grid.GetActiveRowID()
     */
    soby_WebGrid.prototype.GetActiveRowID = function () {
        var activeRow = $(this.ContentDivSelector + " .soby_griddatarow.active");
        if (activeRow.length > 0)
            return activeRow.attr("id");
        return null;
    };
    /**
     * Gets selected cell identifier
     * @example
     * // returns "soby_gridcell_8be81bcb-ae80-5309-3d8a-6ad091c01051"
     * grid.GetSelectedCellID();
     */
    soby_WebGrid.prototype.GetSelectedCellID = function () {
        var selectedCell = $(this.ContentDivSelector + " .soby_gridcell.selected");
        if (selectedCell.length > 0)
            return selectedCell.attr("id");
        return $(this.ContentDivSelector + " .soby_gridcell").attr("id");
    };
    /**
     * Gets grid column by field name
     * @example
     * // returns Column object for given fieldname
     * grid.GetColumn('Title');
     */
    soby_WebGrid.prototype.GetColumn = function (fieldName) {
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.Columns[i].FieldName == fieldName)
                return this.Columns[i];
        }
        return null;
    };
    /**
     * Gets selected row identifiers
     * @example
     * // returns ["soby_griddatarow_fa5a2dd6-fc2a-d61b-5b9f-4e6e0824ce11", "soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c"]
     * grid.GetSelectedRowIDs();
     */
    soby_WebGrid.prototype.GetSelectedRowIDs = function () {
        var selectedRows = $(this.ContentDivSelector + " .soby_griddatarow.selected");
        var selectedRowIDs = new Array();
        for (var i = 0; i < selectedRows.length; i++) {
            selectedRowIDs[selectedRowIDs.length] = $(selectedRows[i]).attr("id");
        }
        return selectedRowIDs;
    };
    /**
     * Gets selected data items
     * @example
     * // returns [Object, Object]
     * grid.GetSelectedDataItems();
     */
    soby_WebGrid.prototype.GetSelectedDataItems = function () {
        var selectedRows = $(this.ContentDivSelector + " .soby_griddatarow.selected");
        var selectedDataItems = new Array();
        for (var i = 0; i < selectedRows.length; i++) {
            var itemIndex = $(selectedRows[i]).attr("rowindex");
            selectedDataItems[selectedDataItems.length] = this.Items[itemIndex];
        }
        return selectedDataItems;
    };
    /**
     * Selects the row
     *
     * @rowID Identifier of the row.
     * @example
     * // Selects the row with given row identifier
     * grid.SelectRow("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c");
     */
    soby_WebGrid.prototype.SelectRow = function (rowID) {
        var alreadyExistRowIndex = -1;
        var selectedRowIDs = this.GetSelectedRowIDs();
        for (var i = 0; i < selectedRowIDs.length; i++) {
            if (selectedRowIDs[i] == rowID) {
                alreadyExistRowIndex = i;
                break;
            }
        }
        if (alreadyExistRowIndex > -1) {
            $("#" + selectedRowIDs[alreadyExistRowIndex]).removeClass("selected");
        }
        else if (soby_IsCtrlOnHold == true) {
            $("#" + rowID).addClass("selected");
        }
        else {
            $(this.ContentDivSelector + " .soby_griddatarow").removeClass("selected");
            $("#" + rowID).addClass("selected");
        }
        this.GenerateActionPane();
        this.SelectDetailGridTab(rowID, 0);
        if (this.OnRowSelected != null)
            this.OnRowSelected(this, rowID);
    };
    /**
     * Selects the cell
     *
     * @rowID Identifier of the row.
     * @cellIndex Index of the cell.
     * @example
     * // Selects the cell with given row identifier and cell index
     * grid.SelectCell("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c", 3);
     */
    soby_WebGrid.prototype.SelectCell = function (rowID, cellIndex) {
        $(this.ContentDivSelector + " .soby_griddatarow").removeClass("active");
        $(this.ContentDivSelector + " .soby_gridcell").removeClass("selected");
        $("#" + rowID + " td[cellindex='" + cellIndex + "']").addClass("selected");
        $("#" + rowID).addClass("active");
        //this.SelectDetailGridTab(rowID, 0);
        if (this.OnCellSelected != null)
            this.OnCellSelected(this, rowID, cellIndex);
    };
    /**
     * Hides/show filter pane
     * @example
     * // Hides/show filter pane
     * grid.HideShowFilterPane();
     */
    soby_WebGrid.prototype.HideShowFilterPane = function () {
        var filterPane = $(this.ContentDivSelector + " .filterpane");
        var isVisible = filterPane.find(".filterpanetable:visible").length > 0 ? true : false;
        if (isVisible == true) {
            filterPane.find(".showhidebutton").text("V");
            filterPane.find(".filterpanetable").slideUp("slow");
        }
        else {
            filterPane.find(".showhidebutton").text("^");
            filterPane.find(".filterpanetable").slideDown("slow");
        }
    };
    /**
     * Generates filter pane
     * @example
     * // Generates filter pane
     * grid.GenerateFilterPane();
     */
    soby_WebGrid.prototype.GenerateFilterPane = function () {
        var filterPane = $(this.ContentDivSelector + " .filterpane");
        if (this.FilterControls.length == 0) {
            filterPane.hide();
            filterPane.parent().hide();
            return;
        }
        var filterPaneContainer = $("<div></div>");
        var filterPaneHeading = $("<div><a href='javascript:void(0)' class='showhidebutton' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].HideShowFilterPane()\" style='text-decoration: inherit;'>^</a></div>");
        var filterPaneTableContainer = $("<div class='filterpanetable'></div>");
        var table = $("<table></table>");
        for (var i = 0; i < this.FilterControls.length; i++) {
            var row = $("<tr></tr>");
            var cell1 = $("<td></td>");
            var cell2 = $("<td></td>");
            cell1.html(this.FilterControls[i].DisplayName);
            cell2.html("<input type='text'>");
            row.append(cell1);
            row.append(cell2);
            table.append(row);
        }
        filterPaneTableContainer.append(table);
        filterPaneContainer.append(filterPaneTableContainer);
        filterPane.html("");
        filterPane.append(filterPaneHeading);
        filterPane.append(filterPaneContainer);
    };
    /**
     * Allows drop column
     */
    soby_WebGrid.prototype.AllowDropColumn = function (ev) {
        ev.preventDefault();
    };
    /**
     * Drags column via setting its field name
     *
     * @ev Drag Event.
     * @fieldName Name of the field.
     */
    soby_WebGrid.prototype.DragColumn = function (ev, fieldName) {
        ev.dataTransfer.setData("text", fieldName);
    };
    /**
     * Drops the column
     *
     * @ev Drag Event.
     */
    soby_WebGrid.prototype.DropColumn = function (ev) {
        ev.preventDefault();
        var fieldName = ev.dataTransfer.getData("text");
        this.GroupBy(fieldName, true);
    };
    /**
     * Drops group by column
     *
     * @ev Drag Event.
     */
    soby_WebGrid.prototype.DropGroupByColumn = function (ev) {
        var fieldName = ev.dataTransfer.getData("text");
        var newGroupByFields = new SobyGroupByFields();
        for (var i = 0; i < this.GroupByFields.length; i++) {
            if (this.GroupByFields[i].FieldName != fieldName) {
                newGroupByFields.push(this.GroupByFields[i]);
            }
        }
        this.GroupByFields = newGroupByFields;
        this.DataService.GroupBy(this.GroupByFields);
    };
    /**
     * Generates group by pane
     * @example
     * // Generates filter pane
     * grid.GenerateGroupByPanePane();
     */
    soby_WebGrid.prototype.GenerateGroupByPanePane = function () {
        var groupByPaneContainer = $(this.ContentDivSelector + " .groupbypane");
        groupByPaneContainer.html("");
        if (this.IsGroupable == false) {
            $(this.ContentDivSelector + " .groupbypanerow").hide();
            return;
        }
        groupByPaneContainer.attr("ondragover", "soby_WebGrids['" + this.GridID + "'].AllowDropColumn(event)");
        groupByPaneContainer.attr("ondrop", "soby_WebGrids['" + this.GridID + "'].DropColumn(event)");
        var container = $("<div>Drag a column header here to group by that column</div>");
        if (this.GroupByFields.length > 0)
            container.html("");
        for (var i = 0; i < this.GroupByFields.length; i++) {
            var groupByContainer = $("<div class='soby-groupby-heading'></div>");
            var displayName = "";
            for (var b = 0; b < this.Columns.length; b++) {
                if (this.Columns[b].FieldName.toLowerCase() == this.GroupByFields[i].FieldName.toLowerCase()) {
                    displayName = this.Columns[b].DisplayName;
                }
            }
            var sortLink = $("<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SortGroupByField('" + this.GroupByFields[i].FieldName + "', true)\">" + displayName + "<img border='0' alt= 'Sort Ascending' src= '" + this.ImagesFolderUrl + "/rsort.gif' ></a>");
            if (this.GroupByFields[i].IsAsc == true)
                sortLink = $("<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SortGroupByField('" + this.GroupByFields[i].FieldName + "', false)\">" + displayName + "<img border='0' alt= 'Sort Ascending' src= '" + this.ImagesFolderUrl + "/sort.gif' ></a>");
            groupByContainer.append(sortLink);
            groupByContainer.attr("draggable", "true");
            groupByContainer.attr("ondragstart", "soby_WebGrids['" + this.GridID + "'].DragColumn(event, '" + this.GroupByFields[i].FieldName + "')");
            container.append(groupByContainer);
        }
        /*
        if (this.GetSelectedRowIDs().length == 1) {
            var html = "<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].EditSelectedRow()\"><span class='soby-icon-imgSpan'> <img class='soby-list-edit soby-icon-img' src= '" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43' > </span><span>edit item</span> </a>";
            groupByPaneContainer.append(html);
        }
        */
        //        var html = "<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].EditNewRow()\"><span class='soby-icon-imgSpan' > <img id='idHomePageNewItem-img' src= '" + this.ImagesFolderUrl + "/spcommon.png?rev=43' class='soby-list-addnew soby-icon-img' > </span><span>new item</span> </a>";
        groupByPaneContainer.append(container);
    };
    /**
     * Generates action pane
     * @example
     * // Generates action pane
     * grid.GenerateActionPane();
     */
    soby_WebGrid.prototype.GenerateActionPane = function () {
        var actionPaneContainer = $(this.ContentDivSelector + " .actionpane");
        actionPaneContainer.html("");
        if (this.IsEditable == false) {
            $(this.ContentDivSelector + " .actionpanerow").hide();
            return;
        }
        if (this.GetSelectedRowIDs().length > 0) {
            var html = "<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].DeleteSelectedRows()\"><span class='soby-icon-imgSpan'> <img class='soby-list-delete soby-icon-img' src= '" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43' > </span><span>delete item</span> </a>";
            actionPaneContainer.append(html);
        }
        if (this.GetSelectedRowIDs().length == 1) {
            var html = "<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].EditSelectedRow()\"><span class='soby-icon-imgSpan'> <img class='soby-list-edit soby-icon-img' src= '" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43' > </span><span>edit item</span> </a>";
            actionPaneContainer.append(html);
        }
        var html = "<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].EditNewRow()\"><span class='soby-icon-imgSpan' > <img id='idHomePageNewItem-img' src= '" + this.ImagesFolderUrl + "/spcommon.png?rev=43' class='soby-list-addnew soby-icon-img' > </span><span>new item</span> </a>";
        actionPaneContainer.append(html);
    };
    /**
     * Generates navigation pane
     * @example
     * // Generates navigation pane
     * grid.GenerateNavigationPane();
     */
    soby_WebGrid.prototype.GenerateNavigationPane = function () {
        if (this.DataService.CanNavigateToNextPage() == false && this.DataService.CanNavigateToPreviousPage() == false)
            return "";
        var navigationPane = $(this.ContentDivSelector + " .navigationpane");
        navigationPane.html("<table style='margin:auto'><tbody><tr> \
							  " + (this.DataService.CanNavigateToPreviousPage() == true ? "<td><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].GoToPreviousPage()\"><img src='" + this.ImagesFolderUrl + "/prev.gif' border='0' alt='Previous' style='vertical-align: middle;'></a></td>" : "") + " \
							  <td class='ms-paging'>" + this.DataService.StartIndex + " - " + this.DataService.EndIndex + "</td> \
							  " + (this.DataService.CanNavigateToNextPage() == true ? "<td><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].GoToNextPage()\"><img src='" + this.ImagesFolderUrl + "/next.gif' border='0' alt='Next' style='vertical-align: middle;'></a></td>" : "") + " \
							  </tr></tbody></table>");
    };
    /**
     * Navigates to the next page
     * @example
     * // Navigates to the next page
     * grid.GoToNextPage();
     */
    soby_WebGrid.prototype.GoToNextPage = function () {
        this.PageIndex = this.PageIndex + 1;
        this.DataService.GoToPage(this.PageIndex);
    };
    /**
     * Navigates to the previous page
     * @example
     * // Navigates to the previous page
     * grid.GoToPreviousPage();
     */
    soby_WebGrid.prototype.GoToPreviousPage = function () {
        this.PageIndex = this.PageIndex - 1;
        this.DataService.GoToPage(this.PageIndex);
    };
    /**
     * Populates the detail grid
     *
     * @detailGridIDs Identifiers of the detail grid.
     * @contentDivSelectors Selectors div of the detail grid.
     * @mainRowIds Row identifiers of the master grid.
     * @fieldNames Names of the field.
     * @values Filter values for the detail grid.
     * @example
     * // Populates the detail grid
     * grid.PopulateDetailGrid('soby_grid_fc073155-7f8d-094a-4745-55acd12c4812','#soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0_soby_grid_fc073155-7f8d-094a-4745-55acd12c4812', 'soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0', 'AuthorId', '1');
     */
    soby_WebGrid.prototype.PopulateDetailGrid = function (detailGridIDs, contentDivSelectors, mainRowId, fieldNames, values) {
        var detailGridIdArray = detailGridIDs.split(soby_FilterValueSeperator);
        var detailGridContainerIdArray = contentDivSelectors.split(soby_FilterValueSeperator);
        var detailFieldNameArray = fieldNames.split(soby_FilterValueSeperator);
        var valuesForDetailGridArray = values.split(soby_FilterValueSeperator);
        $(this.ContentDivSelector + " tr[id!='" + mainRowId + "'] .soby-list-hiderelateddata").removeClass("soby-list-hiderelateddata").addClass("soby-list-showrelateddata");
        if ($(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell:visible").length > 0) {
            $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").hide();
            $("#" + mainRowId + " .soby-list-hiderelateddata").removeClass("soby-list-hiderelateddata").addClass("soby-list-showrelateddata");
        }
        else {
            for (var i = 0; i < detailGridIdArray.length; i++) {
                var detailGridID = detailGridIdArray[i];
                var contentDivSelector = detailGridContainerIdArray[i];
                var fieldName = detailFieldNameArray[i];
                var value = valuesForDetailGridArray[i];
                soby_WebGrids[detailGridID].ContentDivSelector = contentDivSelector;
                soby_WebGrids[detailGridID].Initialize(false);
                $(this.ContentDivSelector + " .detailgridcell").hide();
                $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").show();
                var viewField = soby_WebGrids[detailGridID].DataService.DataSourceBuilder.GetViewFieldByPropertyName(fieldName);
                var fieldType = viewField.FieldType;
                soby_WebGrids[detailGridID].FilterResult(fieldName, value, fieldType, SobyFilterTypes.Equal);
                $("#" + mainRowId + " .soby-list-showrelateddata").removeClass("soby-list-showrelateddata").addClass("soby-list-hiderelateddata");
            }
        }
    };
    /**
     * Selects the detail grid tab
     *
     * @rowid Identifier of the row.
     * @index Index of the tab.
     * @example
     * // Populates the detail grid
     * grid.SelectDetailGridTab('soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0', '0');
     */
    soby_WebGrid.prototype.SelectDetailGridTab = function (rowid, index) {
        var rowSelector = $("tr[mainrowid='" + rowid + "']");
        rowSelector.find(".soby_tabheader").removeClass("active");
        rowSelector.find(".soby_tabheader[index='" + index + "']").addClass("active");
        rowSelector.find(".soby_tabcontent").hide();
        rowSelector.find(".soby_tabcontent[index='" + index + "']").show();
        $(this.ContentDivSelector + " .detailgridcell").hide();
        rowSelector.find(".detailgridcell").show();
    };
    /**
     * Shows cell poup content
     *
     * @cellID Identifier of the cell.
     * @example
     * // Shows cell poup content
     * grid.ShowCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')
     */
    soby_WebGrid.prototype.ShowCellPopupContent = function (cellID) {
        $(this.ContentDivSelector + " .popup_content").hide();
        var cell = $("#" + cellID);
        var left = cell.position().left + 40;
        cell.find(".popup_content").css("left", left + "px");
        cell.find(".popup_content").show();
    };
    /**
     * Hides cell poup content
     *
     * @cellID Identifier of the cell.
     * @example
     * // Hides cell poup content
     * grid.HideCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')
     */
    soby_WebGrid.prototype.HideCellPopupContent = function (cellID) {
        $("#" + cellID + " .popup_content").hide();
    };
    /**
     * Clear filters on given field name
     *
     * @fieldName Name of the field.
     * @example
     * // Clear filters on given field name
     * grid.ClearFiltersOn('Title')
     */
    soby_WebGrid.prototype.ClearFiltersOn = function (fieldName) {
        var newFilters = new Array();
        for (var i = 0; i < this.Filters.Filters.length; i++) {
            if (this.Filters.Filters[i].FieldName != fieldName) {
                newFilters[newFilters.length] = this.Filters[i];
            }
        }
        this.Filters.Filters = newFilters;
        this.HideHeaderRowMenu(fieldName);
        this.DataService.Filter(this.Filters, true);
    };
    /**
     * Filters result based on given field name with single value
     *
     * @fieldName Name of the field.
     * @value Value of the filter.
     * @fieldType Type of the field.
     * @filterType Type of the filter.
     * @example
     * // Filters the result with the given value
     * grid.FilterResult('Title', 'Moby', SobyFieldTypes.Text, SobyFilterTypes.Contains)
     */
    soby_WebGrid.prototype.FilterResult = function (fieldName, value, fieldType, filterType) {
        this.HideHeaderRowMenu(null);
        this.Filters = new SobyFilters(false);
        this.Filters.AddFilter(fieldName, value, fieldType, filterType, false);
        //        this.Filters[this.Filters.length] = { FieldName: fieldName, Value: value, FieldType: SobyFieldTypes.Text, FilterType: SobyFilterTypes.Contains }
        this.DataService.Filter(this.Filters, true);
    };
    /**
     * Filters result based on given field name with multiple value
     *
     * @fieldName Name of the field.
     * @values Values of the filter.
     * @fieldType Type of the field.
     * @filterType Type of the filter.
     * @example
     * // Filters the result with the given values
     * grid.FilterResultWithMultipleValues('Title', ['Moby', 'Don'], SobyFieldTypes.Text, SobyFilterTypes.Contains)
     */
    soby_WebGrid.prototype.FilterResultWithMultipleValues = function (fieldName, values, fieldType, filterType) {
        this.HideHeaderRowMenu(null);
        this.Filters = new SobyFilters(true);
        for (var i = 0; i < values.length; i++) {
            if (values[i] != "")
                this.Filters.AddFilter(fieldName, values[i], fieldType, filterType, false);
        }
        this.DataService.Filter(this.Filters, true);
    };
    /**
     * Sorts result based on given group by field name
     *
     * @sortFieldName Name of the field to be sorted.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Sorts by Title group field as ascending
     * grid.SortGroupByField('Title', true)
     */
    soby_WebGrid.prototype.SortGroupByField = function (sortFieldName, isAsc) {
        this.HideHeaderRowMenu(null);
        for (var i = 0; i < this.GroupByFields.length; i++) {
            if (this.GroupByFields[i].FieldName.toLowerCase() == sortFieldName.toLowerCase())
                this.GroupByFields[i].IsAsc = isAsc;
        }
        this.DataService.GroupBy(this.GroupByFields);
    };
    /**
     * Sorts result based on given field name
     *
     * @sortFieldName Name of the field to be sorted.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Sorts by Title field as ascending
     * grid.SortResult('Title', true)
     */
    soby_WebGrid.prototype.SortResult = function (sortFieldName, isAsc) {
        this.HideHeaderRowMenu(null);
        this.OrderByFields = new SobyOrderByFields();
        this.OrderByFields.push(new SobyOrderByField(sortFieldName, isAsc));
        this.DataService.Sort(this.OrderByFields);
    };
    /**
     * Groups result based on given field name
     *
     * @fieldName Name of the field.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Group by Title field as ascending
     * grid.GroupBy('Title', true)
     */
    soby_WebGrid.prototype.GroupBy = function (fieldName, isAsc) {
        var exist = false;
        for (var i = 0; i < this.GroupByFields.length; i++) {
            if (this.GroupByFields[i].FieldName == fieldName) {
                exist = true;
            }
        }
        if (exist == true)
            return;
        this.GroupByFields.push(new SobyGroupByField(fieldName, isAsc));
        this.DataService.GroupBy(this.GroupByFields);
    };
    /**
     * Adds a header cell
     *
     * @headerRow Row of the header.
     * @column Column of the header.
     * @dataRelation Data relation of the column.
     */
    soby_WebGrid.prototype.AddHeaderCell = function (headerRow, column, dataRelation) {
        var fieldName = "";
        var displayName = "";
        var sortable = false;
        var filterable = false;
        if (column != null) {
            fieldName = column.FieldName;
            displayName = column.DisplayName;
            if (column.Sortable == null || column.Sortable == undefined) {
                sortable = true;
            }
            else {
                sortable = column.Sortable;
            }
            if (column.Filterable == null || column.Filterable == undefined) {
                filterable = true;
            }
            else {
                filterable = column.Filterable;
            }
        }
        else {
            filterable = true;
            sortable = true;
            fieldName = dataRelation.MasterFieldValueName;
            displayName = dataRelation.MasterFieldDisplayName;
        }
        var hasFilterIconHtml = "";
        for (var i = 0; i < this.Filters.Filters.length; i++) {
            if (this.Filters.Filters[i].FieldName == fieldName)
                hasFilterIconHtml = "<img src='" + this.ImagesFolderUrl + "/filter.gif' border='0'>";
        }
        var headerOnClick = "";
        var headerLink = null;
        var container = $("<div style='width:100%'></div>");
        var sortCell = $("<div style='float:left;'></div>");
        var filterCell = $("<div style='width:10px;float:right;display:none' class='headerrowmenuiconcontainer'><img src='" + this.ImagesFolderUrl + "/ecbarw.png' alt='Open Menu'></div>");
        container.append(sortCell);
        container.append(filterCell);
        if (this.IsGroupable == true) {
            sortCell.attr("draggable", "true");
            sortCell.attr("ondragstart", "soby_WebGrids['" + this.GridID + "'].DragColumn(event, '" + fieldName + "')");
        }
        if (sortable == false && filterable == false) {
            headerOnClick = "";
            sortCell.html(displayName);
        }
        else if (this.OrderByFields.ContainsField(fieldName) == true) {
            if (this.OrderByFields.ContainsFieldAsAsc(fieldName) == true) {
                headerLink = $("<a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', false)\" class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + " <img border='0' alt='Sort Ascending' src='" + this.ImagesFolderUrl + "/sort.gif'></a>");
                if (sortable == false)
                    headerLink = $("<span></span>").html(displayName + hasFilterIconHtml);
                sortCell.html(headerLink);
            }
            else {
                headerLink = $("<a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', true)\" class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + " <img border='0' alt='Sort Descending' src='" + this.ImagesFolderUrl + "/rsort.gif'></a>");
                if (sortable == false)
                    headerLink = $("<span></span>").html(displayName + hasFilterIconHtml);
                sortCell.html(headerLink);
            }
        }
        else {
            headerLink = $("<a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', true)\" class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + "</a>");
            if (sortable == false)
                headerLink = $("<span></span>").html(displayName + hasFilterIconHtml);
            sortCell.html(headerLink);
        }
        var headerCell = $("<th style='padding:5px;' nowrap='nowrap' scope='col'  onmouseover=\"javascript:soby_WebGrids['" + this.GridID + "'].ShowHeaderRowMenuIcon('" + fieldName + "')\" onmouseout=\"javascript:soby_WebGrids['" + this.GridID + "'].HideHeaderRowMenuIcon('" + fieldName + "')\" class='ms-vh2 soby_gridheadercell' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ShowHeaderRowMenu('" + fieldName + "', '" + displayName + "', " + sortable + ", " + filterable + ")\" fieldName='" + fieldName + "'></th>").append(container);
        headerRow.append(headerCell);
    };
    /**
     * Populates header cells
     * @example
     * // Populates header cells
     * grid.PopulateHeaderCells()
     */
    soby_WebGrid.prototype.PopulateHeaderCells = function () {
        var headerRow = $(this.ContentDivSelector + " .soby_gridheaderrow");
        headerRow.attr("ondragover", "soby_WebGrids['" + this.GridID + "'].AllowDropColumn(event)");
        headerRow.attr("ondrop", "soby_WebGrids['" + this.GridID + "'].DropGroupByColumn(event)");
        headerRow.find("th").remove();
        if (this.IsSelectable == true || this.DataRelations.length > 0 || this.GroupByFields.length > 0) {
            var headerCell = $("<th>&nbsp;</th>");
            if (this.GroupByFields.length > 0)
                headerCell.attr("colspan", this.GroupByFields.length);
            headerRow.append(headerCell);
        }
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.GroupByFields.ContainsField(this.Columns[i].FieldName) == true)
                continue;
            this.AddHeaderCell(headerRow, this.Columns[i], null);
        }
    };
    /**
     * Shows header row menu icon
     *
     * @fieldName Name of the field.
     * @example
     * // Shows header row menu icon
     * grid.ShowHeaderRowMenuIcon('Title');
     */
    soby_WebGrid.prototype.ShowHeaderRowMenuIcon = function (fieldName) {
        $(this.ContentDivSelector + " th[fieldName='" + fieldName + "'] .headerrowmenuiconcontainer").show();
    };
    /**
     * Hides header row menu icon
     *
     * @fieldName Name of the field.
     * @example
     * // Hides header row menu icon
     * grid.HideHeaderRowMenuIcon('Title');
     */
    soby_WebGrid.prototype.HideHeaderRowMenuIcon = function (fieldName) {
        $(this.ContentDivSelector + " th[fieldName='" + fieldName + "'] .headerrowmenuiconcontainer").hide();
    };
    /**
     * Hides header row menu
     *
     * @fieldName Name of the field.
     * @example
     * // Hides header row menu icon
     * grid.HideHeaderRowMenu('Title');
     */
    soby_WebGrid.prototype.HideHeaderRowMenu = function (fieldName) {
        if (this.ActionInProgress == true)
            return;
        $("#" + this.GridID + "_Menu").hide();
    };
    /**
     * Shows header row menu
     *
     * @ev Current event.
     * @fieldName Name of the field.
     * @displayName Display name of the field.
     * @sortable States whether it is sortable or not.
     * @filterable States whether it is filterable or not.
     * @example
     * // Shows header row menu
     * grid.ShowHeaderRowMenu('Title', 'Title', true, true)
     */
    soby_WebGrid.prototype.ShowHeaderRowMenu = function (fieldName, displayName, sortable, filterable) {
        this.ActionInProgress = true;
        setTimeout(function () {
            var activeGrid = soby_GetActiveDataGrid();
            if (activeGrid != null)
                activeGrid.ActionInProgress = false;
        }, 1000);
        if (sortable == false)
            return;
        var menuID = this.GridID + "_Menu";
        var menuUL = $("#" + menuID);
        if (menuUL.length == 0) {
            menuUL = $("<table id='" + menuID + "' class='sobygridmenu'></table>");
            $(".sobygridmenu").remove();
            $("body").append(menuUL);
        }
        else {
            menuUL.html("");
        }
        menuUL.html("");
        if (sortable == true) {
            menuUL.append("<tr><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;font-size: 5px;'>&nbsp;</td><td style='padding-right:5px;padding-left:5px;font-size: 5px;'>&nbsp;</td></tr>");
            menuUL.append("<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', false)\" class='ms-vh2 soby_gridheadercell' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><img src='" + this.ImagesFolderUrl + "/SORTAZLang.gif' border='0'></td><td style='padding-right:5px;padding-left:5px'>Ascending</td></tr>" +
                "<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', true)\" class='ms-vh2 soby_gridheadercell' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><img src='" + this.ImagesFolderUrl + "/SORTZALang.gif' border='0'></td><td style='padding-right:5px;padding-left:5px'>Descending</td></tr>" +
                "<tr><td style='padding-left:5px;border-right:1px solid;;padding-right:5px'>&nbsp;</td><td><hr style='margin-top:5px;margin-bottom:5px;border: 0;border-bottom: 1px dashed #ccc;'></td></tr>");
        }
        if (filterable == true) {
            for (var i = 0; i < this.Filters.Filters.length; i++) {
                if (this.Filters.Filters[i].FieldName == fieldName) {
                    menuUL.append("<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ClearFiltersOn('" + fieldName + "')\" class='ms-vh2 soby_gridheadercell' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><img src='" + this.ImagesFolderUrl + "/FILTEROFF.gif' border='0'></td><td style='padding-right:5px;padding-left:5px'>Clear filter from " + displayName + "</td></tr>");
                    break;
                }
            }
            menuUL.append("<tr class='filterloadingli'  style='width: 30px;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;<td></td><td style='padding-right:5px;padding-left:5px''>Loading...</td></tr>" +
                "<tr><td  style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;</td><td style='text-align:right;padding-right:5px;padding-left:5px;padding-top:5px'><button class='btn btn-primary next' type='button' style='width: 70px;padding-top: 5px;' onclick=\"soby_WebGrids['" + this.GridID + "'].ApplyFilters('" + fieldName + "')\">Apply</button></td></tr>");
        }
        menuUL.append("<tr><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;font-size: 5px;'>&nbsp;</td><td style='padding-right:5px;padding-left:5px;font-size: 5px;'>&nbsp;</td></tr>");
        var header = $(this.ContentDivSelector + " th[fieldName='" + fieldName + "']");
        var position = header.offset();
        menuUL.css("top", position.top + 35);
        menuUL.css("left", position.left + header.width() - menuUL.width() - 20);
        setTimeout(function () {
            menuUL.show();
        }, 1000);
        var filterControl = null;
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.Columns[i].FieldName == fieldName)
                filterControl = this.Columns[i].FilterControl;
        }
        var li = $("<tr></tr>");
        if (filterControl != null) {
            var cell = $("<td style='padding-right:5px;padding-left:5px;'></td>");
            cell.append(filterControl.FilterElement);
            li.append("<td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;</td>");
            li.append(cell);
        }
        else {
            var currentFilterValue = "";
            for (var i = 0; i < this.Filters.Filters.length; i++) {
                if (this.Filters.Filters[i].FieldName == fieldName)
                    currentFilterValue = this.Filters.Filters[i].Value;
            }
            var cell = $("<td style='padding-right:5px;padding-left:5px;text-align:right'></td>");
            var textboxElement = $("<input type='text' class='filtertextbox' style='width:100px' fieldname='" + fieldName + "' />");
            textboxElement.val(currentFilterValue);
            cell.append(textboxElement);
            li.append("<td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;</td>");
            li.append(cell);
        }
        li.insertBefore("#" + menuID + " .filterloadingli");
        $("#" + menuID + " .filterloadingli").hide();
    };
    /**
     * Apply filters
     *
     * @fieldName Name of the field.
     * @example
     * // Apply filters
     * grid.ApplyFilters('Title');
     */
    soby_WebGrid.prototype.ApplyFilters = function (fieldName) {
        this.HideHeaderRowMenu(null);
        var fieldType, filterType;
        var filterControl = null;
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.Columns[i].FieldName == fieldName)
                filterControl = this.Columns[i].FilterControl;
        }
        for (var i = 0; i < this.DataService.DataSourceBuilder.SchemaFields.length; i++) {
            var viewField = this.DataService.DataSourceBuilder.SchemaFields[i];
            if (viewField.FieldName == fieldName) {
                fieldType = viewField.FieldType;
                if (fieldType == SobyFieldTypes.Number)
                    filterType = SobyFilterTypes.Equal;
                else
                    filterType = SobyFilterTypes.Contains;
            }
        }
        if (filterControl != null) {
            this.FilterResultWithMultipleValues(fieldName, filterControl.GetSelectedValues(), fieldType, filterType);
        }
        else if ($("input.filtertextbox[fieldname='" + fieldName + "']").length > 0) {
            var filterValue = $("input.filtertextbox[fieldname='" + fieldName + "']").val();
            this.FilterResult(fieldName, filterValue, fieldType, filterType);
        }
        else {
            var values = [];
            var filterValues = $("input[type='checkbox'][fieldname='" + fieldName + "']:checked");
            for (var i = 0; i < filterValues.length; i++) {
                values[values.length] = $(filterValues[i]).val();
            }
            this.FilterResultWithMultipleValues(fieldName, values, fieldType, filterType);
        }
    };
    /**
     * Initializes the grid
     *
     * @populateItems States whether items should be populated or not.
     * @example
     * // Initializes the grid and populate items
     * grid.Initialize(true);
     */
    soby_WebGrid.prototype.Initialize = function (populateItems) {
        $(this.ContentDivSelector).attr("onclick", "soby_WebGrids['" + this.GridID + "'].Activate()");
        $(this.ContentDivSelector).attr("gridid", this.GridID);
        var cellCount = 0;
        for (var i = 0; i < this.Columns.length; i++) {
            cellCount++;
        }
        if (this.IsSelectable == true)
            cellCount++;
        this.CellCount = cellCount;
        var table = $("<table width='100%' id='" + this.GridID + "' class='soby_grid' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].Activate()\"></table>");
        var headerRow = $("<tr class='soby_gridheaderrow'></tr>");
        var loadingRow = $("<tr class='loadingrow' style='display:none'></tr>");
        loadingRow.append("<td colspan='" + this.CellCount + "'><img src='" + this.ImagesFolderUrl + "/loading16.gif'> Loading...</td>");
        var actionPaneRow = $("<tr class='actionpanerow'></tr>");
        actionPaneRow.append("<td class='actionpane' style='border: solid 1px gray;' colspan='" + this.CellCount + "'></td>");
        var groupByPaneRow = $("<tr class='groupbypanerow'></tr>");
        groupByPaneRow.append("<td class='groupbypane' style='border: solid 1px gray;' colspan='" + this.CellCount + "'></td>");
        var filterPaneRow = $("<tr></tr>");
        filterPaneRow.append("<td class='filterpane' style='border: solid 1px gray;background-color: lightgreen;' colspan='" + this.CellCount + "'></td>");
        var navigationRow = $("<tr></tr>");
        navigationRow.append("<td class='navigationpane' colspan='" + this.CellCount + "'></td>");
        table.append(groupByPaneRow);
        table.append(actionPaneRow);
        table.append(filterPaneRow);
        table.append(headerRow);
        table.append(loadingRow);
        table.append(navigationRow);
        $(this.ContentDivSelector).html("");
        if (this.DisplayTitle == true) {
            var tableTitle = $("<div class='soby_tabletitle'></div>").text(this.Title);
            $(this.ContentDivSelector).append(tableTitle);
        }
        $(this.ContentDivSelector).append(table);
        var grid = this;
        this.DataService.ItemPopulated = function (items) {
            grid.PopulateGridData(items);
        };
        this.DataService.ItemBeingPopulated = function () {
            $(grid.ContentDivSelector + " .loadingrow").show();
        };
        this.DataService.NavigationInformationPopulated = function () {
            grid.GenerateNavigationPane();
        };
        this.DataService.NavigationInformationBeingPopulated = function () {
            $(grid.ContentDivSelector + " .navigationpane .loadingrow").show();
        };
        this.DataService.ItemUpdated = function (args) {
            grid.HideItemDialog();
            grid.Initialize(true);
        };
        this.DataService.ItemAdded = function (args) {
            grid.HideItemDialog();
            grid.Initialize(true);
        };
        this.DataService.ItemDeleted = function (args) {
            grid.HideItemDialog();
            grid.Initialize(true);
        };
        if (populateItems == true)
            this.DataService.PopulateItems();
    };
    /**
     * Populates the grid data
     *
     * @items Data items which returned from the service.
     * @example
     * // Populates the grid with the given items
     * grid.PopulateGridData(items);
     */
    soby_WebGrid.prototype.PopulateGridData = function (items) {
        this.Items = items;
        if (this.ShowHeader == true)
            this.PopulateHeaderCells();
        var lastGroupByValues = new Array();
        var table = $(this.ContentDivSelector + " .soby_grid");
        $(this.ContentDivSelector + " .soby_griddatarow").remove();
        $(this.ContentDivSelector + " .soby_griddetailrow").remove();
        $(this.ContentDivSelector + " .soby_gridgroupbyrow").remove();
        var navigationRow = $(this.ContentDivSelector + " .navigationpane").parent();
        for (var i = 0; i < items.length; i++) {
            var rowID = "soby_griddatarow_" + soby_guid();
            var row = $("<tr class='soby_griddatarow'></tr>");
            if (i % 2 == 0)
                row.addClass("alt");
            row.attr("id", rowID);
            row.attr("rowindex", i);
            var item = items[i];
            var cellIndex = 0;
            var hasDifferentGroupValue = false;
            for (var x = 0; x < this.GroupByFields.length; x++) {
                var value = item[this.GroupByFields[x].FieldName];
                if (i == 0 || hasDifferentGroupValue == true || lastGroupByValues["Level_" + x].Value != value) {
                    hasDifferentGroupValue = true;
                    lastGroupByValues["Level_" + x] = { Level: x, Value: value };
                    var displayname = this.GroupByFields[x].FieldName;
                    var groupByRow = $("<tr class='soby_gridgroupbyrow'></tr>");
                    groupByRow.attr("level", x);
                    if (x == 0) {
                        groupByRow.addClass("first");
                    }
                    if (x > 0) {
                        for (var q = 0; q < x; q++) {
                            var leftCell = $("<td>&nbsp;</td>");
                            groupByRow.append(leftCell);
                        }
                    }
                    var groupByExpandCollapseCell = $("<td style='width:20px'></td>");
                    groupByRow.append(groupByExpandCollapseCell);
                    groupByExpandCollapseCell.html("<a href='javascript:void(0)' > <span class='soby-icon-imgSpan15' > <img src='" + this.ImagesFolderUrl + "/spcommon.png?rev=43' class='soby-list-collapse soby-icon-img' > </span></a>");
                    var groupByCell = $("<td class='soby_gridgroupbycell'></td>");
                    var groupByCellColspan = this.Columns.length - x;
                    if (this.IsSelectable == true || this.DataRelations.length > 0)
                        groupByCellColspan++;
                    groupByCell.attr("colspan", groupByCellColspan);
                    groupByCell.html(displayname + ":" + value);
                    groupByRow.append(groupByCell);
                    navigationRow.before(groupByRow);
                }
            }
            if (this.GroupByFields.length > 1) {
                var leftCell = $("<td>&nbsp;</td>");
                leftCell.attr("colspan", this.GroupByFields.length - 1);
                row.append(leftCell);
            }
            if (this.IsSelectable == true || this.DataRelations.length > 0) {
                var cell = $("<td valign='top' style='padding:5px;' width='20px' class='soby_selectitemcell'></td>");
                if (this.IsSelectable == true) {
                    row.addClass("soby-itmHoverEnabled");
                    var onClick = "soby_WebGrids['" + this.GridID + "'].SelectRow('" + rowID + "');";
                    var link = $("<a href='javascript:void(0)' class='soby-list-selectitem-a'><span class='soby-icon-imgSpan soby-list-selectitem-span' > <img class='soby-icon-img soby-list-selectitem' alt= '' src= '" + this.ImagesFolderUrl + "/spcommon.png?rev=43' > </span></a>");
                    link.attr("onclick", onClick);
                    cell.append(link);
                }
                var detailGridIds = "";
                var detailGridContainerIds = "";
                var detailFieldNames = "";
                var valuesForDetailGrids = "";
                for (var t = 0; t < this.DataRelations.length; t++) {
                    var dataRelation = this.DataRelations[t];
                    var value = item[dataRelation.MasterFieldValueName];
                    detailGridIds += dataRelation.DetailGridID + soby_FilterValueSeperator;
                    detailGridContainerIds += "#" + rowID + "_" + dataRelation.DetailGridID + soby_FilterValueSeperator;
                    detailFieldNames += dataRelation.DetailFieldName + soby_FilterValueSeperator;
                    valuesForDetailGrids += value + soby_FilterValueSeperator;
                }
                if (detailGridIds != "") {
                    detailGridIds = detailGridIds.substring(0, detailGridIds.length - soby_FilterValueSeperator.length);
                    detailGridContainerIds = detailGridContainerIds.substring(0, detailGridContainerIds.length - soby_FilterValueSeperator.length);
                    detailFieldNames = detailFieldNames.substring(0, detailFieldNames.length - soby_FilterValueSeperator.length);
                    valuesForDetailGrids = valuesForDetailGrids.substring(0, valuesForDetailGrids.length - soby_FilterValueSeperator.length);
                    //                    var onClick = "soby_WebGrids['" + this.GridID + "'].PopulateDetailGrid('" + dataRelation.DetailGridID + "','#" + rowID + "_" + dataRelation.DetailGridID + "', '" + rowID + "', '" + dataRelation.DetailFieldName + "', '" + value + "');";
                    var onClick = "soby_WebGrids['" + this.GridID + "'].PopulateDetailGrid('" + detailGridIds + "','" + detailGridContainerIds + "', '" + rowID + "', '" + detailFieldNames + "', '" + valuesForDetailGrids + "');";
                    var link = $("<a href='javascript:void(0)'><span class='soby-icon-imgSpan'> <img src='" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43' class='soby-list-showrelateddata soby-icon-img'> </span></a>");
                    link.attr("onclick", onClick);
                    cell.append(link);
                }
                row.append(cell);
            }
            for (var x = 0; x < this.Columns.length; x++) {
                if (this.Columns[x].IsVisible == false)
                    continue;
                if (this.GroupByFields.ContainsField(this.Columns[x].FieldName) == true)
                    continue;
                var cellID = "soby_gridcell_" + soby_guid();
                var contentHtml = "";
                if (this.Columns[x].DisplayFunction != null) {
                    contentHtml = this.Columns[x].DisplayFunction(item);
                }
                else if (this.Columns[x].CellTemplate != null) {
                    contentHtml = this.Columns[x].CellTemplate.Template;
                    var propertyNames = this.DataService.GetFieldNames();
                    for (var n = 0; n < propertyNames.length; n++) {
                        var value = item[propertyNames[n].FieldName];
                        var regex = new RegExp('#{' + propertyNames[n].FieldName + '}', 'ig');
                        contentHtml = contentHtml.replace(regex, value);
                    }
                    if (this.Columns[x].CellTemplate.TemplateType == "CellContent") {
                    }
                    else if (this.Columns[x].CellTemplate.TemplateType == "PopupContent") {
                        var popupLinkText = this.Columns[x].CellTemplate.PopupLinkText;
                        var popup_link = $("<a href='javascript:void(0)'></a>").text(popupLinkText);
                        popup_link.attr("onclick", "soby_WebGrids['" + this.GridID + "'].ShowCellPopupContent('" + cellID + "')");
                        var popup_contentPanel = $("<div style='display:none;position: absolute;padding: 10px;border: 1px solid;background-color: white;padding-top: 0px;overflow: auto;height:90%;width:50%' class='popup_content'></div>");
                        popup_contentPanel.append("<div style='text-align: right;position: fixed;margin-left: 43.5%;border: 1px solid;padding: 5px;'><a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].HideCellPopupContent('" + cellID + "')\">x</a></div>");
                        popup_contentPanel.append(contentHtml);
                        var popup_mainContentPanel = $("<div></div>");
                        popup_mainContentPanel.append(popup_link);
                        popup_mainContentPanel.append(popup_contentPanel);
                        contentHtml = popup_mainContentPanel.html();
                    }
                }
                else {
                    var value = item[this.Columns[x].FieldName];
                    if (value instanceof Date) {
                        value = (value.getDate() > 9 ? value.getDate() : "0" + value.getDate())
                            + "/" + (value.getMonth() + 1) + "/" + value.getFullYear() + " "
                            + (value.getHours() > 9 ? value.getHours() : "0" + value.getHours()) + ":"
                            + (value.getMinutes() > 9 ? value.getMinutes() : "0" + value.getMinutes()) + ":"
                            + (value.getSeconds() > 9 ? value.getSeconds() : "0" + value.getSeconds());
                    }
                    contentHtml = value;
                }
                var cell = $("<td class='soby_gridcell' valign='top' style='padding:5px;'></td>").html(contentHtml);
                cell.attr("id", cellID);
                cell.attr("cellindex", cellIndex);
                cell.attr("columnindex", x);
                cell.attr("rowid", rowID);
                cell.attr("onclick", "soby_WebGrids['" + this.GridID + "'].SelectCell('" + rowID + "', " + cellIndex + ")");
                row.append(cell);
                cellIndex++;
            }
            navigationRow.before(row);
            if (this.ItemCreated != null)
                this.ItemCreated(rowID, item);
            if (this.DataRelations.length == 0)
                continue;
            var row = $("<tr class='soby_griddetailrow'></tr>");
            row.attr("mainrowid", rowID);
            var cell = $("<td colspan='" + this.CellCount + "' class='detailgridcell' style='display:none'></td>");
            var tabHeaderPanel = $("<div class='soby_gridtabheaderpanel'></div>");
            for (var t = 0; t < this.DataRelations.length; t++) {
                var dataRelation = this.DataRelations[t];
                var tabHeaderPanelItem = $("<div class='soby_tabheader' index='" + t + "'><a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SelectDetailGridTab('" + rowID + "', '" + t + "')\">" + soby_WebGrids[dataRelation.DetailGridID].Title + "</a></div>");
                var panel = $("<div style='display:none' class='soby_tabcontent'></div>");
                if (t == 0) {
                    panel.show();
                    tabHeaderPanelItem.addClass("active");
                }
                panel.attr("id", rowID + "_" + dataRelation.DetailGridID);
                panel.attr("index", t);
                tabHeaderPanel.append(tabHeaderPanelItem);
                cell.append(panel);
            }
            cell.prepend(tabHeaderPanel);
            row.append("<td></td>");
            row.append(cell);
            navigationRow.before(row);
        }
        $(this.ContentDivSelector + " .loadingrow").hide();
        if (items.length == 0) {
            $(this.ContentDivSelector).html(this.EmptyDataHtml);
        }
        this.GenerateGroupByPanePane();
        this.GenerateActionPane();
        this.GenerateFilterPane();
        this.DataService.PopulateNavigationInformation();
        if (this.OnGridPopulated != null)
            this.OnGridPopulated();
    };
    return soby_WebGrid;
})();
// ************************************************************
// ********************* CAML BUILDER CAROUSEL *****************************
var soby_Carousels = new Array();
var soby_Carousel = (function () {
    function soby_Carousel(contentDivSelector, title, dataService, emptyDataHtml, imageFieldName, captionFieldName, contentFieldName, isContentFieldUrl) {
        this.ImagesFolderUrl = "/_layouts/1033/images";
        /************************************ EVENTS *************************************/
        this.OnGridPopulated = null;
        this.OnRowSelected = null;
        this.OnCellSelected = null;
        /*********************************************************************************/
        this.CarouselID = "soby_carousel_" + soby_guid();
        this.MaxWidth = null;
        this.Items = null;
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.DataService = dataService;
        this.EmptyDataHtml = emptyDataHtml;
        this.ImageFieldName = imageFieldName;
        this.CaptionFieldName = captionFieldName;
        this.ContentFieldName = contentFieldName;
        this.IsContentFieldUrl = isContentFieldUrl;
        this.EnsureCarouselExistency();
    }
    soby_Carousel.prototype.EnsureCarouselExistency = function () {
        for (var key in soby_Carousels) {
            if (key == this.CarouselID)
                return;
        }
        soby_Carousels[this.CarouselID] = this;
    };
    soby_Carousel.prototype.GoToItem = function (index) {
        $(this.ContentDivSelector + " .carouselindicator").removeClass("active");
        $(this.ContentDivSelector + " .item").removeClass("active");
        $(this.ContentDivSelector + " .item[index='" + index + "']").addClass("active");
        $(this.ContentDivSelector + " .carouselindicator[index='" + index + "']").addClass("active");
    };
    soby_Carousel.prototype.NextItem = function () {
        var currentIndex = parseInt($(this.ContentDivSelector + " .item.active").attr("index"));
        $(this.ContentDivSelector + " .item").removeClass("active");
        $(this.ContentDivSelector + " .carouselindicator").removeClass("active");
        var index = currentIndex + 1;
        if (index >= this.Items.length)
            index = 0;
        $(this.ContentDivSelector + " .item[index='" + index + "']").addClass("active");
        $(this.ContentDivSelector + " .carouselindicator[index='" + index + "']").addClass("active");
    };
    soby_Carousel.prototype.PreviousItem = function () {
        var currentIndex = parseInt($(this.ContentDivSelector + " .item.active").attr("index"));
        $(this.ContentDivSelector + " .item").removeClass("active");
        $(this.ContentDivSelector + " .carouselindicator").removeClass("active");
        var index = currentIndex - 1;
        if (index < 0)
            index = this.Items.length - 1;
        $(this.ContentDivSelector + " .item[index='" + index + "']").addClass("active");
        $(this.ContentDivSelector + " .carouselindicator[index='" + index + "']").addClass("active");
    };
    soby_Carousel.prototype.PopulateIndicators = function (contentDivID, items) {
        var indicatorsOL = $("<ol class='carousel-indicators'></ol>");
        for (var i = 0; i < items.length; i++) {
            //        <a href='javascript:void(0)' onclick=\"soby_Carousels['" + this.CarouselID + "'].GoToItem(" + i + ")\">" + (i + 1) + "</a>
            indicatorsOL.append("<li class='carouselindicator' index='" + i + "' onclick=\"soby_Carousels['" + this.CarouselID + "'].GoToItem(" + i + ")\"></li>");
        }
        $("#" + contentDivID).append(indicatorsOL);
    };
    soby_Carousel.prototype.PopulateItems = function (contentDivID, items) {
        var itemsDiv = $("<div class='carousel-inner'></div>");
        for (var i = 0; i < items.length; i++) {
            var itemDiv = $("<div class='item'></div>");
            itemDiv.attr("index", i);
            var imageSrc = items[i][this.ImageFieldName];
            var caption = items[i][this.CaptionFieldName];
            var image = $("<img alt='...' class='carouselimage'>");
            image.attr("src", imageSrc);
            itemDiv.append(image);
            var captionDiv = $("<div class='carousel-caption'></div>");
            var h3 = $("<h3></h3>");
            h3.html(caption);
            captionDiv.append(h3);
            itemDiv.append(captionDiv);
            itemsDiv.append(itemDiv);
        }
        $("#" + contentDivID).append(itemsDiv);
    };
    soby_Carousel.prototype.PopulateNavigator = function (contentDivID) {
        $("#" + contentDivID).append("<a class='prev' href='#" + contentDivID + "' role='button' data-slide='prev' onclick=\"soby_Carousels['" + this.CarouselID + "'].PreviousItem()\"></a> \
			  <a class='next' href='#" + contentDivID + "' role='button' data-slide='next' onclick=\"soby_Carousels['" + this.CarouselID + "'].NextItem()\"></a>");
    };
    soby_Carousel.prototype.PopulateGridData = function (items) {
        $("#" + this.CarouselID).html("");
        this.Items = items;
        this.PopulateIndicators(this.CarouselID, this.Items);
        this.PopulateItems(this.CarouselID, this.Items);
        this.PopulateNavigator(this.CarouselID);
        this.GoToItem(0);
    };
    soby_Carousel.prototype.Initialize = function (populateItems) {
        var carouselDivID = this.CarouselID;
        var carouselDiv = $("<div class='soby_carousel slide' data-ride='carousel' id='" + carouselDivID + "'></div>");
        if (this.MaxWidth != null && this.MaxWidth > 0)
            carouselDiv.css("max-width", this.MaxWidth);
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(carouselDiv);
        var carousel = this;
        this.DataService.ItemPopulated = function (items) {
            carousel.PopulateGridData(items);
        };
        this.DataService.ItemBeingPopulated = function () {
            $("#" + carouselDivID).html("<img src='" + this.ImagesFolderUrl + "/loading16.gif'> Loading...");
        };
        if (populateItems == true)
            this.DataService.PopulateItems();
    };
    return soby_Carousel;
})();
// ************************************************************
// ********************* CAML BUILDER METRO TILES *****************************
var soby_MetroTileGrids = new Array();
var soby_MetroTilesGrid = (function () {
    function soby_MetroTilesGrid(contentDivSelector, title, dataService, emptyDataHtml, imageFieldName, captionFieldName, urlFieldName, openInNewWindowFieldName, startColorFieldName, endColorFieldName, colspanFieldName, rowspanFieldName) {
        this.MetroTileGridID = "soby_metrotilegrid_" + soby_guid();
        this.MaxWidth = null;
        this.TileWidth = 150;
        this.TileHeight = 120;
        this.Width = 600;
        this.Items = null;
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.DataService = dataService;
        this.EmptyDataHtml = emptyDataHtml;
        this.ImageFieldName = imageFieldName;
        this.CaptionFieldName = captionFieldName;
        this.URLFieldName = urlFieldName;
        this.OpenInNewWindowFieldName = openInNewWindowFieldName;
        this.StartColorFieldName = startColorFieldName;
        this.EndColorFieldName = endColorFieldName;
        this.RowSpanFieldName = rowspanFieldName;
        this.ColSpanFieldName = colspanFieldName;
        this.EnsureMetroTilesExistency();
    }
    soby_MetroTilesGrid.prototype.EnsureMetroTilesExistency = function () {
        for (var key in soby_MetroTileGrids) {
            if (key == this.MetroTileGridID)
                return;
        }
        soby_MetroTileGrids[this.MetroTileGridID] = this;
    };
    soby_MetroTilesGrid.prototype.PopulateItems = function (items) {
        var itemsDiv = $("<div class='metro-tiles' style='width:" + this.Width + "'></div>");
        for (var i = 0; i < items.length; i++) {
            var imageSrc = items[i][this.ImageFieldName];
            if (imageSrc.indexOf(",") > -1)
                imageSrc = imageSrc.split(",")[0];
            var caption = items[i][this.CaptionFieldName];
            var url = items[i][this.URLFieldName];
            if (url.indexOf(",") > -1)
                url = url.split(",")[0];
            var openInNewWindow = items[i][this.OpenInNewWindowFieldName];
            var startColor = items[i][this.StartColorFieldName];
            var endColor = items[i][this.EndColorFieldName];
            var rowspan = parseInt(items[i][this.RowSpanFieldName]);
            if (isNaN(rowspan) == true)
                rowspan = 1;
            var colspan = parseInt(items[i][this.ColSpanFieldName]);
            if (isNaN(colspan) == true)
                colspan = 1;
            var tileWidth = this.TileWidth * colspan + (10 * (colspan - 1));
            var tileHeight = this.TileHeight * rowspan + (10 * (rowspan - 1));
            var itemDiv = $("<div class='metro-tile'></div>");
            //background: -webkit-linear-gradient(left, red , blue); /* For Safari 5.1 to 6.0 */
            //background: -o-linear-gradient(right, red, blue); /* For Opera 11.1 to 12.0 */
            //background: -moz-linear-gradient(right, red, blue); /* For Firefox 3.6 to 15 */
            //background: linear-gradient(to right, red , blue); /* Standard syntax */
            itemDiv.css("background", "linear-gradient(to right, " + startColor + "," + endColor + ")");
            itemDiv.attr("index", i);
            itemDiv.css("width", tileWidth + "px");
            itemDiv.css("height", tileHeight + "px");
            var link = $("<a></a>");
            link.attr("href", url);
            if (openInNewWindow == "1")
                link.attr("target", "_blank");
            var image = $("<img alt='...' class='metro-tileimage'>");
            image.attr("src", imageSrc);
            link.append(image);
            itemDiv.append(link);
            var captionDiv = $("<div class='metro-tilecaption'></div>");
            var link = $("<a></a>");
            link.attr("href", url);
            link.text(caption);
            if (openInNewWindow == "1")
                link.attr("target", "_blank");
            captionDiv.append(link);
            itemDiv.append(captionDiv);
            itemsDiv.append(itemDiv);
        }
        $("#" + this.MetroTileGridID).append(itemsDiv);
    };
    soby_MetroTilesGrid.prototype.Initialize = function (populateItems) {
        var metroTileGridDiv = $("<div class='soby_metrotilegrid' id='" + this.MetroTileGridID + "'></div>");
        if (this.MaxWidth != null && this.MaxWidth != "")
            metroTileGridDiv.css("max-width", this.MaxWidth);
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(metroTileGridDiv);
        var metroTileGrid = this;
        this.DataService.ItemPopulated = function (items) {
            metroTileGrid.ItemPopulated(items);
            metroTileGrid.PopulateItems(items);
        };
        this.DataService.ItemBeingPopulated = function () {
            $("#" + this.MetroTileGridID).html("<img src='" + this.ImagesFolderUrl + "/loading16.gif'> Loading...");
        };
        if (populateItems == true)
            this.DataService.PopulateItems();
    };
    soby_MetroTilesGrid.prototype.ItemPopulated = function (items) { };
    return soby_MetroTilesGrid;
})();
// ************************************************************
// ********************* CAML BUILDER WIZARD TEMPLATE *****************************
var soby_Wizards = new Array();
function soby_Wizard(contentDivSelector) {
    this.WizardID = "soby_wizardgrid_" + soby_guid();
    this.ContentDivSelector = contentDivSelector;
    this.CurrentTabIndex = -1;
    this.MaxWidth = null;
    this.TileWidth = "150";
    this.TileHeight = "120";
    this.Width = "600";
    this.Items = null;
    this.EnsureWizardsExistency = function () {
        for (var key in soby_Wizards) {
            if (key == this.WizardID)
                return;
        }
        soby_Wizards[this.WizardID] = this;
    };
    this.EnsureWizardsExistency();
    this.GetItemById = function (id) {
        for (var i = 0; i < this.Items.length; i++) {
            if (this.Items[i].LinkId == id)
                return this.Items[i];
        }
        return null;
    };
    this.ActivateWizardTab = function (linkId) {
        var item = this.GetItemById(linkId);
        $(this.ContentDivSelector + " a.sobywizardtablink").removeClass("active");
        $(this.ContentDivSelector + " > ul > li a[linkid='" + linkId + "']").addClass("active");
        $(".sobywizardtabcontent[wizardid='" + this.WizardID + "']").hide();
        $(item.ContainerId).show();
    };
    this.GoToNextTab = function () {
        if (this.CurrentTabIndex < this.Items.length) {
            this.GoToTab(this.CurrentTabIndex + 1);
        }
    };
    this.GoToPreviousTab = function () {
        if (this.CurrentTabIndex > 0) {
            this.GoToTab(this.CurrentTabIndex - 1);
        }
    };
    this.EventBeforeTabChange = null;
    this.EventAfterTabChange = null;
    this.GoToTab = function (tabIndex) {
        if (this.EventBeforeTabChange != null)
            if (this.EventBeforeTabChange(tabIndex) == false)
                return;
        $(this.ContentDivSelector + " .sobywizardnavigationbar button").removeAttr("disabled");
        if (tabIndex == 0)
            $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").attr("disabled", "disabled");
        if (tabIndex == this.Items.length - 1)
            $(this.ContentDivSelector + " .sobywizardnavigationbar .next").attr("disabled", "disabled");
        this.CurrentTabIndex = tabIndex;
        var item = this.Items[tabIndex];
        $(this.ContentDivSelector + " a.sobywizardtablink").removeClass("active");
        $(this.ContentDivSelector + " > ul > li a[linkid='" + item.LinkId + "']").addClass("active");
        $(".sobywizardtabcontent[wizardid='" + this.WizardID + "']").hide();
        $(item.ContainerId).show();
        if (this.EventAfterTabChange != null)
            this.EventAfterTabChange(tabIndex);
    };
    this.Initialize = function () {
        $(this.ContentDivSelector).addClass("sobywizard");
        var wizardLinks = $(this.ContentDivSelector + " > ul > li a");
        wizardLinks.addClass("sobywizardtablink");
        this.Items = new Array();
        for (var i = 0; i < wizardLinks.length; i++) {
            var linkId = "soby_wizardlink_" + i;
            var linkSelector = $(wizardLinks[i]).attr("href");
            var linkText = $(wizardLinks[i]).text();
            $(linkSelector).addClass("sobywizardtabcontent");
            $(linkSelector).attr("wizardid", this.WizardID);
            $(wizardLinks[i]).attr("wizardid", this.WizardID);
            $(wizardLinks[i]).attr("linkid", linkId);
            $(wizardLinks[i]).attr("onclick", "soby_Wizards['" + this.WizardID + "'].GoToTab(" + i + ")");
            this.Items[this.Items.length] = { Title: linkText, ContainerId: linkSelector, LinkId: linkId };
        }
        for (var i = 0; i < this.Items.length; i++) {
            $(this.Items[i].ContainerId).hide();
        }
        $(this.ContentDivSelector + " .sobywizardnavigationbar button").attr("wizardid", this.WizardID);
        $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").click(function () {
            var wizardId = $(this).attr("wizardid");
            soby_Wizards[wizardId].GoToPreviousTab();
        });
        $(this.ContentDivSelector + " .sobywizardnavigationbar .next").click(function () {
            var wizardId = $(this).attr("wizardid");
            soby_Wizards[wizardId].GoToNextTab();
        });
        this.GoToTab(0);
    };
}
// ************************************************************
// ********************* CAML BUILDER MENU TEMPLATE *****************************
var soby_Menus = new Array();
function soby_Menu(contentDivSelector, dataService, displayNameField, idField, parentIdField) {
    this.MenuID = "soby_menugrid_" + soby_guid();
    this.ContentDivSelector = contentDivSelector;
    this.DisplayNameField = displayNameField;
    this.IDField = idField;
    this.ParentIDField = parentIdField;
    this.DataService = dataService;
    this.MaxWidth = null;
    this.TileWidth = "150";
    this.TileHeight = "120";
    this.Width = "600";
    this.Items = null;
    this.EnsureMenusExistency = function () {
        for (var key in soby_Menus) {
            if (key == this.MenuID)
                return;
        }
        soby_Menus[this.MenuID] = this;
    };
    this.EnsureMenusExistency();
    this.GetItemById = function (id) {
        for (var i = 0; i < this.Items.length; i++) {
            if (this.Items[i].LinkId == id)
                return this.Items[i];
        }
        return null;
    };
    this.ActivateMenuTab = function (linkId) {
        var item = this.GetItemById(linkId);
        $(this.ContentDivSelector + " a.sobymenutablink").removeClass("active");
        $(this.ContentDivSelector + " > ul > li a[linkid='" + linkId + "']").addClass("active");
        $(".sobymenutabcontent[menuid='" + this.MenuID + "']").hide();
        $(item.ContainerId).show();
    };
    this.EventBeforeTabChange = null;
    this.EventAfterTabChange = null;
    this.PopulateGridData = function (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var displayName = item[this.DisplayNameField];
            var id = item[this.IDField];
            var parentId = item[this.ParentIDField];
            var linkId = "soby_menulink_" + i;
            var menuItem = $("<a></a>").text(displayName);
            $(this.ContentDivSelector).append(menuItem);
        }
    };
    this.Initialize = function () {
        var menu = this;
        this.DataService.ItemPopulated = function (items) {
            menu.PopulateGridData(items);
        };
        this.DataService.PopulateItems();
        $(this.ContentDivSelector).addClass("sobymenu");
    };
}
// ************************************************************
//# sourceMappingURL=soby.ui.components.js.map