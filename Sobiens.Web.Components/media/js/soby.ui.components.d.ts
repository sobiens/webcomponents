declare var soby_EditControls: any[];
interface ISobyEditControlInterface {
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    GetValue(): any;
    SetValue(value: string): any;
    Initialize(): any;
    Initialized(): any;
    ValueBeingChanged(): any;
    ValueChanged(): any;
    Validate(): boolean;
}
declare class SobyTextBox implements ISobyEditControlInterface {
    constructor(containerClientId: string, fieldType: number, args: any);
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    GetValue(): any;
    SetValue(value: string): void;
    Initialize(): void;
    Initialized(): void;
    ValueBeingChanged(): void;
    ValueChanged(): void;
    Validate(): boolean;
}
declare class SobyLookupSelectBox implements ISobyEditControlInterface {
    constructor(containerClientId: string, fieldType: number, args: any);
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    GetValue(): any;
    SetValue(value: string): void;
    Initialize(): void;
    Initialized(): void;
    ValueBeingChanged(): void;
    ValueChanged(): void;
    Validate(): boolean;
}
declare class SobyEditControlFactory {
    CreateEditControl(containerClientId: string, fieldType: number, args: any): ISobyEditControlInterface;
    GetEditControl(containerClientId: string): ISobyEditControlInterface;
}
declare var sobyEditControlFactory: SobyEditControlFactory;
declare var soby_WebGrids: any[];
declare var soby_IsCtrlOnHold: boolean;
declare class SobyShowFieldsOnObject {
    All: number;
    ListOnly: number;
    EditOnly: number;
    NewOnly: number;
    ListEdit: number;
    ListNew: number;
    EditNew: number;
}
declare var SobyShowFieldsOn: SobyShowFieldsOnObject;
declare function soby_RemoveNoneExistenceGrid(): void;
declare function soby_GetActiveDataGrid(): soby_WebGrid;
declare function soby_GetAllGrids(): any[];
declare function soby_RefreshAllGrids(): void;
declare class sobyActionPaneButtons extends Array<sobyActionPaneButton> {
    AddButton(button: sobyActionPaneButton): void;
    Add(key: string, text: string, index: number, imageUrl: string, className: string, visible: boolean, onClick: any, enabilityFunction: any): void;
    AddCollection(buttons: sobyActionPaneButtons): void;
    Get(key: string): sobyActionPaneButton;
    Hide(key: string): void;
    Show(key: string): void;
}
declare class sobyActionPaneButton {
    constructor(key: string, text: string, index: number, imageUrl: string, className: string, visible: boolean, onClick: any, enabilityFunction: any);
    ID: string;
    Key: string;
    Text: string;
    Index: number;
    ImageUrl: string;
    ClassName: string;
    Visible: boolean;
    OnClick: any;
    EnabilityFunction: any;
    Hide(): void;
    Show(): void;
}
declare class soby_WebGrid {
    /************************************ MEMBERS *************************************/
    /**
     * @property {SobyAggregateFields}      AggregateFields             - Aggregate fields.
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
     * @property {string}                   ThemeName                   - Theme name of the grid.
     * @property {string}                   ThemeClassName              - Theme  class name of the grid.
     */
    ActionInProgress: boolean;
    Active: boolean;
    AllowExportData: boolean;
    AllowMultipleSelections: boolean;
    GridID: string;
    ThemeName: string;
    ThemeClassName: string;
    ContentDivSelector: string;
    ItemDialogClientID: string;
    Title: string;
    DisplayTitle: boolean;
    DataService: soby_ServiceInterface;
    EmptyDataHtml: string;
    OrderByFields: SobyOrderByFields;
    Filters: SobyFilters;
    FilterControls: any[];
    GroupByFields: SobyGroupByFields;
    AggregateFields: SobyAggregateFields;
    KeyFields: Array<string>;
    PageIndex: number;
    CellCount: number;
    DataRelations: any[];
    Columns: any[];
    InitializedActionPaneButtons: boolean;
    IsSelectable: boolean;
    IsEditable: boolean;
    IsGroupable: boolean;
    Items: any;
    ShowRefreshButton: boolean;
    ShowHeader: boolean;
    ImagesFolderUrl: string;
    ActionPaneButtons: sobyActionPaneButtons;
    LastGroupByValues: any[];
    TableTagName: string;
    TBodyTagName: string;
    THeadTagName: string;
    RowTagName: string;
    CellTagName: string;
    TableAdditionalClassNames: string;
    RowAdditionalClassNames: string;
    CellAdditionalClassNames: string;
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
    ItemCreated: any;
    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridPopulated
     * @type {object}
     */
    OnGridPopulated: any;
    /**
     * Row selection event.
     *
     * @event soby_WebGrid#OnRowSelected
     * @type {object}
     */
    OnRowSelected: any;
    /**
     * Cell selection event.
     *
     * @event soby_WebGrid#OnCellSelected
     * @type {object}
     * @property {soby_WebGrid} grid - Current grid object.
     * @property {object} rowID - Identifier of the row.
     * @property {object} cellIndex - Index of the cell.
     */
    OnCellSelected: any;
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
    constructor(contentDivSelector: string, title: string, dataService: any, emptyDataHtml: string);
    /************************************ END CONSTRUCTORS ***************************/
    /************************************ METHODS ************************************/
    InitializeActionPaneButtons(): void;
    /**
     * Ensures grid is in the global grid array.
     *
     * @example
     * // Ensures grid is in the global grid array.
     * grid.EnsureGridExistency();
     */
    EnsureGridExistency(): void;
    /**
     * Get the value of the given rowindex and fieldname.
     *
     * @rowIndex Index of the grid row.
     * @fieldName Name of the field.
     * @example
     * // Returns the value of Title field which is in row with index number 1.
     * grid.GetItemFieldValue(1, 'Title');
     */
    GetItemFieldValue(rowIndex: number, fieldName: string): any;
    /**
     * Hides edit/new item form dialog.
     * @example
     * // Hides edit/new item form dialog.
     * grid.HideItemDialog();
     */
    HideItemDialog(): void;
    /**
     * Ensures edit/new item form dialog exists in the body.
     * @example
     * // Ensures edit/new item form dialog exists in the body.
     * grid.EnsureItemDialogContainer(1, 'Title');
     */
    EnsureItemDialogContainer(): JQuery;
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
    PopulateEditControlsOnNewEditForm(isEditForm: boolean, rowId: string): void;
    /**
     * Edits selected row.
     * @example
     * // Edits selected row.
     * grid.EditSelectedRow();
     */
    EditSelectedRow(): void;
    /**
     * Edits new row.
     * @example
     * // Edits new row.
     * grid.EditNewRow();
     */
    EditNewRow(): void;
    /**
     * Saves currently edited item.
     *
     * @rowId Identifier of the row.
     * @example
     * // Saves edited item with row id as soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b.
     * grid.SaveItemDetail('soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b');
     */
    SaveItemDetail(rowId: string): void;
    /**
    * Deletes selected rows.
    * @example
    * // Deletes selected rows
    * grid.DeleteSelectedRows();
    */
    DeleteSelectedRows(): void;
    /**
     * Not implemented yet.
     */
    EditOffOnEditedCells(): void;
    /**
     * Not implemented yet.
     */
    EditSelectedCell(): void;
    /**
     * Not implemented yet.
     */
    EditOffCell(cellId: any): void;
    /**
    * Not implemented yet.
    */
    EditCell(cellId: any): void;
    /**
     * Activates the grid.
     * @example
     * // Activates the grid
     * grid.Activate();
     */
    Activate(): void;
    /**
    * De-activates the grid.
    * @example
    * // De-Activates the grid
    * grid.Activate();
    */
    DeActivate(): void;
    /**
     * Adds key field.
     *
     * @fieldName Name of the field.
     * @example
     * // Adds ID as key field
     * grid.AddKeyField("ID");
     */
    AddKeyField(fieldName: string): void;
    /**
    * Not implemented yet.
    */
    AddFilterControl(fieldName: any, displayName: any, fieldType: any): void;
    /**
     * Adds an aggregate field
     *
     * @fieldName Name of the field.
     * @aggregateType Type of the aggregate action.
     * @example
     * // Adds Sum of 'Price' field
     * grid.AddAggregateField("Price", SobyAggregateTypes.Sum);
     */
    AddAggregateField(fieldName: string, aggregateType: number): void;
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
    AddColumn(fieldName: any, displayName: any, showFieldsOn: number, displayFunction: any, cellTemplate: any, sortable: any, filterable: any, editable: any, filterControl: any, cellCss: any, cellClassNames: any): void;
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
    AddDataRelation(masterFieldDisplayName: any, masterFieldValueName: any, detailGridID: any, detailFieldName: any): void;
    /**
     * Gets row identifiers
     * @example
     * // returns ["soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec", "soby_griddatarow_f0b7f7e8-6b89-accf-0446-88eda73e0bee"]
     * grid.GetRowIds()
     */
    GetRowIds(): any[];
    /**
     * Gets selected row identifier
     * @example
     * // returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
     * grid.GetSelectedRowID()
     */
    GetSelectedRowID(): string;
    /**
     * Gets active row identifier
     * @example
     * // returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
     * grid.GetActiveRowID()
     */
    GetActiveRowID(): string;
    /**
     * Gets row identifiers
     * @example
     * // returns ["soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec", "soby_griddatarow_f0b7f7e8-6b89-accf-0446-88eda73e0bee"]
     * grid.GetRowIds()
     */
    GetSelectedCellIds(): any[];
    /**
     * Gets selected cell identifier
     * @example
     * // returns "soby_gridcell_8be81bcb-ae80-5309-3d8a-6ad091c01051"
     * grid.GetSelectedCellID();
     */
    GetSelectedCellID(): string;
    /**
     * Gets grid column by field name
     * @example
     * // returns Column object for given fieldname
     * grid.GetColumn('Title');
     */
    GetColumn(fieldName: any): any;
    /**
     * Gets selected row identifiers
     * @example
     * // returns ["soby_griddatarow_fa5a2dd6-fc2a-d61b-5b9f-4e6e0824ce11", "soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c"]
     * grid.GetSelectedRowIDs();
     */
    GetSelectedRowIDs(): any[];
    /**
     * Gets selected data items
     * @example
     * // returns [Object, Object]
     * grid.GetSelectedDataItems();
     */
    GetSelectedDataItems(): any[];
    SelectAllRows(): void;
    /**
     * Selects the row
     *
     * @rowID Identifier of the row.
     * @example
     * // Selects the row with given row identifier
     * grid.SelectRow("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c");
     */
    SelectRow(rowID: any): void;
    /**
     * Selects the row
     *
     * @rowIndex Index of the row.
     * @example
     * // Selects the row with given row index
     * grid.SelectRow(1);
     */
    SelectRowByIndex(rowIndex: any): void;
    /**
     * Selects the cell
     *
     * @rowID Identifier of the row.
     * @cellIndex Index of the cell.
     * @example
     * // Selects the cell with given row identifier and cell index
     * grid.SelectCell("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c", 3);
     */
    SelectCell(rowID: any, cellIndex: any): void;
    /**
     * Hides/show filter pane
     * @example
     * // Hides/show filter pane
     * grid.HideShowFilterPane();
     */
    HideShowFilterPane(): void;
    /**
     * Generates filter pane
     * @example
     * // Generates filter pane
     * grid.GenerateFilterPane();
     */
    GenerateFilterPane(): void;
    /**
     * Allows drop column
     */
    AllowDropColumn(ev: any): void;
    /**
     * Drags column via setting its field name
     *
     * @ev Drag Event.
     * @fieldName Name of the field.
     */
    DragColumn(ev: any, fieldName: any): void;
    /**
     * Drops the column
     *
     * @ev Drag Event.
     */
    DropColumn(ev: any): void;
    /**
     * Drops group by column
     *
     * @ev Drag Event.
     */
    DropGroupByColumn(ev: any): void;
    ExportToExcel(): void;
    CopyToClipboard(elem: HTMLTextAreaElement): any;
    /**
     * Generates group by pane
     * @example
     * // Generates filter pane
     * grid.GenerateGroupByPanePane();
     */
    GenerateGroupByPanePane(): void;
    SetActionPaneButtonsVisibility(): void;
    /**
     * Generates action pane
     * @example
     * // Generates action pane
     * grid.GenerateActionPane();
     */
    GenerateActionPane(): void;
    /**
     * Generates navigation pane
     * @example
     * // Generates navigation pane
     * grid.GenerateNavigationPane();
     */
    GenerateNavigationPane(): string;
    /**
     * Navigates to the next page
     * @example
     * // Navigates to the next page
     * grid.GoToNextPage();
     */
    GoToNextPage(): void;
    /**
     * Navigates to the previous page
     * @example
     * // Navigates to the previous page
     * grid.GoToPreviousPage();
     */
    GoToPreviousPage(): void;
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
    PopulateDetailGrid(detailGridIDs: any, contentDivSelectors: any, mainRowId: any, fieldNames: any, values: any): void;
    /**
     * Selects the detail grid tab
     *
     * @rowid Identifier of the row.
     * @index Index of the tab.
     * @example
     * // Populates the detail grid
     * grid.SelectDetailGridTab('soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0', '0');
     */
    SelectDetailGridTab(rowid: any, index: any): void;
    /**
     * Shows cell poup content
     *
     * @cellID Identifier of the cell.
     * @example
     * // Shows cell poup content
     * grid.ShowCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')
     */
    ShowCellPopupContent(cellID: any): void;
    /**
     * Hides cell poup content
     *
     * @cellID Identifier of the cell.
     * @example
     * // Hides cell poup content
     * grid.HideCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')
     */
    HideCellPopupContent(cellID: any): void;
    /**
     * Clear filters on given field name
     *
     * @fieldName Name of the field.
     * @example
     * // Clear filters on given field name
     * grid.ClearFiltersOn('Title')
     */
    ClearFiltersOn(fieldName: any): void;
    AddFilterField(fieldName: string, filterValue: string, fieldType: number, filterType: number): void;
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
    FilterResult(fieldName: any, value: any, fieldType: any, filterType: any): void;
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
    FilterResultWithMultipleValues(fieldName: any, values: any, fieldType: any, filterType: any): void;
    /**
     * Sorts result based on given group by field name
     *
     * @sortFieldName Name of the field to be sorted.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Sorts by Title group field as ascending
     * grid.SortGroupByField('Title', true)
     */
    SortGroupByField(sortFieldName: string, isAsc: boolean): void;
    AddOrderByField(fieldName: string, isAsc: boolean): void;
    /**
     * Sorts result based on given field name
     *
     * @sortFieldName Name of the field to be sorted.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Sorts by Title field as ascending
     * grid.SortResult('Title', true)
     */
    SortResult(sortFieldName: any, isAsc: any): void;
    AddGroupByField(fieldName: string, isAsc: boolean, displayFunction: any): void;
    /**
     * Groups result based on given field name
     *
     * @fieldName Name of the field.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Group by Title field as ascending
     * grid.GroupBy('Title', true)
     */
    GroupBy(fieldName: string, isAsc: boolean, displayFunction: any): void;
    /**
     * Aggregates result based on given field name
     *
     * @fieldName Name of the field.
     * @aggregateType Type of the aggregation.
     * @example
     * // Aggregate by Price field as sum
     * grid.AggregateBy("Price", SobyAggregateTypes.Sum)
     */
    AggregateBy(fieldName: string, aggregateType: number): void;
    /**
     * Adds a header cell
     *
     * @headerRow Row of the header.
     * @column Column of the header.
     * @dataRelation Data relation of the column.
     */
    AddHeaderCell(headerRow: any, column: any, dataRelation: any): void;
    /**
     * Populates header cells
     * @example
     * // Populates header cells
     * grid.PopulateHeaderCells()
     */
    PopulateHeaderCells(): void;
    /**
     * Changes theme
     *
     * @themeName Name of the theme.
     * @example
     * // Hides header row menu icon
     * grid.ChangeTheme('classic');
     */
    ChangeTheme(themeName: string): void;
    /**
     * Shows header row menu icon
     *
     * @fieldName Name of the field.
     * @example
     * // Shows header row menu icon
     * grid.ShowHeaderRowMenuIcon('Title');
     */
    ShowHeaderRowMenuIcon(fieldName: any): void;
    /**
     * Hides header row menu icon
     *
     * @fieldName Name of the field.
     * @example
     * // Hides header row menu icon
     * grid.HideHeaderRowMenuIcon('Title');
     */
    HideHeaderRowMenuIcon(fieldName: any): void;
    /**
     * Hides header row menu
     *
     * @fieldName Name of the field.
     * @example
     * // Hides header row menu icon
     * grid.HideHeaderRowMenu('Title');
     */
    HideHeaderRowMenu(fieldName: any): void;
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
    ShowHeaderRowMenu(fieldName: any, displayName: any, sortable: any, filterable: any): void;
    /**
     * Apply filters
     *
     * @fieldName Name of the field.
     * @example
     * // Apply filters
     * grid.ApplyFilters('Title');
     */
    ApplyFilters(fieldName: any): void;
    /**
     * Initializes the grid
     *
     * @populateItems States whether items should be populated or not.
     * @example
     * // Initializes the grid and populate items
     * grid.Initialize(true);
     */
    Initialize(populateItems: boolean): void;
    PopulateAggregateRowValues(aggregateRow: any): void;
    PopulateAggregateRowsValues(): void;
    PopulateAggregateRow(rowAddBefore: any, level: number, hasEmptyCell: boolean): void;
    PopulateAggregateRows(): void;
    PopulateGroupByRow(itemIndex: number, item: any, row: any): any;
    PopulateDetailRow(rowID: any): void;
    PopulateSelectionCell(item: any, row: any, rowID: any): void;
    PopulateViewColumns(item: any, row: any, rowID: any): void;
    /**
     * Populates the grid data
     *
     * @items Data items which returned from the service.
     * @example
     * // Populates the grid with the given items
     * grid.PopulateGridData(items);
     */
    PopulateGridData(items: any): void;
}
declare class soby_DataRepeater extends soby_WebGrid {
    /**
     * Item data bound event.
     *
     * @event soby_WebGrid#ItemDataBound
     * @type {object}
     * @property {object} cellID - Identifier of the row.
     * @property {object} item - Data item related with the row.
     */
    ItemDataBound: any;
    MaxCellCount: number;
    ShouldContainRowElement: boolean;
    /**
     * Gets selected data items
     * @example
     * // returns [Object, Object]
     * grid.GetSelectedDataItems();
     */
    GetSelectedDataItems(): any[];
    /**
     * Selects the cell
     *
     * @rowID Identifier of the row.
     * @cellIndex Index of the cell.
     * @example
     * // Selects the cell with given row identifier and cell index
     * grid.SelectCell("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c", 3);
     */
    SelectCell(rowID: any, cellIndex: any): void;
    /**
     * Selects the row
     *
     * @rowIndex Index of the row.
     * @example
     * // Selects the row with given row index
     * grid.SelectRow(1);
     */
    SelectRowByIndex(rowIndex: any): void;
    /**
     * Populates the grid data
     *
     * @items Data items which returned from the service.
     * @example
     * // Populates the grid with the given items
     * grid.PopulateGridData(items);
     */
    PopulateGridData(items: any): void;
}
declare var soby_Carousels: any[];
declare class soby_Carousel {
    constructor(contentDivSelector: string, title: string, dataService: any, emptyDataHtml: string, imageFieldName: string, captionFieldName: string, contentFieldName: string, isContentFieldUrl: boolean);
    ImagesFolderUrl: string;
    /************************************ EVENTS *************************************/
    OnGridPopulated: any;
    OnRowSelected: any;
    OnCellSelected: any;
    /*********************************************************************************/
    CarouselID: string;
    ContentDivSelector: string;
    Title: string;
    DataService: any;
    EmptyDataHtml: string;
    ImageFieldName: string;
    CaptionFieldName: string;
    ContentFieldName: string;
    IsContentFieldUrl: boolean;
    MaxWidth: number;
    Items: any;
    ItemDataBound: any;
    EnsureCarouselExistency(): void;
    GoToItem(index: any): void;
    NextItem(): void;
    PreviousItem(): void;
    PopulateIndicators(contentDivID: any, items: any): void;
    PopulateItems(contentDivID: any, items: any): void;
    PopulateNavigator(contentDivID: any): void;
    PopulateGridData(items: any): void;
    Initialize(populateItems: any): void;
}
declare var soby_MetroTileGrids: any[];
declare class soby_MetroTilesGrid {
    constructor(contentDivSelector: string, title: string, dataService: any, emptyDataHtml: string, imageFieldName: string, captionFieldName: string, urlFieldName: string, openInNewWindowFieldName: string, startColorFieldName: string, endColorFieldName: string, colspanFieldName: string, rowspanFieldName: string);
    MetroTileGridID: string;
    ContentDivSelector: string;
    Title: string;
    DataService: any;
    EmptyDataHtml: string;
    ImageFieldName: string;
    CaptionFieldName: string;
    URLFieldName: string;
    OpenInNewWindowFieldName: string;
    StartColorFieldName: string;
    EndColorFieldName: string;
    RowSpanFieldName: string;
    ColSpanFieldName: string;
    MaxWidth: any;
    TileWidth: number;
    TileHeight: number;
    Width: number;
    Items: any;
    EnsureMetroTilesExistency(): void;
    PopulateItems(items: any): void;
    Initialize(populateItems: any): void;
    ItemPopulated(items: Array<soby_Item>): void;
}
declare var soby_Wizards: any[];
declare class soby_Wizard {
    constructor(contentDivSelector: string);
    WizardID: string;
    ContentDivSelector: string;
    CurrentTabIndex: number;
    MaxWidth: any;
    TileWidth: string;
    TileHeight: string;
    Width: string;
    Items: any;
    EnsureWizardsExistency: () => void;
    GetItemById: (id: any) => any;
    ActivateWizardTab: (linkId: any) => void;
    GoToNextTab: () => void;
    GoToPreviousTab: () => void;
    EventBeforeTabChange: any;
    EventAfterTabChange: any;
    GoToTab: (tabIndex: any) => void;
    Initialize: () => void;
}
declare var soby_Menus: any[];
declare class soby_Menu {
    constructor(contentDivSelector: any, dataService: any, displayNameField: any, idField: any, parentIdField: any);
    MenuID: string;
    ContentDivSelector: string;
    DisplayNameField: string;
    IDField: string;
    ParentIDField: string;
    DataService: any;
    MaxWidth: any;
    TileWidth: string;
    TileHeight: string;
    Width: string;
    Items: any;
    EnsureMenusExistency: () => void;
    GetItemById: (id: any) => any;
    ActivateMenuTab: (linkId: any) => void;
    EventBeforeTabChange: any;
    EventAfterTabChange: any;
    PopulateGridData: (items: any) => void;
    Initialize: () => void;
}
declare var soby_ItemSelections: any[];
declare class SobyItemSelectorTypeObject {
    GridView: number;
    TreeView: number;
    CardView: number;
}
declare var SobyItemSelectorTypes: SobyItemSelectorTypeObject;
declare class soby_ItemSelection {
    constructor(contentDivSelector: any, title: any, itemSelectorType: number, autoCompleteDataService: any, advancedSearchDataService: any, emptyDataHtml: any, dialogID: any, selectorUrl: any, valueFieldName: any, textFieldName: any);
    ItemSelectorType: number;
    AdvancedSearchAsGrid: soby_WebGrid;
    ItemSelectionID: string;
    ContentDivSelector: string;
    Title: string;
    AutoCompleteDataService: soby_ServiceInterface;
    AdvancedSearchDataService: soby_ServiceInterface;
    AllowMultipleSelections: boolean;
    EmptyDataHtml: string;
    WaterMark: string;
    DialogID: string;
    SelectorUrl: string;
    ValueFieldName: string;
    TextFieldName: string;
    ImagesFolderUrl: string;
    InitializeAdvancedSearchControl(): void;
    Initialize(): void;
    OpenItemPicker(event: any): void;
    SelectItemsFromAdvancedSearchDialog(): void;
    GetItemArray(): any;
    AddItem(text: any, value: any): void;
    RemoveItem(value: any): void;
    SetItemArray(array: any): void;
    GenerateItemTable(): void;
    EnsureItemSelectionExistency(): void;
    OnSelectionChanged: any;
}
declare function ShowCommonDialog(url: any, title: any, dialogID: any, onCloseCallback: any): void;
declare function ShowDialog(url: any, title: any, dialogID: any, onCloseCallback: any): void;
declare function ShowCommonHtmlDialog(title: any, dialogID: any, onCloseCallback: any): JQuery;
declare function ShowHtmlDialog(title: any, dialogID: any, onCloseCallback: any): JQuery;
declare function CloseDialog(dialogID: any, argument: any): void;
declare function CommonCloseDialog(dialogID: any, argument: any): void;
declare function SetDialogArgument(dialogID: any, argument: any): void;
declare function SetCommonDialogArgument(dialogID: any, argument: any): void;
