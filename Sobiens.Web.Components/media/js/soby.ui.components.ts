// VERSION 1.0.8.1
var testObj = null;
// ********************* SOBY EDIT CONTROLS *****************************
var soby_EditControls = new Array();
interface ISobyEditControlInterface {
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    ItemClassName: string;
    ImagesFolderUrl: string;
    ListItems: Array<SobyListItem>;
    PopulateChoiceItems();
    IsValid: boolean;
    GetValue(): any;
    SetValue(value: string);
    Initialize();
    Initialized();
    ValueBeingChanged();
    ValueChanged();
    Validate():boolean;
}

interface ISobySelectorControlInterface
{
    ImagesFolderUrl: string;
    GetSelectedDataItems(): any[];
    /*
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    ItemClassName: string;
    ListItems: Array<SobyListItem>;
    PopulateChoiceItems();
    IsValid: boolean;
    GetValue(): any;
    SetValue(value: string);
    Initialize();
    Initialized();
    ValueBeingChanged();
    ValueChanged();
    Validate(): boolean;
    */
}

enum SobyPaginationViewTypes
{
    PageNumbers = 0,
    BasicButtons = 1,
    BasicButtons_PageNumbers = 2,
    AdvancedButtons = 3,
    AdvancedButtons_PageNumbers = 4,
    QuickButtons_PageNumbers = 5,
}

enum SobyPaginationVerticalAlign
{
    Left = 0,
    Center = 1,
    Right = 2
}

class SobyListItem
{
    constructor(value: string, text: string)
    {
        this.Value = value;
        this.Text = text;
    }

    Value: string;
    Text: string;
    Properties: any;
}

class SobyTextBox implements ISobyEditControlInterface {
    constructor(containerClientId: string, fieldType: number, args:any) {
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
    }
    ImagesFolderUrl: string;
    ItemClassName: string;
    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    ListItems: Array<SobyListItem>;
    PopulateChoiceItems() { }
    GetValue(): any {
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
    }
    SetValue(value:string) {
        $("#" + this.ContainerClientId + " input.sobytextbox").val(value);
    }
    Initialize()
    {
        var input = $("<input type='textbox' class='sobytextbox'>");
        $("#" + this.ContainerClientId).html("");
        if (this.ItemClassName != null && this.ItemClassName != "")
        {
            input.addClass(this.ItemClassName);
        }
        $("#" + this.ContainerClientId).append(input);

        soby_EditControls[this.ContainerClientId] = this;
        this.Initialized();
    }
    Initialized() { }
    ValueBeingChanged() { }
    ValueChanged() { }
    Validate(): boolean {
        return true;
    }
}


class SobyLookupSelectBox implements ISobyEditControlInterface {
    constructor(containerClientId: string, fieldType: number, args: any)
    {
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
        soby_EditControls[this.ContainerClientId] = this;

        if (this.Args != null)
        {
            this.ValueFieldName = this.Args.ValueFieldName;
            this.TitleFieldName = this.Args.TitleFieldName;

            var readTransport = this.Args.ReadTransport;
            var dataSourceBuilder = new soby_WSBuilder();
            dataSourceBuilder.Filters = new SobyFilters(false);
            dataSourceBuilder.AddSchemaField(this.Args.ValueFieldName, SobyFieldTypes.Text, null);
            dataSourceBuilder.AddSchemaField(this.Args.TitleFieldName, SobyFieldTypes.Text, null);
            if (this.Args.AdditionalReadFields != null)
            {
                var fieldNames = this.Args.AdditionalReadFields.split(",");
                for (var i = 0; i < fieldNames.length; i++)
                {
                    dataSourceBuilder.AddSchemaField(fieldNames[i], SobyFieldTypes.Text, null);
                }
            }
            dataSourceBuilder.RowLimit = 0;
            var service = new soby_WebServiceService(dataSourceBuilder);
            service.Transport.Read = new soby_TransportRequest(readTransport.Url, readTransport.DataType, readTransport.ContentType, readTransport.Type);
            this.DataService = service;
        }
    }
    DataService: soby_ServiceInterface = null;
    ValueFieldName: string = null;
    TitleFieldName: string = null;
    ItemClassName: string;
    ImagesFolderUrl: string;

    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    ListItems: Array<SobyListItem>;
    EmptyText: string = "Please Select";
    ShowEmptyOption: boolean = false;
    GetValue(): any
    {
        if ($("#" + this.ContainerClientId + " select.sobylookupselectbox option.listitem:selected") == null)
        {
            return null;
        }

        var itemIndex = parseInt($("#" + this.ContainerClientId + " select.sobylookupselectbox option.listitem:selected").attr("itemindex"));
        return this.ListItems[itemIndex];
    }
    SetValue(value: string) {
        $("#" + this.ContainerClientId + " select.sobylookupselectbox").val(value);
    }
    PopulateChoiceItems()
    {
        this.ListItems = new Array<SobyListItem>();
        var editControl = this;
        this.DataService.ItemPopulated = function (items)
        {
            if (editControl.ShowEmptyOption == true)
            {
                var listItem = new SobyListItem("", editControl.EmptyText);
                listItem.Properties = new Array();
                editControl.ListItems.push(listItem);
            }
            for (var i = 0; i < items.length; i++)
            {
                var listItem = new SobyListItem(items[i][editControl.ValueFieldName], items[i][editControl.TitleFieldName]);
                listItem.Properties = items[i];
                editControl.ListItems.push(listItem);
            }
            editControl.DrawChoiceItems();
        };

        this.DataService.PopulateItems(null);
    }
    DrawChoiceItems()
    {
        var selectbox = $("#" + this.ContainerClientId + " select.sobylookupselectbox");
        selectbox.find("option.listitem").remove();
        for (var i = 0; i < this.ListItems.length; i++)
        {
            var option = $("<option itemindex='" + i + "' class='listitem'></option>");
            if (this.ItemClassName != null && this.ItemClassName != "")
            {
                option.addClass(this.ItemClassName);
            }

            option.attr("value", this.ListItems[i].Value);
            option.text(this.ListItems[i].Text);
            selectbox.append(option);
        }
        this.Initialized();
    }
    Initialize()
    {
        var selectBox = $("<select class='sobylookupselectbox' onchange=\"soby_EditControls['" + this.ContainerClientId + "'].ValueChanged()\"></select>");
        $("#" + this.ContainerClientId).html("");
        $("#" + this.ContainerClientId).append(selectBox);
        this.PopulateChoiceItems();
    }
    Initialized() { }
    ValueBeingChanged() { }
    ValueChanged() { }
    Validate(): boolean {
        return true;
    }
}

class SobyCheckBoxList implements ISobyEditControlInterface
{
    constructor(containerClientId: string, fieldType: number, args: any)
    {
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
        soby_EditControls[this.ContainerClientId] = this;

        if (this.Args != null)
        {
            this.ValueFieldName = this.Args.ValueFieldName;
            this.TitleFieldName = this.Args.TitleFieldName;

            var readTransport = this.Args.ReadTransport;
            if (readTransport != null)
            {
                var dataSourceBuilder = new soby_WSBuilder();
                dataSourceBuilder.Filters = new SobyFilters(false);
                dataSourceBuilder.AddSchemaField(this.Args.ValueFieldName, SobyFieldTypes.Text, null);
                dataSourceBuilder.AddSchemaField(this.Args.TitleFieldName, SobyFieldTypes.Text, null);
                if (this.Args.AdditionalReadFields != null)
                {
                    var fieldNames = this.Args.AdditionalReadFields.split(",");
                    for (var i = 0; i < fieldNames.length; i++)
                    {
                        dataSourceBuilder.AddSchemaField(fieldNames[i], SobyFieldTypes.Text, null);
                    }
                }
                dataSourceBuilder.RowLimit = 0;
                var service = new soby_WebServiceService(dataSourceBuilder);
                service.Transport.Read = new soby_TransportRequest(readTransport.Url, readTransport.DataType, readTransport.ContentType, readTransport.Type);
                this.DataService = service;
            }
        }
    }
    DataService: soby_ServiceInterface = null;
    ValueFieldName: string = null;
    TitleFieldName: string = null;
    ItemClassName: string;
    ImagesFolderUrl: string;
    SelectedValuesTempState: any;

    ContainerClientId: string;
    FieldType: number;
    Args: any;
    IsValid: boolean;
    ShowSearchBox: boolean = false;
    GetValue(): any
    {
        var values = new Array();
        if (this.ShowSearchBox == true)
        {
            var searchBox = $("#" + this.ContainerClientId + " .sobycheckboxlist-searchbox");
            var value = searchBox.val();
            if (value != null && value != undefined && value != "")
            {
                values[values.length] = value;
            }
        }
        var selectedInputs = $("#" + this.ContainerClientId + " ul.sobycheckboxlist input:checked");
        for (var i = 0; i < selectedInputs.length; i++)
        {
            var itemIndex = parseInt($(selectedInputs[i]).attr("itemindex"));
            values[values.length] = this.ListItems[itemIndex];
        }

        return values;
    }
    SetValue(value: string)
    {
        var values = value.split(soby_FilterValueSeperator);
        this.SetArrayValue(values);
    }
    SetArrayValue(values: any)
    {
        $("#" + this.ContainerClientId + " ul.sobycheckboxlist input:checked").prop("checked", false);
        if (values == null)
        {
            return;
        }

        for (var i = 0; i < values.length; i++)
        {
            $("#" + this.ContainerClientId + " ul.sobycheckboxlist input[value='" + values[i] + "']").prop("checked", true);
        }
        this.SaveState();
    }
    ListItems: Array<SobyListItem>;
    PopulateChoiceItems()
    {
        var ul = $("#" + this.ContainerClientId + " ul.sobycheckboxlist");
        ul.find("li").remove();
        var li = $("<li></li>");
        li.append("<img src= '" + this.ImagesFolderUrl + "/loading16.gif' > Loading...")
        ul.append(li);

        this.ListItems = new Array<SobyListItem>();
        var editControl = this;
        this.DataService.ItemPopulated = function (items)
        {
            for (var i = 0; i < items.length; i++)
            {
                var listItem = new SobyListItem(items[i][editControl.ValueFieldName], items[i][editControl.TitleFieldName]);
                listItem.Properties = items[i];
                editControl.ListItems.push(listItem);
            }
            editControl.DrawChoiceItems();
        };

        this.DataService.PopulateItems(null);
    }
    DrawChoiceItems()
    {
        var ul = $("#" + this.ContainerClientId + " ul.sobycheckboxlist");
        ul.find("li").remove();
        for (var i = 0; i < this.ListItems.length; i++)
        {
            var li = $("<li></li>");
            var inputid = soby_guid();
            var input = $("<input type='checkbox' id='" + inputid + "' itemindex='" + i + "' onclick=\"soby_EditControls['" + this.ContainerClientId + "']._ValueChanged(" + i + ")\" />");
            if (this.ItemClassName != null && this.ItemClassName != "")
            {
                input.addClass(this.ItemClassName);
            }

            if (this.SelectedValuesTempState != null && $.inArray(this.ListItems[i].Value, this.SelectedValuesTempState) > -1)
            {
                input.prop('checked', true);
            }

            var label = $("<label for='" + inputid + "'></label>");
            input.attr("value", this.ListItems[i].Value);
            label.text(this.ListItems[i].Text);
            li.append(input);
            li.append(label);
            ul.append(li);
        }

        this.Initialized();
        this.SaveState();
    }
    Initialize()
    {
        $("#" + this.ContainerClientId).html("<ul class='sobycheckboxlist'></ul>");
        if (this.ShowSearchBox == true)
        {
            $("#" + this.ContainerClientId).prepend("<input type='text' class='sobycheckboxlist-searchbox'>");
        }

        this.PopulateChoiceItems();
    }
    SaveState()
    {
        this.SelectedValuesTempState = new Array();
        var selectedItems = this.GetValue();
        for (var i = 0; i < selectedItems.length; i++)
        {
            var value = selectedItems[i].Value;
            this.SelectedValuesTempState[this.SelectedValuesTempState.length] = value;
        }
    }
    Initialized() { }
    ValueBeingChanged() { }
    ValueChanged() { }
    _ValueChanged(itemIndex: number)
    {
        var isChecked = false;
        var affectedItem = null;
        if (itemIndex != null)
        {
            affectedItem = this.ListItems[itemIndex];
            if ($("#" + this.ContainerClientId + " ul.sobycheckboxlist input[itemindex='" + itemIndex + "']:checked").length > 0)
                isChecked = true;
        }

        this.ListItemStateBeingChanged(affectedItem, isChecked)
        this.ValueBeingChanged()
        this.SaveState();
        this.ListItemStateChanged(affectedItem, isChecked);
        this.ValueChanged();
    }
    Validate(): boolean
    {
        return true;
    }
    ListItemStateBeingChanged(affectedItem: SobyListItem, isChecked: boolean) { }
    ListItemStateChanged(affectedItem: SobyListItem, isChecked: boolean) { }
}


class SobySPViewFilterCheckBoxList extends SobyCheckBoxList
{
    constructor(containerClientId: string, fieldType: number, args: any, webUrl: string, listName: string, fieldName: string)
    {
        super(containerClientId, fieldType, args);
        this.WebUrl = webUrl;
        this.ListName = listName;
        this.FieldName = fieldName;
        this.ShowSearchBox = true;
    }

    PopulateChoiceItems()
    {
        this.ListItems = new Array<SobyListItem>();
        var editControl = this;
        soby.SPLibrary.Lists.GetListProperties(this.WebUrl, this.ListName, function (list)
        {
            editControl.ListId = list.ID;
            soby.SPLibrary.Views.GetViews(editControl.WebUrl, editControl.ListName, function (views)
            {
                editControl.ViewId = views[0].ID;
                var url = editControl.WebUrl + "/_layouts/15/filter.aspx?ListId=" + editControl.ListId + "&FieldInternalName=" + editControl.FieldName + "&ViewId=" + editControl.ViewId + "&FilterOnly=1&Filter=1";
                var container = $("<div></div>");
                container.load(url, null, function (data)
                {
                    var options = container.find("select option");
                    for (var i = 0; i < options.length; i++)
                    {
                        var option = $(options[i]);
                        if (option.text() == "(All)")
                        {
                            continue;
                        }

                        var listItem = new SobyListItem(option.val(), option.text());
                        editControl.ListItems.push(listItem);
                    }

                    editControl.DrawChoiceItems();
                });

            });
        });
        editControl.DrawChoiceItems();
    }

    WebUrl: string;
    ListName: string;
    ListId: string;
    ViewId: string;
    FieldName: string;
}


class SobySelectBox
{
    constructor(containerClientId: string)
    {
        this.ContainerClientId = containerClientId;
    }
    ContainerClientId: string;
    SearchOnDemand: boolean = false;
    AllowMultipleSelections: boolean = true;
    SearchParameterName: string = "";
    Items = null;
    SelectedItemKeyValues = null;
    EmptyText: string = "Please Select";
    NoRecordsText: string = "No records found";
    DataService: soby_ServiceInterface = null;
    ValueFieldName: string = null;
    TitleFieldName: string = null;
    ImagesFolderUrl: string = null;
    ThemeName: string = "classic";
    ThemeClassName: string = this.ThemeName;
    IsValid: boolean;
    FocusToNextItemAfterItemSelection: boolean = true;
    Width: string = '600px';
    LastSearchKeyword: string = '';
    
    GetValue(): any
    {
        var value = $("#" + this.ContainerClientId + " select.sobyselectbox").val();
        return value;
    }
    SetValue(value: string)
    {
        $("#" + this.ContainerClientId + " select.sobyselectbox").val(value);
    }

    /**
     * Changes theme
     *
     * @themeName Name of the theme.
     * @example
     * // Hides header row menu icon
     * grid.ChangeTheme('classic');
     */
    ChangeTheme(themeName: string)
    {
        $(".sobyselectbox").removeClass(this.ThemeClassName);
        this.ThemeName = themeName;
        this.ThemeClassName = themeName;
        $(".sobyselectbox").addClass(this.ThemeClassName);
    }

    ShowLoadingIcon() {
        $("#" + this.ContainerClientId + " .loadingicon").removeClass("hidden");
        $("#" + this.ContainerClientId + " .clearitemslink").addClass("hidden");
    }

    HideLoadingIcon() {
        $("#" + this.ContainerClientId + " .loadingicon").addClass("hidden");
        if (this.SelectedItemKeyValues != null && this.SelectedItemKeyValues.length > 1)
            $("#" + this.ContainerClientId + " .clearitemslink").removeClass("hidden");
        else
            $("#" + this.ContainerClientId + " .clearitemslink").addClass("hidden");
    }

    Initialize()
    {
        var selectbox = this;
        this.SelectedItemKeyValues = new Array();
        $("#" + this.ContainerClientId).addClass("sobyselectbox");
        $("#" + this.ContainerClientId).css("width", this.Width);
        $("#" + this.ContainerClientId).addClass(this.ThemeClassName);
        $("#" + this.ContainerClientId).html(
            "<div class='selectionfilterpanel' onclick=\"soby_EditControls['" + this.ContainerClientId + "'].ShowSelectBox()\">" +
                "<div class='selecteditemsandsearchpanel'>" +
                    "<div class='selecteditems'></div>" +
                "</div>" +
            "<div class='additionalcellonexpanderpanel'>" +
            "<span class='loadingicon hidden'><img src='" + this.ImagesFolderUrl + "/loading16.gif'></span>" +
            "<a href='javascript:void(0)'  onclick =\"soby_EditControls['" + this.ContainerClientId + "'].ClearItems()\" class=\"soby-itmHoverEnabled soby-selectboxitem-delete-link clearitemslink hidden\"><span class='soby-icon-imgSpan'><img class='soby-list-delete soby-icon-img' src='" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43'></span></a>" +
            "</div>" +
            "<div class='expanderpanel'>" +
                    "<a href='javascript:void(0)'  onclick=\"soby_EditControls['" + this.ContainerClientId + "'].ShowHideSelectBox()\"><img src='" + this.ImagesFolderUrl + "/ecbarw.png' border='0' alt= 'Open Menu'></a>" +
                "</div>" +
            "</div>" +
            "<div class='selectbox hidden'>" +
                "<div class='searchpanel' style='width:100%'><input type='text' class='searchtextbox' onfocus=\"soby_EditControls['" + this.ContainerClientId + "'].SearchTextBoxFocused()\" onblur=\"soby_EditControls['" + this.ContainerClientId + "'].SearchTextBoxLostFocused()\"><div class='emptytext'></div></div>" +
            "</div><div><div>" +
            "</div>");
        $("#" + this.ContainerClientId + " .emptytext").text(this.EmptyText);

        $("#" + this.ContainerClientId + " .searchtextbox").keyup(function () {
            var keyword = $(this).val();
            console.log("keyword:");
            console.log(keyword);
            if (selectbox.SearchOnDemand == false) {
                selectbox.SearchFromPopulatedData(keyword);
            }
            else {
                selectbox.SearchFromService(keyword);
            }

        });


        $("#" + this.ContainerClientId + " .searchtextbox").keydown(function (event)
        {
            switch (event.which)
            {
                case 8: //Delete
                    var selectionStart = $("#" + editControl.ContainerClientId + " .searchtextbox")[0]["selectionStart"];
                    if (selectionStart == 0)
                    {
                        $("#" + editControl.ContainerClientId + " .selecteditemsandsearchpanel .selecteditem:last a").click();

                    }
                    break;
                case 40: //Up
                    event.preventDefault();
                    $("#" + editControl.ContainerClientId + " .selectbox a:visible:first").focus();
                    break;
                case 38: //Down
                    event.preventDefault();
                    $("#" + editControl.ContainerClientId + " .selectbox a:visible:last").focus();
                    break;
                case 37: //Left
                    var keyword = $("#" + this.ContainerClientId + " .searchtextbox").val();
                    if (keyword == null || keyword == undefined || keyword == "")
                    {
                        event.preventDefault();
                        $("#" + editControl.ContainerClientId + " .selecteditemsandsearchpanel .selecteditem:last a").focus();
                    }
                    break;
            }
        });


        $('body').click(function (evt)
        {
            if ($(evt.target).parents('#' + selectbox.ContainerClientId).length == 0)
            {
                selectbox.HideSelectBox();
            }
        });

        soby_EditControls[this.ContainerClientId] = this;

        if (this.DataService != null)
        {
            var editControl = this;
            this.DataService.ItemPopulated = function (items)
            {
                editControl.Items = items;
                var selectbox = $("#" + editControl.ContainerClientId + " .selectbox");
                selectbox.find(".soby_dataitem").remove();
                if (items.length == 0) {
                    var option = $("<div class='item soby_dataitem soby-itmHoverEnabled'></div>");
                    option.text(editControl.NoRecordsText);
                    selectbox.append(option);
                }

                for (var i = 0; i < items.length; i++)
                {
                    var option = $("<div class='item soby_dataitem soby-itmHoverEnabled'></div>");
                    var itemLink = $("<a href='javascript:void(0)'></a>");
                    var title = items[i][editControl.TitleFieldName];
                    if (title == null)
                        title = "";
                    option.attr("value", items[i][editControl.ValueFieldName]);
                    option.attr("title", title.toLowerCase());
                    option.attr("itemindex", i);
                    itemLink.text(items[i][editControl.TitleFieldName]);
                    itemLink.attr("onclick", "soby_EditControls['" + editControl.ContainerClientId + "'].SelectItem(" + i + ")");
                    option.append(itemLink);
                    selectbox.append(option);

                    itemLink.keydown(function (event)
                    {
                        switch (event.which)
                        {
                            case 40:
                                if ($(this).parent().nextAll(":visible:first").length > 0)
                                {
                                    event.preventDefault();
                                    $(this).parent().nextAll(":visible:first").find("a").focus();
                                }
                                else
                                {
                                    $("#" + editControl.ContainerClientId + " .searchtextbox").focus();
                                    $("#" + editControl.ContainerClientId + " .searchtextbox").select();
                                }
                                break;
                            case 38:
                                if ($(this).parent().prevAll(":visible:first").length > 0)
                                {
                                    event.preventDefault();
                                    $(this).parent().prevAll(":visible:first").find("a").focus();
                                }
                                else
                                {
                                    $("#" + editControl.ContainerClientId + " .searchtextbox").focus();
                                    $("#" + editControl.ContainerClientId + " .searchtextbox").select();
                                }
                                break;
                        }
                    });

                }
                editControl.Initialized();
                editControl.HideLoadingIcon();
            };

            this.DataService.PopulateItems(null);
        }
    }

