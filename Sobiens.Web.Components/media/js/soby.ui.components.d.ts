declare let testObj: any;
declare let soby_EditControls: any[];
interface ISobyEditControlInterface {
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    ItemClassName: string;
    ListItems: Array<SobyListItem>;
    PopulateChoiceItems(): any;
    IsValid: boolean;
    GetValue(): any;
    SetValue(value: string): any;
    Initialize(): any;
    Initialized(): any;
    ValueBeingChanged(): any;
    ValueChanged(): any;
    Validate(): boolean;
}
interface ISobySelectorControlInterface {
    GetSelectedDataItems(): any[];
}
declare class SobyListItem {
    constructor(value: string, text: string);
    Value: string;
    Text: string;
    Properties: any;
}
declare class SobyTextBox implements ISobyEditControlInterface {
    constructor(containerClientId: string, fieldType: number, args: any);
    ItemClassName: string;
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    ListItems: Array<SobyListItem>;
    PopulateChoiceItems(): void;
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
    DataService: soby_ServiceInterface;
    ValueFieldName: string;
    TitleFieldName: string;
    ItemClassName: string;
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    ListItems: Array<SobyListItem>;
    EmptyText: string;
    ShowEmptyOption: boolean;
    GetValue(): any;
    SetValue(value: string): void;
    PopulateChoiceItems(): void;
    DrawChoiceItems(): void;
    Initialize(): void;
    Initialized(): void;
    ValueBeingChanged(): void;
    ValueChanged(): void;
    Validate(): boolean;
}
declare class SobyCheckBoxList implements ISobyEditControlInterface {
    constructor(containerClientId: string, fieldType: number, args: any);
    DataService: soby_ServiceInterface;
    ValueFieldName: string;
    TitleFieldName: string;
    ItemClassName: string;
    SelectedValuesTempState: any;
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    ShowSearchBox: boolean;
    SVGImages: soby_SVGImages;
    GetValue(): any;
    SetValue(value: string): void;
    SetArrayValue(values: any): void;
    ListItems: Array<SobyListItem>;
    PopulateChoiceItems(): void;
    DrawChoiceItems(): void;
    Initialize(): void;
    SaveState(): void;
    Initialized(): void;
    ValueBeingChanged(): void;
    ValueChanged(): void;
    _ValueChanged(itemIndex: number): void;
    Validate(): boolean;
    ListItemStateBeingChanged(affectedItem: SobyListItem, isChecked: boolean): void;
    ListItemStateChanged(affectedItem: SobyListItem, isChecked: boolean): void;
}
declare class SobySPViewFilterCheckBoxList extends SobyCheckBoxList {
    constructor(containerClientId: string, fieldType: number, args: any, webUrl: string, listName: string, fieldName: string);
    PopulateChoiceItems(): void;
    WebUrl: string;
    ListName: string;
    ListId: string;
    ViewId: string;
    FieldName: string;
}
declare class SobySelectBox {
    constructor(containerClientId: string);
    ContainerClientId: string;
    SearchOnDemand: boolean;
    AllowMultipleSelections: boolean;
    SearchParameterName: string;
    Items: any;
    SelectedItemKeyValues: any;
    SelectedItemDisplayValues: any;
    EmptyText: string;
    NoRecordsText: string;
    DataService: soby_ServiceInterface;
    ValueFieldName: string;
    TitleFieldName: string;
    ThemeName: string;
    ThemeClassName: string;
    IsValid: boolean;
    FocusToNextItemAfterItemSelection: boolean;
    Width: string;
    LastSearchKeyword: string;
    SVGImages: soby_SVGImages;
    SetValue(value: string): void;
    SetValueWithTitle(value: string, title: string): void;
    /**
     * Changes theme
     *
     * @themeName Name of the theme.
     * @example
     * // Hides header row menu icon
     * grid.ChangeTheme('classic');
     */
    ChangeTheme(themeName: string): void;
    ShowLoadingIcon(): void;
    HideLoadingIcon(): void;
    Initialize(): void;
    SearchFromService(keyword: any): void;
    SearchFromPopulatedData(keyword: any): void;
    SelectItem(index: any): void;
    PopulateSelectedItems(): void;
    GetSelectedItems(): any[];
    RemoveItem(index: any): void;
    ClearItems(): void;
    ShowHideSelectBox(): void;
    ShowSelectBox(): void;
    HideSelectBox(): void;
    SearchTextBoxLostFocused(): void;
    SearchTextBoxFocused(): void;
    Initialized(): void;
    ValueBeingChanged(): void;
    ValueChanged(): void;
    Validate(): boolean;
    /************************************ EVENTS *************************************/
    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridPopulated
     * @type {object}
     */
    OnSelectBoxItemsPopulated: any;
}
declare class SobyEditControlFactory {
    CreateEditControl(containerClientId: string, fieldType: number, args: any): ISobyEditControlInterface;
    GetEditControl(containerClientId: string): ISobyEditControlInterface;
}
declare let sobyEditControlFactory: SobyEditControlFactory;
declare let soby_WebGrids: soby_WebGrid[];
declare let soby_IsCtrlOnHold: boolean;
declare class SobyShowFieldsOnObject {
    All: number;
    ListOnly: number;
    EditOnly: number;
    NewOnly: number;
    ListEdit: number;
    ListNew: number;
    EditNew: number;
}
declare let SobyShowFieldsOn: SobyShowFieldsOnObject;
declare function soby_GetActiveDataGrid(): soby_WebGrid;
declare function soby_GetAllGrids(): any[];
declare function soby_GetAllVisibleGrids(): any[];
declare function soby_RefreshAllGrids(): void;
declare class sobyActionPaneButtons extends Array<sobyActionPaneButton> {
    constructor(items?: Array<sobyActionPaneButton>);
    Clone(): sobyActionPaneButtons;
    AddButton(button: sobyActionPaneButton): sobyActionPaneButton;
    Add(key: string, text: string, index: number, imageUrl: string, className: string, visible: boolean, onClick: any, enabilityFunction: any): sobyActionPaneButton;
    AddAsSVG(key: string, text: string, index: number, svg: string, className: string, visible: boolean, onClick: any, enabilityFunction: any): sobyActionPaneButton;
    AddCollection(buttons: sobyActionPaneButtons): void;
    Get(key: string): sobyActionPaneButton;
    Hide(key: string): void;
    Show(key: string): void;
}
declare class sobyActionPaneButton {
    constructor(key: string, text: string, index: number, imageUrl: string, className: string, visible: boolean, onClick: any, enabilityFunction: any);
    Clone(): sobyActionPaneButton;
    ID: string;
    Key: string;
    Text: string;
    Index: number;
    ImageUrl: string;
    ClassName: string;
    Visible: boolean;
    OnClick: any;
    EnabilityFunction: any;
    SVG: string;
    Hide(): void;
    Show(): void;
}
declare class sobyResponsiveCondition {
    constructor(validateFunction: (width: number, height: number) => any);
    ValidateFunction: (width: number, height: number) => boolean;
    Validate(): boolean;
    GetClassName(): string;
    ID: string;
}
declare class SobyGridColumn {
    constructor(fieldName: string, displayName: string, showFieldsOn: number, displayFunction: (item: any) => string, cellTemplate: any, sortable: boolean, filterable: boolean, editable: boolean, filterControl: ISobyEditControlInterface, cellCss: string, cellClassNames: string, responsiveConditionID: string);
    FieldName: string;
    DisplayName: string;
    ShowFieldsOn: number;
    DisplayFunction: (item: any, rowID: string, cellID: string) => string;
    CellTemplate: any;
    Sortable: boolean;
    Filterable: boolean;
    Editable: boolean;
    FilterControl: ISobyEditControlInterface;
    CellCss: string;
    CellClassNames: string;
    HeaderCss: string;
    HeaderClassNames: string;
    ResponsiveConditionID: string;
    IsVisible: boolean;
}
declare class soby_WebGrid implements ISobySelectorControlInterface {
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
    private ActionInProgress;
    private NavigationActionInProgress;
    Active: boolean;
    AllowExportData: boolean;
    AllowMultipleSelections: boolean;
    GridID: string;
    ThemeName: string;
    ThemeClassName: string;
    ContentDivSelector: string;
    ItemDialogClientID: string;
    Title: string;
    AltTitle: string;
    DisplayTitle: boolean;
    DataService: soby_ServiceInterface;
    EmptyDataHtml: string;
    NavigationInformation: SobyNavigationInformation;
    OrderByFields: SobyOrderByFields;
    Filters: SobyFilters;
    FilterControls: any[];
    GroupByFields: SobyGroupByFields;
    AggregateFields: SobyAggregateFields;
    ResponsiveConditions: Array<sobyResponsiveCondition>;
    KeyFields: SobyKeyFields;
    CellCount: number;
    DataRelations: any[];
    Columns: SobyGridColumn[];
    InitializedActionPaneButtons: boolean;
    IsSelectable: boolean;
    IsAddAllowed: boolean;
    IsEditable: boolean;
    IsDeletable: boolean;
    IsGroupable: boolean;
    Items: any;
    ShowRefreshButton: boolean;
    ShowHeader: boolean;
    SVGImages: soby_SVGImages;
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
     * Item added event.
     *
     * @event soby_WebGrid#ItemAdded
     * @type {object}
     * @property {object} rowID - Identifier of the row.
     * @property {object} item - Data item related with the row.
     */
    OnItemAdded: any;
    /**
     * Item update event.
     *
     * @event soby_WebGrid#ItemUpdated
     * @type {object}
     * @property {object} item - Data item related with the row.
     */
    OnItemUpdated: any;
    /**
     * Items delete event.
     *
     * @event soby_WebGrid#OnItemsDeleted
     * @type {object}
     * @property {object} items - Data items related with the row.
     */
    OnItemsDeleted: any;
    /**
     * Grid row population event.
     *
     * @event soby_WebGrid#OnGridRowPopulated
     * @type {object}
     */
    OnGridRowPopulated: any;
    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridPopulated
     * @type {object}
     */
    OnGridPopulated: any;
    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridDataBeingParsed
     * @type {object}
     */
    OnGridDataBeingParsed: any;
    /**
     * Grid before print event.
     *
     * @event soby_WebGrid#OnGridPrintBeingStarted
     * @type {object}
     */
    OnGridPrintBeingStarted: any;
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
    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridPopulated
     * @type {object}
     */
    OnCellTemplateContentPopulated: any;
    RowDetailDisplayFunction: (grid: soby_WebGrid, rowId: string, item: any) => string;
    RowDetailDisplayViewResponsiveCondition: sobyResponsiveCondition;
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
     * let bookDataSourceBuilder = new soby_WSBuilder();
     * bookDataSourceBuilder.Filters = new SobyFilters(false);
     * bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
     * bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
     * bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
     * bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
     * bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
     * bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET")});
     * let bookService = new soby_WebServiceService(bookDataSourceBuilder);
     * bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
     * bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
     * bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
     * bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");
        