    SearchFromService(keyword) {
        this.ShowLoadingIcon();

        for (var i = this.DataService.DataSourceBuilder.Filters.Filters.length - 1; i > -1; i--) {
            console.log("i" + i)
            console.log(this.DataService.DataSourceBuilder.Filters.Filters[i].FieldName + " --- " + this.SearchParameterName)
            if (this.DataService.DataSourceBuilder.Filters.Filters[i].FieldName == this.SearchParameterName) {
                console.log("slicing index " + i)
                console.log(this.DataService.DataSourceBuilder.Filters.Filters)
                this.DataService.DataSourceBuilder.Filters.Filters.splice(i, 1);
                console.log(this.DataService.DataSourceBuilder.Filters.Filters)
            }
        }

        this.DataService.DataSourceBuilder.Filters.AddFilter(this.SearchParameterName, keyword, SobyFieldTypes.Text, SobyFilterTypes.Contains, false, true);
        this.DataService.PopulateItems(null);
    }

    SearchFromPopulatedData(keyword) {
        if (this.LastSearchKeyword == keyword)
            return;

        this.LastSearchKeyword = keyword;
        this.ShowLoadingIcon();

        $("#" + this.ContainerClientId + " .soby_dataitem").addClass("hidden");
        if (this.SelectedItemKeyValues.length == 0 && keyword == "") {
            $("#" + this.ContainerClientId + " .emptytext").show();
        }
        else {
            $("#" + this.ContainerClientId + " .emptytext").hide();
        }

        if (keyword.length > 0) {
            $("#" + this.ContainerClientId + " .soby_dataitem[title*=\"" + keyword.toLowerCase() + "\"]").removeClass("hidden");
        }
        else {
            $("#" + this.ContainerClientId + " .soby_dataitem").removeClass("hidden");
        }

        $(this).css("width", (keyword.length * 30) + "px");
        this.HideLoadingIcon();
    }

    SelectItem(index)
    {
        var selectedItem = this.Items[index];
        var keyValue = selectedItem[this.ValueFieldName];
        if (this.AllowMultipleSelections == false) {
            this.SelectedItemKeyValues = new Array();
        }

        if ($.inArray(keyValue, this.SelectedItemKeyValues) == -1)
        {
            this.SelectedItemKeyValues.push(keyValue);
        }

        this.PopulateSelectedItems();

        var selectedItemDiv = $("#" + this.ContainerClientId + " .selectbox .soby_dataitem[itemindex='" + index + "']");
        if (selectedItemDiv.nextAll(":visible:first").length > 0 && this.FocusToNextItemAfterItemSelection == true)
        {
            event.preventDefault();
            selectedItemDiv.nextAll(":visible:first").find("a").focus();
        }
        else if (selectedItemDiv.prevAll(":visible:first").length > 0 && this.FocusToNextItemAfterItemSelection == true)
        {
            event.preventDefault();
            selectedItemDiv.prevAll(":visible:first").find("a").focus();
        }
        else
        {
            $("#" + this.ContainerClientId + " .searchtextbox").focus();
        }

        this.HideLoadingIcon();
        this.ValueChanged();
        if (this.AllowMultipleSelections == false) {
            this.HideSelectBox();
        }
    }

    PopulateSelectedItems()
    {
        var editControl = this;
        $("#" + this.ContainerClientId + " .soby_dataitem").removeClass("selected");

        var keyword = $("#" + this.ContainerClientId + " .searchtextbox").val();
        var selectedItemsPanel = $("#" + this.ContainerClientId + " .selecteditems");
        selectedItemsPanel.html("");
        if (this.SelectedItemKeyValues.length == 0 && keyword == "")
        {
            $("#" + this.ContainerClientId + " .emptytext").show();
        }
        else
        {
            $("#" + this.ContainerClientId + " .emptytext").hide();
        }
        for (var i = 0; i < this.SelectedItemKeyValues.length; i++)
        {
            var keyValue = this.SelectedItemKeyValues[i];
            var selectedItem = null;
            for (var x = 0; x < this.Items.length; x++)
            {
                var item = this.Items[x];
                if (item[this.ValueFieldName] == keyValue)
                {
                    selectedItem = item;
                    $("#" + this.ContainerClientId + " .soby_dataitem[itemindex='" + x + "']").addClass("selected");
                    break;
                }
            }

            if (selectedItem != null)
            {
                var selectedItemContainer = $("<div class='selecteditem'></div>");
                var removeselectedItemLink = $("<a href='javascript:void(0)' onclick=\"soby_EditControls['" + this.ContainerClientId + "'].RemoveItem(" + i + ")\" class='soby-itmHoverEnabled soby-selectboxitem-delete-link'><span class='soby-icon-imgSpan'><img class='soby-list-delete soby-icon-img' src='" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43'></span></a>");
                selectedItemContainer.text(selectedItem[this.TitleFieldName] + " ");
                selectedItemContainer.append(removeselectedItemLink);
                selectedItemsPanel.append(selectedItemContainer);

                removeselectedItemLink.keydown(function (event)
                {
                    switch (event.which)
                    {
                        case 46: //Delete
                            event.preventDefault();
                            $(this).click();

                            break;
                        case 39: //Right
                            event.preventDefault();
                            if ($(this).parent().nextAll("div:visible:first").length > 0)
                            {
                                event.preventDefault();
                                $(this).parent().nextAll("div:visible:first").find("a").focus();
                            }
                            else
                            {
                                $("#" + editControl.ContainerClientId + " .searchtextbox").focus();
                            }

                            break;
                        case 37: //Down
                            event.preventDefault();
                            if ($(this).parent().prevAll(":visible:first").length > 0)
                            {
                                event.preventDefault();
                                $(this).parent().prevAll(":visible:first").find("a").focus();
                            }
                            break;
                    }
                });

            }
        }
        var position = $("#" + this.ContainerClientId + " .selectionfilterpanel").position();
        var height = $("#" + this.ContainerClientId + " .selecteditemsandsearchpanel").height();
        if (height < 10)
            height = 30;
        var top = position.top + height + 5;
        $("#" + this.ContainerClientId + " .selectbox").css("top", top);
    }

    GetSelectedItems()
    {
        var selectedItems = new Array();
        var selectedItemsPanel = $("#" + this.ContainerClientId + " .selecteditems");
        for (var i = 0; i < this.SelectedItemKeyValues.length; i++)
        {
            var keyValue = this.SelectedItemKeyValues[i];
            var selectedItem = null;
            for (var x = 0; x < this.Items.length; x++)
            {
                var item = this.Items[x];
                if (item[this.ValueFieldName] == keyValue)
                {
                    selectedItem = item;
                    break;
                }
            }

            if (selectedItem != null)
            {
                selectedItems[selectedItems.length] = selectedItem;
            }
        }

        return selectedItems;
    }

    RemoveItem(index)
    {
        this.SelectedItemKeyValues.splice(index, 1);
        this.PopulateSelectedItems();
        var selectbox = this;
        setTimeout(function ()
        {
            selectbox.ShowSelectBox();
        }, 500);
        this.HideLoadingIcon();
        this.ValueChanged();
    }

    ClearItems() {
        this.SelectedItemKeyValues = new Array();
        this.PopulateSelectedItems();
        var selectbox = this;
        setTimeout(function () {
            selectbox.ShowSelectBox();
        }, 500);
        this.ValueChanged();
    }

    ShowHideSelectBox()
    {
        var selectbox = this;
        if ($("#" + this.ContainerClientId + " .selectbox").hasClass("hidden") == true)
        {
            this.ShowSelectBox();
        }
        else
        {
            setTimeout(function ()
            {
                selectbox.HideSelectBox();
            }, 500);
        }
    }

    ShowSelectBox()
    {
        if ($("#" + this.ContainerClientId + " .selectbox").hasClass("hidden") == false)
        {
            return;
        }

        $("#" + this.ContainerClientId + " .selectbox").removeClass("hidden");
        var position = $("#" + this.ContainerClientId + " .selectionfilterpanel").position();
        var height = $("#" + this.ContainerClientId + " .selecteditemsandsearchpanel").height();
        if (height < 10)
            height = 30;
        var top = position.top + height + 5;
        $("#" + this.ContainerClientId + " .selectbox").css("top", top);
        $("#" + this.ContainerClientId + " .searchtextbox").focus();
    }

    HideSelectBox()
    {
        $("#" + this.ContainerClientId + " .selectbox").addClass("hidden");
    }

    SearchTextBoxLostFocused()
    {
        $("#" + this.ContainerClientId).removeClass("focus");
    }

    SearchTextBoxFocused()
    {
        $("#" + this.ContainerClientId).addClass("focus");
        this.ShowSelectBox();
    }

    Initialized() { }
    ValueBeingChanged() { }
    ValueChanged() { }
    Validate(): boolean
    {
        return true;
    }

    /************************************ EVENTS *************************************/
    /**
     * Item creation event.
     *
     * @event soby_WebGrid#ItemCreated
     * @type {object}
     * @property {object} rowID - Identifier of the row.
     * @property {object} item - Data item related with the row.
     */
    ItemCreated = null;

    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridPopulated
     * @type {object}
     */
    OnGridPopulated = null;

    /**
     * Row selection event.
     *
     * @event soby_WebGrid#OnRowSelected
     * @type {object}
     */
    OnRowSelected = null;

    /**
     * Cell selection event.
     *
     * @event soby_WebGrid#OnCellSelected
     * @type {object}
     * @property {soby_WebGrid} grid - Current grid object.
     * @property {object} rowID - Identifier of the row.
     * @property {object} cellIndex - Index of the cell.
     */
    OnCellSelected = null;
    /************************************ END EVENTS *********************************/

}

class SobyEditControlFactory {
    CreateEditControl(containerClientId:string, fieldType: number, args:any): ISobyEditControlInterface {
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
    }
    GetEditControl(containerClientId: string): ISobyEditControlInterface {
        return soby_EditControls[containerClientId];
    }
}
var sobyEditControlFactory = new SobyEditControlFactory();

// **********************************************************************



// ********************* SOBY GRID *****************************
var soby_WebGrids = new Array<soby_WebGrid>();
var soby_IsCtrlOnHold = false;
class SobyShowFieldsOnObject {
    All:number = 0;
    ListOnly: number = 1;
    EditOnly: number = 2;
    NewOnly: number = 3;
    ListEdit: number = 4;
    ListNew: number = 5;
    EditNew: number = 6;
}
var SobyShowFieldsOn = new SobyShowFieldsOnObject();


if ($("form") != null)
{
    $("form").click(function (args)
    {
        if ($(args.target).parents().hasClass("sobygridmenu") == false)
        {
            $(".sobygridmenu").hide();
        }
    })
}
/*
function soby_RemoveNoneExistenceGrid() {
    var newArray = new Array();
    for (var x in soby_WebGrids) {
        if ($(soby_WebGrids[x].ContentDivSelector + "[gridid='" + soby_WebGrids[x].GridID + "']").length > 0)
        {
            newArray[soby_WebGrids[x].GridID] = soby_WebGrids[x];
        }
    }

    soby_WebGrids = newArray;
}
*/

document.onkeydown = function (event)
{
    if (event.keyCode == 17)
    {
        soby_IsCtrlOnHold = true;
    }
};

window.onresize = function (event)
{
    var grids = soby_GetAllGrids();
    for (var i = 0; i < grids.length; i++)
    {
        grids[i].ApplyResponsiveElementsVisibility();
    }
};
document.onkeyup = function (event)
{
    //    soby_LogMessage(event.keyCode)
    if (event.keyCode == 17)
    {
        soby_IsCtrlOnHold = false;
    }

    var activeGrid = soby_GetActiveDataGrid();
    if (activeGrid == null)
    {
        return;
    }

    if (event.keyCode == 113 && activeGrid.IsEditable == true) // F12 Edit Mode
    {
        activeGrid.EditSelectedRow();
    }

    var selectedCellID = activeGrid.GetSelectedCellID()
    var rowID;
    var cellIndex;
    var rowIndex;

    if (selectedCellID != null)
    {
        rowID = $("#" + selectedCellID).attr("rowid");
        cellIndex = parseInt($("#" + selectedCellID).attr("cellindex"));
        rowIndex = parseInt($("#" + selectedCellID).parent().attr("rowindex"));
    }

    if (event.keyCode == 37) /* left */
    {
        if (cellIndex > 0)
        {
            cellIndex--;
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode == 38) /* up */
    {
        if (rowIndex > 0)
        {
            rowIndex--;
            rowID = $(activeGrid.ContentDivSelector + " tr[rowindex='" + rowIndex + "'").attr("id");
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode == 39) /* right */
    {
        if (cellIndex < activeGrid.Columns.length - 1)
        {
            cellIndex++
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode == 40) /* down */
    {
        if (rowIndex < $(activeGrid.ContentDivSelector + " .soby_griddatarow").length - 1)
        {
            rowIndex++;
            rowID = $(activeGrid.ContentDivSelector + " tr[rowindex='" + rowIndex + "'").attr("id");
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
};

function soby_GetActiveDataGrid(): soby_WebGrid {
//    soby_RemoveNoneExistenceGrid();
    var activeGridID = $(".soby_grid.active:visible").attr("id");
    return soby_WebGrids[activeGridID];
}

function soby_GetAllGrids() {
//    soby_RemoveNoneExistenceGrid();
    var grids = new Array();
    for (var key in soby_WebGrids)
    {
        if ($(soby_WebGrids[key].ContentDivSelector + "[gridid='" + soby_WebGrids[key].GridID + "']").length == 0)
            continue;

        grids.push(soby_WebGrids[key]);
    }
    /*
    var keys = Object.keys(soby_WebGrids);
    var grids = new Array();
    for (var i = 0; i < keys.length; i++)
    {
        grids.push(soby_WebGrids[keys[i]]);
    }
    */

    return grids;
}

function soby_GetAllVisibleGrids()
{
 //   soby_RemoveNoneExistenceGrid();
    var visibleGridIDs = $(".soby_grid:visible")
    
    var grids = new Array();
    for (var i = 0; i < visibleGridIDs.length; i++)
    {
        var gridId = $(visibleGridIDs[i]).attr("id");
        grids.push(soby_WebGrids[gridId]);
    }

    return grids;
}

function soby_RefreshAllGrids() {
    var grids = soby_GetAllGrids();
    for (var x = 0; x < grids.length;x++) {
        grids[x].Initialize(true);
    }
}

class sobyActionPaneButtons extends Array<sobyActionPaneButton> {
    constructor(items?: Array<sobyActionPaneButton>) {
        super();

        if (items) {
            this.push(...items);
        }
        Object.setPrototypeOf(this, Object.create(sobyActionPaneButtons.prototype));
    }

    Clone(): sobyActionPaneButtons {
        var buttons: sobyActionPaneButtons = new sobyActionPaneButtons();
        for (var i = 0; i < buttons.length; i++) {
            buttons.AddButton(buttons[i].Clone());
        }

        return buttons;
    }

    AddButton(button:sobyActionPaneButton)
    {
        this.push(new sobyActionPaneButton(button.Key, button.Text, button.Index, button.ImageUrl, button.ClassName, button.Visible, button.OnClick, button.EnabilityFunction));
    }
    Add(key: string, text: string, index: number, imageUrl: string, className: string, visible: boolean, onClick: any, enabilityFunction:any)
    {
        this.push(new sobyActionPaneButton(key, text, index, imageUrl, className, visible, onClick, enabilityFunction));
    }
    AddCollection(buttons:sobyActionPaneButtons)
    {
        for (var i = 0; i < buttons.length; i++)
        {
            //this.splice(0, 0, buttons[i]);
            this.push(buttons[i]);
        }
    }

    Get(key: string)
    {
        for (var i = 0; i < this.length; i++)
        {
            if (this[i].Key.toLowerCase() == key.toLowerCase())
            {
                return this[i];
            }
        }
    }
    Hide(key: string)
    {
        this.Get(key).Hide();
    }
    Show(key: string)
    {
        this.Get(key).Show();
    }
}

class sobyActionPaneButton
{
    constructor(key: string, text: string, index: number, imageUrl: string, className: string, visible: boolean, onClick: any, enabilityFunction:any)
    {
        this.Key = key;
        this.Text = text;
        this.Index = index;
        this.ImageUrl = imageUrl;
        this.ClassName = className;
        this.OnClick = onClick;
        this.Visible = visible;
        this.EnabilityFunction = enabilityFunction;
    }

    Clone(): sobyActionPaneButton {
        var button: sobyActionPaneButton = new sobyActionPaneButton(this.Key, this.Text, this.Index, this.ImageUrl, this.ClassName, this.Visible, this.OnClick, this.EnabilityFunction);
        return button;
    }

    ID: string = "actionpanebutton_" + soby_guid();
    Key: string = "";
    Text: string = "";
    Index: number = null;
    ImageUrl: string = "";
    ClassName: string = "";
    Visible: boolean = true;
    OnClick: any = null;
    EnabilityFunction: any = null;

    Hide()
    {
        $("#" + this.ID).hide();
    }
    Show()
    {
        $("#" + this.ID).show();
    }
}

class sobyResponsiveCondition
{
    constructor(validateFunction: (width: number, height: number) => any)
    {
        this.ValidateFunction = validateFunction;
        this.ID = soby_guid();
    }
    ValidateFunction: (width: number, height: number) => boolean = null;
    Validate()
    {
        var width: number = $(window).width();
        var height: number = $(window).height();
        return this.ValidateFunction(width, height);
    }
    GetClassName(): string
    {
        return "responsivecondition_" + this.ID;
    }
    ID: string = null;
}

class SobyGridColumn
{
    constructor(fieldName: string, displayName: string, showFieldsOn: number, displayFunction: (item: any) => string, cellTemplate: any, sortable: boolean, filterable: boolean, editable: boolean, filterControl: ISobyEditControlInterface = null, cellCss: string, cellClassNames: string, responsiveConditionID: string)
    {
        this.FieldName = fieldName;
        this.DisplayName = displayName;
        this.ShowFieldsOn = showFieldsOn;
        this.DisplayFunction= displayFunction;
        this.CellTemplate= cellTemplate;
        this.Sortable = sortable;
        this.Filterable = filterable;
        this.Editable = editable;
        this.FilterControl = filterControl;
        this.CellCss = cellCss;
        this.CellClassNames = cellClassNames;
        this.ResponsiveConditionID = responsiveConditionID;
    }

    FieldName: string;
    DisplayName: string;
    ShowFieldsOn: number;
    DisplayFunction: (item: any, rowID: string, cellID: string) => string;
    CellTemplate: any;
    Sortable: boolean;
    Filterable: boolean;
    Editable: boolean;
    FilterControl: ISobyEditControlInterface = null;
    CellCss: string = "";
    CellClassNames: string ="";
    HeaderCss: string = "";
    HeaderClassNames: string = "";
    ResponsiveConditionID: string = null;
    IsVisible: boolean = true;
}


class soby_WebGrid implements ISobySelectorControlInterface
{
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
    private ActionInProgress:boolean = false;
    private NavigationActionInProgress: boolean = false;
    Active: boolean = false;
    AllowExportData = false;
    AllowMultipleSelections: boolean = true;
    GridID:string="";
    ThemeName: string = "classic";
    ThemeClassName: string = this.ThemeName;
    ContentDivSelector: string = "";
    ItemDialogClientID: string="";
    Title:string="";
    AltTitle: string = "";
    DisplayTitle:boolean = true;
    DataService: soby_ServiceInterface = null;
    EmptyDataHtml: string = "";
    NavigationInformation: SobyNavigationInformation = new SobyNavigationInformation();
    OrderByFields: SobyOrderByFields = new SobyOrderByFields();
    Filters: SobyFilters = new SobyFilters(false);
    FilterControls = new Array();
    GroupByFields: SobyGroupByFields = new SobyGroupByFields();
    AggregateFields: SobyAggregateFields = new SobyAggregateFields();
    ResponsiveConditions: Array<sobyResponsiveCondition> = new Array<sobyResponsiveCondition>();
    KeyFields: SobyKeyFields = new SobyKeyFields(); 
    CellCount: number = 0;
    DataRelations = new Array();
    Columns = new Array <SobyGridColumn>();
    InitializedActionPaneButtons: boolean = false;
    IsSelectable:boolean = true;
    IsAddAllowed: boolean = true;
    IsEditable: boolean = true;
    IsDeletable: boolean = true;
    IsGroupable: boolean = false;
    Items = null;
    ShowRefreshButton: boolean = true;
    ShowHeader: boolean = true;
    ImagesFolderUrl: string = "/_layouts/1033/images";
    ActionPaneButtons: sobyActionPaneButtons = new sobyActionPaneButtons();
    LastGroupByValues = new Array();
    TableTagName: string = "table";
    TBodyTagName: string = "tbody";
    THeadTagName: string = "thead";
    RowTagName: string = "tr";
    CellTagName: string = "td";
    TableAdditionalClassNames: string = "";
    RowAdditionalClassNames: string = "";
    CellAdditionalClassNames: string = "";


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
    ItemCreated = null;

    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridPopulated
     * @type {object}
     */
    OnGridPopulated = null;

    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridDataBeingParsed
     * @type {object}
     */
    OnGridDataBeingParsed = null;

    /**
     * Row selection event.
     *
     * @event soby_WebGrid#OnRowSelected
     * @type {object}
     */
    OnRowSelected = null;

    /**
     * Cell selection event.
     *
     * @event soby_WebGrid#OnCellSelected
     * @type {object}
     * @property {soby_WebGrid} grid - Current grid object.
     * @property {object} rowID - Identifier of the row.
     * @property {object} cellIndex - Index of the cell.
     */
    OnCellSelected = null;

    /**
     * Grid population event.
     *
     * @event soby_WebGrid#OnGridPopulated
     * @type {object}
     */
    OnCellTemplateContentPopulated = null;


    RowDetailDisplayFunction: (grid: soby_WebGrid, rowId: string, item: any) => string = null;
    RowDetailDisplayViewResponsiveCondition: sobyResponsiveCondition = null;
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
    constructor(contentDivSelector:string, title:string, dataService, emptyDataHtml:string) { 
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
    Clone(contentDivSelector: string): soby_WebGrid {
        var grid = new soby_WebGrid(contentDivSelector, this.Title, this.DataService, this.EmptyDataHtml);
        grid.AllowExportData = this.AllowExportData;
        grid.AllowMultipleSelections = this.AllowMultipleSelections;
        grid.ThemeName = this.ThemeName;
        grid.ThemeClassName = this.ThemeClassName;
        grid.ItemDialogClientID = this.ItemDialogClientID;
        grid.DisplayTitle = this.DisplayTitle;
        grid.NavigationInformation = this.NavigationInformation;
        grid.OrderByFields = this.OrderByFields;
        grid.Filters = this.Filters.Clone();
        grid.FilterControls = this.FilterControls;
        grid.GroupByFields = this.GroupByFields;
        grid.AggregateFields = this.AggregateFields;
        grid.ResponsiveConditions = this.ResponsiveConditions;
        grid.KeyFields = this.KeyFields
        grid.CellCount = this.CellCount;
        grid.DataRelations = this.DataRelations;
        grid.Columns = this.Columns;
        grid.IsSelectable = this.IsSelectable;
        grid.IsAddAllowed = this.IsAddAllowed;
        grid.IsEditable = this.IsEditable;
        grid.IsDeletable = this.IsDeletable;
        grid.IsGroupable = this.IsGroupable;
        grid.ShowRefreshButton = this.ShowRefreshButton;
        grid.ShowHeader = this.ShowHeader;
        grid.ImagesFolderUrl = this.ImagesFolderUrl;
        grid.ActionPaneButtons = this.ActionPaneButtons.Clone();
        grid.LastGroupByValues = this.LastGroupByValues;
        grid.TableTagName = this.TableTagName;
        grid.TBodyTagName = this.TBodyTagName;
        grid.THeadTagName = this.THeadTagName;
        grid.RowTagName = this.RowTagName;
        grid.CellTagName = this.CellTagName;
        grid.TableAdditionalClassNames = this.TableAdditionalClassNames;
        grid.RowAdditionalClassNames = this.RowAdditionalClassNames;
        grid.CellAdditionalClassNames = this.CellAdditionalClassNames;

        return grid;

    }

    GetResponsiveConditionById(id: string): sobyResponsiveCondition
    {
        for (var i = 0; i < this.ResponsiveConditions.length; i++)
        {
            if (this.ResponsiveConditions[i].ID == id)
            {
                return this.ResponsiveConditions[i];
            }
        }

        return null;
    }

    InitializeActionPaneButtons()
    {
        if (this.InitializedActionPaneButtons == true)
        {
            return;
        }

        var buttons: sobyActionPaneButtons = new sobyActionPaneButtons();

        buttons.Add("ExportToExcel", "Export item(s)", 0, this.ImagesFolderUrl + "/formatmap16x16.png?rev=43", "soby-icon-excel", true, function (grid)
        {
            grid.ExportToExcel()
        }, function (grid) { return grid.AllowExportData; });
        buttons.Add("Delete", "Delete item(s)", 1, this.ImagesFolderUrl + "/formatmap16x16.png?rev=43", "soby-list-delete", true,
            function (grid){
                grid.DeleteSelectedRows();
            }
            , function (grid){
                return (grid.IsDeletable == true && grid.GetSelectedRowIDs().length > 0);
            });
        buttons.Add("Edit", "Edit item(s)", 2, this.ImagesFolderUrl + "/formatmap16x16.png?rev=43", "soby-list-edit", true
            , function (grid){
                grid.EditSelectedRow();
            }
            , function (grid){
                return (grid.IsEditable == true && grid.GetSelectedRowIDs().length == 1);
            });
        buttons.Add("Refresh", "Refresh", 3, this.ImagesFolderUrl + "/formatmap16x16.png?rev=43", "soby-list-refresh", true
            , function (grid){
                grid.Initialize(true);
            }
            , function (grid){
                return (grid.ShowRefreshButton == true);
            });
        buttons.Add("Create", "New item", 4, this.ImagesFolderUrl + "/spcommon.png?rev=43", "soby-list-addnew", true
            , function (grid){
                grid.EditNewRow();
            }
            , function (grid){
                return (grid.IsAddAllowed == true);
            });
        this.ActionPaneButtons.AddCollection(buttons);
        this.InitializedActionPaneButtons = true;
    }
    
    /**
     * Ensures grid is in the global grid array.
     * 
     * @example
     * // Ensures grid is in the global grid array.
     * grid.EnsureGridExistency();
     */
    EnsureGridExistency() {
        for (var key in soby_WebGrids) {
            if (key == this.GridID)
            {
                return;
            }
        }

        soby_WebGrids[this.GridID] = this;
    }

    /**
     * Get the value of the given rowindex and fieldname.
     *
     * @rowIndex Index of the grid row.
     * @fieldName Name of the field.
     * @example
     * // Returns the value of Title field which is in row with index number 1.
     * grid.GetItemFieldValue(1, 'Title');
     */
    GetItemFieldValue(rowIndex: number, fieldName: string) {
        return this.Items[rowIndex][fieldName];
    }

    /**
     * Hides edit/new item form dialog.
     * @example
     * // Hides edit/new item form dialog.
     * grid.HideItemDialog();
     */
    HideItemDialog() {
        $("#" + this.ItemDialogClientID).hide();
    }

    /**
     * Ensures edit/new item form dialog exists in the body.
     * @example
     * // Ensures edit/new item form dialog exists in the body.
     * grid.EnsureItemDialogContainer(1, 'Title');
     */
    EnsureItemDialogContainer() {
        var dialog = $("#" + this.ItemDialogClientID);
        if (dialog.length == 0) {
            dialog = $("<div class='sobyitemdialog " + this.ThemeClassName + "'></div>");
            dialog.attr("id", this.ItemDialogClientID);
            $("body").append(dialog);
        }
        else {
            dialog.html("");
        }

        return dialog;
    }

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
    PopulateEditControlsOnNewEditForm(isEditForm: boolean, rowId: string) {
        var dialog = this.EnsureItemDialogContainer();
        var row = $("#" + rowId);
        var table = $("<table></table>");
        dialog.append(table);
        for (var i = 0; i < this.Columns.length; i++) {
            var column = this.Columns[i];
            if (column.Editable == false)
            {
                continue;
            }

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
            editControl.Initialized = function ()
            {
                if (isEditForm == true)
                {
                    var rowIndex = parseInt(row.attr("rowindex"));
                    var fieldValue = grid.GetItemFieldValue(rowIndex, column.FieldName);
                    editControl.SetValue(fieldValue);
                }
            };

            editControl.Initialize();
        }

        var actionPanel = $("<p align='right'></p>");
        var saveButton = $("<input type='button' value='Save' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SaveItemDetail(" + (isEditForm == true ? "'" + rowId + "'" : "null") + ")\">");
        var cancelButton = $("<input type='button' value='Cancel' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].HideItemDialog()\">");
        actionPanel.append(saveButton);
        actionPanel.append(cancelButton);
        dialog.append(actionPanel);

        if (isEditForm == false)
        {
            row = $(this.ContentDivSelector + " .actionpane");
        }

        var position = row.offset();
        dialog.css("top", position.top + 35);
        dialog.css("left", position.left + row.width() - row.width());
        dialog.show();
    }

    /**
     * Edits selected row.
     * @example
     * // Edits selected row.
     * grid.EditSelectedRow();
     */
    EditSelectedRow() {
        var selectedRowIDs = this.GetSelectedRowIDs();
        if (selectedRowIDs.length != 1)
        {
            return
        }

        var rowID = selectedRowIDs[0];
        this.PopulateEditControlsOnNewEditForm(true, rowID);
    }

    /**
     * Edits new row.
     * @example
     * // Edits new row.
     * grid.EditNewRow();
     */
    EditNewRow() {
        this.PopulateEditControlsOnNewEditForm(false, "");
    }

    /**
     * Saves currently edited item.
     *
     * @rowId Identifier of the row.
     * @example
     * // Saves edited item with row id as soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b.
     * grid.SaveItemDetail('soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b');
     */
    SaveItemDetail(rowId: string) {
        var dialog = $("#" + this.ItemDialogClientID);
        var dbInstance = {};
        var viewFields = this.DataService.DataSourceBuilder.SchemaFields;
        for (var i = 0; i < viewFields.length; i++) {
            dbInstance[viewFields[i].FieldName] = null;
            if (rowId != null && rowId != "") {
                var row = $("#" + rowId);
                var rowIndex = parseInt(row.attr("rowindex"));
                dbInstance[viewFields[i].FieldName] = this.Items[rowIndex][viewFields[i].FieldName];
            }
        }
        var dbInstanceIds = new Array();
        var parameterNames = new Array();
        for (var i = 0; i < this.KeyFields.length; i++) {
            dbInstanceIds.push(dbInstance[this.KeyFields[i].FieldName]);
            parameterNames.push(this.KeyFields[i].ParameterName);
        }

        for (var i = 0; i < this.Columns.length; i++) {
            var column = this.Columns[i];
            if (column.Editable == false)
            {
                for (var x = 0; x < this.KeyFields.length; x++) {
                    if (this.KeyFields[x].FieldName == column.FieldName) {
                        dbInstance[column.FieldName] = 0;
                    }
                }

                continue;
            }

            //var fieldType = column.FieldType;
            var cellId = this.GridID + "_fieldeditcell_" + column.FieldName;

//            var fieldOldValue = this.GetItemFieldValue(rowIndex, column.FieldName);
            var editControl = sobyEditControlFactory.GetEditControl(cellId);
            var fieldNewValue = editControl.GetValue();
            if (fieldNewValue != null && fieldNewValue.Value != null)
                fieldNewValue = fieldNewValue.Value;
            dbInstance[column.FieldName] = fieldNewValue;
        }

        if (rowId != null && rowId != "") {
            this.DataService.UpdateItem(parameterNames, dbInstanceIds, dbInstance);
        }
        else {
            //dbInstance[this.KeyFields[0]] = 0;
            this.DataService.AddItem(dbInstance);
        }
    }

     /**
     * Deletes selected rows.
     * @example
     * // Deletes selected rows
     * grid.DeleteSelectedRows();
     */
    DeleteSelectedRows() {
        if (confirm("Are you sure you want to delete the selected item(s)") == false)
        {
            return;
        }

        var selectedRowIDs = this.GetSelectedRowIDs();
        for (var i = 0; i < selectedRowIDs.length; i++) {
            var row = $("#" + selectedRowIDs[i]);
            var rowIndex = parseInt(row.attr("rowindex"));
            var dbInstance = this.Items[rowIndex];
            var keyValues = new Array();

            var dbInstanceIds = new Array();
            var parameterNames = new Array();
            for (var x = 0; x < this.KeyFields.length; x++) {
                dbInstanceIds.push(dbInstance[this.KeyFields[x].FieldName]);
                parameterNames.push(this.KeyFields[x].ParameterName);
            }

            this.DataService.DeleteItem(parameterNames, dbInstanceIds);
        }
    }

    /**
     * Not implemented yet.
     */
    EditOffOnEditedCells() {
        var editedCells = $(this.ContentDivSelector + " .edited");
        for (var i = 0; i < editedCells.length; i++) {
            var cellId = $(editedCells[i]).attr("id");
            this.EditOffCell(cellId);
        }
    }

    /**
     * Not implemented yet.
     */
    EditSelectedCell() {
        this.EditOffOnEditedCells();
        var cellId = this.GetSelectedCellID();
        this.EditCell(cellId);
    }

    /**
     * Not implemented yet.
     */
    EditOffCell(cellId) {
        $("#" + cellId).removeClass("edited");
        /*
        var textBox = new SobyTextBox(cellId, SobyFieldTypes.Text);
        textBox.Initialize();
        textBox.SetValue("Hasan");
        */
    }

     /**
     * Not implemented yet.
     */
    EditCell(cellId) {
        $("#" + cellId).addClass("edited");
        var columnIndex = parseInt($("#" + cellId).attr("columnindex"));
        //var fieldType = this.Columns[columnIndex].FieldType;
//        var editControl = sobyEditControlFactory.GetEditControl(cellId, fieldType);
//        editControl.Initialize();
//        editControl.SetValue("Hasan");
    }

    /**
     * Activates the grid.
     * @example
     * // Activates the grid
     * grid.Activate();
     */
    Activate() {
        $(this.ContentDivSelector + " .soby_grid").addClass("active")
        this.HideHeaderRowMenu(null);
    }

     /**
     * De-activates the grid.
     * @example
     * // De-Activates the grid
     * grid.Activate();
     */
    DeActivate() {
        $(this.ContentDivSelector + " .soby_grid").removeClass("active")
    }

    /**
     * Adds key field.
     *
     * @fieldName Name of the field.
     * @example
     * // Adds ID as key field
     * grid.AddKeyField("ID");
     */
    AddKeyField(fieldName: string, parameterName: string) {
        this.KeyFields.push(new SobyKeyField(fieldName, parameterName));
    }

     /**
     * Not implemented yet.
     */
    AddFilterControl(fieldName, displayName, fieldType) {
        this.FilterControls[this.FilterControls.length] = { FieldName: fieldName, DisplayName: displayName, FieldType: fieldType };
    }

    /**
     * Adds an aggregate field
     *
     * @fieldName Name of the field.
     * @aggregateType Type of the aggregate action.
     * @example
     * // Adds Sum of 'Price' field
     * grid.AddAggregateField("Price", SobyAggregateTypes.Sum);
     */
    AddAggregateField(fieldName:string, aggregateType: number) {
        this.AggregateFields.push(new SobyAggregateField(fieldName, aggregateType));
    }

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
    AddColumn(fieldName, displayName, showFieldsOn: number, displayFunction, cellTemplate, sortable, filterable, editable, filterControl, cellCss, cellClassNames, responsiveCondition?: sobyResponsiveCondition): SobyGridColumn
    {
        var responsiveConditionID = null;
        if (responsiveCondition != null)
        {
            responsiveConditionID = responsiveCondition.ID;
            var exists = false;
            for (var i = 0; i < this.ResponsiveConditions.length; i++)
            {
                if (this.ResponsiveConditions[i].ID == responsiveCondition.ID)
                {
                    exists = true;
                    break;
                }
            }

            if (exists == false)
            {
                this.ResponsiveConditions.push(responsiveCondition);
            }
        }

        var gridColumn = new SobyGridColumn(fieldName, displayName, showFieldsOn, displayFunction, cellTemplate, sortable, filterable, editable, filterControl, cellCss, cellClassNames, responsiveConditionID);
        this.Columns.push(gridColumn);
        return gridColumn;
    }

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
    AddDataRelation(masterFieldDisplayName, masterFieldValueName, detailGridID, detailFieldName) {
        this.DataRelations[this.DataRelations.length] = { MasterFieldDisplayName: masterFieldDisplayName, MasterFieldValueName: masterFieldValueName, DetailGridID: detailGridID, DetailFieldName: detailFieldName };
    }

    /**
     * Gets row identifiers
     * @example
     * // returns ["soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec", "soby_griddatarow_f0b7f7e8-6b89-accf-0446-88eda73e0bee"]
     * grid.GetRowIds()
     */
    GetRowIds() {
        var rowIds = new Array();
        var rowsSelectors = $(this.ContentDivSelector + " .soby_griddatarow");
        for (var i = 0; i < rowsSelectors.length; i++) {
            rowIds[rowIds.length] = $(rowsSelectors[i]).attr("id");
        }

        return rowIds;
    }

    GetRowIdByItemIndex(itemIndex)
    {
        var row = $(this.ContentDivSelector + " .soby_griddatarow[rowindex='" + itemIndex + "']");
        if (row != null)
        {
            return row.attr("id");
        }

        return null;
    }

    /**
     * Gets selected row identifier
     * @example
     * // returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
     * grid.GetSelectedRowID()
     */
    GetSelectedRowID() {
        var selectedRow = $(this.ContentDivSelector + " .soby_griddatarow.selected");
        if (selectedRow.length > 0)
        {
            return selectedRow.attr("id");
        }

        return $(this.ContentDivSelector + " .soby_griddatarow").attr("id");
    }

    /**
     * Gets active row identifier
     * @example
     * // returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
     * grid.GetActiveRowID()
     */
    GetActiveRowID() {
        var activeRow = $(this.ContentDivSelector + " .soby_griddatarow.active");
        if (activeRow.length > 0)
        {
            return activeRow.attr("id");
        }

        return null;
    }

    /**
     * Gets row identifiers
     * @example
     * // returns ["soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec", "soby_griddatarow_f0b7f7e8-6b89-accf-0446-88eda73e0bee"]
     * grid.GetRowIds()
     */
    GetSelectedCellIds()
    {
        var cellIds = new Array();
        var cellsSelectors = $(this.ContentDivSelector + " .soby_gridcell.selected");
        for (var i = 0; i < cellsSelectors.length; i++)
        {
            cellIds[cellIds.length] = $(cellsSelectors[i]).attr("id");
        }

        return cellIds;
    }

    /**
     * Gets selected cell identifier
     * @example
     * // returns "soby_gridcell_8be81bcb-ae80-5309-3d8a-6ad091c01051"
     * grid.GetSelectedCellID();
     */
    GetSelectedCellID() {
        var selectedCell = $(this.ContentDivSelector + " .soby_gridcell.selected");
        if (selectedCell.length > 0)
        {
            return selectedCell.attr("id");
        }

        return $(this.ContentDivSelector + " .soby_gridcell").attr("id");
    }

    /**
     * Gets grid column by field name
     * @example
     * // returns Column object for given fieldname
     * grid.GetColumn('Title');
     */
    GetColumn(fieldName) {
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.Columns[i].FieldName == fieldName)
            {
                return this.Columns[i];
            }
        }

        return null;
    }

    /**
     * Gets selected row identifiers
     * @example
     * // returns ["soby_griddatarow_fa5a2dd6-fc2a-d61b-5b9f-4e6e0824ce11", "soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c"]
     * grid.GetSelectedRowIDs();
     */
    GetSelectedRowIDs() {
        var selectedRows = $(this.ContentDivSelector + " .soby_griddatarow.selected");
        var selectedRowIDs = new Array();
        for (var i = 0; i < selectedRows.length; i++) {
            selectedRowIDs[selectedRowIDs.length] = $(selectedRows[i]).attr("id")
        }

        return selectedRowIDs;
    }

    /**
     * Gets selected data items
     * @example
     * // returns [Object, Object]
     * grid.GetSelectedDataItems();
     */
    GetSelectedDataItems() {
        var selectedRows = $(this.ContentDivSelector + " .soby_griddatarow.selected");
        var selectedDataItems = new Array();
        for (var i = 0; i < selectedRows.length; i++) {
            var itemIndex = $(selectedRows[i]).attr("rowindex")
            selectedDataItems[selectedDataItems.length] = this.Items[itemIndex];
        }

        return selectedDataItems;
    }

    SelectAllRows() {
        var isSelected = $(".soby_gridheaderrow").hasClass("selected");
        if (isSelected == true) {
            $(".soby_gridheaderrow").removeClass("selected");
        }
        else {
            $(".soby_gridheaderrow").addClass("selected");
        }
        var rowsSelectors = $(this.ContentDivSelector + " .soby_griddatarow");
        for (var i = 0; i < rowsSelectors.length; i++) {
            if (isSelected == false) {
                var rowId = $(rowsSelectors[i]).attr("id");
                $(rowsSelectors[i]).addClass("selected");
                if (this.OnRowSelected != null)
                {
                    this.OnRowSelected(this, rowId);
                }
            }
            else {
                $(rowsSelectors[i]).removeClass("selected");
            }
        }
        this.SetActionPaneButtonsVisibility();
    }

    /**
     * Selects the row
     *
     * @rowID Identifier of the row.
     * @example
     * // Selects the row with given row identifier
     * grid.SelectRow("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c");
     */
    SelectRow(rowID) {
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
        else if (this.AllowMultipleSelections == true && soby_IsCtrlOnHold == true) {
            $("#" + rowID).addClass("selected");
        }
        else {
            $(this.ContentDivSelector + " .soby_griddatarow").removeClass("selected");
            $("#" + rowID).addClass("selected");
        }

        this.GenerateActionPane();
        if ($(".soby_griddetailrow[mainrowid = '" + rowID + "'] .soby_gridtabheaderpanel").html() != "")
        {
            this.SelectDetailGridTab(rowID, 0);
        }

        if (this.OnRowSelected != null)
        {
            this.OnRowSelected(this, rowID);
        }

        this.SetActionPaneButtonsVisibility();
    }

    /**
     * Selects the row
     *
     * @rowIndex Index of the row.
     * @example
     * // Selects the row with given row index
     * grid.SelectRow(1);
     */
    SelectRowByIndex(rowIndex) {
        var rowId = $("#soby_BooksDiv .soby_griddatarow:eq(" + rowIndex + ")").attr("id");
        this.SelectRow(rowId);
    }

    /**
     * Selects the cell
     *
     * @rowID Identifier of the row.
     * @cellIndex Index of the cell.
     * @example
     * // Selects the cell with given row identifier and cell index
     * grid.SelectCell("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c", 3);
     */
    SelectCell(rowID, cellIndex) {
        $(this.ContentDivSelector + " .soby_griddatarow").removeClass("active");
        $(this.ContentDivSelector + " .soby_gridcell").removeClass("selected");
        $("#" + rowID + " td[cellindex='" + cellIndex + "']").addClass("selected");
        $("#" + rowID).addClass("active");

        //this.SelectDetailGridTab(rowID, 0);
        if (this.OnCellSelected != null)
        {
            this.OnCellSelected(this, rowID, cellIndex);
        }

        this.SetActionPaneButtonsVisibility();
    }

    /**
     * Hides/show filter pane
     * @example
     * // Hides/show filter pane
     * grid.HideShowFilterPane();
     */
    HideShowFilterPane() {
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
    }

    /**
     * Generates filter pane
     * @example
     * // Generates filter pane
     * grid.GenerateFilterPane();
     */
    GenerateFilterPane() {
        var filterPane = $(this.ContentDivSelector + " .filterpane");
        if (this.FilterControls.length == 0) {
            filterPane.hide();
            filterPane.parent().hide();
            return;
        }
        var filterPaneContainer = $("<div></div>")
        var filterPaneHeading = $("<div><a href='javascript:void(0)' class='showhidebutton' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].HideShowFilterPane()\" style='text-decoration: inherit;'>^</a></div>")
        var filterPaneTableContainer = $("<div class='filterpanetable'></div>")
        var table = $("<table></table>")
        for (var i = 0; i < this.FilterControls.length; i++) {
            var row = $("<tr></tr>")
            var cell1 = $("<td></td>")
            var cell2 = $("<td></td>")

            cell1.html(this.FilterControls[i].DisplayName);
            cell2.html("<input type='text'>");

            row.append(cell1);
            row.append(cell2);
            table.append(row);
        }
        filterPaneTableContainer.append(table)
        filterPaneContainer.append(filterPaneTableContainer);

        filterPane.html("");
        filterPane.append(filterPaneHeading);
        filterPane.append(filterPaneContainer);
    }

    /**
     * Allows drop column
     */
    AllowDropColumn(ev) {
        ev.preventDefault();
    }

    /**
     * Drags column via setting its field name
     *
     * @ev Drag Event.
     * @fieldName Name of the field.
     */
    DragColumn(ev, fieldName) {
        ev.dataTransfer.setData("text", fieldName);
    }

    /**
     * Drops the column
     *
     * @ev Drag Event.
     */
    DropColumn(ev) {
        ev.preventDefault();
        var fieldName = ev.dataTransfer.getData("text");
        this.GroupBy(fieldName, true, null);
    }

    /**
     * Drops group by column
     *
     * @ev Drag Event.
     */
    DropGroupByColumn(ev) {
        var fieldName = ev.dataTransfer.getData("text");
        var newGroupByFields = new SobyGroupByFields();
        for (var i = 0; i < this.GroupByFields.length; i++) {
            if (this.GroupByFields[i].FieldName != fieldName) {
                newGroupByFields.push(this.GroupByFields[i]);
            }
        }

        this.GroupByFields = newGroupByFields;
        this.DataService.GroupBy(this.GroupByFields);
    }

    ExportToExcel() {
        var dataText = "";
        var rows = $(this.ContentDivSelector + " .soby_griddatarow");
        for (var i = 0; i < rows.length; i++) {
            var cells = $(rows[i]).find(".soby_gridcell");
            for (var x = 0; x < cells.length; x++) {
                dataText += $(cells[x]).text();
                if (x < cells.length - 1)
                {
                    dataText += "\t";
                }
            }

            if (i < rows.length - 1)
            {
                dataText += "\n";
            }
        }
        $(this.ContentDivSelector + " .tempdatadiv").text(dataText);
        var element: HTMLTextAreaElement = <HTMLTextAreaElement > $(this.ContentDivSelector + " .tempdatadiv")[0];
        var result = this.CopyToClipboard(element);
        alert("It has been transferred to clipboard. You can paste into excel now.")
    }

    CopyToClipboard(elem:HTMLTextAreaElement) {
        // create hidden text element, if it doesn't already exist
        var targetId = "_hiddenCopyText_";
        var target: HTMLTextAreaElement = null;
        var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
        var origSelectionStart, origSelectionEnd;
        if (isInput) {
            // can just use the original source element for the selection and copy
            target = elem;
            origSelectionStart = elem.selectionStart;
            origSelectionEnd = elem.selectionEnd;
        } else {
            // must use a temporary form element for the selection and copy
            target = <HTMLTextAreaElement>document.getElementById(targetId);
            if (!target) {
                target = document.createElement("textarea");
                target.style.position = "absolute";
                target.style.left = "-9999px";
                target.style.top = "0";
                target.id = targetId;
                document.body.appendChild(target);
            }
            target.textContent = elem.textContent;
        }
        // select the content
        var currentFocus = document.activeElement;
        target.focus();
        target.setSelectionRange(0, target.value.length);
    
        // copy the selection
        var succeed;
        try {
            succeed = document.execCommand("copy");
        } catch (e) {
            succeed = false;
        }

        // restore original focus
        //if (currentFocus && typeof currentFocus.focus === "function") {
        //    currentFocus.focus();
        //}

        if (isInput) {
            // restore prior selection
            elem.setSelectionRange(origSelectionStart, origSelectionEnd);
        } else {
            // clear temporary content
            target.textContent = "";
        }
        return succeed;
    }

    /**
     * Generates group by pane
     * @example
     * // Generates filter pane
     * grid.GenerateGroupByPanePane();
     */
    GenerateGroupByPanePane() {
        var groupByPaneContainer = $(this.ContentDivSelector + " .groupbypane");
        groupByPaneContainer.html("");
        if (this.IsGroupable == false) {
            $(this.ContentDivSelector + " .groupbypanerow").hide();
            return;
        }
        groupByPaneContainer.attr("ondragover", "soby_WebGrids['" + this.GridID + "'].AllowDropColumn(event)")
        groupByPaneContainer.attr("ondrop", "soby_WebGrids['" + this.GridID + "'].DropColumn(event)")

        var container = $("<div>Drag a column header here to group by that column</div>");
        if (this.GroupByFields.length > 0)
        {
            container.html("");
        }

        for (var i = 0; i < this.GroupByFields.length; i++) {
            var groupByContainer = $("<div class='soby-groupby-heading'></div>");
            var displayName = "";
            for (var b = 0; b < this.Columns.length; b++) {
                if (this.Columns[b].FieldName.toLowerCase() == this.GroupByFields[i].FieldName.toLowerCase())
                {
                    displayName = this.Columns[b].DisplayName;
                }
            }
            
            var sortLink = $("<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SortGroupByField('" + this.GroupByFields[i].FieldName + "', true)\">" + displayName + "<img border='0' alt= 'Sort Ascending' src= '" + this.ImagesFolderUrl + "/rsort.gif' ></a>");
            if (this.GroupByFields[i].IsAsc == true)
            {
                sortLink = $("<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SortGroupByField('" + this.GroupByFields[i].FieldName + "', false)\">" + displayName + "<img border='0' alt= 'Sort Ascending' src= '" + this.ImagesFolderUrl + "/sort.gif' ></a>");
            }

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
    }

    SetActionPaneButtonsVisibility()
    {
        var hasVisibleButton = false;
        for (var i = 0; i < this.ActionPaneButtons.length; i++)
        {
            var actionPaneButton = this.ActionPaneButtons[i];
            var isEnable = actionPaneButton.EnabilityFunction(this);
            if (isEnable == true)
            {
                actionPaneButton.Show();
                hasVisibleButton = true;
            }
            else
            {
                actionPaneButton.Hide();
            }
        }

        var actionpanerow = $(this.ContentDivSelector + " .actionpanerow");
        if (hasVisibleButton == true)
        {
            actionpanerow.show();
        }
        else
        {
            actionpanerow.hide();
        }
    }

    /**
     * Generates action pane
     * @example
     * // Generates action pane
     * grid.GenerateActionPane();
     */
    GenerateActionPane()
    {
        var actionPaneContainer = $(this.ContentDivSelector + " .actionpane");
        if (actionPaneContainer.hasClass("isloaded") == true)
        {
            return;
        }

        actionPaneContainer.html("");
        for (var i = 0; i < this.ActionPaneButtons.length; i++)
        {
            var actionPaneButton = this.ActionPaneButtons[i];
            var link = $("<a href='javascript:void(0)'>" +
                ((actionPaneButton.ImageUrl != "" && actionPaneButton.ImageUrl != null)?"<span class='soby-icon-imgSpan' > <img class='" + actionPaneButton.ClassName + " soby-icon-img' src= '" + actionPaneButton.ImageUrl + "' > </span>":"") +
                "<span>" + actionPaneButton.Text + "</span> </a>");
            link.attr("id", actionPaneButton.ID);
            link.attr("key", actionPaneButton.Key);
            link.attr("gridid", this.GridID);
            link.click(function ()
            {
                var key = $(this).attr("key");
                var gridId = $(this).attr("gridid");
                var grid = soby_WebGrids[gridId];
                var actionPaneButton = grid.ActionPaneButtons.Get(key);
                if (actionPaneButton.OnClick != null)
                {
                    actionPaneButton.OnClick(grid);
                }
            });
            actionPaneContainer.append(link);
        }
    }

    /**
     * Generates navigation pane
     * @example
     * // Generates navigation pane
     * grid.GenerateNavigationPane();
     */
    GenerateNavigationPane() {
        var navigationPane = $(this.ContentDivSelector + " .navigationpane");
        if (this.DataService.CanNavigateToNextPage() == false && this.DataService.CanNavigateToPreviousPage() == false)
        {
            navigationPane.hide();
            return "";
        }

        navigationPane.show();
        var tableStyle = "margin:auto";
        if (this.NavigationInformation.VerticalAlign == SobyPaginationVerticalAlign.Left)
        {
            tableStyle = "margin:0px";
        }
        else if (this.NavigationInformation.VerticalAlign == SobyPaginationVerticalAlign.Right)
        {
            tableStyle = "margin:0px;float:right";
        }

        navigationPane.html("<table style='" + tableStyle + "'><tbody><tr> \
							  " + (this.DataService.CanNavigateToPreviousPage() == true ? "<td><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].GoToPreviousPage()\"><img src='" + this.ImagesFolderUrl + "/prev.gif' border='0' alt='Previous' style='vertical-align: middle;'></a></td>" : "") + " \
							  <td class='ms-paging'>" + this.DataService.StartIndex + " - " + this.DataService.EndIndex + "</td> \
							  " + (this.DataService.CanNavigateToNextPage() == true ? "<td><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].GoToNextPage()\"><img src='" + this.ImagesFolderUrl + "/next.gif' border='0' alt='Next' style='vertical-align: middle;'></a></td>" : "") + " \
							  </tr></tbody></table>");
    }

    /**
     * Navigates to the next page
     * @example
     * // Navigates to the next page
     * grid.GoToNextPage();
     */
    GoToNextPage()
    {
        this.NavigationActionInProgress = true;
        this.NavigationInformation.PageIndex = this.NavigationInformation.PageIndex + 1;
        this.DataService.GoToPage(this.NavigationInformation.PageIndex);
    }

    /**
     * Navigates to the previous page
     * @example
     * // Navigates to the previous page
     * grid.GoToPreviousPage();
     */
    GoToPreviousPage() {
        this.NavigationActionInProgress = true;
        this.NavigationInformation.PageIndex = this.NavigationInformation.PageIndex - 1;
        this.DataService.GoToPage(this.NavigationInformation.PageIndex);
    }

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
    PopulateDetailGrid(detailGridIDs, contentDivSelectors, mainRowId, fieldNames, values)
    {
        $(this.ContentDivSelector + " tr[id!='" + mainRowId + "'] .soby-list-hiderelateddata").removeClass("soby-list-hiderelateddata").addClass("soby-list-showrelateddata")

        if ($(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell:visible").length > 0) {
            $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").hide();
            $("#" + mainRowId + " .soby-list-hiderelateddata").removeClass("soby-list-hiderelateddata").addClass("soby-list-showrelateddata")
        }
        else {
            var detailGridIdArray = detailGridIDs.split(soby_FilterValueSeperator);
            var detailGridContainerIdArray = contentDivSelectors.split(soby_FilterValueSeperator);
            var detailFieldNameArray = fieldNames.split(soby_FilterValueSeperator);
            var valuesForDetailGridArray = values.split(soby_FilterValueSeperator);
            $(this.ContentDivSelector + " .detailgridcell").hide();
            $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").show();
            $("#" + mainRowId + " .soby-list-showrelateddata").removeClass("soby-list-showrelateddata").addClass("soby-list-hiderelateddata")
            var isloaded = $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").attr("data-isloaded");
            if (isloaded == "1") {
                return;
            }
            if (detailGridIDs == null || detailGridIDs == "")
            {
                return;
            }

            for (var i = 0; i < detailGridIdArray.length; i++)
            {
                var detailGridID = detailGridIdArray[i];
                //rowID + "_" + dataRelation.DetailGridID
                var contentDivSelector = detailGridContainerIdArray[i];
                var fieldName = detailFieldNameArray[i];
                var value = valuesForDetailGridArray[i];
                var grid = soby_WebGrids[detailGridID].Clone(contentDivSelector);

                //soby_WebGrids[detailGridID].ContentDivSelector = contentDivSelector;
                grid.Initialize(false);
                var viewField = grid.DataService.DataSourceBuilder.GetViewFieldByPropertyName(fieldName);
                var fieldType = viewField.FieldType;
                if (fieldType == SobyFieldTypes.Lookup) {
                    if (viewField.Args.ValueFieldType != null) {
                        fieldType = viewField.Args.ValueFieldType;
                    }
                }
                grid.Filters.Clear();
                grid.FilterResult(fieldName, value, fieldType, SobyFilterTypes.Equal, false);
            }
            $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").attr("data-isloaded", "1");

        }
    }

    /**
     * Selects the detail grid tab
     *
     * @rowid Identifier of the row.
     * @index Index of the tab.
     * @example
     * // Populates the detail grid
     * grid.SelectDetailGridTab('soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0', '0');
     */
    SelectDetailGridTab(rowid, index) {
        var rowSelector = $("tr[mainrowid='" + rowid + "']");
        rowSelector.find(".soby_tabheader").removeClass("active");
        rowSelector.find(".soby_tabheader[index='" + index + "']").addClass("active");
        rowSelector.find(".soby_tabcontent").hide();
        rowSelector.find(".soby_tabcontent[index='" + index + "']").show();
        $(this.ContentDivSelector + " .detailgridcell").hide();
        rowSelector.find(".detailgridcell").show();
    }

    /**
     * Shows cell poup content
     *
     * @cellID Identifier of the cell.
     * @example
     * // Shows cell poup content
     * grid.ShowCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')
     */
    ShowCellPopupContent(cellID: string, columnIndex: number, dataItemIndex: number)
    {
        this.PopulateCellTemplateContent(cellID, columnIndex, dataItemIndex);
        if (this.OnCellTemplateContentPopulated != null)
        {
            this.OnCellTemplateContentPopulated(cellID, columnIndex, dataItemIndex);
        }

        $(this.ContentDivSelector + " .popup_content").hide();
        var cell = $("#" + cellID);
        var windowWidth = $(window).width() / 4;
        var windowHeight = $(window).height() / 4;
        var left = cell.position().left + 40;
        cell.find(".popup_content").css("left", left + "px");
        cell.find(".popup_content").css("width", windowWidth + "px");
        cell.find(".popup_content").css("height", windowHeight + "px");
        cell.find(".popup_content").show();
    }

    /**
     * Hides cell poup content
     *
     * @cellID Identifier of the cell.
     * @example
     * // Hides cell poup content
     * grid.HideCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')
     */
    HideCellPopupContent(cellID) {
        $("#" + cellID + " .popup_content").hide();
    }

    /**
     * Clear filters on given field name
     *
     * @fieldName Name of the field.
     * @example
     * // Clear filters on given field name
     * grid.ClearFiltersOn('Title')
     */
    ClearFiltersOn(fieldName) {
        var newFilters = new Array();
        for (var i = 0; i < this.Filters.Filters.length; i++) {
            if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction == false || this.Filters.Filters[i].FieldName != fieldName) {
                newFilters[newFilters.length] = this.Filters.Filters[i];
            }
        }
        this.Filters.Filters = newFilters;
        this.HideHeaderRowMenu(fieldName);
        this.DataService.Filter(this.Filters, true);
    }

    AddFilterField(fieldName: string, filterValue: string, fieldType: number, filterType: number, shouldBeClearedOnUIFilterAction: boolean)
    {
        this.Filters.AddFilter(fieldName, filterValue, fieldType, filterType, false, shouldBeClearedOnUIFilterAction);
    }

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
    FilterResult(fieldName, value, fieldType, filterType, shouldBeClearedOnUIFilterAction: boolean) {
        this.HideHeaderRowMenu(null);
        this.ClearUIFilters();
        //this.Filters = new SobyFilters(false);
        this.AddFilterField(fieldName, value, fieldType, filterType, shouldBeClearedOnUIFilterAction);
//        this.Filters[this.Filters.length] = { FieldName: fieldName, Value: value, FieldType: SobyFieldTypes.Text, FilterType: SobyFilterTypes.Contains }
        this.DataService.Filter(this.Filters, true);
    }

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
    FilterResultWithMultipleValues(fieldName, values, fieldType, filterType, shouldBeClearedOnUIFilterAction: boolean)
    {
        soby_LogMessage(values)
        this.HideHeaderRowMenu(null);
//        if (shouldBeClearedOnUIFilterAction == true)
//            this.Filters = new SobyFilters(false);
        var filters = new SobyFilters(true);
        this.ClearUIFilters();
        if (values.length > 0)
        {
            for (var i = 0; i < values.length; i++)
            {
                if (values[i] != "" && values[i] != null)
                {
                    var filterValue = values[i].Value;
                    if (filterValue == null)
                    {
                        filterValue = values[i];
                    }

                    filters.AddFilter(fieldName, filterValue, fieldType, filterType, false, shouldBeClearedOnUIFilterAction);
                    //this.Filters.AddFilter(fieldName, filterValue, fieldType, filterType, false, shouldBeClearedOnUIFilterAction);
                }
            }
            this.Filters.AddFilterCollection(filters);
        }
        this.DataService.Filter(this.Filters, true);
    }

    ClearUIFilters()
    {
        var newFilters = new Array();
        for (var i = this.Filters.Filters.length - 1; i > -1; i--)
        {
            if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction == false)
            {
                newFilters[newFilters.length] = this.Filters.Filters[i];
            }
        }
        this.Filters.Filters = newFilters;
    }

    /**
     * Sorts result based on given group by field name
     *
     * @sortFieldName Name of the field to be sorted.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Sorts by Title group field as ascending
     * grid.SortGroupByField('Title', true)
     */
    SortGroupByField(sortFieldName:string, isAsc:boolean) {
        this.HideHeaderRowMenu(null);
        for (var i = 0; i < this.GroupByFields.length; i++) {
            if (this.GroupByFields[i].FieldName.toLowerCase() == sortFieldName.toLowerCase())
            {
                this.GroupByFields[i].IsAsc = isAsc;
            }
        }
        this.DataService.GroupBy(this.GroupByFields);
    }

    AddOrderByField(fieldName: string, isAsc: boolean) {
        var exist = false;
        for (var i = 0; i < this.OrderByFields.length; i++) {
            if (this.OrderByFields[i].FieldName == fieldName) {
                exist = true;
            }
        }

        if (exist == true)
        {
            return;
        }

        this.OrderByFields.push(new SobyOrderByField(fieldName, isAsc));
    }

    /**
     * Sorts result based on given field name
     *
     * @sortFieldName Name of the field to be sorted.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Sorts by Title field as ascending
     * grid.SortResult('Title', true)
     */
    SortResult(sortFieldName, isAsc) {
        this.HideHeaderRowMenu(null);
        this.OrderByFields = new SobyOrderByFields();
        this.AddOrderByField(sortFieldName, isAsc);
        this.DataService.Sort(this.OrderByFields);
    }

    AddGroupByField(fieldName: string, isAsc: boolean, displayFunction) {
        var exist = false;
        for (var i = 0; i < this.GroupByFields.length; i++) {
            if (this.GroupByFields[i].FieldName == fieldName) {
                exist = true;
            }
        }

        if (exist == true)
        {
            return;
        }

        this.GroupByFields.push(new SobyGroupByField(fieldName, isAsc, displayFunction));
    }

    /**
     * Groups result based on given field name
     *
     * @fieldName Name of the field.
     * @isAsc States whether it is ascending or descending.
     * @example
     * // Group by Title field as ascending
     * grid.GroupBy('Title', true)
     */
    GroupBy(fieldName: string, isAsc: boolean, displayFunction) {
        this.AddGroupByField(fieldName, isAsc, displayFunction);
        this.DataService.GroupBy(this.GroupByFields);
    }

    /**
     * Aggregates result based on given field name
     *
     * @fieldName Name of the field.
     * @aggregateType Type of the aggregation.
     * @example
     * // Aggregate by Price field as sum
     * grid.AggregateBy("Price", SobyAggregateTypes.Sum)
     */
    AggregateBy(fieldName: string, aggregateType: number) {
        this.AddAggregateField(fieldName, aggregateType);
        this.DataService.PopulateItems(null);
    }

    /**
     * Adds a header cell
     *
     * @headerRow Row of the header.
     * @column Column of the header.
     * @dataRelation Data relation of the column.
     */
    AddHeaderCell(headerRow, column, dataRelation) {
        var fieldName = "";
        var displayName = "";
        var responsiveConditionId = "";
        var sortable = false;
        var filterable = false;

        if (column != null) {
            fieldName = column.FieldName;
            displayName = column.DisplayName;
            responsiveConditionId = column.ResponsiveConditionID;
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
            if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction == true && this.Filters.Filters[i].FieldName == fieldName)
            {
                hasFilterIconHtml = "<img src='" + this.ImagesFolderUrl + "/filter.gif' border='0'>";
            }
        }

        var headerCell = $("<th style='padding:5px;' nowrap='nowrap' scope='col' class='ms-vh2 soby_gridheadercell' fieldName='" + fieldName + "'></th>")
        if (responsiveConditionId != null && responsiveConditionId != "")
        {
            headerCell.addClass(this.GetResponsiveConditionById(responsiveConditionId).GetClassName());
        }

        if (column.HeaderCss != null && column.HeaderCss != "") {
            var cssValues = column.HeaderCss.split(";");
            for (var d = 0; d < cssValues.length; d++) {
                var cssName = cssValues[d].split(":")[0];
                var cssValue = cssValues[d].split(":")[1];
                headerCell.css(cssName, cssValue);
            }
        }

        if (column.HeaderClassNames != null && column.HeaderClassNames != "") {
            headerCell.addClass(column.HeaderClassNames);
        }

        var headerOnClick = "";
        var headerLink = null;
        var container = $("<div style='width:100%'></div>");
        var sortCell = $("<div style='float:left;'></div>");
        var filterCell = $("<div style='width:10px;float:right;display:none' class='headerrowmenuiconcontainer'><a href='javascript:void(0)' class='openmenulink'><img src='" + this.ImagesFolderUrl + "/ecbarw.png' alt='Open Menu'></a></div>");
        container.append(sortCell);
        container.append(filterCell);

        if (this.IsGroupable == true) {
            sortCell.attr("draggable", "true");
            sortCell.attr("ondragstart", "soby_WebGrids['" + this.GridID + "'].DragColumn(event, '" + fieldName + "')");
        }

        if (sortable == true || filterable == true)
        {
            headerCell.addClass("showmenu")
        }
        else
        {
            headerCell.addClass("hidemenu")
        }

        var grid = this;
        if (sortable == false && filterable == false)
        {
            headerOnClick = "";
            sortCell.html(displayName);
        }
        else if (this.OrderByFields.ContainsField(fieldName) == true)
        {
            if (this.OrderByFields.ContainsFieldAsAsc(fieldName) == true)
            {
                headerLink = $("<a href='javascript:void(0)' class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + " <img border='0' alt='Sort Ascending' src='" + this.ImagesFolderUrl + "/sort.gif'></a>");
                headerLink.click(function ()
                {
                    if (sortable == true)
                    {
                        grid.SortResult(fieldName, false);
                    }
                    else if (filterable == true)
                    {
                        grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
                    }
                });
                //    headerLink = $("<span></span>").html(displayName + hasFilterIconHtml);
                sortCell.html(headerLink);
            }
            else {
                headerLink = $("<a href='javascript:void(0)' class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + " <img border='0' alt='Sort Descending' src='" + this.ImagesFolderUrl + "/rsort.gif'></a>");
                headerLink.click(function ()
                {
                    if (sortable == true)
                    {
                        grid.SortResult(fieldName, true);
                    }
                    else if (filterable == true)
                    {
                        grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
                    }
                });
                //if (sortable == false)
                //    headerLink = $("<span></span>").html(displayName + hasFilterIconHtml);
                sortCell.html(headerLink);
            }
        }
        else {
            headerLink = $("<a href='javascript:void(0)' class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + "</a>");
            headerLink.click(function ()
            {
                if (sortable == true)
                {
                    grid.SortResult(fieldName, true);
                }
                else if (filterable == true)
                {
                    grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
                }
            });

            //if (sortable == false)
            //    headerLink = $("<span></span>").html(displayName + hasFilterIconHtml);
            sortCell.html(headerLink);
        }
        var grid = this;
        if (headerLink != null)
        {
            headerLink.focus(function ()
            {
                grid.ShowHeaderRowMenuIcon(fieldName);
            });
        }

        filterCell.find("a.openmenulink").click(function ()
        {
            grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
        });

        headerCell.append(container);
        headerRow.append(headerCell);
        headerCell.mouseover(function ()
        {
            grid.ShowHeaderRowMenuIcon(fieldName);
        });
        headerCell.mouseout(function ()
        {
            grid.HideHeaderRowMenuIcon(fieldName);
        });
    }

    ApplyResponsiveElementsVisibility()
    {
        for (var i = 0; i < this.ResponsiveConditions.length; i++)
        {
            var responsiveCondition = this.ResponsiveConditions[i];
            var isVisible = responsiveCondition.Validate();
            if (isVisible == true)
            {
                $(this.ContentDivSelector + " ." + responsiveCondition.GetClassName()).show();
            }
            else
            {
                $(this.ContentDivSelector + " ." + responsiveCondition.GetClassName()).hide();
            }
        }
    }

    /**
     * Populates header cells
     * @example
     * // Populates header cells
     * grid.PopulateHeaderCells()
     */
     PopulateHeaderCells() {
        var headerRow = $(this.ContentDivSelector + " .soby_gridheaderrow");
        headerRow.attr("ondragover", "soby_WebGrids['" + this.GridID + "'].AllowDropColumn(event)")
        headerRow.attr("ondrop", "soby_WebGrids['" + this.GridID + "'].DropGroupByColumn(event)")

         headerRow.find("th").remove();
         var hasSelectionCell = false;
         if (this.IsSelectable == true || this.DataRelations.length > 0 || this.RowDetailDisplayFunction != null) {
             hasSelectionCell = true;
             var headerCell = $("<th class='soby_gridheadercell soby_selectitemcell' width='20px' style='padding:5px;text-align:center'></th>");
             if (this.IsSelectable == true) {
                 headerCell.html("<a href='javascript:void (0)' class='soby-list-selectitem-a' onclick=\"soby_WebGrids['" + this.GridID + "'].SelectAllRows();\"><span class='soby-icon-imgSpan soby-list-selectitem-span'> <img class='soby-icon-img soby-list-selectitem' alt='' src='" + this.ImagesFolderUrl + "/spcommon.png?rev=43'> </span></a>");
             }

             headerRow.append(headerCell);

             if (this.IsSelectable == false && this.DataRelations.length == 0 && this.GroupByFields.length == 0 && this.RowDetailDisplayFunction != null) {
                 headerCell.addClass(this.RowDetailDisplayViewResponsiveCondition.GetClassName());
             }
         }

         /*
         if (
             (hasSelectionCell == false && this.GroupByFields.length > 0)
             || (hasSelectionCell == true && this.GroupByFields.length > 1)
         ) {
         */
         if (this.GroupByFields.length > 1) {
             var headerCellForGroupBy = $("<th class='soby_gridheadercell' style='padding:5px;text-align:center'></th>");
             headerCellForGroupBy.attr("colspan", this.GroupByFields.length - 1);
             headerRow.append(headerCellForGroupBy);
         }

        for (var i = 0; i < this.Columns.length; i++) {
            if (this.GroupByFields.ContainsField(this.Columns[i].FieldName) == true)
            {
                continue;
            }

            this.AddHeaderCell(headerRow, this.Columns[i], null);
        }
    }

     /**
      * Changes theme
      *
      * @themeName Name of the theme.
      * @example
      * // Hides header row menu icon
      * grid.ChangeTheme('classic');
      */
     ChangeTheme(themeName: string) {
         $(".sobyitemdialog").removeClass(this.ThemeClassName);
         $(".sobygridmenu").removeClass(this.ThemeClassName);
         $(".soby_grid").removeClass(this.ThemeClassName);
         this.ThemeName = themeName;
         this.ThemeClassName = themeName;
         $(".sobyitemdialog").addClass(this.ThemeClassName);
         $(".sobygridmenu").addClass(this.ThemeClassName);
         $(".soby_grid").addClass(this.ThemeClassName);
     }

    /**
     * Shows header row menu icon
     *
     * @fieldName Name of the field.
     * @example
     * // Shows header row menu icon
     * grid.ShowHeaderRowMenuIcon('Title');
     */
     ShowHeaderRowMenuIcon(fieldName)
     {
        $(this.ContentDivSelector + " th .headerrowmenuiconcontainer").hide();
        $(this.ContentDivSelector + " th[fieldName='" + fieldName + "'] .headerrowmenuiconcontainer").show();
    }

    /**
     * Hides header row menu icon
     *
     * @fieldName Name of the field.
     * @example
     * // Hides header row menu icon
     * grid.HideHeaderRowMenuIcon('Title');
     */
    HideHeaderRowMenuIcon(fieldName) {
        $(this.ContentDivSelector + " th[fieldName='" + fieldName + "'] .headerrowmenuiconcontainer").hide();
    }

    /**
     * Hides header row menu
     *
     * @fieldName Name of the field.
     * @example
     * // Hides header row menu icon
     * grid.HideHeaderRowMenu('Title');
     */
    HideHeaderRowMenu(fieldName)
    {
        /*
        if (this.ActionInProgress == true)
            return;

        $("#" + this.GridID + "_Menu").hide();
        */
    }

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
    ShowHeaderRowMenu(fieldName, displayName, sortable, filterable) {
        this.ActionInProgress = true;
        setTimeout(function () {
            var activeGrid = soby_GetActiveDataGrid();
            if (activeGrid != null)
            {
                activeGrid.ActionInProgress = false;
            }
        }, 1000);
        if (sortable == false && filterable == false)
        {
            return;
        }

        var menuID = this.GridID + "_Menu";
        var menuUL = $("#" + menuID);
        if (menuUL.length > 0)
        {
            $("#" + menuID).remove();
        }

        menuUL = $("<table id='" + menuID + "' class='sobygridmenu " + this.ThemeClassName + "' style='margin-top: 30px;margin-left: 30px;'></table>");

        $("#" + this.GridID + " .soby_gridheadercell[fieldname='" + fieldName + "']").append(menuUL);
        menuUL.html("");
        if (sortable == true) {
            menuUL.append("<tr><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;font-size: 5px;'>&nbsp;</td><td style='padding-right:5px;padding-left:5px;font-size: 5px;'>&nbsp;</td></tr>");
            menuUL.append("<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', true)\" class='ms-vh2' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', true)\"><img src='" + this.ImagesFolderUrl + "/SORTAZLang.gif' border='0'></a></td><td style='padding-right:5px;padding-left:5px'>Ascending</td></tr>" +
                "<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', false)\" class='ms-vh2' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', false)\"><img src='" + this.ImagesFolderUrl + "/SORTZALang.gif' border='0'></a></td><td style='padding-right:5px;padding-left:5px'>Descending</td></tr>" +
                "<tr><td style='padding-left:5px;border-right:1px solid;;padding-right:5px'>&nbsp;</td><td><hr style='margin-top:5px;margin-bottom:5px;border: 0;border-bottom: 1px dashed #ccc;'></td></tr>");
        }

        if (filterable == true) {
            for (var i = 0; i < this.Filters.Filters.length; i++)
            {
                if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction == true && this.Filters.Filters[i].FieldName == fieldName)
                {
                    menuUL.append("<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ClearFiltersOn('" + fieldName + "')\" class='ms-vh2' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ClearFiltersOn('" + fieldName + "')\"><img src='" + this.ImagesFolderUrl + "/FILTEROFF.gif' border='0'></a></td><td style='padding-right:5px;padding-left:5px'>Clear filter from " + displayName + "</td></tr>");
                    break;
                }
            }

            menuUL.append("<tr class='filterloadingli'  style='width: 30px;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;<td></td><td style='padding-right:5px;padding-left:5px''>Loading...</td></tr>" +
                "<tr><td  style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;</td><td style='text-align:right;padding-right:5px;padding-left:5px;padding-top:5px'><button class='btn btn-primary next applyfilters' type='button' style='width: 70px;padding-top: 5px;' onclick=\"soby_WebGrids['" + this.GridID + "'].ApplyFilters('" + fieldName + "')\">Apply</button></td></tr>");
        }
        menuUL.append("<tr><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;font-size: 5px;'>&nbsp;</td><td style='padding-top:5px;padding-right:5px;padding-left:5px;font-size: 5px;'>&nbsp;</td></tr>");

        var header = $(this.ContentDivSelector + " th[fieldName='" + fieldName + "']");

        setTimeout(function ()
        {
            menuUL.show();
        }, 1000);

        var filterControl: ISobyEditControlInterface = null;
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.Columns[i].FieldName == fieldName)
            {
                filterControl = this.Columns[i].FilterControl;
            }
        }

        var li = $("<tr></tr>")
        var cellId = soby_guid();
        if (filterControl != null)
        {
            var cell = $("<td style='padding-right:5px;padding-left:5px;'></td>");
            cell.attr("id", cellId);
            filterControl.ContainerClientId = cellId;
            //cell.append(filterControl.FilterElement);
            li.append("<td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;</td>");
            li.append(cell);
        }
        else {
            var currentFilterValue = "";
            for (var i = 0; i < this.Filters.Filters.length; i++) {
                if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction == true && this.Filters.Filters[i].FieldName == fieldName)
                {
                    currentFilterValue = this.Filters.Filters[i].Value;
                }
            }

            var cell = $("<td style='padding-top:5px;padding-right:5px;padding-left:5px;text-align:right'></td>");
            cell.attr("id", cellId);
            var textboxElement = $("<input type='text' class='filtertextbox' style='width:100px' fieldname='" + fieldName + "' />");
            textboxElement.keydown(function (event)
            {
                switch (event.which)
                {
                    case 13: //Enter
                        event.preventDefault();
                        $("#" + menuID + " .applyfilters").click();
                        break;
                }
            });

            textboxElement.val(currentFilterValue);
            cell.append(textboxElement);
            li.append("<td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;</td>");
            li.append(cell);
        }
        li.insertBefore("#" + menuID + " .filterloadingli");
        $("#" + menuID + " .filterloadingli").hide();
        if (filterControl != null)
        {
            filterControl.Initialize();
        }
    }

    /**
     * Apply filters
     *
     * @fieldName Name of the field.
     * @example
     * // Apply filters
     * grid.ApplyFilters('Title');
     */
     ApplyFilters(fieldName) {
        this.HideHeaderRowMenu(null);
        var fieldType, filterType;
        var filterControl: ISobyEditControlInterface = null;
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.Columns[i].FieldName == fieldName)
            {
                filterControl = this.Columns[i].FilterControl;
            }
        }
        for (var i = 0; i < this.DataService.DataSourceBuilder.SchemaFields.length; i++) {
            var viewField = this.DataService.DataSourceBuilder.SchemaFields[i];
            if (viewField.FieldName == fieldName) {
                fieldType = viewField.FieldType;
                if (fieldType == SobyFieldTypes.Number)
                {
                    filterType = SobyFilterTypes.Equal;
                }
                else
                {
                    filterType = SobyFilterTypes.Contains;
                }
            }
        }

        if (filterControl != null)
        {
            this.FilterResultWithMultipleValues(fieldName, filterControl.GetValue(), fieldType, filterType, true)
        }
        else if ($("input.filtertextbox[fieldname='" + fieldName + "']").length > 0) {
            var filterValue = $("input.filtertextbox[fieldname='" + fieldName + "']").val();
            this.FilterResult(fieldName, filterValue, fieldType, filterType, true);
        }
        else {
            var values = [];
            var filterValues = $("input[type='checkbox'][fieldname='" + fieldName + "']:checked");
            if (filterValues.length == 0)
            {
                return;
            }

            for (var i = 0; i < filterValues.length; i++) {
                values[values.length] = $(filterValues[i]).val();
            }
            this.FilterResultWithMultipleValues(fieldName, values, fieldType, filterType, true)
        }
    }

    /**
     * Initializes the grid
     *
     * @populateItems States whether items should be populated or not.
     * @example
     * // Initializes the grid and populate items
     * grid.Initialize(true);
     */
     Initialize(populateItems: boolean)
     {
        $(this.ContentDivSelector).attr("onclick", "soby_WebGrids['" + this.GridID + "'].Activate()");
        $(this.ContentDivSelector).attr("gridid", this.GridID);

        var cellCount = 0;
        for (var i = 0; i < this.Columns.length; i++) {
            cellCount++;
        }
        if (this.IsSelectable == true)
        {
            cellCount++;
        }

        this.CellCount = cellCount;

        var table = $("<" + this.TableTagName + " width='100%' id='" + this.GridID + "' class='soby_grid " + this.ThemeClassName + " " + this.TableAdditionalClassNames + "' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].Activate()\"></" + this.TableTagName + ">");
        var tbody = $("<" + this.TBodyTagName + "></" + this.TBodyTagName + ">");
        var thead = $("<" + this.THeadTagName + "></" + this.THeadTagName + ">");

        var headerRow = $("<" + this.RowTagName + " class='soby_gridheaderrow'></" + this.RowTagName + ">");

        var emptyDataRow = $("<" + this.RowTagName + " class='emptydatarow' style='display:none'></" + this.RowTagName + ">");
        emptyDataRow.append("<" + this.CellTagName + " colspan='" + this.CellCount + "'>" + this.EmptyDataHtml + "</" + this.CellTagName + ">");
        var loadingRow = $("<" + this.RowTagName + " class='loadingrow' style='display:none'></" + this.RowTagName + ">");
        loadingRow.append("<" + this.CellTagName + " colspan='" + this.CellCount + "'><img src='" + this.ImagesFolderUrl + "/loading16.gif'> Loading...</" + this.CellTagName + ">");
        var actionPaneRow = $("<" + this.RowTagName + " class='actionpanerow'></" + this.RowTagName + ">");
        actionPaneRow.append("<" + this.CellTagName + " class='actionpane' style='border: solid 1px gray;' colspan='" + this.CellCount + "'></" + this.CellTagName + ">");
        var groupByPaneRow = $("<" + this.RowTagName + " class='groupbypanerow'></" + this.RowTagName + ">");
        groupByPaneRow.append("<" + this.CellTagName + " class='groupbypane' style='border: solid 1px gray;' colspan='" + this.CellCount + "'></" + this.CellTagName + ">");
        var filterPaneRow = $("<" + this.RowTagName + "></" + this.RowTagName + ">");
        filterPaneRow.append("<" + this.CellTagName + " class='filterpane' style='border: solid 1px gray;background-color: lightgreen;' colspan='" + this.CellCount + "'></" + this.CellTagName + ">");
        var navigationRow = $("<" + this.RowTagName + " class='soby_gridnavigationrow'></" + this.RowTagName + ">");
        navigationRow.append("<" + this.CellTagName + " class='navigationpane' colspan='" + this.CellCount + "'></" + this.CellTagName + ">");
        
        thead.append(groupByPaneRow);
        thead.append(actionPaneRow);
        thead.append(filterPaneRow);
        thead.append(headerRow);
        thead.append(loadingRow);
        tbody.append(emptyDataRow);
        tbody.append(navigationRow);
        table.append(thead);
        table.append(tbody);

        $(this.ContentDivSelector).html("");
        if (this.DisplayTitle == true) {
            var tableTitle = $("<div class='soby_tabletitle'></div>").text(this.Title);
            tableTitle.attr("title", this.AltTitle);
            $(this.ContentDivSelector).append(tableTitle);
        }
        $(this.ContentDivSelector).append(table);
        $(this.ContentDivSelector).append("<div style='display:none' class='tempdatadiv'></div>");

        var grid = this;
        this.DataService.ItemPopulated = function (items)
        {
            grid.PopulateGridData(items);
        };

        this.DataService.ErrorThrown = function (errorMessage: string, errorTypeName: string)
        {
            grid.DisplayErrorMessage(errorMessage);
        };

        this.DataService.ItemBeingPopulated = function ()
        {
            $(grid.ContentDivSelector + " .loadingrow").show();
        };

        this.DataService.NavigationInformationPopulated = function ()
        {
            grid.GenerateNavigationPane();
        };

        this.DataService.NavigationInformationBeingPopulated = function ()
        {
            $(grid.ContentDivSelector + " .navigationpane .loadingrow").show();
        };

        this.DataService.ItemUpdated = function (args)
        {
            grid.HideItemDialog();
            grid.Initialize(true);
        };

        this.DataService.ItemAdded = function (args)
        {
            grid.HideItemDialog();
            grid.Initialize(true);
        };

        this.DataService.ItemDeleted = function (args)
        {
            grid.HideItemDialog();
            grid.Initialize(true);
        };

        if (populateItems == true)
        {
            if (this.OrderByFields.length > 0 && this.Filters.Filters.length > 0)
            {
                this.DataService.SortAndFilter(this.OrderByFields, this.Filters, true);
            }
            else if (this.OrderByFields.length > 0)
            {
                this.DataService.Sort(this.OrderByFields);
            }
            else if (this.Filters.Filters.length > 0)
            {
                this.DataService.Filter(this.Filters, true);
            }
            else
            {
                this.DataService.PopulateItems(null);
            }
        }
        else
        {
            if (this.ShowHeader == true)
            {
                this.PopulateHeaderCells();
            }

            this.InitializeActionPaneButtons();
            this.GenerateActionPane();
            this.SetActionPaneButtonsVisibility();

            $(this.ContentDivSelector + " .emptydatarow td").html("&nbsp;Please search to display data.");
            $(this.ContentDivSelector + " .emptydatarow").show();
        }
     }

     PopulateAggregateRowValues(aggregateRow) {
         var dataRowCount = 0;
         var aggregateRowLevel = parseInt(aggregateRow.attr("level"));
         var currentGridRow = aggregateRow.prev();
         var aggregateValues = new Array();
         while (currentGridRow.length > 0) {
             if (currentGridRow.hasClass("soby_griddatarow") == true) {
                 var rowIndex = parseInt(currentGridRow.attr("rowindex"));
                 var dataItem = this.Items[rowIndex];
                 for (var q = 0; q < this.AggregateFields.length; q++) {
                     var value = dataItem[this.AggregateFields[q].FieldName];
                     var aggregateValueId = this.AggregateFields[q].AggregateType + this.AggregateFields[q].FieldName;
                     if (dataRowCount == 0)
                     {
                         aggregateValues[aggregateValueId] = value;
                     }
                     else if (this.AggregateFields[q].AggregateType == SobyAggregateTypes.Average || this.AggregateFields[q].AggregateType == SobyAggregateTypes.Sum) {
                         aggregateValues[aggregateValueId] = aggregateValues[aggregateValueId] + value;
                     }
                     else if (this.AggregateFields[q].AggregateType == SobyAggregateTypes.Max) {
                         if (value > aggregateValues[aggregateValueId])
                         {
                             aggregateValues[aggregateValueId] = value;
                         }
                     }
                     else if (this.AggregateFields[q].AggregateType == SobyAggregateTypes.Min) {
                         if (value < aggregateValues[aggregateValueId])
                         {
                             aggregateValues[aggregateValueId] = value;
                         }
                     }
                 }

                 dataRowCount++;
             }
             else if (
                 (currentGridRow.hasClass("soby_gridgroupbyrow") == true && parseInt(currentGridRow.attr("level")) <= aggregateRowLevel)
                 || currentGridRow.hasClass("soby_gridheaderrow") == true
             ) {
                 for (var q = 0; q < this.AggregateFields.length; q++) {
                     var aggregateValueId = this.AggregateFields[q].AggregateType + this.AggregateFields[q].FieldName;
                     if (this.AggregateFields[q].AggregateType == SobyAggregateTypes.Average) {
                         aggregateValues[aggregateValueId] = aggregateValues[aggregateValueId] / dataRowCount;
                     }
                     else if (this.AggregateFields[q].AggregateType == SobyAggregateTypes.Count) {
                         aggregateValues[aggregateValueId] = dataRowCount;
                     }

                     aggregateRow.find(".soby_gridaggregatevaluecontainer[fieldname='" + this.AggregateFields[q].FieldName + "'][aggregatetype='" + this.AggregateFields[q].AggregateType + "'] .aggregatetypevalue").text(aggregateValues[aggregateValueId]);
                 }

                 return;
             }
             currentGridRow = currentGridRow.prev();
         }
     }

     PopulateAggregateRowsValues() {
         var aggregateRows = $(this.ContentDivSelector + " .soby_gridaggregatesrow");
         for (var i = 0; i < aggregateRows.length; i++) {
             var aggregateRow = $(aggregateRows[i]);
             this.PopulateAggregateRowValues(aggregateRow);
         }
     }

     PopulateAggregateRow(rowAddBefore, level:number, hasEmptyCell:boolean) {
        var aggregatesRow = $("<tr class='soby_gridaggregatesrow'></tr>");
        aggregatesRow.attr("level", level);
        if (hasEmptyCell == true) {
            var emptyCell = $("<td>&nbsp;</td>");
            aggregatesRow.append(emptyCell);
        }
        for (var q = 0; q < this.Columns.length; q++) {
            if (this.Columns[q].IsVisible == false)
            {
                continue;
            }

            var aggregateCell = $("<td class='soby_gridaggregatecell'>&nbsp;</td>");
            for (var m = 0; m < this.AggregateFields.length; m++) {
                if (this.AggregateFields[m].FieldName == this.Columns[q].FieldName) {
                    var container = $("<div class='soby_gridaggregatevaluecontainer'></div>");
                    container.attr("fieldname", this.AggregateFields[m].FieldName);
                    container.attr("aggregatetype", this.AggregateFields[m].AggregateType);
                    container.html("<span class='aggregatetypename'></span><span class='aggregatetypevalue'></span>");
                    container.find(".aggregatetypename").text(SobyAggregateTypes.GetAggregateTypeName(this.AggregateFields[m].AggregateType) + ":");
                    aggregateCell.append(container);
                }
            }

            aggregatesRow.append(aggregateCell);
        }
        rowAddBefore.before(aggregatesRow);
     }

     PopulateAggregateRows() {
         if (this.AggregateFields.length == 0)
         {
             return;
         }

         var dataRows = $(this.ContentDivSelector + " .soby_griddatarow");
         if (dataRows.length == 0)
         {
             return;
         }

         var hasEmptyCell = false;
         if ($(this.ContentDivSelector + " .soby_selectitemcell").length > 0)
         {
             hasEmptyCell = true;
         }

         var hadDataRow = false;
         var previousGroupByLevel = 0;
         var currentGroupByLevel = 0
         var currentGridRow = $(this.ContentDivSelector + " .soby_gridheaderrow");
         currentGridRow = currentGridRow.next();
         while (currentGridRow.length >0) {
             if (currentGridRow.hasClass("soby_griddatarow") == true) {
                 hadDataRow = true;
             }
             else if (currentGridRow.hasClass("soby_gridgroupbyrow") == true || currentGridRow.hasClass("soby_gridnavigationrow") == true) {
                 if (currentGridRow.hasClass("soby_gridnavigationrow") == false)
                 {
                     currentGroupByLevel = parseInt(currentGridRow.attr("level"));
                 }
                 else
                 {
                     currentGroupByLevel = 0;
                 }

                 if (hadDataRow == true) {
                     for (var e = previousGroupByLevel ; e > currentGroupByLevel-1 ; e--) {
                         this.PopulateAggregateRow(currentGridRow, e, hasEmptyCell);
                     }
                 }

                 previousGroupByLevel = currentGroupByLevel;
             }
             currentGridRow = currentGridRow.next();
         }

         this.PopulateAggregateRowsValues();
     }

     PopulateGroupByRow(itemIndex: number, item, row)
     {
         var currentRowToAddDataRowsAfter = null;
         var hasDifferentGroupValue = false;
         for (var x = 0; x < this.GroupByFields.length; x++)
         {
             var value = null;
             if (this.GroupByFields[x].DisplayFunction != null)
             {
                 value = this.GroupByFields[x].DisplayFunction(item);
             }
             else
             {
                 value = item[this.GroupByFields[x].FieldName];
             }

             if (itemIndex == 0 || hasDifferentGroupValue == true || this.LastGroupByValues["Level_" + x].Value != value)
             {
                 hasDifferentGroupValue = true;
                 this.LastGroupByValues["Level_" + x] = { Level: x, Value: value };
                 var displayname = this.GroupByFields[x].FieldName;
                 var gridColumn = this.GetColumn(this.GroupByFields[x].FieldName);
                 if (gridColumn != null)
                 {
                     displayname = gridColumn.DisplayName;
                 }

                 var groupByRowID = "soby_gridgrouprow_" + soby_guid();
                 var groupByRow = $("<tr class='soby_gridgroupbyrow'></tr>");
                 groupByRow.attr("id", groupByRowID);
                 groupByRow.attr("level", x);
                 if (x == 0)
                 {
                     groupByRow.addClass("first");
                 }
                 if (x > 0)
                 {
                     for (var q = 0; q < x; q++)
                     {
                         var leftCell = $("<td>&nbsp;</td>");
                         groupByRow.append(leftCell);
                     }
                 }

                //var groupByExpandCollapseCell = $("<td style='width:20px'></td>");
                //groupByRow.append(groupByExpandCollapseCell);

                 var groupByCell = $("<td class='soby_gridgroupbycell'></td>");
                 groupByCell.html("<a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ExpandGroupBy('" + groupByRowID + "')\"> <span class='soby-icon-imgSpan15' > <img src='" + this.ImagesFolderUrl + "/spcommon.png?rev=43' class='soby-list-collapse soby-icon-img' > </span></a>");
                 var groupByCellColspan = this.Columns.length - x;
                 if (this.IsSelectable == true || this.DataRelations.length > 0)
                 {
                     groupByCellColspan++;
                 }

                 groupByCell.attr("colspan", groupByCellColspan);
                 groupByCell.append(displayname + ":" + value);
                 groupByRow.append(groupByCell);
                 var navigationRow = $(this.ContentDivSelector + " .soby_gridnavigationrow");
                 navigationRow.before(groupByRow);
                 currentRowToAddDataRowsAfter = groupByRow;
             }
         }

         if (this.GroupByFields.length > 1)
         {
             var leftCell = $("<td>&nbsp;</td>");
             leftCell.attr("colspan", this.GroupByFields.length - 1);
             row.append(leftCell);
         }

         return currentRowToAddDataRowsAfter;
    }

    ExpandGroupBy(groupByRowID) {
        var groupByRow = $("#" + groupByRowID);
        var isExpanded = groupByRow.next().is(':visible');
        var nextDataRow = groupByRow.next();
        while (nextDataRow.hasClass("soby_griddatarow") == true) {
            if (isExpanded == true)
                nextDataRow.hide();
            else
                nextDataRow.show();

            nextDataRow = nextDataRow.next();
        }
        
    }

     PopulateDetailRow(rowID)
     {
         if (this.DataRelations.length == 0 && this.RowDetailDisplayFunction == null)
         {
             return;
         }

         var detailRow = $("<tr class='soby_griddetailrow'></tr>");
         detailRow.attr("mainrowid", rowID);
         var cell = $("<td colspan='" + this.CellCount + "' class='detailgridcell' style='display:none'></td>");

         if (this.RowDetailDisplayFunction != null)
         {
             var itemIndex = $("#" + rowID).attr("rowindex")
             var dataItem = this.Items[itemIndex];

             var rowMainDetailPanel = $("<div class='soby_gridrowmaindetail'></div>");
             rowMainDetailPanel.html(this.RowDetailDisplayFunction(this, rowID, dataItem));
             cell.append(rowMainDetailPanel);
         }

         var tabHeaderPanel = $("<div class='soby_gridtabheaderpanel'></div>")
         cell.append(tabHeaderPanel);
         for (var t = 0; t < this.DataRelations.length; t++)
         {
             var dataRelation = this.DataRelations[t];
             var tabHeaderPanelItem = $("<div class='soby_tabheader' index='" + t + "'><a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SelectDetailGridTab('" + rowID + "', '" + t + "')\">" + soby_WebGrids[dataRelation.DetailGridID].Title + "</a></div>");
             tabHeaderPanelItem.attr("title", soby_WebGrids[dataRelation.DetailGridID].AltTitle)
             var panel = $("<div style='display:none' class='soby_tabcontent'></div>");
             if (t == 0)
             {
                 panel.show();
                 tabHeaderPanelItem.addClass("active");
             }
             panel.attr("id", rowID + "_" + dataRelation.DetailGridID);
             panel.attr("index", t);
             tabHeaderPanel.append(tabHeaderPanelItem);
             cell.append(panel);
         }
         detailRow.append("<td></td>");
         detailRow.append(cell);

         $("#" + rowID).after(detailRow) ;
     }

     PopulateSelectionCell(item, row, rowID)
     {
         if (this.IsSelectable == true || this.DataRelations.length > 0 || this.RowDetailDisplayFunction != null)
         {
             var cell = $("<td valign='top' style='padding:5px;' width='20px' class='soby_selectitemcell'></td>");
             if (this.IsSelectable == true)
             {
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
             for (var t = 0; t < this.DataRelations.length; t++)
             {
                 var dataRelation = this.DataRelations[t];
                 var value = item[dataRelation.MasterFieldValueName];
                 detailGridIds += dataRelation.DetailGridID + soby_FilterValueSeperator;
                 detailGridContainerIds += "#" + rowID + "_" + dataRelation.DetailGridID + soby_FilterValueSeperator;
                 detailFieldNames += dataRelation.DetailFieldName + soby_FilterValueSeperator;
                 valuesForDetailGrids += value + soby_FilterValueSeperator;

             }

             if (detailGridIds != "")
             {
                 detailGridIds = detailGridIds.substring(0, detailGridIds.length - soby_FilterValueSeperator.length);
                 detailGridContainerIds = detailGridContainerIds.substring(0, detailGridContainerIds.length - soby_FilterValueSeperator.length);
                 detailFieldNames = detailFieldNames.substring(0, detailFieldNames.length - soby_FilterValueSeperator.length);
                 valuesForDetailGrids = valuesForDetailGrids.substring(0, valuesForDetailGrids.length - soby_FilterValueSeperator.length);
                 var onClick = "soby_WebGrids['" + this.GridID + "'].PopulateDetailGrid('" + detailGridIds + "','" + detailGridContainerIds + "', '" + rowID + "', '" + detailFieldNames + "', '" + valuesForDetailGrids + "');";
                 var link = $("<a href='javascript:void(0)'><span class='soby-icon-imgSpan'> <img src='" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43' class='soby-list-showrelateddata soby-icon-img'> </span></a>");
                 link.attr("onclick", onClick);

                 cell.append(link);
             }
             else if (this.RowDetailDisplayFunction != null)
             {
                 var onClick = "soby_WebGrids['" + this.GridID + "'].PopulateDetailGrid('','', '" + rowID + "', '', '');";
                 var link = $("<a href='javascript:void(0)'><span class='soby-icon-imgSpan'> <img src='" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43' class='soby-list-showrelateddata soby-icon-img'> </span></a>");
                 link.attr("onclick", onClick);
                 if (this.RowDetailDisplayViewResponsiveCondition != null)
                 {
                     if (this.IsSelectable == false)
                     {
                         cell.addClass(this.RowDetailDisplayViewResponsiveCondition.GetClassName());
                     }
                     else
                     {
                         link.addClass(this.RowDetailDisplayViewResponsiveCondition.GetClassName());
                     }
                 }

                 cell.append(link);
             }

             row.append(cell);
         }
     }

     PopulateCellTemplateContent(cellId: string, columnIndex: number, dataItemIndex: number)
     {
         var popup_contentPanel = $("#" + cellId + " .popup_content");
         var content = popup_contentPanel.html();
         if (content != null && content != "")
         {
             return;
         }

         var item = this.Items[dataItemIndex];
         var column: SobyGridColumn = this.Columns[columnIndex];
         var contentHtml = column.CellTemplate.Template;
         var propertyNames = new Array(); //this.DataService.GetFieldNames();

         var remainingContent = contentHtml;
         while (remainingContent.indexOf("#{")>-1)
         {
             var startIndex = remainingContent.indexOf("#{");
             if (startIndex == -1)
             {
                 break;
             }

             var endIndex = remainingContent.indexOf("}", startIndex);
             if (endIndex == -1)
             {
                 break;
             }

             propertyNames.push(remainingContent.substr(startIndex+2, endIndex - startIndex-2));
             remainingContent = remainingContent.substr(endIndex);
         }

         for (var n = 0; n < propertyNames.length; n++)
         {
             try
             {
                 var subFieldNames = propertyNames[n].split(".");
                 var value = item[subFieldNames[0]];
                 for (var z = 1; z < subFieldNames.length; z++)
                 {
                     if (value == null)
                         continue;

                     var subFieldName = subFieldNames[z];
                     value = value[subFieldName];
                 }


                 var regex = new RegExp('#{' + propertyNames[n] + '}', 'ig');
                 if (column.CellTemplate.ValueDisplayFunction != null)
                 {
                     value = column.CellTemplate.ValueDisplayFunction(propertyNames[n], value);
                 }

                 if (value == null)
                 {
                     value = "";
                 }

                 contentHtml = contentHtml.replace(regex, value);
             }
             catch (err) 
             {
             }
         }

         if (column.CellTemplate.TemplateType == "CellContent")
         {
         }
         else if (column.CellTemplate.TemplateType == "PopupContent")
         {
             var table1 = $("<table></table>");
             var row1 = $("<tr></tr>");
             var cell11 = $("<td style='width:95%'></td>");
             cell11.append(contentHtml);
             row1.append(cell11)
             row1.append("<td style='vertical-align: top;width:20px;'><a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].HideCellPopupContent('" + cellId + "')\">x</a></td>");
             table1.append(row1);
             popup_contentPanel.append(table1);
         }
     }

     PopulateViewColumns(item, row, rowID, itemIndex: number)
     {
         var cellIndex = 0;
         for (var x = 0; x < this.Columns.length; x++)
         {
             if (this.Columns[x].IsVisible == false)
             {
                 continue;
             }

             if (this.GroupByFields.ContainsField(this.Columns[x].FieldName) == true)
             {
                 continue;
             }

             var cellID = "soby_gridcell_" + soby_guid();

             var contentHtml = "";
             if (this.Columns[x].DisplayFunction != null)
             {
                 contentHtml = this.Columns[x].DisplayFunction(item, rowID, cellID);
             }
             else if (this.Columns[x].CellTemplate != null)
             {
                 if (this.Columns[x].CellTemplate.TemplateType == "CellContent")
                 {
                 }
                 else if (this.Columns[x].CellTemplate.TemplateType == "PopupContent")
                 {
                     var popupLinkText = this.Columns[x].CellTemplate.PopupLinkText;
                     var popup_link = $("<a href='javascript:void(0)'></a>").html(popupLinkText);
                     popup_link.attr("onclick", "soby_WebGrids['" + this.GridID + "'].ShowCellPopupContent('" + cellID + "', " + x + ", " + itemIndex + ")");
                     var popup_contentPanel = $("<div style='display:none;position: absolute;padding: 10px;border: 1px solid;background-color: white;padding-top: 0px;overflow: auto;' class='popup_content'></div>");
                     var popup_mainContentPanel = $("<div></div>");
                     popup_mainContentPanel.append(popup_link);
                     popup_mainContentPanel.append(popup_contentPanel);
                     contentHtml = popup_mainContentPanel.html();
                 }
             }
             else
             {
                 var value = item[this.Columns[x].FieldName];
                 if (value instanceof Date)
                 {
                     value = (value.getDate() > 9 ? value.getDate() : "0" + value.getDate())
                         + "/" + (value.getMonth() + 1) + "/" + value.getFullYear() + " "
                         + (value.getHours() > 9 ? value.getHours() : "0" + value.getHours()) + ":"
                         + (value.getMinutes() > 9 ? value.getMinutes() : "0" + value.getMinutes()) + ":"
                         + (value.getSeconds() > 9 ? value.getSeconds() : "0" + value.getSeconds());
                 }
                 contentHtml = value;
             }
             var cell = $("<" + this.CellTagName + " class='soby_gridcell " + this.CellAdditionalClassNames + "' valign='top' style='padding:5px;'></" + this.CellTagName + ">").html(contentHtml);
             if (this.Columns[x].ResponsiveConditionID != null && this.Columns[x].ResponsiveConditionID != "")
             {
                 cell.addClass(this.GetResponsiveConditionById(this.Columns[x].ResponsiveConditionID).GetClassName());
             }

             cell.attr("id", cellID);
             cell.attr("cellindex", cellIndex);
             cell.attr("columnindex", x);
             cell.attr("rowid", rowID);
             cell.attr("onclick", "soby_WebGrids['" + this.GridID + "'].SelectCell('" + rowID + "', " + cellIndex + ")");
             if (this.Columns[x].CellCss != null && this.Columns[x].CellCss != "")
             {
                 var cssValues = this.Columns[x].CellCss.split(";");
                 for (var d = 0; d < cssValues.length; d++)
                 {
                     var cssName = cssValues[d].split(":")[0];
                     var cssValue = cssValues[d].split(":")[1];
                     cell.css(cssName, cssValue);
                 }
             }

             if (this.Columns[x].CellClassNames != null && this.Columns[x].CellClassNames != "")
             {
                 cell.addClass(this.Columns[x].CellClassNames);
             }

             row.append(cell);
             cellIndex++
         }
     }

     /**
     * Focuses to the first item
     *
     * @example
     * // Focuses to the first item
     * grid.FocusToFirstItem();
     */
     FocusToFirstItem()
     {
         if (this.Items.length > 0)
         {
             var firstFocusableItem = $(this.ContentDivSelector + " .soby_griddatarow a:visible:first");
             firstFocusableItem.focus();
         }
     }
     /**
  * Displays error message
  *
  * @errorMessage Error message which returned from the service.
  * @example
  * // Displays error message
  * grid.DisplayErrorMessage(errorMessage);
  */
     DisplayErrorMessage(errorMessage: string)
     {
         this.Items = null;
         this.InitializeActionPaneButtons();
         if (this.ShowHeader == true)
         {
             this.PopulateHeaderCells();
         }

         this.LastGroupByValues = new Array();
         var table = $(this.ContentDivSelector + " .soby_grid");
         $(this.ContentDivSelector + " .soby_griddatarow").remove();
         $(this.ContentDivSelector + " .soby_griddetailrow").remove();
         $(this.ContentDivSelector + " .soby_gridgroupbyrow").remove();
         $(this.ContentDivSelector + " .soby_gridaggregatesrow").remove();
         $(this.ContentDivSelector + " .loadingrow").hide();
         $(this.ContentDivSelector + " .soby_errorrow").show();


         var errorRow = $(this.ContentDivSelector + " .soby_errorrow");
         if (errorRow.length == 0)
         {
             errorRow = $("<" + this.RowTagName + " class='soby_errorrow " + this.RowAdditionalClassNames + "'></" + this.RowTagName + ">");
             var cell = $("<" + this.CellTagName + " colspan='" + this.CellCount + "'></" + this.CellTagName + ">");
             errorRow.append(cell);
             $(this.ContentDivSelector + " " + this.TBodyTagName).append(errorRow);
         }

         errorRow.find(this.CellTagName).html(errorMessage);
     }

    /**
     * Populates the grid data
     *
     * @items Data items which returned from the service.
     * @example
     * // Populates the grid with the given items
     * grid.PopulateGridData(items);
     */
     PopulateGridData(items)
     {
         this.Items = items;
         if (this.OnGridDataBeingParsed != null)
             this.OnGridDataBeingParsed();

         items = this.Items;

        this.InitializeActionPaneButtons();
        if (this.ShowHeader == true)
        {
            this.PopulateHeaderCells();
        }

        this.LastGroupByValues = new Array();
        var table = $(this.ContentDivSelector + " .soby_grid");
        $(this.ContentDivSelector + " .emptydatarow").hide();
        $(this.ContentDivSelector + " .soby_errorrow").hide();
        $(this.ContentDivSelector + " .soby_griddatarow").remove();
        $(this.ContentDivSelector + " .soby_griddetailrow").remove();
        $(this.ContentDivSelector + " .soby_gridgroupbyrow").remove();
        $(this.ContentDivSelector + " .soby_gridaggregatesrow").remove();
        
        var currentRowToAddDataRowsAfter = null;
        for (var i = 0; i < items.length; i++) {
            var rowID = "soby_griddatarow_" + soby_guid();
            var row = $("<" + this.RowTagName + " class='soby_griddatarow " + this.RowAdditionalClassNames + "'></" + this.RowTagName + ">");
            if (i % 2 == 0)
            {
                row.addClass("alt");
            }

            row.attr("id", rowID);
            row.attr("rowindex", i);
            var item = items[i];

            var tempCurrentRowToAddDataRowsAfter = this.PopulateGroupByRow(i, item, row);
            if (tempCurrentRowToAddDataRowsAfter != null)
            {
                currentRowToAddDataRowsAfter = tempCurrentRowToAddDataRowsAfter;
            }

            this.PopulateSelectionCell(item, row, rowID);
            this.PopulateViewColumns(item, row, rowID, i);
            if (currentRowToAddDataRowsAfter == null)
            {
                if ($(this.ContentDivSelector + " .soby_gridnavigationrow").length > 0)
                {
                    $(this.ContentDivSelector + " .soby_gridnavigationrow").before(row);
                }
                else
                {
                    $(this.ContentDivSelector + " " + this.TBodyTagName).append(row);
                }                
            }
            else
            {
                currentRowToAddDataRowsAfter.after(row);
            }

            if (this.ItemCreated != null)
            {
                this.ItemCreated(rowID, item);
            }

            this.PopulateDetailRow(rowID);
        }

        $(this.ContentDivSelector + " .loadingrow").hide();
        if (items.length == 0)
        {
            $(this.ContentDivSelector + " .emptydatarow " + this.CellTagName).html(this.EmptyDataHtml);
            $(this.ContentDivSelector + " .emptydatarow").show();
        }
        this.PopulateAggregateRows();
        this.GenerateGroupByPanePane();
        this.GenerateActionPane();
        this.GenerateFilterPane();
        this.DataService.PopulateNavigationInformation();
        this.ApplyResponsiveElementsVisibility();
        if (this.OnGridPopulated != null)
        {
            this.OnGridPopulated();
        }

        this.SetActionPaneButtonsVisibility();
        if (this.NavigationActionInProgress == true)
        {
            this.NavigationActionInProgress = false;
            this.FocusToFirstItem();
        }
     }
    /************************************ END METHODS ********************************/
}
$.fn.sobywebgrid = function ()
{
    var id = this.attr("id");
    for (var key in soby_WebGrids)
    {
        if (soby_WebGrids[key].ContentDivSelector == "#" + id)
        {
            return soby_WebGrids[key];
        }
    }
    return null;
};

class soby_DataRepeater extends soby_WebGrid
{
    /**
     * Item data bound event.
     *
     * @event soby_WebGrid#ItemDataBound
     * @type {object}
     * @property {object} cellID - Identifier of the row.
     * @property {object} item - Data item related with the row.
     */
    ItemDataBound = null;
    MaxCellCount = 1;
    ShouldContainRowElement: boolean = true;

    /**
     * Gets selected data items
     * @example
     * // returns [Object, Object]
     * grid.GetSelectedDataItems();
     */
    GetSelectedDataItems()
    {
        var selectedRows = $(this.ContentDivSelector + " .soby_griddatarow .soby_gridcell.selected");
        var selectedDataItems = new Array();
        for (var i = 0; i < selectedRows.length; i++)
        {
            var itemIndex = $(selectedRows[i]).attr("cellindex")
            selectedDataItems[selectedDataItems.length] = this.Items[itemIndex];
        }

        return selectedDataItems;
    }

    /**
     * Selects the cell
     *
     * @rowID Identifier of the row.
     * @cellIndex Index of the cell.
     * @example
     * // Selects the cell with given row identifier and cell index
     * grid.SelectCell("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c", 3);
     */
    SelectCell(rowID, cellIndex)
    {
        var alreadyExistCellIndex = -1;
        var cellID = $(this.ContentDivSelector + " .soby_gridcell[cellindex='" + cellIndex + "']").attr("id");
        var selectedCellIDs = this.GetSelectedCellIds();
        for (var i = 0; i < selectedCellIDs.length; i++)
        {
            if (selectedCellIDs[i] == cellID)
            {
                alreadyExistCellIndex = i;
                break;
            }
        }

        if (alreadyExistCellIndex > -1)
        {
            $("#" + selectedCellIDs[alreadyExistCellIndex]).removeClass("selected");
        }
        else if (this.AllowMultipleSelections == true && soby_IsCtrlOnHold == true)
        {
            $("#" + cellID).addClass("selected");
        }
        else
        {
            $(this.ContentDivSelector + " .soby_griddatarow").removeClass("selected");
            $("#" + cellID).addClass("selected");
        }

        this.GenerateActionPane();
        this.SelectDetailGridTab(cellID, 0);
        if (this.OnRowSelected != null)
        {
            this.OnRowSelected(this, cellID);
        }

        if (this.OnCellSelected != null)
        {
            this.OnCellSelected(this, rowID, cellIndex);
        }

        this.SetActionPaneButtonsVisibility();
    }

    /**
     * Selects the row
     *
     * @rowIndex Index of the row.
     * @example
     * // Selects the row with given row index
     * grid.SelectRow(1);
     */
    SelectRowByIndex(rowIndex)
    {
        var rowId = $("#soby_BooksDiv .soby_griddatarow:eq(" + rowIndex + ")").attr("id");
        this.SelectRow(rowId);
    }

    /**
     * Populates the grid data
     *
     * @items Data items which returned from the service.
     * @example
     * // Populates the grid with the given items
     * grid.PopulateGridData(items);
     */
    PopulateGridData(items)
    {
        this.Items = items;
        this.InitializeActionPaneButtons();
        if (this.ShowHeader == true)
        {
            this.PopulateHeaderCells();
        }

        var lastGroupByValues = new Array();
        var table = $(this.ContentDivSelector + " .soby_grid");
        $(this.ContentDivSelector + " .soby_griddatarow").remove();
        $(this.ContentDivSelector + " .soby_griddetailrow").remove();
        $(this.ContentDivSelector + " .soby_gridgroupbyrow").remove();
        $(this.ContentDivSelector + " .soby_gridaggregatesrow").remove();

        var currentRowToAddDataRowsAfter = null; 
        var currentRow = null;
        var currentRowID = null;
        var currentRowIndex = -1;
        if (this.ShouldContainRowElement == true)
        {
            currentRow = $(this.ContentDivSelector + " " + this.TBodyTagName);
        }

        var cellIndex = -1;
        //var currentItemIndex = 0;
        for (var i = 0;i<items.length;i++)
        {
            cellIndex++;

            if (this.ShouldContainRowElement == true && cellIndex % this.MaxCellCount == 0)
            {
                currentRowIndex++;
                currentRowID = "soby_griddatarow_" + soby_guid();
                currentRow = $("<" + this.RowTagName + " class='soby_griddatarow " + this.RowAdditionalClassNames + "'></" + this.RowTagName + ">");

                if (i % 2 == 0)
                {
                    currentRow.addClass("alt");
                }

                currentRow.attr("id", currentRowID);
                currentRow.attr("rowindex", currentRowIndex);
            }

            var item = items[i];

            var tempCurrentRowToAddDataRowsAfter = this.PopulateGroupByRow(i, item, currentRow);
            if (tempCurrentRowToAddDataRowsAfter != null)
            {
                currentRowToAddDataRowsAfter = tempCurrentRowToAddDataRowsAfter;
            }

            //this.PopulateSelectionCell(item, currentRow, currentRowID);

            var cellID = "soby_gridcell_" + soby_guid();
            var cell = $("<" + this.CellTagName + " class='soby_gridcell " + this.CellAdditionalClassNames + "' valign='top' style='padding:5px;'></" + this.CellTagName + ">").html(this.ItemDataBound(cellID, item));
            cell.attr("id", cellID);
            cell.attr("cellindex", cellIndex);
            cell.attr("columnindex", cellIndex % this.MaxCellCount);
            if (this.IsSelectable == true)
            {
                cell.attr("onclick", "soby_WebGrids['" + this.GridID + "'].SelectCell('" + currentRowID + "', " + cellIndex + ")")
            }

            currentRow.append(cell);

            if (currentRowToAddDataRowsAfter == null)
            {
                if ($(this.ContentDivSelector + " .soby_gridnavigationrow").length > 0)
                {
                    $(this.ContentDivSelector + " .soby_gridnavigationrow").before(currentRow);
                }
                else
                {
                    $(this.ContentDivSelector + " " + this.TBodyTagName).append(currentRow);
                }
            }
            else
            {
                currentRowToAddDataRowsAfter.after(currentRow);
            }

            if (this.ItemCreated != null)
            {
                this.ItemCreated(currentRowID, item);
            }

            this.PopulateDetailRow(currentRowID);
        }

        $(this.ContentDivSelector + " .loadingrow").hide();
        if (items.length == 0)
        {
            $(this.ContentDivSelector + " .emptydatarow td").html(this.EmptyDataHtml);
            $(this.ContentDivSelector + " .emptydatarow").show();
        }
        this.PopulateAggregateRows();
        this.GenerateGroupByPanePane();
        this.GenerateActionPane();
        this.GenerateFilterPane();
        this.DataService.PopulateNavigationInformation();
        if (this.OnGridPopulated != null)
        {
            this.OnGridPopulated();
        }

        this.SetActionPaneButtonsVisibility();
    }
}
// ************************************************************

// ********************* CAML BUILDER CAROUSEL *****************************
var soby_Carousels = new Array();
class soby_Carousel{
    constructor(contentDivSelector: string, title: string, dataService, emptyDataHtml: string, imageFieldName: string, captionFieldName: string, contentFieldName: string, isContentFieldUrl:boolean) {
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
    ImagesFolderUrl: string = "/_layouts/1033/images";
    /************************************ EVENTS *************************************/
    OnGridPopulated = null;
    OnRowSelected = null;
    OnCellSelected = null;
    /*********************************************************************************/

    CarouselID:string = "soby_carousel_" + soby_guid();
    ContentDivSelector:string
    Title:string;
    DataService;
    EmptyDataHtml:string;
    ImageFieldName:string;
    CaptionFieldName:string;
    ContentFieldName:string;
    IsContentFieldUrl:boolean;
    MaxWidth:number = null;
    Items = null;
    ItemDataBound = null;
    EnsureCarouselExistency() {
        for (var key in soby_Carousels) {
            if (key == this.CarouselID)
            {
                return;
            }
        }

        soby_Carousels[this.CarouselID] = this;
    }

    GoToItem(index) {
        $(this.ContentDivSelector + " .carouselindicator").removeClass("active");
        $(this.ContentDivSelector + " .item").removeClass("active");
        $(this.ContentDivSelector + " .item[index='" + index + "']").addClass("active");
        $(this.ContentDivSelector + " .carouselindicator[index='" + index + "']").addClass("active");
    }

    NextItem() {
        var currentIndex = parseInt($(this.ContentDivSelector + " .item.active").attr("index"));
        $(this.ContentDivSelector + " .item").removeClass("active");
        $(this.ContentDivSelector + " .carouselindicator").removeClass("active");
        var index = currentIndex + 1;
        if (index >= this.Items.length)
        {
            index = 0;
        }

        $(this.ContentDivSelector + " .item[index='" + index + "']").addClass("active");
        $(this.ContentDivSelector + " .carouselindicator[index='" + index + "']").addClass("active");
    }

    PreviousItem() {
        var currentIndex = parseInt($(this.ContentDivSelector + " .item.active").attr("index"));
        $(this.ContentDivSelector + " .item").removeClass("active");
        $(this.ContentDivSelector + " .carouselindicator").removeClass("active");
        var index = currentIndex - 1;
        if (index < 0)
        {
            index = this.Items.length - 1;
        }

        $(this.ContentDivSelector + " .item[index='" + index + "']").addClass("active");
        $(this.ContentDivSelector + " .carouselindicator[index='" + index + "']").addClass("active");
    }

    PopulateIndicators(contentDivID, items) {
        var indicatorsOL = $("<ol class='carousel-indicators'></ol>");
        for (var i = 0; i < items.length; i++) {
            //        <a href='javascript:void(0)' onclick=\"soby_Carousels['" + this.CarouselID + "'].GoToItem(" + i + ")\">" + (i + 1) + "</a>
            indicatorsOL.append("<li class='carouselindicator' index='" + i + "' onclick=\"soby_Carousels['" + this.CarouselID + "'].GoToItem(" + i + ")\"></li>");
        }

        $("#" + contentDivID).append(indicatorsOL);
    }

    PopulateItems(contentDivID, items) {
        var itemsDiv = $("<div class='carousel-inner'></div>");
        for (var i = 0; i < items.length; i++) {
            var itemDiv = $("<div class='item'></div>");
            itemDiv.attr("index", i);

            itemDiv.html(this.ItemDataBound(i, items[i]));

            itemsDiv.append(itemDiv);
        }

        $("#" + contentDivID).append(itemsDiv);
    }

    PopulateNavigator(contentDivID) {
        $("#" + contentDivID).append("<a class='prev' href='#" + contentDivID + "' role='button' data-slide='prev' onclick=\"soby_Carousels['" + this.CarouselID + "'].PreviousItem()\"></a> \
			  <a class='next' href='#" + contentDivID + "' role='button' data-slide='next' onclick=\"soby_Carousels['" + this.CarouselID + "'].NextItem()\"></a>");
    }

    PopulateGridData(items) {
        $("#" + this.CarouselID).html("");
        this.Items = items;
        this.PopulateIndicators(this.CarouselID, this.Items);
        this.PopulateItems(this.CarouselID, this.Items);
        this.PopulateNavigator(this.CarouselID);
        this.GoToItem(0)
    }

    Initialize(populateItems)
    {
        var carouselDivID = this.CarouselID;
        var carouselDiv = $("<div class='soby_carousel slide' data-ride='carousel' id='" + carouselDivID + "'></div>");
        if (this.MaxWidth != null && this.MaxWidth > 0)
        {
            carouselDiv.css("max-width", this.MaxWidth);
        }

        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(carouselDiv);

        var carousel = this;
        this.DataService.ItemPopulated = function (items)
        {
            carousel.PopulateGridData(items);
        };

        this.DataService.ItemBeingPopulated = function ()
        {
            $("#" + carouselDivID).html("<img src='" + this.ImagesFolderUrl + "/loading16.gif'> Loading...");
        };

        if (populateItems == true)
        {
            this.DataService.PopulateItems();
        }
    }
}
// ************************************************************

// ********************* CAML BUILDER METRO TILES *****************************
var soby_MetroTileGrids = new Array();
class soby_MetroTilesGrid {
    constructor(contentDivSelector: string, title: string, dataService, emptyDataHtml: string, imageFieldName: string, captionFieldName: string, urlFieldName: string, openInNewWindowFieldName: string, startColorFieldName: string, endColorFieldName: string, colspanFieldName: string, rowspanFieldName: string) {
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
    MetroTileGridID = "soby_metrotilegrid_" + soby_guid();
    ContentDivSelector: string;
    Title: string;
    DataService;
    EmptyDataHtml: string;
    ImageFieldName: string;
    CaptionFieldName: string;
    URLFieldName: string;
    OpenInNewWindowFieldName:string;
    StartColorFieldName: string;
    EndColorFieldName: string;
    RowSpanFieldName: string;
    ColSpanFieldName: string;
    MaxWidth = null;
    TileWidth:number = 150;
    TileHeight: number = 120;
    Width: string = "600px";
    Items = null;
    EnsureMetroTilesExistency() {
        for (var key in soby_MetroTileGrids) {
            if (key == this.MetroTileGridID)
            {
                return;
            }
        }

        soby_MetroTileGrids[this.MetroTileGridID] = this;
    }

    PopulateItems(items) {
        var itemsDiv = $("<div class='metro-tiles' style='width:" + this.Width + "'></div>");
        for (var i = 0; i < items.length; i++) {
            var imageSrc = items[i][this.ImageFieldName];
            if (imageSrc.indexOf(",") > -1)
            {
                imageSrc = imageSrc.split(",")[0];
            }

            var caption = items[i][this.CaptionFieldName];
            var url = items[i][this.URLFieldName];
            if (url.indexOf(",") > -1)
            {
                url = url.split(",")[0];
            }

            var openInNewWindow = items[i][this.OpenInNewWindowFieldName];
            var startColor = items[i][this.StartColorFieldName];
            var endColor = items[i][this.EndColorFieldName];
            var rowspan = parseInt(items[i][this.RowSpanFieldName]);
            if (isNaN(rowspan) == true)
            {
                rowspan = 1;
            }

            var colspan = parseInt(items[i][this.ColSpanFieldName]);
            if (isNaN(colspan) == true)
            {
                colspan = 1;
            }

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
            {
                link.attr("target", "_blank");
            }

            var image = $("<img alt='...' class='metro-tileimage'>");
            image.attr("src", imageSrc);
            link.append(image);
            itemDiv.append(link);
            var captionDiv = $("<div class='metro-tilecaption'></div>");
            var link = $("<a></a>");
            link.attr("href", url);
            link.text(caption);
            if (openInNewWindow == "1")
            {
                link.attr("target", "_blank");
            }

            captionDiv.append(link);
            itemDiv.append(captionDiv);
            itemsDiv.append(itemDiv);
        }

        $("#" + this.MetroTileGridID).append(itemsDiv);
    }


    Initialize(populateItems) {
        var metroTileGridDiv = $("<div class='soby_metrotilegrid' id='" + this.MetroTileGridID + "'></div>");
        if (this.MaxWidth != null && this.MaxWidth != "")
        {
            metroTileGridDiv.css("max-width", this.MaxWidth);
        }

        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(metroTileGridDiv);

        var metroTileGrid = this;
        this.DataService.ItemPopulated = function (items)
        {
            metroTileGrid.ItemPopulated(items);
            metroTileGrid.PopulateItems(items);
        };

        this.DataService.ItemBeingPopulated = function ()
        {
            $("#" + this.MetroTileGridID).html("<img src='" + this.ImagesFolderUrl + "/loading16.gif'> Loading...");
        };

        if (populateItems == true)
        {
            this.DataService.PopulateItems();
        }
    }
    ItemPopulated(items: Array<soby_Item>) { }
}
// ************************************************************

// ********************* CAML BUILDER WIZARD TEMPLATE *****************************
var soby_Wizards = new Array();
class soby_Wizard {
    constructor(contentDivSelector: string) {
        this.WizardID = "soby_wizardgrid_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.EnsureWizardsExistency();
    }
    AutoPopulateStepNumbersOnHeaders = true;
    WizardID:string = "";
    ContentDivSelector = "";
    CurrentStepIndex = -1;
    TempStepIndex = -1;
    MaxWidth = null;
    TileWidth = "150";
    TileHeight = "120";
    Width = "600";
    Items = null;
    EnsureWizardsExistency = function ()
    {
        for (var key in soby_Wizards)
        {
            if (key == this.WizardID)
            {
                return;
            }
        }

        soby_Wizards[this.WizardID] = this;
    };


    GetItemById = function (id)
    {
        for (var i = 0; i < this.Items.length; i++)
        {
            if (this.Items[i].LinkId == id)
            {
                return this.Items[i];
            }
        }

        return null;
    };

    ActivateWizardStep = function (linkId)
    {
        var item = this.GetItemById(linkId);
        $(this.ContentDivSelector + " a.sobywizardsteplink").removeClass("active");
        $(this.ContentDivSelector + " > ul > li a[linkid='" + linkId + "']").addClass("active");
        $(".sobywizardstepcontent[wizardid='" + this.WizardID + "']").hide();
        $(item.ContainerId).show();
    };

    GoToNextStep = function ()
    {
        if (this.CurrentStepIndex < this.Items.length)
        {
            this.GoToStep(this.CurrentStepIndex + 1);
        }
    };

    GoToPreviousStep = function ()
    {
        if (this.CurrentStepIndex > 0)
        {
            this.GoToStep(this.CurrentStepIndex - 1);
        }
    };

    EventBeforeStepChange = null;
    EventAfterStepChange = null;

    GoToStep = function (stepIndex)
    {
        if (this.CurrentStepIndex == stepIndex)
        {
            return;
        }

        this.TempStepIndex = stepIndex;

        if (this.EventBeforeStepChange != null)
        {
            this.EventBeforeStepChange(stepIndex);
        }
        else
        {
            this.CommitToStep();
        }
    };

    CommitToStep = function ()
    {
        var navigatedFromStepIndex = this.CurrentStepIndex;
        this.CurrentStepIndex = this.TempStepIndex;
        $(this.ContentDivSelector + " .sobywizardnavigationbar button").removeAttr("disabled");
        if (this.CurrentStepIndex == 0)
        {
            $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").hide();
        }
        else
        {
            $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").show();
        }

        if (this.CurrentStepIndex < this.Items.length)
        {
            $(this.ContentDivSelector + " .sobywizardnavigationbar .next").show();
        }
        else
        {
            $(this.ContentDivSelector + " .sobywizardnavigationbar .next").hide();
        }

        var item = this.Items[this.CurrentStepIndex];
        $(this.ContentDivSelector + " a.sobywizardsteplink").removeClass("active");
        $(this.ContentDivSelector + " > ul > li a[linkid='" + item.LinkId + "']").addClass("active");

        var visibleSteps = $(".sobywizardstepcontent[wizardid='" + this.WizardID + "']:visible");
        if (visibleSteps.length == 1)
        {
            visibleSteps.toggle("slide", "left", function ()
            {
                $(item.ContainerId).toggle("slide", "right");
            });
        }
        else
        {
            visibleSteps.hide();
            $(item.ContainerId).toggle("slide", "right");
        }

        if (this.EventAfterStepChange != null)
        {
            this.EventAfterStepChange(navigatedFromStepIndex, this.CurrentStepIndex);
        }
    };

    Initialize = function ()
    {
        $(".sobywizardstepcontent[wizardid='" + this.WizardID + "']:visible").hide();
        $(this.ContentDivSelector).addClass("sobywizard");
        var wizardLinks = $(this.ContentDivSelector + " > ul > li a")
        wizardLinks.addClass("sobywizardsteplink");
        this.Items = new Array();
        for (var i = 0; i < wizardLinks.length; i++)
        {
            var linkId = "soby_wizardlink_" + i;
            var linkSelector = $(wizardLinks[i]).attr("href");
            var linkText = $(wizardLinks[i]).text();
            $(linkSelector).addClass("sobywizardstepcontent");
            $(linkSelector).attr("wizardid", this.WizardID);
            $(wizardLinks[i]).attr("wizardid", this.WizardID);
            $(wizardLinks[i]).attr("linkid", linkId);
            $(wizardLinks[i]).attr("onclick", "soby_Wizards['" + this.WizardID + "'].GoToStep(" + i + ")")
            this.Items[this.Items.length] = { Title: linkText, ContainerId: linkSelector, LinkId: linkId };
            if (this.AutoPopulateStepNumbersOnHeaders == true)
            {
                $(wizardLinks[i]).text((i + 1) + ". " + linkText);
            }
        }

        for (var i = 0; i < this.Items.length; i++)
        {
            $(this.Items[i].ContainerId).hide();
        }

        $(this.ContentDivSelector + " .sobywizardnavigationbar button").attr("wizardid", this.WizardID);
        $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").click(function ()
        {
            try
            {
                var wizardId = $(this).attr("wizardid");
                soby_Wizards[wizardId].GoToPreviousStep();
            }
            catch (ex) { }
            return false;
        });
        $(this.ContentDivSelector + " .sobywizardnavigationbar .next").click(function ()
        {
            try
            {
                var wizardId = $(this).attr("wizardid");
                soby_Wizards[wizardId].GoToNextStep();
            }
            catch (ex) { }
            return false;
        });

        this.GoToStep(0);
    };

    HideNavigationBar = function ()
    {
        $(this.ContentDivSelector + " .sobywizardnavigationbar").hide();
    };

    ShowNavigationBar = function ()
    {
        $(this.ContentDivSelector + " .sobywizardnavigationbar").show();
    };

    HideStepPanels = function ()
    {
        $(this.ContentDivSelector + " .sobywizardstepcontent").hide();
    };

    ShowStepPanels = function ()
    {
        $(this.ContentDivSelector + " .sobywizardstepcontent").show();
    };
}
// ************************************************************

// ********************* CAML BUILDER MENU TEMPLATE *****************************
var soby_Menus = new Array();
class soby_Menu {
    constructor(contentDivSelector, dataService, displayNameField, idField, parentIdField){
        this.MenuID = "soby_menugrid_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.DisplayNameField = displayNameField;
        this.IDField = idField;
        this.ParentIDField = parentIdField;
        this.DataService = dataService;
        this.EnsureMenusExistency();
    }

    MenuID = "";
    ContentDivSelector = "";
    DisplayNameField = "";
    IDField = "";
    ParentIDField = "";
    DataService = null;
    MaxWidth = null;
    TileWidth = "150";
    TileHeight = "120";
    Width = "600";
    Items = null;
    EnsureMenusExistency = function ()
    {
        for (var key in soby_Menus)
        {
            if (key == this.MenuID)
            {
                return;
            }
        }

        soby_Menus[this.MenuID] = this;
    };


    GetItemById = function (id)
    {
        for (var i = 0; i < this.Items.length; i++)
        {
            if (this.Items[i].LinkId == id)
            {
                return this.Items[i];
            }
        }

        return null;
    };

    ActivateMenuTab = function (linkId)
    {
        var item = this.GetItemById(linkId);
        $(this.ContentDivSelector + " a.sobymenutablink").removeClass("active");
        $(this.ContentDivSelector + " > ul > li a[linkid='" + linkId + "']").addClass("active");
        $(".sobymenutabcontent[menuid='" + this.MenuID + "']").hide();
        $(item.ContainerId).show();
    };

    EventBeforeTabChange = null;
    EventAfterTabChange = null;

    PopulateGridData = function (items)
    {
        for (var i = 0; i < items.length; i++)
        {
            var item = items[i];
            var displayName = item[this.DisplayNameField];
            var id = item[this.IDField];

            var parentId = item[this.ParentIDField];
            var linkId = "soby_menulink_" + i;
            var menuItem = $("<a></a>").text(displayName);
            $(this.ContentDivSelector).append(menuItem);
        }
    };

    Initialize = function ()
    {
        var menu = this;
        this.DataService.ItemPopulated = function (items)
        {
            menu.PopulateGridData(items);
        };
        this.DataService.PopulateItems();

        $(this.ContentDivSelector).addClass("sobymenu");
    };
}
// ************************************************************

// ********************* ITEM SELECTION *****************************
var soby_ItemSelections = new Array();
class SobyItemSelectorTypeObject {
    GridView: number = 0;
    TreeView: number = 1;
    CardView: number = 2;
}
var SobyItemSelectorTypes = new SobyItemSelectorTypeObject();

function soby_GetItemSelectionByContentDivSelector(contentDivSelector): soby_ItemSelection {
    for (var key in soby_ItemSelections) {
        if (soby_ItemSelections[key].ContentDivSelector == contentDivSelector)
            return soby_ItemSelections[key];
    }

    return null;
}

function soby_GetAllItemSelections() {
    var itemSelections = new Array();
    for (var key in soby_ItemSelections) {
        itemSelections.push(soby_ItemSelections[key]);
    }

    return itemSelections;
}

class soby_ItemSelection {
    constructor(contentDivSelector, title, itemSelectorType: number, autoCompleteDataService, advancedSearchDataService, advancedSearchChildrenDataService, emptyDataHtml, dialogID, selectorUrl, valueFieldName, textFieldName, parentFieldName) {
        this.ItemSelectionID= "soby_itemselection_" + soby_guid();
        this.ContentDivSelector= contentDivSelector;
        this.Title = title;
        this.ItemSelectorType = itemSelectorType;
        this.AutoCompleteDataService = autoCompleteDataService;
        this.AdvancedSearchDataService = advancedSearchDataService;
        this.AdvancedSearchChildrenDataService = advancedSearchChildrenDataService;
        this.EmptyDataHtml= emptyDataHtml;
        this.DialogID= dialogID;
        this.SelectorUrl= selectorUrl;
        this.ValueFieldName= valueFieldName;
        this.TextFieldName = textFieldName;
        this.ParentFieldName = parentFieldName;
        this.EnsureItemSelectionExistency();
        this.InitializeAdvancedSearchControl();
    }

    ItemSelectorType: number = null;
    AdvancedSearchAsGrid: ISobySelectorControlInterface = null;
    ItemSelectionID:string = "";
    ContentDivSelector: string = "";
    Title: string = "";
    AutoCompleteDataService: soby_ServiceInterface = null;
    AdvancedSearchDataService: soby_ServiceInterface = null;
    AdvancedSearchChildrenDataService: soby_ServiceInterface = null;
    AllowMultipleSelections: boolean = true;
    EmptyDataHtml: string = "";
    WaterMark: string = "";
    DialogID: string = "";
    SelectorUrl: string = "";
    ParentFieldName: string = "";
    ValueFieldName: string = "";
    TextFieldName: string = "";
    ImagesFolderUrl: string = "/_layouts/1033/images";
    InitializeAdvancedSearchControl() {
        if (this.ItemSelectorType == SobyItemSelectorTypes.GridView) {
            var advancedSearchAsGrid = new soby_WebGrid("#" + this.DialogID + " .itemselectionadvancedsearchgridview", this.Title, this.AdvancedSearchDataService, this.EmptyDataHtml);
            advancedSearchAsGrid.IsEditable = false;
            for (var i = 0; i < this.AdvancedSearchDataService.DataSourceBuilder.SchemaFields.length; i++) {
                var schemaField = this.AdvancedSearchDataService.DataSourceBuilder.SchemaFields[i];
                advancedSearchAsGrid.AddColumn(schemaField.FieldName, schemaField.FieldName, SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            }
            this.AdvancedSearchAsGrid = advancedSearchAsGrid;
        }
        else if (this.ItemSelectorType == SobyItemSelectorTypes.TreeView)
        {
            var treeView = new soby_TreeView("#" + this.DialogID + " .itemselectionadvancedsearchgridview", this.Title, this.AdvancedSearchDataService, this.AdvancedSearchChildrenDataService, this.EmptyDataHtml, this.ParentFieldName, this.ValueFieldName, this.TextFieldName);
            treeView.ImagesFolderUrl = "/media/images";
            treeView.Initialize();
            this.AdvancedSearchAsGrid = treeView;
        }
    }
    Initialize() {
        this.AdvancedSearchAsGrid.ImagesFolderUrl = this.ImagesFolderUrl;
        var selectedItemsHiddenField = $("<input type='hidden' class='selecteditemvalues'>");
        var itemNameInput = $("<input type='text' class='itemname' style='width:100px;padding:3px 0px 3px 0px'>");
        itemNameInput.val(this.WaterMark);
        var advancedSelection = $("<a id='" + this.ItemSelectionID + "_advancedbutton' href='javascript:void(0)'><img src='" + this.ImagesFolderUrl + "/bizpicker.gif' border='0'></a>");
        var selectedItemsMaintenancePanel = $("<div class='selecteditemmaintenancepanel'></div>");
        $(this.ContentDivSelector).append(selectedItemsHiddenField);
        $(this.ContentDivSelector).append(itemNameInput);
        $(this.ContentDivSelector).append(advancedSelection);
        $(this.ContentDivSelector).append(selectedItemsMaintenancePanel);
        advancedSelection.unbind("click");
        advancedSelection.bind('click', { MainControlID: this.ItemSelectionID, DialogID: this.DialogID, DialogTitle: this.Title, SelectorUrl: this.SelectorUrl }, this.OpenItemPicker);
        var itemSelectorObj = this;
        var itemSelection = this;
        this.AutoCompleteDataService.ItemPopulated = function (items)
        {
            var response = itemSelection.AutoCompleteDataService.Args[0];

            var autoCompleteItems = new Array();
            for (var i = 0; i < items.length; i++)
            {
                var textFieldNames = itemSelection.TextFieldName.split(";");
                var valueFieldNames = itemSelection.ValueFieldName.split(";");
                var text = "";
                var value = "";
                for (var x = 0; x < textFieldNames.length; x++)
                {
                    var _value = items[i][textFieldNames[x]];
                    if (_value != null)
                    {
                        text += _value;
                    }
                }
                for (var x = 0; x < valueFieldNames.length; x++)
                {
                    var _value = items[i][valueFieldNames[x]];
                    if (_value != null)
                    {
                        value += _value;
                    }
                }

                autoCompleteItems.push({ Text: value, value: text, Value: text });
            }

            response(autoCompleteItems);
        };

        $(this.ContentDivSelector + " .itemname").click(function ()
        {
            if ($(this).val() == itemSelection.WaterMark)
            {
                $(this).val('');
            }
        });
        $(this.ContentDivSelector + " .itemname").focusout(function ()
        {
            if ($(this).val() == '')
            {
                $(this).val(itemSelection.WaterMark);
            }
        });
        $(this.ContentDivSelector + " .itemname").autocomplete({
            source: function (request, response)
            {
                itemSelection.AutoCompleteDataService.DataSourceBuilder.Filters = new SobyFilters(true);
                var textFieldNames = itemSelection.TextFieldName.split(";");
                for (var x = 0; x < textFieldNames.length; x++)
                {
                    itemSelection.AutoCompleteDataService.DataSourceBuilder.Filters.AddFilter(textFieldNames[x], request.term, SobyFieldTypes.Text, SobyFilterTypes.Contains, false, true);
                }

                if (itemSelection.EventBeforeAutoCompleteQuery != null)
                    itemSelection.EventBeforeAutoCompleteQuery();

                itemSelection.AutoCompleteDataService.PopulateItems([response]);
            },
            select: function (event, ui) {
                itemSelectorObj.AddItem(ui.item.Value, ui.item.Text);
            },
            minLength: 2
        });
        this.GenerateItemTable();

        // Add custom initialization here
    }
    OpenItemPicker(event) {
//        var selectorUrl = event.data.SelectorUrl;
        var mainControlID = event.data.MainControlID;
        var dialogTitle = event.data.DialogTitle;
        if (dialogTitle == null)
            dialogTitle = "";
        var dialogObject = ShowCommonHtmlDialog(dialogTitle, event.data.DialogID, function (args)
        {
            if (args == null)
            {
                return;
            }

            var values = args.split(soby_FilterValueSeperator);
            for (var i = 0; i < values.length; i = i + 2) {
                soby_ItemSelections[mainControlID].AddItem(values[i + 1], values[i]);
            }
        });
        dialogObject.html("<div class='itemselectionadvancedsearchgridview'></div><p align='right'><input type='button' value='Ekle' onclick=\"soby_ItemSelections['" + mainControlID + "'].SelectItemsFromAdvancedSearchDialog()\"></p>")
        soby_ItemSelections[mainControlID].AdvancedSearchAsGrid.Initialize(true);

    }
    SelectItemsFromAdvancedSearchDialog() {
        var data = this.AdvancedSearchAsGrid.GetSelectedDataItems();
        var selectedValuesString = "";
        for (var i = 0; i < data.length; i++) {
            if (selectedValuesString != "")
            {
                selectedValuesString += soby_FilterValueSeperator;
            }

            var textFieldNames = this.TextFieldName.split(";");
            var valueFieldNames = this.ValueFieldName.split(";");
            var text = "";
            var value = "";
            for (var x = 0; x < textFieldNames.length; x++)
            {
                var _value = data[i][textFieldNames[x]];
                if (_value != null)
                {
                    text += _value;
                }
            }

            for (var x = 0; x < valueFieldNames.length; x++)
            {
                var _value = data[i][valueFieldNames[x]];
                if (_value != null)
                {
                    value += _value;
                }
            }

            selectedValuesString += value + soby_FilterValueSeperator + text;
        }
        var commonCloseDialog = CommonCloseDialog;
        commonCloseDialog(this.DialogID, selectedValuesString);

    }
    GetItemArray() {
        var text = $(this.ContentDivSelector + " .selecteditemvalues").val();
        if (text == null || text == "") {
            return new Array();
        }
        else {
            return JSON.parse(text);
        }
    }
    AddItem(text, value) {
        var array = new Array();
        var exist = false;
        if (this.AllowMultipleSelections == true)
        {
            array = this.GetItemArray();
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i].Value == value)
            {
                exist = true;
            }
        }
        if (exist == false)
        {
            var newItem = new Object();
            newItem["Text"] = text;
            newItem["Value"] = value;
            array[array.length] = newItem;
        }

        this.SetItemArray(array);
        this.GenerateItemTable();
    }
    RemoveItem(value) {
        var array = this.GetItemArray();
        var newArray = new Array();
        for (var i = array.length - 1; i > -1; i--) {
            if (array[i].Value != value) {
                newArray[newArray.length] = { "Text": array[i].Text, "Value": array[i].Value };
            }
        }
        this.SetItemArray(newArray);
        this.GenerateItemTable();
    }
    SetItemArray(array) {
        /*
        Sample Text
        var a = new Array(new function () { this.Text = "Item1"; this.Value = "1" });
        */
        var text = "[";
        for (var i = 0; i < array.length; i++) {
            if (i > 0) {
                text += ",";
            }
            text += "{ \"Text\" : \"" + array[i].Text + "\", \"Value\" : \"" + array[i].Value + "\" }";
        }
        text += "]";

        $(this.ContentDivSelector + " .selecteditemvalues").val(text);
        if (this.OnSelectionChanged != null)
        {
            this.OnSelectionChanged();
        }
    }
    GenerateItemTable() {
        var tableHTML = "<table class='ms-formtable' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin-top: 8px;'>";
        var array = this.GetItemArray();
        for (var key in array) {
            tableHTML += "<tr class='mtdataitemrow'><td width='20'><a href='javascript:void(0)' onclick=\"soby_ItemSelections['" + this.ItemSelectionID + "'].RemoveItem('" + array[key].Value + "')\" class='itemSelectorDeleteLink'><span class='soby-icon-imgSpan'> <img class='soby-list-delete soby-icon-img' src= '" + this.ImagesFolderUrl + "/formatmap16x16.png?rev=43' > </span></a></td><td>" + array[key].Text + "</td></tr>";
        }
        if (array.length == 0)
        {
            tableHTML += "<tr class='mtdataitemrow'><td>" + this.EmptyDataHtml + "</td></tr>";
        }
        tableHTML += "</table>";
        $(this.ContentDivSelector + " .selecteditemmaintenancepanel").html(tableHTML);
    }
    EnsureItemSelectionExistency() {
        for (var key in soby_ItemSelections) {
            if (key == this.ItemSelectionID)
            {
                return;
            }
        }

        soby_ItemSelections[this.ItemSelectionID] = this;
    }
    OnSelectionChanged = null;
    EventBeforeAutoCompleteQuery = null;
}
// ************************************************************

// ********************* COMMON FUNCTIONS *****************************
function ShowCommonDialog(url, title, dialogID, onCloseCallback) {
    var showDialog = window.parent["ShowDialog"];
    showDialog(url, title, dialogID, onCloseCallback);
}

function ShowDialog(url, title, dialogID, onCloseCallback) {
    var dialogObject = $("#" + dialogID);
    if (dialogObject.length == 0) {
        dialogObject = $('<div id=\"' + dialogID + '\"></div>')
    }
    var width = 800;
    var height = 700;
    var maxHeight = $(window).height() - 100;
    var maxWidth = $(window).width() - 100;
    if (height > maxHeight)
        height = maxHeight;
    if (width > maxWidth)
        width = maxWidth;
    var obj = dialogObject.html('<iframe src=\"' + url + '\" width=\"100%\" height=\"100%\"></iframe>')
        .dialog({
            autoOpen: false,
            modal: true,
            height: height,
            width: width,
            title: title
        }).data("argument", null)
    obj.unbind("dialogclose");
    obj.bind('dialogclose', function (event) {
        if (onCloseCallback != null) {
            var argument = $(this).data("argument");
            onCloseCallback(argument);
        }
    });
    dialogObject.dialog('open');
}
function ShowCommonHtmlDialog(title, dialogID, onCloseCallback) {
    var showDialog = window.parent["ShowDialog"]
    return ShowHtmlDialog(title, dialogID, onCloseCallback);
}

function ShowHtmlDialog(title, dialogID, onCloseCallback) {
    var dialogObject = $("#" + dialogID);
    if (dialogObject.length > 0)
    {
        dialogObject.remove();
    }

    var width = 800;
    var height = 700;
    var maxHeight = $(window).height() -100;
    var maxWidth = $(window).width() - 100;
    if (height > maxHeight)
        height = maxHeight;
    if (width > maxWidth)
        width = maxWidth;

    dialogObject = $('<div id=\"' + dialogID + '\"></div>')
    var obj = dialogObject.dialog({
            autoOpen: false,
            modal: true,
            height: height,
            width: width,
            title: title
        }).data("argument", null)
    obj.unbind("dialogclose");
    obj.bind('dialogclose', function (event) {
        if (onCloseCallback != null) {
            var argument = $(this).data("argument");
            onCloseCallback(argument);
        }
    });
    dialogObject.dialog('open');
    return dialogObject;
}

function CloseDialog(dialogID, argument) {
    $("#" + dialogID).dialog('close')
}
function CommonCloseDialog(dialogID, argument) {
    if (SetCommonDialogArgument != null && CloseDialog != null) {
        SetCommonDialogArgument(dialogID, argument);
        CloseDialog(dialogID, argument);
    }

    var setCommonDialogArgument = window.parent["SetCommonDialogArgument"];
    var closeDialog = window.parent["CloseDialog"];
    setCommonDialogArgument(dialogID, argument);
    closeDialog(dialogID, argument);
}
function SetDialogArgument(dialogID, argument) {
    $("#" + dialogID).dialog().data("argument", argument)
}

function SetCommonDialogArgument(dialogID, argument) {
    $("#" + dialogID).dialog().data("argument", argument)
}
// ************************************************************