     * let bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
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
    Clone(contentDivSelector: string): soby_WebGrid;
    GetResponsiveConditionById(id: string): sobyResponsiveCondition;
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
    AddKeyField(fieldName: string, parameterName: string): void;
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
    AddColumn(fieldName: any, displayName: any, showFieldsOn: number, displayFunction: any, cellTemplate: any, sortable: any, filterable: any, editable: any, filterControl: any, cellCss: any, cellClassNames: any, responsiveCondition?: sobyResponsiveCondition): SobyGridColumn;
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
    GetRowIdByItemIndex(itemIndex: any): string;
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
    GetColumn(fieldName: any): SobyGridColumn;
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
    ExportTableToCSV(): void;
    DownloadCSV(csv: any, filename: any): void;
    PrintGrid(): void;
    CopyToClipboard(): void;
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
    ShowCellPopupContent(cellID: string, columnIndex: number, dataItemIndex: number): void;
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
    AddFilterField(fieldName: string, filterValue: string, fieldType: number, filterType: number, shouldBeClearedOnUIFilterAction: boolean): void;
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
    FilterResult(fieldName: any, value: any, fieldType: any, filterType: any, shouldBeClearedOnUIFilterAction: boolean): void;
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
    FilterResultWithMultipleValues(fieldName: any, values: any, fieldType: any, filterType: any, shouldBeClearedOnUIFilterAction: boolean): void;
    ClearUIFilters(): void;
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
    ApplyResponsiveElementsVisibility(): void;
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
    ExpandGroupBy(groupByRowID: any): void;
    PopulateDetailRow(rowID: any): void;
    PopulateSelectionCell(item: any, row: any, rowID: any): void;
    GenerateConteFromCellTemplate(columnIndex: number, dataItemIndex: number): string;
    PopulateCellTemplateContent(cellId: string, columnIndex: number, dataItemIndex: number): void;
    PopulateViewColumns(item: any, row: any, rowID: any, itemIndex: number): void;
    /**
    * Focuses to the first item
    *
    * @example
    * // Focuses to the first item
    * grid.FocusToFirstItem();
    */
    FocusToFirstItem(): void;
    /**
 * Displays error message
 *
 * @errorMessage Error message which returned from the service.
 * @example
 * // Displays error message
 * grid.DisplayErrorMessage(errorMessage);
 */
    DisplayErrorMessage(errorMessage: string): void;
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
declare let soby_Carousels: any[];
declare class soby_Carousel {
    constructor(contentDivSelector: string, title: string, dataService: any, emptyDataHtml: string, imageFieldName: string, captionFieldName: string, contentFieldName: string, isContentFieldUrl: boolean);
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
    SVGImages: soby_SVGImages;
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
declare let soby_MetroTileGrids: any[];
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
    Width: string;
    Items: any;
    SVGImages: soby_SVGImages;
    EnsureMetroTilesExistency(): void;
    PopulateItems(items: any): void;
    Initialize(populateItems: any): void;
    ItemPopulated(items: Array<soby_Item>): void;
}
declare let soby_Wizards: any[];
declare class soby_Wizard {
    constructor(contentDivSelector: string);
    AutoPopulateStepNumbersOnHeaders: boolean;
    WizardID: string;
    ContentDivSelector: string;
    CurrentStepIndex: number;
    TempStepIndex: number;
    MaxWidth: any;
    TileWidth: string;
    TileHeight: string;
    Width: string;
    Items: any;
    EnsureWizardsExistency: () => void;
    GetItemById: (id: any) => any;
    ActivateWizardStep: (linkId: any) => void;
    GoToNextStep: () => void;
    GoToPreviousStep: () => void;
    EventBeforeStepChange: any;
    EventAfterStepChange: any;
    GoToStep: (stepIndex: any) => void;
    CommitToStep: () => void;
    Initialize: () => void;
    HideNavigationBar: () => void;
    ShowNavigationBar: () => void;
    HideStepPanels: () => void;
    ShowStepPanels: () => void;
}
declare let soby_Tabs: any[];
declare class soby_Tab {
    constructor(contentDivSelector: string);
    AutoPopulateTabNumbersOnHeaders: boolean;
    TabID: string;
    ContentDivSelector: string;
    CurrentTabIndex: number;
    TempTabIndex: number;
    MaxWidth: any;
    TileWidth: string;
    TileHeight: string;
    Width: string;
    Items: any;
    EnsureTabsExistency: () => void;
    GetItemById: (id: any) => any;
    ActivateTab: (linkId: any) => void;
    GoToNextTab: () => void;
    GoToPreviousTab: () => void;
    EventBeforeTabChange: any;
    EventAfterTabChange: any;
    GoToTab: (tabIndex: any) => void;
    CommitToTab: () => void;
    Initialize: () => void;
    HideNavigationBar: () => void;
    ShowNavigationBar: () => void;
    HideTabPanels: () => void;
    ShowTabPanels: () => void;
}
declare enum SobyMenuItemTypes {
    Toggler = 0,
    Standard = 1,
    HtmlContent = 3,
    Divider = 2
}
declare enum SobyMenuViewTypes {
    LeftSideBar = 0,
    TopBar = 1
}
declare let SobyMenus: any[];
declare class SobyMenuItem {
    constructor(parentMenuItem: SobyMenuItem, title: string, link: string, iconSrc: string, tooltip: string);
    MenuItemID: string;
    Type: SobyMenuItemTypes;
    IconSrc: string;
    Title: string;
    Tooltip: string;
    Link: string;
    ParentMenuItem: SobyMenuItem;
    Items: Array<SobyMenuItem>;
    /************************************ EVENTS *************************************/
    /**
     * Menu item click event.
     *
     * @event SobyMenu#OnMenuItemClicked
     * @type {object}
     */
    OnMenuItemClicked: any;
}
declare class SobyMenu {
    constructor(contentDivSelector: any, viewType: SobyMenuViewTypes);
    MenuID: string;
    ViewType: SobyMenuViewTypes;
    ContentDivSelector: string;
    MaxWidth: any;
    TileWidth: string;
    TileHeight: string;
    Width: string;
    Items: Array<SobyMenuItem>;
    SVGImages: soby_SVGImages;
    AutoSelectCurrentPageLink: boolean;
    EnsureMenusExistency: () => void;
    GetItemById: (id: any, menuItem: SobyMenuItem) => SobyMenuItem;
    GetItemByLink: (link: string, menuItem: SobyMenuItem) => SobyMenuItem;
    SelectCurrentPageLink(): void;
    Add(parentMenuItem: SobyMenuItem, title: string, link: string, iconSrc: string, tooltip: string): SobyMenuItem;
    AddToggler(parentMenuItem: SobyMenuItem, title: string, iconSrc: string, tooltip: string): SobyMenuItem;
    AddDivider(parentMenuItem: SobyMenuItem): SobyMenuItem;
    PopulateItems: (menuItem: SobyMenuItem, shouldGenerateHtml: boolean) => void;
    ExpandCollapseMenu(): void;
    ExpandCollapseSubMenuItems(parentMenuItemId: any, parentMenuItemTitle: any): void;
    Initialize: (shouldGenerateHtml: boolean) => void;
}
declare function sobyGenerateMenuFromHtmlElement(containerId: any): SobyMenu;
declare function sobyParseMenuItemsFromHtmlElement(menu: any, menuMenuElement: any, parentMenuItem: any): void;
declare let soby_ItemSelections: any[];
declare class SobyItemSelectorTypeObject {
    GridView: number;
    TreeView: number;
    CardView: number;
}
declare let SobyItemSelectorTypes: SobyItemSelectorTypeObject;
declare function soby_GetItemSelectionByContentDivSelector(contentDivSelector: any): soby_ItemSelection;
declare function soby_GetAllItemSelections(): any[];
declare enum SobyRangeSelectionViewTypes {
    NumericRange = 0,
    DateRange = 1
}
declare let soby_RangeSelections: any[];
declare class soby_RangeSelection {
    constructor(contentDivSelector: any, title: any, viewType: SobyRangeSelectionViewTypes, width: number, height: number, startValue: any, endValue: any, minorRangeInterval: any, minorRangeCountInAMajorRange: any, selectedRange: any);
    RangeSelectionID: string;
    RangeSelectionTooltipID: string;
    ViewType: number;
    Title: string;
    ContentDivSelector: string;
    Width: number;
    Height: number;
    PaddingLeft: number;
    PaddingRight: number;
    PaddingBottom: number;
    PaddingTop: number;
    LabelHeight: number;
    RangeBarHeight: number;
    SelectedRangeBarHeight: number;
    AdditionalLabelSectionHeight: number;
    StartNumericValue: number;
    EndNumericValue: number;
    MinorRangeInterval: any;
    MinorRangeCountInAMajorRange: any;
    MinimumValue: any;
    MaximumValue: any;
    PageItemCount: any;
    SelectedRange: any;
    DragDirection: string;
    IsBeingDragged: boolean;
    MonthNames: Array<string>;
    EnsureRangeSelectionsExistency(): void;
    RePaint(): void;
    Clear(): void;
    Initialize(): void;
    HandleMouseDown(e: MouseEvent): void;
    HandleMouseUp(e: MouseEvent): void;
    HandleMouseMove(e: MouseEvent): void;
    CheckMouseHitSelectedRangeLeftResize(x: number, y: number): boolean;
    CheckMouseHitSelectedRangeRightResize(x: number, y: number): boolean;
    CheckMouseHitSelectedRange(x: number, y: number): boolean;
    RePaintOnMouseMove(offsetX: number, mouseUp: boolean): void;
    DrawPane(): void;
    GetSelectedDateRanges(): Array<Date>;
    GetValueLabel(value: number): string;
    GetContext(): any;
    GetCanvas(): any;
    GetTooltipContext(): any;
    GetTooltipCanvas(): any;
    DrawSelectedRange(): void;
    GetRangeItemCount(): number;
    GetRangeValueWidth(): number;
    GetValueFromOffsetX(offsetX: any): number;
    GetOffsetXFromValue(value: any): number;
    GetSelectedRangeLeft(): number;
    GetSelectedRangeRight(): number;
    RangeBeingChanged(): void;
    RangeChanged(): void;
}
declare class soby_ItemSelection {
    constructor(contentDivSelector: any, title: any, itemSelectorType: number, autoCompleteDataService: any, advancedSearchDataService: any, advancedSearchChildrenDataService: any, emptyDataHtml: any, dialogID: any, selectorUrl: any, valueFieldName: any, textFieldName: any, parentFieldName: any);
    ItemSelectorType: number;
    AdvancedSearchAsGrid: ISobySelectorControlInterface;
    ItemSelectionID: string;
    ContentDivSelector: string;
    Title: string;
    AutoCompleteDataService: soby_ServiceInterface;
    AdvancedSearchDataService: soby_ServiceInterface;
    AdvancedSearchChildrenDataService: soby_ServiceInterface;
    AllowMultipleSelections: boolean;
    EmptyDataHtml: string;
    WaterMark: string;
    DialogID: string;
    SelectorUrl: string;
    ParentFieldName: string;
    ValueFieldName: string;
    TextFieldName: string;
    SVGImages: soby_SVGImages;
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
    EventBeforeAutoCompleteQuery: any;
}
declare var soby_TreeViews: any[];
declare var soby_TreeViewItems: any[];
interface soby_TreeViewInterface {
    RootDataBeingParsed(data: any): Array<soby_Item>;
    ChildDataBeingParsed(data: any): Array<soby_Item>;
    RootNodesDataServiceBeingQueried(): any;
    ChildNodesDataServiceBeingQueried(node: soby_Item): any;
}
declare class soby_TreeView implements soby_TreeViewInterface, ISobySelectorControlInterface {
    constructor(contentDivSelector: any, title: any, rootNodesDataService: any, childNodesDataService: any, emptyDataHtml: any, parentFieldName: any, valueFieldName: any, textFieldName: any);
    RootDataBeingParsed(data: any): Array<soby_Item>;
    ChildDataBeingParsed(data: any): Array<soby_Item>;
    RootNodesDataServiceBeingQueried(): void;
    ChildNodesDataServiceBeingQueried(node: soby_Item): void;
    TreeViewID: string;
    ContentDivSelector: string;
    Title: string;
    RootNodesDataService: soby_ServiceInterface;
    ChildNodesDataService: soby_ServiceInterface;
    AllowMultipleSelections: boolean;
    AllowCheckBoxes: boolean;
    EmptyDataHtml: string;
    ParentFieldName: string;
    ValueFieldName: string;
    TextFieldName: string;
    SVGImages: soby_SVGImages;
    Initialize(): void;
    GetItemData(treeviewItemId: any): any;
    GetRootNodeId(treeviewItemId: any): any;
    GetParentNodeId(treeviewItemId: any): string;
    GetRootNodeItemData(treeviewItemId: any): any;
    GetParentNodeItemData(treeviewItemId: any): any;
    ExpandNode(treeviewItemId: any): void;
    PopulateNodes(contentDivSelector: any, items: any): void;
    GetSelectedDataItems(): any[];
    ClickNode(treeViewItemId: any): void;
    CheckNode(treeViewItemId: any): void;
    EnsureItemSelectionExistency(): void;
    OnSelectionChanged: any;
    OnClick: any;
}
declare function ShowCommonDialog(url: any, title: any, dialogID: any, onCloseCallback: any): void;
declare function ShowDialog(url: any, title: any, dialogID: any, onCloseCallback: any): void;
declare function ShowCommonHtmlDialog(title: any, dialogID: any, onCloseCallback: any): JQuery;
declare function ShowHtmlDialog(title: any, dialogID: any, onCloseCallback: any): JQuery;
declare function CloseDialog(dialogID: any, argument: any): void;
declare function CommonCloseDialog(dialogID: any, argument: any): void;
declare function SetDialogArgument(dialogID: any, argument: any): void;
declare function SetCommonDialogArgument(dialogID: any, argument: any): void;
declare class soby_SVGImages {
    Width: number;
    Height: number;
    constructor();
    GetArrowDown(): string;
    GetArrowUp(): string;
    GetSortAZDown(): string;
    GetSortAZUp(): string;
    GetXCircle(): string;
    GetFilterCircle(): string;
    GetCheck(): string;
    GetCardView(): string;
    GetLeftCircle(): string;
    GetRightCircle(): string;
    GetCollapse(): string;
    GetExpand(): string;
    GetPicker(): string;
    GetExcel(): string;
    GetCSV(): string;
    GetPrint(): string;
    GetClipboard(): string;
    GetLoading(): string;
}
