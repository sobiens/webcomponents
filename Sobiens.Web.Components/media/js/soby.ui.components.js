var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// VERSION 1.0.8.1
var testObj = null;
// ********************* SOBY EDIT CONTROLS *****************************
var soby_EditControls = new Array();
var SobyPaginationViewTypes;
(function (SobyPaginationViewTypes) {
    SobyPaginationViewTypes[SobyPaginationViewTypes["PageNumbers"] = 0] = "PageNumbers";
    SobyPaginationViewTypes[SobyPaginationViewTypes["BasicButtons"] = 1] = "BasicButtons";
    SobyPaginationViewTypes[SobyPaginationViewTypes["BasicButtons_PageNumbers"] = 2] = "BasicButtons_PageNumbers";
    SobyPaginationViewTypes[SobyPaginationViewTypes["AdvancedButtons"] = 3] = "AdvancedButtons";
    SobyPaginationViewTypes[SobyPaginationViewTypes["AdvancedButtons_PageNumbers"] = 4] = "AdvancedButtons_PageNumbers";
    SobyPaginationViewTypes[SobyPaginationViewTypes["QuickButtons_PageNumbers"] = 5] = "QuickButtons_PageNumbers";
})(SobyPaginationViewTypes || (SobyPaginationViewTypes = {}));
var SobyPaginationVerticalAlign;
(function (SobyPaginationVerticalAlign) {
    SobyPaginationVerticalAlign[SobyPaginationVerticalAlign["Left"] = 0] = "Left";
    SobyPaginationVerticalAlign[SobyPaginationVerticalAlign["Center"] = 1] = "Center";
    SobyPaginationVerticalAlign[SobyPaginationVerticalAlign["Right"] = 2] = "Right";
})(SobyPaginationVerticalAlign || (SobyPaginationVerticalAlign = {}));
var SobyListItem = /** @class */ (function () {
    function SobyListItem(value, text) {
        this.Value = value;
        this.Text = text;
    }
    return SobyListItem;
}());
var SobyTextBox = /** @class */ (function () {
    function SobyTextBox(containerClientId, fieldType, args) {
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
    }
    SobyTextBox.prototype.PopulateChoiceItems = function () { };
    SobyTextBox.prototype.GetValue = function () {
        var value = $("#" + this.ContainerClientId + " input.sobytextbox").val();
        if (this.FieldType === SobyFieldTypes.Number) {
            if (isNaN(value) === true) {
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
        var input = $("<input type='textbox' class='sobytextbox'>");
        $("#" + this.ContainerClientId).html("");
        if (this.ItemClassName !== null && this.ItemClassName !== "") {
            input.addClass(this.ItemClassName);
        }
        $("#" + this.ContainerClientId).append(input);
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
}());
var SobyLookupSelectBox = /** @class */ (function () {
    function SobyLookupSelectBox(containerClientId, fieldType, args) {
        this.DataService = null;
        this.ValueFieldName = null;
        this.TitleFieldName = null;
        this.EmptyText = "Please Select";
        this.ShowEmptyOption = false;
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
        soby_EditControls[this.ContainerClientId] = this;
        if (this.Args !== null) {
            this.ValueFieldName = this.Args.ValueFieldName;
            this.TitleFieldName = this.Args.TitleFieldName;
            var readTransport = this.Args.ReadTransport;
            if (readTransport !== null && readTransport !== undefined) {
                var dataSourceBuilder = new soby_WSBuilder();
                dataSourceBuilder.Filters = new SobyFilters(false);
                dataSourceBuilder.AddSchemaField(this.Args.ValueFieldName, SobyFieldTypes.Text, null);
                dataSourceBuilder.AddSchemaField(this.Args.TitleFieldName, SobyFieldTypes.Text, null);
                if (this.Args.AdditionalReadFields !== null && this.Args.AdditionalReadFields !== undefined) {
                    var fieldNames = this.Args.AdditionalReadFields.split(",");
                    for (var i = 0; i < fieldNames.length; i++) {
                        dataSourceBuilder.AddSchemaField(fieldNames[i], SobyFieldTypes.Text, null);
                    }
                }
                var service_1 = new soby_WebServiceService(dataSourceBuilder);
                service_1.SetRowLimit(0);
                service_1.Transport.Read = new soby_TransportRequest(readTransport.Url, readTransport.DataType, readTransport.ContentType, readTransport.Type);
                this.DataService = service_1;
            }
            else {
                var service = new soby_StaticDataService([
                    new SobySchemaField(this.Args.ValueFieldName, SobyFieldTypes.Text, null),
                    new SobySchemaField(this.Args.TitleFieldName, SobyFieldTypes.Text, null)
                ], this.Args.Items);
                service.SetRowLimit(0);
                this.DataService = service;
            }
        }
    }
    SobyLookupSelectBox.prototype.GetValue = function () {
        if ($("#" + this.ContainerClientId + " select.sobylookupselectbox option.listitem:selected") === null) {
            return null;
        }
        var itemIndex = parseInt($("#" + this.ContainerClientId + " select.sobylookupselectbox option.listitem:selected").attr("itemindex"));
        return this.ListItems[itemIndex];
    };
    SobyLookupSelectBox.prototype.SetValue = function (value) {
        $("#" + this.ContainerClientId + " select.sobylookupselectbox").val(value);
    };
    SobyLookupSelectBox.prototype.PopulateChoiceItems = function () {
        this.ListItems = new Array();
        var editControl = this;
        this.DataService.ItemPopulated = function (items) {
            if (editControl.ShowEmptyOption === true) {
                var listItem = new SobyListItem("", editControl.EmptyText);
                listItem.Properties = new Array();
                editControl.ListItems.push(listItem);
            }
            for (var i = 0; i < items.length; i++) {
                var listItem = new SobyListItem(items[i][editControl.ValueFieldName], items[i][editControl.TitleFieldName]);
                listItem.Properties = items[i];
                editControl.ListItems.push(listItem);
            }
            editControl.DrawChoiceItems();
        };
        this.DataService.PopulateItems(null);
    };
    SobyLookupSelectBox.prototype.DrawChoiceItems = function () {
        var selectbox = $("#" + this.ContainerClientId + " select.sobylookupselectbox");
        selectbox.find("option.listitem").remove();
        for (var i = 0; i < this.ListItems.length; i++) {
            var option = $("<option itemindex='" + i + "' class='listitem'></option>");
            if (this.ItemClassName !== null && this.ItemClassName !== "") {
                option.addClass(this.ItemClassName);
            }
            option.attr("value", this.ListItems[i].Value);
            option.text(this.ListItems[i].Text);
            selectbox.append(option);
        }
        this.Initialized();
    };
    SobyLookupSelectBox.prototype.Initialize = function () {
        var selectBox = $("<select class='sobylookupselectbox' onchange=\"soby_EditControls['" + this.ContainerClientId + "'].ValueChanged()\"></select>");
        $("#" + this.ContainerClientId).html("");
        $("#" + this.ContainerClientId).append(selectBox);
        this.PopulateChoiceItems();
    };
    SobyLookupSelectBox.prototype.Initialized = function () { };
    SobyLookupSelectBox.prototype.ValueBeingChanged = function () { };
    SobyLookupSelectBox.prototype.ValueChanged = function () { };
    SobyLookupSelectBox.prototype.Validate = function () {
        return true;
    };
    return SobyLookupSelectBox;
}());
var SobyCheckBoxList = /** @class */ (function () {
    function SobyCheckBoxList(containerClientId, fieldType, args) {
        this.DataService = null;
        this.ValueFieldName = null;
        this.TitleFieldName = null;
        this.ShowSearchBox = false;
        this.SVGImages = new soby_SVGImages();
        this.ContainerClientId = containerClientId;
        this.FieldType = fieldType;
        this.Args = args;
        soby_EditControls[this.ContainerClientId] = this;
        if (this.Args !== null) {
            this.ValueFieldName = this.Args.ValueFieldName;
            this.TitleFieldName = this.Args.TitleFieldName;
            var readTransport = this.Args.ReadTransport;
            if (readTransport !== null) {
                var dataSourceBuilder = new soby_WSBuilder();
                dataSourceBuilder.Filters = new SobyFilters(false);
                dataSourceBuilder.AddSchemaField(this.Args.ValueFieldName, SobyFieldTypes.Text, null);
                dataSourceBuilder.AddSchemaField(this.Args.TitleFieldName, SobyFieldTypes.Text, null);
                if (this.Args.AdditionalReadFields !== null) {
                    var fieldNames = this.Args.AdditionalReadFields.split(",");
                    for (var i = 0; i < fieldNames.length; i++) {
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
    SobyCheckBoxList.prototype.GetValue = function () {
        var values = new Array();
        if (this.ShowSearchBox === true) {
            var searchBox = $("#" + this.ContainerClientId + " .sobycheckboxlist-searchbox");
            var value = searchBox.val();
            if (value !== null && value !== undefined && value !== "") {
                values[values.length] = value;
            }
        }
        var selectedInputs = $("#" + this.ContainerClientId + " ul.sobycheckboxlist input:checked");
        for (var i = 0; i < selectedInputs.length; i++) {
            var itemIndex = parseInt($(selectedInputs[i]).attr("itemindex"));
            values[values.length] = this.ListItems[itemIndex];
        }
        return values;
    };
    SobyCheckBoxList.prototype.SetValue = function (value) {
        var values = value.split(soby_FilterValueSeperator);
        this.SetArrayValue(values);
    };
    SobyCheckBoxList.prototype.SetArrayValue = function (values) {
        $("#" + this.ContainerClientId + " ul.sobycheckboxlist input:checked").prop("checked", false);
        if (values === null) {
            return;
        }
        for (var i = 0; i < values.length; i++) {
            $("#" + this.ContainerClientId + " ul.sobycheckboxlist input[value='" + values[i] + "']").prop("checked", true);
        }
        this.SaveState();
    };
    SobyCheckBoxList.prototype.PopulateChoiceItems = function () {
        var ul = $("#" + this.ContainerClientId + " ul.sobycheckboxlist");
        ul.find("li").remove();
        var li = $("<li></li>");
        li.append(this.SVGImages.GetLoading() + " Loading...");
        ul.append(li);
        this.ListItems = new Array();
        var editControl = this;
        this.DataService.ItemPopulated = function (items) {
            for (var i = 0; i < items.length; i++) {
                var listItem = new SobyListItem(items[i][editControl.ValueFieldName], items[i][editControl.TitleFieldName]);
                listItem.Properties = items[i];
                editControl.ListItems.push(listItem);
            }
            editControl.DrawChoiceItems();
        };
        this.DataService.PopulateItems(null);
    };
    SobyCheckBoxList.prototype.DrawChoiceItems = function () {
        var ul = $("#" + this.ContainerClientId + " ul.sobycheckboxlist");
        ul.find("li").remove();
        for (var i = 0; i < this.ListItems.length; i++) {
            var li = $("<li></li>");
            var inputid = soby_guid();
            var input = $("<input type='checkbox' id='" + inputid + "' itemindex='" + i + "' onclick=\"soby_EditControls['" + this.ContainerClientId + "']._ValueChanged(" + i + ")\" />");
            if (this.ItemClassName !== null && this.ItemClassName !== "") {
                input.addClass(this.ItemClassName);
            }
            if (this.SelectedValuesTempState !== null && $.inArray(this.ListItems[i].Value, this.SelectedValuesTempState) > -1) {
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
    };
    SobyCheckBoxList.prototype.Initialize = function () {
        $("#" + this.ContainerClientId).html("<ul class='sobycheckboxlist'></ul>");
        if (this.ShowSearchBox === true) {
            $("#" + this.ContainerClientId).prepend("<input type='text' class='sobycheckboxlist-searchbox'>");
        }
        this.PopulateChoiceItems();
    };
    SobyCheckBoxList.prototype.SaveState = function () {
        this.SelectedValuesTempState = new Array();
        var selectedItems = this.GetValue();
        for (var i = 0; i < selectedItems.length; i++) {
            var value = selectedItems[i].Value;
            this.SelectedValuesTempState[this.SelectedValuesTempState.length] = value;
        }
    };
    SobyCheckBoxList.prototype.Initialized = function () { };
    SobyCheckBoxList.prototype.ValueBeingChanged = function () { };
    SobyCheckBoxList.prototype.ValueChanged = function () { };
    SobyCheckBoxList.prototype._ValueChanged = function (itemIndex) {
        var isChecked = false;
        var affectedItem = null;
        if (itemIndex !== null) {
            affectedItem = this.ListItems[itemIndex];
            if ($("#" + this.ContainerClientId + " ul.sobycheckboxlist input[itemindex='" + itemIndex + "']:checked").length > 0)
                isChecked = true;
        }
        this.ListItemStateBeingChanged(affectedItem, isChecked);
        this.ValueBeingChanged();
        this.SaveState();
        this.ListItemStateChanged(affectedItem, isChecked);
        this.ValueChanged();
    };
    SobyCheckBoxList.prototype.Validate = function () {
        return true;
    };
    SobyCheckBoxList.prototype.ListItemStateBeingChanged = function (affectedItem, isChecked) { };
    SobyCheckBoxList.prototype.ListItemStateChanged = function (affectedItem, isChecked) { };
    return SobyCheckBoxList;
}());
var SobySPViewFilterCheckBoxList = /** @class */ (function (_super) {
    __extends(SobySPViewFilterCheckBoxList, _super);
    function SobySPViewFilterCheckBoxList(containerClientId, fieldType, args, webUrl, listName, fieldName) {
        var _this = _super.call(this, containerClientId, fieldType, args) || this;
        _this.WebUrl = webUrl;
        _this.ListName = listName;
        _this.FieldName = fieldName;
        _this.ShowSearchBox = true;
        return _this;
    }
    SobySPViewFilterCheckBoxList.prototype.PopulateChoiceItems = function () {
        this.ListItems = new Array();
        var editControl = this;
        soby.SPLibrary.Lists.GetListProperties(this.WebUrl, this.ListName, function (list) {
            editControl.ListId = list.ID;
            soby.SPLibrary.Views.GetViews(editControl.WebUrl, editControl.ListName, function (views) {
                editControl.ViewId = views[0].ID;
                var url = editControl.WebUrl + "/_layouts/15/filter.aspx?ListId=" + editControl.ListId + "&FieldInternalName=" + editControl.FieldName + "&ViewId=" + editControl.ViewId + "&FilterOnly=1&Filter=1";
                var container = $("<div></div>");
                container.load(url, null, function (data) {
                    var options = container.find("select option");
                    for (var i = 0; i < options.length; i++) {
                        var option = $(options[i]);
                        if (option.text() === "(All)") {
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
    };
    return SobySPViewFilterCheckBoxList;
}(SobyCheckBoxList));
var SobySelectBox = /** @class */ (function () {
    function SobySelectBox(containerClientId) {
        this.SearchOnDemand = false;
        this.AllowMultipleSelections = true;
        this.SearchParameterName = "";
        this.Items = null;
        this.SelectedItemKeyValues = null;
        this.SelectedItemDisplayValues = null;
        this.EmptyText = "Please Select";
        this.NoRecordsText = "No records found";
        this.DataService = null;
        this.ValueFieldName = null;
        this.TitleFieldName = null;
        this.ThemeName = "classic";
        this.ThemeClassName = this.ThemeName;
        this.FocusToNextItemAfterItemSelection = true;
        this.Width = '600px';
        this.LastSearchKeyword = '';
        this.SVGImages = new soby_SVGImages();
        /************************************ EVENTS *************************************/
        /**
         * Grid population event.
         *
         * @event soby_WebGrid#OnGridPopulated
         * @type {object}
         */
        this.OnSelectBoxItemsPopulated = null;
        this.ContainerClientId = containerClientId;
    }
    /*
    GetValue(): any
    {
        let value = $("#" + this.ContainerClientId + " select.sobyselectbox").val();
        return value;
    }
    */
    SobySelectBox.prototype.SetValue = function (value) {
        for (var x = 0; x < this.Items.length; x++) {
            var item = this.Items[x];
            if (item[this.ValueFieldName] === value) {
                this.SelectItem(x);
                break;
            }
        }
    };
    SobySelectBox.prototype.SetValueWithTitle = function (value, title) {
        var item = new Object();
        item[this.ValueFieldName] = value;
        item[this.TitleFieldName] = title;
        this.Items.push(item);
        this.SelectItem(this.Items.length - 1);
    };
    /**
     * Changes theme
     *
     * @themeName Name of the theme.
     * @example
     * // Hides header row menu icon
     * grid.ChangeTheme('classic');
     */
    SobySelectBox.prototype.ChangeTheme = function (themeName) {
        $(".sobyselectbox").removeClass(this.ThemeClassName);
        this.ThemeName = themeName;
        this.ThemeClassName = themeName;
        $(".sobyselectbox").addClass(this.ThemeClassName);
    };
    SobySelectBox.prototype.ShowLoadingIcon = function () {
        $("#" + this.ContainerClientId + " .loadingicon").removeClass("hidden");
        $("#" + this.ContainerClientId + " .clearitemslink").addClass("hidden");
    };
    SobySelectBox.prototype.HideLoadingIcon = function () {
        $("#" + this.ContainerClientId + " .loadingicon").addClass("hidden");
        if (this.SelectedItemKeyValues !== null && this.SelectedItemKeyValues.length > 1)
            $("#" + this.ContainerClientId + " .clearitemslink").removeClass("hidden");
        else
            $("#" + this.ContainerClientId + " .clearitemslink").addClass("hidden");
    };
    SobySelectBox.prototype.Initialize = function () {
        var selectbox = this;
        this.SelectedItemKeyValues = new Array();
        this.SelectedItemDisplayValues = new Array();
        $("#" + this.ContainerClientId).addClass("sobyselectbox");
        $("#" + this.ContainerClientId).css("width", this.Width);
        $("#" + this.ContainerClientId).addClass(this.ThemeClassName);
        $("#" + this.ContainerClientId).html("<div class='selectionfilterpanel' onclick=\"soby_EditControls['" + this.ContainerClientId + "'].ShowSelectBox()\">" +
            "<div class='selecteditemsandsearchpanel'>" +
            "<div class='selecteditems'></div>" +
            "</div>" +
            "<div class='additionalcellonexpanderpanel'>" +
            "<span class='loadingicon hidden'>" + this.SVGImages.GetLoading() + "</span>" +
            "<a href='javascript:void(0)'  onclick =\"soby_EditControls['" + this.ContainerClientId + "'].ClearItems()\" class=\"soby-itmHoverEnabled soby-selectboxitem-delete-link clearitemslink hidden\">" + this.SVGImages.GetXCircle() + "</a>" +
            "</div>" +
            "<div class='expanderpanel'>" +
            "<a href='javascript:void(0)'  onclick=\"soby_EditControls['" + this.ContainerClientId + "'].ShowHideSelectBox()\">" + this.SVGImages.GetExpand() + "</a>" +
            "</div>" +
            "</div>" +
            "<div class='selectbox hidden'>" +
            "<div class='searchpanel' style='width:100%'><input type='text' class='searchtextbox' onfocus=\"soby_EditControls['" + this.ContainerClientId + "'].SearchTextBoxFocused()\" onblur=\"soby_EditControls['" + this.ContainerClientId + "'].SearchTextBoxLostFocused()\"><div class='emptytext'></div></div>" +
            "</div><div><div>" +
            "</div>");
        $("#" + this.ContainerClientId + " .emptytext").text(this.EmptyText);
        $("#" + this.ContainerClientId + " .searchtextbox").keyup(function () {
            var keyword = $(this).val();
            if (selectbox.SearchOnDemand === false) {
                selectbox.SearchFromPopulatedData(keyword);
            }
            else {
                selectbox.SearchFromService(keyword);
            }
        });
        $("#" + this.ContainerClientId + " .searchtextbox").keydown(function (event) {
            switch (event.which) {
                case 8: //Delete
                    var selectionStart = $("#" + selectbox.ContainerClientId + " .searchtextbox")[0]["selectionStart"];
                    if (selectionStart === 0) {
                        $("#" + selectbox.ContainerClientId + " .selecteditemsandsearchpanel .selecteditem:last a").click();
                    }
                    break;
                case 40: //Up
                    event.preventDefault();
                    $("#" + selectbox.ContainerClientId + " .selectbox a:visible:first").focus();
                    break;
                case 38: //Down
                    event.preventDefault();
                    $("#" + selectbox.ContainerClientId + " .selectbox a:visible:last").focus();
                    break;
                case 37: //Left
                    var keyword = $("#" + this.ContainerClientId + " .searchtextbox").val();
                    if (keyword === null || keyword === undefined || keyword === "") {
                        event.preventDefault();
                        $("#" + selectbox.ContainerClientId + " .selecteditemsandsearchpanel .selecteditem:last a").focus();
                    }
                    break;
            }
        });
        $('body').click(function (evt) {
            if ($(evt.target).parents('#' + selectbox.ContainerClientId).length === 0) {
                selectbox.HideSelectBox();
            }
        });
        soby_EditControls[this.ContainerClientId] = this;
        if (this.DataService !== null) {
            var editControl_1 = this;
            this.DataService.ItemPopulated = function (items) {
                editControl_1.Items = items;
                var selectbox = $("#" + editControl_1.ContainerClientId + " .selectbox");
                selectbox.find(".soby_dataitem").remove();
                if (items.length === 0) {
                    var option = $("<div class='item soby_dataitem soby-itmHoverEnabled'></div>");
                    option.text(editControl_1.NoRecordsText);
                    selectbox.append(option);
                }
                for (var i = 0; i < items.length; i++) {
                    var option = $("<div class='item soby_dataitem soby-itmHoverEnabled'></div>");
                    var itemLink = $("<a href='javascript:void(0)'></a>");
                    var title = items[i][editControl_1.TitleFieldName];
                    if (title === null)
                        title = "";
                    option.attr("value", items[i][editControl_1.ValueFieldName]);
                    option.attr("title", title);
                    option.attr("itemindex", i);
                    itemLink.text(items[i][editControl_1.TitleFieldName]);
                    itemLink.attr("onclick", "soby_EditControls['" + editControl_1.ContainerClientId + "'].SelectItem(" + i + ")");
                    option.append(itemLink);
                    selectbox.append(option);
                    itemLink.keydown(function (event) {
                        switch (event.which) {
                            case 40:
                                if ($(this).parent().nextAll(":visible:first").length > 0) {
                                    event.preventDefault();
                                    $(this).parent().nextAll(":visible:first").find("a").focus();
                                }
                                else {
                                    $("#" + editControl_1.ContainerClientId + " .searchtextbox").focus();
                                    $("#" + editControl_1.ContainerClientId + " .searchtextbox").select();
                                }
                                break;
                            case 38:
                                if ($(this).parent().prevAll(":visible:first").length > 0) {
                                    event.preventDefault();
                                    $(this).parent().prevAll(":visible:first").find("a").focus();
                                }
                                else {
                                    $("#" + editControl_1.ContainerClientId + " .searchtextbox").focus();
                                    $("#" + editControl_1.ContainerClientId + " .searchtextbox").select();
                                }
                                break;
                        }
                    });
                }
                editControl_1.Initialized();
                if (editControl_1.OnSelectBoxItemsPopulated !== null)
                    editControl_1.OnSelectBoxItemsPopulated();
                editControl_1.HideLoadingIcon();
            };
            this.ShowLoadingIcon();
            this.DataService.PopulateItems(null);
        }
    };
    SobySelectBox.prototype.SearchFromService = function (keyword) {
        this.ShowLoadingIcon();
        for (var i = this.DataService.DataSourceBuilder.Filters.Filters.length - 1; i > -1; i--) {
            if (this.DataService.DataSourceBuilder.Filters.Filters[i].FieldName === this.SearchParameterName) {
                this.DataService.DataSourceBuilder.Filters.Filters.splice(i, 1);
            }
        }
        this.DataService.DataSourceBuilder.Filters.AddFilter(this.SearchParameterName, keyword, SobyFieldTypes.Text, SobyFilterTypes.Contains, false, true);
        this.DataService.PopulateItems(null);
    };
    SobySelectBox.prototype.SearchFromPopulatedData = function (keyword) {
        if (this.LastSearchKeyword === keyword)
            return;
        this.LastSearchKeyword = keyword;
        this.ShowLoadingIcon();
        $("#" + this.ContainerClientId + " .soby_dataitem").addClass("hidden");
        if (this.SelectedItemKeyValues.length === 0 && keyword === "") {
            $("#" + this.ContainerClientId + " .emptytext").show();
        }
        else {
            $("#" + this.ContainerClientId + " .emptytext").hide();
        }
        if (keyword.length > 0) {
            $("#" + this.ContainerClientId + " .soby_dataitem[title*=\"" + keyword.toLowerCase() + "\" i] ").removeClass("hidden");
        }
        else {
            $("#" + this.ContainerClientId + " .soby_dataitem").removeClass("hidden");
        }
        $(this).css("width", (keyword.length * 30) + "px");
        this.HideLoadingIcon();
    };
    SobySelectBox.prototype.SelectItem = function (index) {
        var selectedItem = this.Items[index];
        var keyValue = selectedItem[this.ValueFieldName];
        var displayValue = selectedItem[this.TitleFieldName];
        if (this.AllowMultipleSelections === false) {
            this.SelectedItemKeyValues = new Array();
            this.SelectedItemDisplayValues = new Array();
        }
        if ($.inArray(keyValue, this.SelectedItemKeyValues) === -1) {
            this.SelectedItemKeyValues.push(keyValue);
            this.SelectedItemDisplayValues.push(displayValue);
        }
        this.PopulateSelectedItems();
        var selectedItemDiv = $("#" + this.ContainerClientId + " .selectbox .soby_dataitem[itemindex='" + index + "']");
        if (selectedItemDiv.nextAll(":visible:first").length > 0 && this.FocusToNextItemAfterItemSelection === true) {
            event.preventDefault();
            selectedItemDiv.nextAll(":visible:first").find("a").focus();
        }
        else if (selectedItemDiv.prevAll(":visible:first").length > 0 && this.FocusToNextItemAfterItemSelection === true) {
            event.preventDefault();
            selectedItemDiv.prevAll(":visible:first").find("a").focus();
        }
        else {
            $("#" + this.ContainerClientId + " .searchtextbox").focus();
        }
        this.HideLoadingIcon();
        this.ValueChanged();
        if (this.AllowMultipleSelections === false) {
            this.HideSelectBox();
        }
    };
    SobySelectBox.prototype.PopulateSelectedItems = function () {
        var editControl = this;
        $("#" + this.ContainerClientId + " .soby_dataitem").removeClass("selected");
        var keyword = $("#" + this.ContainerClientId + " .searchtextbox").val();
        var selectedItemsPanel = $("#" + this.ContainerClientId + " .selecteditems");
        selectedItemsPanel.html("");
        if (this.SelectedItemKeyValues.length === 0 && keyword === "") {
            $("#" + this.ContainerClientId + " .emptytext").show();
        }
        else {
            $("#" + this.ContainerClientId + " .emptytext").hide();
        }
        for (var i = 0; i < this.SelectedItemKeyValues.length; i++) {
            var keyValue = this.SelectedItemKeyValues[i];
            var selectedItem = null;
            for (var x = 0; x < this.Items.length; x++) {
                var item = this.Items[x];
                if (item[this.ValueFieldName] === keyValue) {
                    selectedItem = item;
                    $("#" + this.ContainerClientId + " .soby_dataitem[itemindex='" + x + "']").addClass("selected");
                    break;
                }
            }
            if (selectedItem !== null) {
                var selectedItemContainer = $("<div class='selecteditem'></div>");
                var removeselectedItemLink = $("<a href='javascript:void(0)' onclick=\"soby_EditControls['" + this.ContainerClientId + "'].RemoveItem(" + i + ")\" class='soby-itmHoverEnabled soby-selectboxitem-delete-link'>" + this.SVGImages.GetXCircle() + "</a>");
                selectedItemContainer.text(selectedItem[this.TitleFieldName] + " ");
                selectedItemContainer.append(removeselectedItemLink);
                selectedItemsPanel.append(selectedItemContainer);
                removeselectedItemLink.keydown(function (event) {
                    switch (event.which) {
                        case 46: //Delete
                            event.preventDefault();
                            $(this).click();
                            break;
                        case 39: //Right
                            event.preventDefault();
                            if ($(this).parent().nextAll("div:visible:first").length > 0) {
                                event.preventDefault();
                                $(this).parent().nextAll("div:visible:first").find("a").focus();
                            }
                            else {
                                $("#" + editControl.ContainerClientId + " .searchtextbox").focus();
                            }
                            break;
                        case 37: //Down
                            event.preventDefault();
                            if ($(this).parent().prevAll(":visible:first").length > 0) {
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
    };
    SobySelectBox.prototype.GetSelectedItems = function () {
        var selectedItems = new Array();
        for (var i = 0; i < this.SelectedItemKeyValues.length; i++) {
            var keyValue = this.SelectedItemKeyValues[i];
            var selectedItem = null;
            for (var x = 0; x < this.Items.length; x++) {
                var item = this.Items[x];
                if (item[this.ValueFieldName] === keyValue) {
                    selectedItem = item;
                    break;
                }
            }
            if (selectedItem !== null) {
                selectedItems[selectedItems.length] = selectedItem;
            }
        }
        return selectedItems;
    };
    SobySelectBox.prototype.RemoveItem = function (index) {
        this.SelectedItemKeyValues.splice(index, 1);
        this.SelectedItemDisplayValues.splice(index, 1);
        this.PopulateSelectedItems();
        var selectbox = this;
        setTimeout(function () {
            selectbox.ShowSelectBox();
        }, 500);
        this.HideLoadingIcon();
        this.ValueChanged();
    };
    SobySelectBox.prototype.ClearItems = function () {
        this.SelectedItemKeyValues = new Array();
        this.SelectedItemDisplayValues = new Array();
        this.PopulateSelectedItems();
        var selectbox = this;
        setTimeout(function () {
            selectbox.ShowSelectBox();
        }, 500);
        this.ValueChanged();
    };
    SobySelectBox.prototype.ShowHideSelectBox = function () {
        var selectbox = this;
        if ($("#" + this.ContainerClientId + " .selectbox").hasClass("hidden") === true) {
            this.ShowSelectBox();
        }
        else {
            setTimeout(function () {
                selectbox.HideSelectBox();
            }, 500);
        }
    };
    SobySelectBox.prototype.ShowSelectBox = function () {
        if ($("#" + this.ContainerClientId + " .selectbox").hasClass("hidden") === false) {
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
    };
    SobySelectBox.prototype.HideSelectBox = function () {
        $("#" + this.ContainerClientId + " .selectbox").addClass("hidden");
    };
    SobySelectBox.prototype.SearchTextBoxLostFocused = function () {
        $("#" + this.ContainerClientId).removeClass("focus");
    };
    SobySelectBox.prototype.SearchTextBoxFocused = function () {
        $("#" + this.ContainerClientId).addClass("focus");
        this.ShowSelectBox();
    };
    SobySelectBox.prototype.Initialized = function () { };
    SobySelectBox.prototype.ValueBeingChanged = function () { };
    SobySelectBox.prototype.ValueChanged = function () { };
    SobySelectBox.prototype.Validate = function () {
        return true;
    };
    return SobySelectBox;
}());
var SobyEditControlFactory = /** @class */ (function () {
    function SobyEditControlFactory() {
    }
    SobyEditControlFactory.prototype.CreateEditControl = function (containerClientId, fieldType, args) {
        var editControl = null;
        if (fieldType === SobyFieldTypes.Text) {
            editControl = new SobyTextBox(containerClientId, SobyFieldTypes.Text, args);
        }
        else if (fieldType === SobyFieldTypes.Number) {
            editControl = new SobyTextBox(containerClientId, SobyFieldTypes.Number, args);
        }
        else if (fieldType === SobyFieldTypes.Lookup) {
            editControl = new SobyLookupSelectBox(containerClientId, SobyFieldTypes.Lookup, args);
        }
        return editControl;
    };
    SobyEditControlFactory.prototype.GetEditControl = function (containerClientId) {
        return soby_EditControls[containerClientId];
    };
    return SobyEditControlFactory;
}());
var sobyEditControlFactory = new SobyEditControlFactory();
// **********************************************************************
// ********************* SOBY GRID *****************************
var soby_WebGrids = new Array();
var soby_IsCtrlOnHold = false;
var SobyShowFieldsOnObject = /** @class */ (function () {
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
}());
var SobyShowFieldsOn = new SobyShowFieldsOnObject();
if ($("form") !== null) {
    $("form").click(function (args) {
        if ($(args.target).parents().hasClass("sobygridmenu") === false) {
            $(".sobygridmenu").hide();
        }
    });
}
/*
function soby_RemoveNoneExistenceGrid() {
    let newArray = new Array();
    for (let x in soby_WebGrids) {
        if ($(soby_WebGrids[x].ContentDivSelector + "[gridid='" + soby_WebGrids[x].GridID + "']").length > 0)
        {
            newArray[soby_WebGrids[x].GridID] = soby_WebGrids[x];
        }
    }

    soby_WebGrids = newArray;
}
*/
document.onkeydown = function (event) {
    if (event.keyCode === 17) {
        soby_IsCtrlOnHold = true;
    }
};
window.onresize = function (event) {
    var grids = soby_GetAllGrids();
    for (var i = 0; i < grids.length; i++) {
        grids[i].ApplyResponsiveElementsVisibility();
    }
};
document.onkeyup = function (event) {
    //    soby_LogMessage(event.keyCode)
    if (event.keyCode === 17) {
        soby_IsCtrlOnHold = false;
    }
    var activeGrid = soby_GetActiveDataGrid();
    if (activeGrid === null || activeGrid === undefined) {
        return;
    }
    if (event.keyCode === 113 && activeGrid.IsEditable === true) // F12 Edit Mode
     {
        activeGrid.EditSelectedRow();
    }
    var selectedCellID = activeGrid.GetSelectedCellID();
    var rowID;
    var cellIndex;
    var rowIndex;
    if (selectedCellID !== null) {
        rowID = $("#" + selectedCellID).attr("rowid");
        cellIndex = parseInt($("#" + selectedCellID).attr("cellindex"));
        rowIndex = parseInt($("#" + selectedCellID).parent().attr("rowindex"));
    }
    if (event.keyCode === 37) /* left */ {
        if (cellIndex > 0) {
            cellIndex--;
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode === 38) /* up */ {
        if (rowIndex > 0) {
            rowIndex--;
            rowID = $(activeGrid.ContentDivSelector + " tr[rowindex='" + rowIndex + "'").attr("id");
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode === 39) /* right */ {
        if (cellIndex < activeGrid.Columns.length - 1) {
            cellIndex++;
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
    else if (event.keyCode === 40) /* down */ {
        if (rowIndex < $(activeGrid.ContentDivSelector + " .soby_griddatarow").length - 1) {
            rowIndex++;
            rowID = $(activeGrid.ContentDivSelector + " tr[rowindex='" + rowIndex + "'").attr("id");
            activeGrid.SelectCell(rowID, cellIndex);
        }
    }
};
function soby_GetActiveDataGrid() {
    //    soby_RemoveNoneExistenceGrid();
    var activeGridID = $(".soby_grid.active:visible").attr("id");
    return soby_WebGrids[activeGridID];
}
function soby_GetAllGrids() {
    //    soby_RemoveNoneExistenceGrid();
    var grids = new Array();
    for (var key in soby_WebGrids) {
        if ($(soby_WebGrids[key].ContentDivSelector + "[gridid='" + soby_WebGrids[key].GridID + "']").length === 0)
            continue;
        grids.push(soby_WebGrids[key]);
    }
    /*
    let keys = Object.keys(soby_WebGrids);
    let grids = new Array();
    for (let i = 0; i < keys.length; i++)
    {
        grids.push(soby_WebGrids[keys[i]]);
    }
    */
    return grids;
}
function soby_GetAllVisibleGrids() {
    //   soby_RemoveNoneExistenceGrid();
    var visibleGridIDs = $(".soby_grid:visible");
    var grids = new Array();
    for (var i = 0; i < visibleGridIDs.length; i++) {
        var gridId = $(visibleGridIDs[i]).attr("id");
        grids.push(soby_WebGrids[gridId]);
    }
    return grids;
}
function soby_RefreshAllGrids() {
    var grids = soby_GetAllGrids();
    for (var x = 0; x < grids.length; x++) {
        grids[x].Initialize(true);
    }
}
var sobyActionPaneButtons = /** @class */ (function (_super) {
    __extends(sobyActionPaneButtons, _super);
    function sobyActionPaneButtons(items) {
        var _this = _super.call(this) || this;
        if (items) {
            _this.push.apply(_this, items);
        }
        Object.setPrototypeOf(_this, Object.create(sobyActionPaneButtons.prototype));
        return _this;
    }
    sobyActionPaneButtons.prototype.Clone = function () {
        var buttons = new sobyActionPaneButtons();
        for (var i = 0; i < buttons.length; i++) {
            buttons.AddButton(buttons[i].Clone());
        }
        return buttons;
    };
    sobyActionPaneButtons.prototype.AddButton = function (button) {
        this.push(new sobyActionPaneButton(button.Key, button.Text, button.Index, button.ImageUrl, button.ClassName, button.Visible, button.OnClick, button.EnabilityFunction));
        return this[this.length - 1];
    };
    sobyActionPaneButtons.prototype.Add = function (key, text, index, imageUrl, className, visible, onClick, enabilityFunction) {
        this.push(new sobyActionPaneButton(key, text, index, imageUrl, className, visible, onClick, enabilityFunction));
        return this[this.length - 1];
    };
    sobyActionPaneButtons.prototype.AddAsSVG = function (key, text, index, svg, className, visible, onClick, enabilityFunction) {
        var button = this.Add(key, text, index, "", className, visible, onClick, enabilityFunction);
        button.SVG = svg;
        return button;
    };
    sobyActionPaneButtons.prototype.AddCollection = function (buttons) {
        for (var i = 0; i < buttons.length; i++) {
            //this.splice(0, 0, buttons[i]);
            this.push(buttons[i]);
        }
    };
    sobyActionPaneButtons.prototype.Get = function (key) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].Key.toLowerCase() === key.toLowerCase()) {
                return this[i];
            }
        }
    };
    sobyActionPaneButtons.prototype.Hide = function (key) {
        this.Get(key).Hide();
    };
    sobyActionPaneButtons.prototype.Show = function (key) {
        this.Get(key).Show();
    };
    return sobyActionPaneButtons;
}(Array));
var sobyActionPaneButton = /** @class */ (function () {
    function sobyActionPaneButton(key, text, index, imageUrl, className, visible, onClick, enabilityFunction) {
        this.ID = "actionpanebutton_" + soby_guid();
        this.Key = "";
        this.Text = "";
        this.Index = null;
        this.ImageUrl = "";
        this.ClassName = "";
        this.Visible = true;
        this.OnClick = null;
        this.EnabilityFunction = null;
        this.SVG = null;
        this.Key = key;
        this.Text = text;
        this.Index = index;
        this.ImageUrl = imageUrl;
        this.ClassName = className;
        this.OnClick = onClick;
        this.Visible = visible;
        this.EnabilityFunction = enabilityFunction;
    }
    sobyActionPaneButton.prototype.Clone = function () {
        var button = new sobyActionPaneButton(this.Key, this.Text, this.Index, this.ImageUrl, this.ClassName, this.Visible, this.OnClick, this.EnabilityFunction);
        return button;
    };
    sobyActionPaneButton.prototype.Hide = function () {
        $("#" + this.ID).hide();
    };
    sobyActionPaneButton.prototype.Show = function () {
        $("#" + this.ID).show();
    };
    return sobyActionPaneButton;
}());
var sobyResponsiveCondition = /** @class */ (function () {
    function sobyResponsiveCondition(validateFunction) {
        this.ValidateFunction = null;
        this.ID = null;
        this.ValidateFunction = validateFunction;
        this.ID = soby_guid();
    }
    sobyResponsiveCondition.prototype.Validate = function () {
        var width = $(window).width();
        var height = $(window).height();
        return this.ValidateFunction(width, height);
    };
    sobyResponsiveCondition.prototype.GetClassName = function () {
        return "responsivecondition_" + this.ID;
    };
    return sobyResponsiveCondition;
}());
var SobyGridColumn = /** @class */ (function () {
    function SobyGridColumn(fieldName, displayName, showFieldsOn, displayFunction, cellTemplate, sortable, filterable, editable, filterControl, cellCss, cellClassNames, responsiveConditionID) {
        if (filterControl === void 0) { filterControl = null; }
        this.FilterControl = null;
        this.CellCss = "";
        this.CellClassNames = "";
        this.HeaderCss = "";
        this.HeaderClassNames = "";
        this.ResponsiveConditionID = null;
        this.IsVisible = true;
        this.FieldName = fieldName;
        this.DisplayName = displayName;
        this.ShowFieldsOn = showFieldsOn;
        this.DisplayFunction = displayFunction;
        this.CellTemplate = cellTemplate;
        this.Sortable = sortable;
        this.Filterable = filterable;
        this.Editable = editable;
        this.FilterControl = filterControl;
        this.CellCss = cellCss;
        this.CellClassNames = cellClassNames;
        this.ResponsiveConditionID = responsiveConditionID;
    }
    return SobyGridColumn;
}());
var soby_WebGrid = /** @class */ (function () {
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
    function soby_WebGrid(contentDivSelector, title, dataService, emptyDataHtml) {
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
        this.ActionInProgress = false;
        this.NavigationActionInProgress = false;
        this.Active = false;
        this.AllowExportData = false;
        this.AllowMultipleSelections = true;
        this.GridID = "";
        this.ThemeName = "classic";
        this.ThemeClassName = this.ThemeName;
        this.ContentDivSelector = "";
        this.ItemDialogClientID = "";
        this.Title = "";
        this.AltTitle = "";
        this.DisplayTitle = true;
        this.DataService = null;
        this.EmptyDataHtml = "";
        this.NavigationInformation = new SobyNavigationInformation();
        this.OrderByFields = new SobyOrderByFields();
        this.Filters = new SobyFilters(false);
        this.FilterControls = new Array();
        this.GroupByFields = new SobyGroupByFields();
        this.AggregateFields = new SobyAggregateFields();
        this.ResponsiveConditions = new Array();
        this.KeyFields = new SobyKeyFields();
        this.CellCount = 0;
        this.DataRelations = new Array();
        this.Columns = new Array();
        this.InitializedActionPaneButtons = false;
        this.IsSelectable = true;
        this.IsAddAllowed = true;
        this.IsEditable = true;
        this.IsDeletable = true;
        this.IsGroupable = false;
        this.Items = null;
        this.ShowRefreshButton = true;
        this.ShowHeader = true;
        this.SVGImages = new soby_SVGImages();
        this.ActionPaneButtons = new sobyActionPaneButtons();
        this.LastGroupByValues = new Array();
        this.TableTagName = "table";
        this.TBodyTagName = "tbody";
        this.THeadTagName = "thead";
        this.RowTagName = "tr";
        this.CellTagName = "td";
        this.TableAdditionalClassNames = "";
        this.RowAdditionalClassNames = "";
        this.CellAdditionalClassNames = "";
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
         * Grid population event.
         *
         * @event soby_WebGrid#OnGridDataBeingParsed
         * @type {object}
         */
        this.OnGridDataBeingParsed = null;
        /**
         * Grid before print event.
         *
         * @event soby_WebGrid#OnGridPrintBeingStarted
         * @type {object}
         */
        this.OnGridPrintBeingStarted = null;
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
        /**
         * Grid population event.
         *
         * @event soby_WebGrid#OnGridPopulated
         * @type {object}
         */
        this.OnCellTemplateContentPopulated = null;
        this.RowDetailDisplayFunction = null;
        this.RowDetailDisplayViewResponsiveCondition = null;
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
    soby_WebGrid.prototype.Clone = function (contentDivSelector) {
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
        grid.KeyFields = this.KeyFields;
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
    };
    soby_WebGrid.prototype.GetResponsiveConditionById = function (id) {
        for (var i = 0; i < this.ResponsiveConditions.length; i++) {
            if (this.ResponsiveConditions[i].ID === id) {
                return this.ResponsiveConditions[i];
            }
        }
        return null;
    };
    soby_WebGrid.prototype.InitializeActionPaneButtons = function () {
        if (this.InitializedActionPaneButtons === true) {
            return;
        }
        var buttons = new sobyActionPaneButtons();
        buttons.AddAsSVG("ExportToExcel", "Export to excel", 0, this.SVGImages.GetExcel(), "soby-icon-excel", true, function (grid) {
            grid.ExportToExcel();
        }, function (grid) { return grid.AllowExportData; });
        buttons.AddAsSVG("ExportToCSV", "Export to csv", 1, this.SVGImages.GetCSV(), "soby-icon-csv", true, function (grid) {
            grid.ExportTableToCSV();
        }, function (grid) { return grid.AllowExportData; });
        buttons.AddAsSVG("PrintGrid", "Print", 2, this.SVGImages.GetPrint(), "soby-icon-print", true, function (grid) {
            grid.PrintGrid();
        }, function (grid) { return grid.AllowExportData; });
        buttons.AddAsSVG("CopyToClipboard", "Copy to clipboard", 3, this.SVGImages.GetClipboard(), "soby-icon-clipboard", true, function (grid) {
            grid.CopyToClipboard();
        }, function (grid) { return grid.AllowExportData; });
        this.ActionPaneButtons.AddCollection(buttons);
        this.InitializedActionPaneButtons = true;
    };
    /**
     * Ensures grid is in the global grid array.
     *
     * @example
     * // Ensures grid is in the global grid array.
     * grid.EnsureGridExistency();
     */
    soby_WebGrid.prototype.EnsureGridExistency = function () {
        for (var key in soby_WebGrids) {
            if (key === this.GridID) {
                return;
            }
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
        if (dialog.length === 0) {
            dialog = $("<div class='sobyitemdialog " + this.ThemeClassName + "'></div>");
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
        var row = null;
        if (isEditForm === true)
            row = $("#" + rowId);
        var table = $("<table></table>");
        dialog.append(table);
        var _loop_1 = function (i) {
            var column = this_1.Columns[i];
            if (column.Editable === false) {
                return "continue";
            }
            var fieldRow = $("<tr></tr>");
            var fieldLabelCell = $("<td></td>");
            fieldLabelCell.text(column.DisplayName);
            var fieldEditControlCell = $("<td></td>");
            var cellId = this_1.GridID + "_fieldeditcell_" + column.FieldName;
            fieldEditControlCell.attr("id", cellId);
            fieldRow.append(fieldLabelCell);
            fieldRow.append(fieldEditControlCell);
            table.append(fieldRow);
            var viewField = this_1.DataService.DataSourceBuilder.GetViewFieldByPropertyName(column.FieldName);
            var fieldType = viewField.FieldType;
            var editControl = sobyEditControlFactory.CreateEditControl(cellId, fieldType, viewField.Args);
            var grid = this_1;
            editControl.Initialized = function () {
                if (isEditForm === true) {
                    var rowIndex = parseInt(row.attr("rowindex"));
                    var fieldValue = grid.GetItemFieldValue(rowIndex, column.FieldName);
                    editControl.SetValue(fieldValue);
                }
            };
            editControl.Initialize();
        };
        var this_1 = this;
        for (var i = 0; i < this.Columns.length; i++) {
            _loop_1(i);
        }
        var actionPanel = $("<p align='right'></p>");
        var saveButton = $("<input type='button' value='Save' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SaveItemDetail(" + (isEditForm === true ? "'" + rowId + "'" : "null") + ")\">");
        var cancelButton = $("<input type='button' value='Cancel' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].HideItemDialog()\">");
        actionPanel.append(saveButton);
        actionPanel.append(cancelButton);
        dialog.append(actionPanel);
        if (isEditForm === false) {
            row = $(this.ContentDivSelector + " .actionpane");
        }
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
        if (selectedRowIDs.length !== 1) {
            return;
        }
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
        var dbInstance = {};
        var viewFields = this.DataService.DataSourceBuilder.SchemaFields;
        for (var i = 0; i < viewFields.length; i++) {
            dbInstance[viewFields[i].FieldName] = null;
            if (rowId !== null && rowId !== "") {
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
            if (column.Editable === false) {
                for (var x = 0; x < this.KeyFields.length; x++) {
                    if (this.KeyFields[x].FieldName === column.FieldName) {
                        dbInstance[column.FieldName] = 0;
                    }
                }
                continue;
            }
            //let fieldType = column.FieldType;
            var cellId = this.GridID + "_fieldeditcell_" + column.FieldName;
            //            let fieldOldValue = this.GetItemFieldValue(rowIndex, column.FieldName);
            var editControl = sobyEditControlFactory.GetEditControl(cellId);
            var fieldNewValue = editControl.GetValue();
            if (fieldNewValue !== null && fieldNewValue.Value !== null)
                fieldNewValue = fieldNewValue.Value;
            dbInstance[column.FieldName] = fieldNewValue;
        }
        if (rowId !== null && rowId !== "") {
            this.DataService.UpdateItem(parameterNames, dbInstanceIds, dbInstance);
        }
        else {
            //dbInstance[this.KeyFields[0]] = 0;
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
        if (confirm("Are you sure you want to delete the selected item(s)") === false) {
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
        let textBox = new SobyTextBox(cellId, SobyFieldTypes.Text);
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
        //let fieldType = this.Columns[columnIndex].FieldType;
        //        let editControl = sobyEditControlFactory.GetEditControl(cellId, fieldType);
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
    soby_WebGrid.prototype.AddKeyField = function (fieldName, parameterName) {
        this.KeyFields.push(new SobyKeyField(fieldName, parameterName));
    };
    /**
    * Not implemented yet.
    */
    soby_WebGrid.prototype.AddFilterControl = function (fieldName, displayName, fieldType) {
        this.FilterControls[this.FilterControls.length] = { FieldName: fieldName, DisplayName: displayName, FieldType: fieldType };
    };
    /**
     * Adds an aggregate field
     *
     * @fieldName Name of the field.
     * @aggregateType Type of the aggregate action.
     * @example
     * // Adds Sum of 'Price' field
     * grid.AddAggregateField("Price", SobyAggregateTypes.Sum);
     */
    soby_WebGrid.prototype.AddAggregateField = function (fieldName, aggregateType) {
        this.AggregateFields.push(new SobyAggregateField(fieldName, aggregateType));
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
    soby_WebGrid.prototype.AddColumn = function (fieldName, displayName, showFieldsOn, displayFunction, cellTemplate, sortable, filterable, editable, filterControl, cellCss, cellClassNames, responsiveCondition) {
        var responsiveConditionID = null;
        if (responsiveCondition !== null && responsiveCondition !== undefined) {
            responsiveConditionID = responsiveCondition.ID;
            var exists = false;
            for (var i = 0; i < this.ResponsiveConditions.length; i++) {
                if (this.ResponsiveConditions[i].ID === responsiveCondition.ID) {
                    exists = true;
                    break;
                }
            }
            if (exists === false) {
                this.ResponsiveConditions.push(responsiveCondition);
            }
        }
        var gridColumn = new SobyGridColumn(fieldName, displayName, showFieldsOn, displayFunction, cellTemplate, sortable, filterable, editable, filterControl, cellCss, cellClassNames, responsiveConditionID);
        this.Columns.push(gridColumn);
        return gridColumn;
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
    soby_WebGrid.prototype.GetRowIdByItemIndex = function (itemIndex) {
        var row = $(this.ContentDivSelector + " .soby_griddatarow[rowindex='" + itemIndex + "']");
        if (row !== null) {
            return row.attr("id");
        }
        return null;
    };
    /**
     * Gets selected row identifier
     * @example
     * // returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
     * grid.GetSelectedRowID()
     */
    soby_WebGrid.prototype.GetSelectedRowID = function () {
        var selectedRow = $(this.ContentDivSelector + " .soby_griddatarow.selected");
        if (selectedRow.length > 0) {
            return selectedRow.attr("id");
        }
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
        if (activeRow.length > 0) {
            return activeRow.attr("id");
        }
        return null;
    };
    /**
     * Gets row identifiers
     * @example
     * // returns ["soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec", "soby_griddatarow_f0b7f7e8-6b89-accf-0446-88eda73e0bee"]
     * grid.GetRowIds()
     */
    soby_WebGrid.prototype.GetSelectedCellIds = function () {
        var cellIds = new Array();
        var cellsSelectors = $(this.ContentDivSelector + " .soby_gridcell.selected");
        for (var i = 0; i < cellsSelectors.length; i++) {
            cellIds[cellIds.length] = $(cellsSelectors[i]).attr("id");
        }
        return cellIds;
    };
    /**
     * Gets selected cell identifier
     * @example
     * // returns "soby_gridcell_8be81bcb-ae80-5309-3d8a-6ad091c01051"
     * grid.GetSelectedCellID();
     */
    soby_WebGrid.prototype.GetSelectedCellID = function () {
        var selectedCell = $(this.ContentDivSelector + " .soby_gridcell.selected");
        if (selectedCell.length > 0) {
            return selectedCell.attr("id");
        }
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
            if (this.Columns[i].FieldName === fieldName) {
                return this.Columns[i];
            }
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
    soby_WebGrid.prototype.SelectAllRows = function () {
        var isSelected = $(".soby_gridheaderrow").hasClass("selected");
        if (isSelected === true) {
            $(".soby_gridheaderrow").removeClass("selected");
        }
        else {
            $(".soby_gridheaderrow").addClass("selected");
        }
        var rowsSelectors = $(this.ContentDivSelector + " .soby_griddatarow");
        for (var i = 0; i < rowsSelectors.length; i++) {
            if (isSelected === false) {
                var rowId = $(rowsSelectors[i]).attr("id");
                $(rowsSelectors[i]).addClass("selected");
                if (this.OnRowSelected !== null) {
                    this.OnRowSelected(this, rowId);
                }
            }
            else {
                $(rowsSelectors[i]).removeClass("selected");
            }
        }
        this.SetActionPaneButtonsVisibility();
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
            if (selectedRowIDs[i] === rowID) {
                alreadyExistRowIndex = i;
                break;
            }
        }
        if (alreadyExistRowIndex > -1) {
            $("#" + selectedRowIDs[alreadyExistRowIndex]).removeClass("selected");
        }
        else if (this.AllowMultipleSelections === true && soby_IsCtrlOnHold === true) {
            $("#" + rowID).addClass("selected");
        }
        else {
            $(this.ContentDivSelector + " .soby_griddatarow").removeClass("selected");
            $("#" + rowID).addClass("selected");
        }
        this.GenerateActionPane();
        if ($(".soby_griddetailrow[mainrowid = '" + rowID + "'] .soby_gridtabheaderpanel").html() !== "") {
            this.SelectDetailGridTab(rowID, 0);
        }
        if (this.OnRowSelected !== null) {
            this.OnRowSelected(this, rowID);
        }
        this.SetActionPaneButtonsVisibility();
    };
    /**
     * Selects the row
     *
     * @rowIndex Index of the row.
     * @example
     * // Selects the row with given row index
     * grid.SelectRow(1);
     */
    soby_WebGrid.prototype.SelectRowByIndex = function (rowIndex) {
        var rowId = $(this.ContentDivSelector + " .soby_griddatarow:eq(" + rowIndex + ")").attr("id");
        this.SelectRow(rowId);
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
        if (this.OnCellSelected !== null) {
            this.OnCellSelected(this, rowID, cellIndex);
        }
        this.SetActionPaneButtonsVisibility();
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
        if (isVisible === true) {
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
        if (this.FilterControls.length === 0) {
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
        this.GroupBy(fieldName, true, null);
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
            if (this.GroupByFields[i].FieldName !== fieldName) {
                newGroupByFields.push(this.GroupByFields[i]);
            }
        }
        this.GroupByFields = newGroupByFields;
        this.DataService.GroupBy(this.GroupByFields);
    };
    soby_WebGrid.prototype.ExportToExcel = function () {
        var filename = 'exportdata1.xls';
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(this.GridID);
        var newTable = $(tableSelect.outerHTML);
        newTable.find(".groupbypanerow").remove();
        newTable.find(".actionpanerow").remove();
        newTable.find(".loadingrow").remove();
        newTable.find("img").remove();
        var tableHTML = newTable[0].outerHTML;
        var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
        tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
        tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
        tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
        tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
        tab_text = tab_text + "<table border='1px'>";
        tab_text = tab_text + tableHTML;
        tab_text = tab_text + '</table></body></html>';
        var blob = new Blob([tab_text], { type: "application/vnd.ms-excel;charset=utf-8" });
        downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            // Setting the file name
            downloadLink.download = filename;
            //triggering the function
            downloadLink.click();
        }
    };
    soby_WebGrid.prototype.ExportTableToCSV = function () {
        var filename = "exportdata.csv";
        var csv = [];
        var rows = document.getElementById(this.GridID).querySelectorAll("tr.soby_gridheaderrow, tr.soby_griddatarow");
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].textContent);
            csv.push(row.join(","));
        }
        // Download CSV file
        this.DownloadCSV(csv.join("\n"), filename);
    };
    soby_WebGrid.prototype.DownloadCSV = function (csv, filename) {
        var csvFile;
        var downloadLink;
        // CSV file
        csvFile = new Blob([csv]);
        // , { type: "text/csv" }
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(csvFile, "filename.csv");
        }
        else {
            // Download link
            downloadLink = document.createElement("a");
            // File name
            downloadLink.download = filename;
            // Create a link to the file
            downloadLink.href = window.URL.createObjectURL(csvFile);
            // Hide download link
            downloadLink.style.display = "none";
            // Add the link to DOM
            document.body.appendChild(downloadLink);
            // Click download link
            downloadLink.click();
        }
    };
    soby_WebGrid.prototype.PrintGrid = function () {
        var tableSelect = document.getElementById(this.GridID);
        var newTable = $(tableSelect.outerHTML);
        newTable.find(".groupbypanerow").remove();
        newTable.find(".actionpanerow").remove();
        newTable.find(".loadingrow").remove();
        newTable.find("img").remove();
        var tableHTML = newTable[0].outerHTML;
        //let divContents = document.getElementById("soby_MembershipSearchDiv").innerHTML;
        var a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<body >');
        a.document.write(tableHTML);
        a.document.write('</body>');
        if (this.OnGridPrintBeingStarted !== null)
            this.OnGridPrintBeingStarted(a.document);
        a.document.write('</html>');
        a.document.close();
        a.print();
    };
    soby_WebGrid.prototype.CopyToClipboard = function () {
        var range = document.createRange();
        range.selectNode(document.getElementById(this.GridID));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        $("#" + this.GridID + " .actionpanerow").hide();
        document.execCommand("copy");
        $("#" + this.GridID + " .actionpanerow").show();
        window.getSelection().removeAllRanges(); // to deselect
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
        if (this.IsGroupable === false) {
            $(this.ContentDivSelector + " .groupbypanerow").hide();
            return;
        }
        groupByPaneContainer.attr("ondragover", "soby_WebGrids['" + this.GridID + "'].AllowDropColumn(event)");
        groupByPaneContainer.attr("ondrop", "soby_WebGrids['" + this.GridID + "'].DropColumn(event)");
        var container = $("<div>Drag a column header here to group by that column</div>");
        if (this.GroupByFields.length > 0) {
            container.html("");
        }
        for (var i = 0; i < this.GroupByFields.length; i++) {
            var groupByContainer = $("<div class='soby-groupby-heading'></div>");
            var displayName = "";
            for (var b = 0; b < this.Columns.length; b++) {
                if (this.Columns[b].FieldName.toLowerCase() === this.GroupByFields[i].FieldName.toLowerCase()) {
                    displayName = this.Columns[b].DisplayName;
                }
            }
            var sortLink = $("<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SortGroupByField('" + this.GroupByFields[i].FieldName + "', true)\">" + displayName + "&nbsp;" + this.SVGImages.GetArrowDown() + "</a>");
            if (this.GroupByFields[i].IsAsc === true) {
                sortLink = $("<a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SortGroupByField('" + this.GroupByFields[i].FieldName + "', false)\">" + displayName + "&nbsp;" + this.SVGImages.GetArrowUp() + "</a>");
            }
            groupByContainer.append(sortLink);
            groupByContainer.attr("draggable", "true");
            groupByContainer.attr("ondragstart", "soby_WebGrids['" + this.GridID + "'].DragColumn(event, '" + this.GroupByFields[i].FieldName + "')");
            container.append(groupByContainer);
        }
        groupByPaneContainer.append(container);
    };
    soby_WebGrid.prototype.SetActionPaneButtonsVisibility = function () {
        var hasVisibleButton = false;
        for (var i = 0; i < this.ActionPaneButtons.length; i++) {
            var actionPaneButton = this.ActionPaneButtons[i];
            var isEnable = actionPaneButton.EnabilityFunction(this);
            if (isEnable === true) {
                actionPaneButton.Show();
                hasVisibleButton = true;
            }
            else {
                actionPaneButton.Hide();
            }
        }
        var actionpanerow = $(this.ContentDivSelector + " .actionpanerow");
        if (hasVisibleButton === true) {
            actionpanerow.show();
        }
        else {
            actionpanerow.hide();
        }
    };
    /**
     * Generates action pane
     * @example
     * // Generates action pane
     * grid.GenerateActionPane();
     */
    soby_WebGrid.prototype.GenerateActionPane = function () {
        var actionPaneContainer = $(this.ContentDivSelector + " .actionpane");
        if (actionPaneContainer.hasClass("isloaded") === true) {
            return;
        }
        actionPaneContainer.html("");
        for (var i = 0; i < this.ActionPaneButtons.length; i++) {
            var actionPaneButton = this.ActionPaneButtons[i];
            var link = $("<a href='javascript:void(0)'>" +
                ((actionPaneButton.ImageUrl !== "" && actionPaneButton.ImageUrl !== null && actionPaneButton.ImageUrl !== undefined) ? "<span class='soby-icon-imgSpan' > <img class='" + actionPaneButton.ClassName + " soby-icon-img' src= '" + actionPaneButton.ImageUrl + "' > </span>" : "") +
                ((actionPaneButton.SVG !== "" && actionPaneButton.SVG !== null && actionPaneButton.SVG !== undefined) ? actionPaneButton.SVG : "") +
                "<span>" + actionPaneButton.Text + "</span> </a>");
            link.attr("id", actionPaneButton.ID);
            link.attr("key", actionPaneButton.Key);
            link.attr("gridid", this.GridID);
            link.click(function () {
                var key = $(this).attr("key");
                var gridId = $(this).attr("gridid");
                var grid = soby_WebGrids[gridId];
                var actionPaneButton = grid.ActionPaneButtons.Get(key);
                if (actionPaneButton.OnClick !== null) {
                    actionPaneButton.OnClick(grid);
                }
            });
            actionPaneContainer.append(link);
        }
    };
    /**
     * Generates navigation pane
     * @example
     * // Generates navigation pane
     * grid.GenerateNavigationPane();
     */
    soby_WebGrid.prototype.GenerateNavigationPane = function () {
        var navigationPane = $(this.ContentDivSelector + " .navigationpane");
        if (this.DataService.CanNavigateToNextPage() === false && this.DataService.CanNavigateToPreviousPage() === false) {
            navigationPane.hide();
            return "";
        }
        navigationPane.show();
        var tableStyle = "margin:auto";
        if (this.NavigationInformation.VerticalAlign === SobyPaginationVerticalAlign.Left) {
            tableStyle = "margin:0px";
        }
        else if (this.NavigationInformation.VerticalAlign === SobyPaginationVerticalAlign.Right) {
            tableStyle = "margin:0px;float:right";
        }
        navigationPane.html("<table style='" + tableStyle + "'><tbody><tr> \
							  " + (this.DataService.CanNavigateToPreviousPage() === true ? "<td><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].GoToPreviousPage()\">" + this.SVGImages.GetLeftCircle() + "</a></td>" : "") + " \
							  <td class='soby-paging'>" + this.DataService.StartIndex + " - " + this.DataService.EndIndex + "</td> \
							  " + (this.DataService.CanNavigateToNextPage() === true ? "<td><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].GoToNextPage()\">" + this.SVGImages.GetRightCircle() + "</a></td>" : "") + " \
							  </tr></tbody></table>");
    };
    /**
     * Navigates to the next page
     * @example
     * // Navigates to the next page
     * grid.GoToNextPage();
     */
    soby_WebGrid.prototype.GoToNextPage = function () {
        this.NavigationActionInProgress = true;
        this.NavigationInformation.PageIndex = this.NavigationInformation.PageIndex + 1;
        this.DataService.GoToPage(this.NavigationInformation.PageIndex);
    };
    /**
     * Navigates to the previous page
     * @example
     * // Navigates to the previous page
     * grid.GoToPreviousPage();
     */
    soby_WebGrid.prototype.GoToPreviousPage = function () {
        this.NavigationActionInProgress = true;
        this.NavigationInformation.PageIndex = this.NavigationInformation.PageIndex - 1;
        this.DataService.GoToPage(this.NavigationInformation.PageIndex);
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
        $(this.ContentDivSelector + " tr[id!='" + mainRowId + "'] .soby-list-hiderelateddata").removeClass("soby-list-hiderelateddata").addClass("soby-list-showrelateddata");
        if ($(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell:visible").length > 0) {
            $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").hide();
            $("#" + mainRowId + " .soby-list-hiderelateddata").removeClass("soby-list-hiderelateddata").addClass("soby-list-showrelateddata");
        }
        else {
            var detailGridIdArray = detailGridIDs.split(soby_FilterValueSeperator);
            var detailGridContainerIdArray = contentDivSelectors.split(soby_FilterValueSeperator);
            var detailFieldNameArray = fieldNames.split(soby_FilterValueSeperator);
            var valuesForDetailGridArray = values.split(soby_FilterValueSeperator);
            $(this.ContentDivSelector + " .detailgridcell").hide();
            $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").show();
            $("#" + mainRowId + " .soby-list-showrelateddata").removeClass("soby-list-showrelateddata").addClass("soby-list-hiderelateddata");
            var isloaded = $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").attr("data-isloaded");
            if (isloaded === "1") {
                return;
            }
            if (detailGridIDs === null || detailGridIDs === "") {
                return;
            }
            for (var i = 0; i < detailGridIdArray.length; i++) {
                var detailGridID = detailGridIdArray[i];
                //rowID + "_" + dataRelation.DetailGridID
                var contentDivSelector = detailGridContainerIdArray[i];
                var fieldName = detailFieldNameArray[i];
                var value = valuesForDetailGridArray[i];
                var grid1 = soby_WebGrids[detailGridID].Clone(contentDivSelector);
                //soby_WebGrids[detailGridID].ContentDivSelector = contentDivSelector;
                grid1.Initialize(false);
                var viewField = grid1.DataService.DataSourceBuilder.GetViewFieldByPropertyName(fieldName);
                var fieldType = viewField.FieldType;
                if (fieldType === SobyFieldTypes.Lookup) {
                    if (viewField.Args.ValueFieldType !== null) {
                        fieldType = viewField.Args.ValueFieldType;
                    }
                }
                if (fieldType === SobyFieldTypes.Number && value !== null && value !== undefined && value !== "") {
                    try {
                        value = parseInt(value);
                    }
                    catch (_a) {
                    }
                }
                grid1.Filters.Clear();
                grid1.FilterResult(fieldName, value, fieldType, SobyFilterTypes.Equal, false);
            }
            $(".soby_griddetailrow[mainrowid='" + mainRowId + "'] .detailgridcell").attr("data-isloaded", "1");
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
    soby_WebGrid.prototype.ShowCellPopupContent = function (cellID, columnIndex, dataItemIndex) {
        this.PopulateCellTemplateContent(cellID, columnIndex, dataItemIndex);
        if (this.OnCellTemplateContentPopulated !== null) {
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
            if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction === false || this.Filters.Filters[i].FieldName !== fieldName) {
                newFilters[newFilters.length] = this.Filters.Filters[i];
            }
        }
        this.Filters.Filters = newFilters;
        this.HideHeaderRowMenu(fieldName);
        this.DataService.Filter(this.Filters, true);
    };
    soby_WebGrid.prototype.AddFilterField = function (fieldName, filterValue, fieldType, filterType, shouldBeClearedOnUIFilterAction) {
        this.Filters.AddFilter(fieldName, filterValue, fieldType, filterType, false, shouldBeClearedOnUIFilterAction);
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
    soby_WebGrid.prototype.FilterResult = function (fieldName, value, fieldType, filterType, shouldBeClearedOnUIFilterAction) {
        this.NavigationInformation.PageIndex = 0;
        this.HideHeaderRowMenu(null);
        this.ClearUIFilters();
        //this.Filters = new SobyFilters(false);
        this.AddFilterField(fieldName, value, fieldType, filterType, shouldBeClearedOnUIFilterAction);
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
    soby_WebGrid.prototype.FilterResultWithMultipleValues = function (fieldName, values, fieldType, filterType, shouldBeClearedOnUIFilterAction) {
        this.NavigationInformation.PageIndex = 0;
        this.HideHeaderRowMenu(null);
        //        if (shouldBeClearedOnUIFilterAction === true)
        //            this.Filters = new SobyFilters(false);
        var filters = new SobyFilters(true);
        this.ClearUIFilters();
        if (values.length > 0) {
            for (var i = 0; i < values.length; i++) {
                if (values[i] !== "" && values[i] !== null) {
                    var filterValue = values[i];
                    if (filterValue === null) {
                        filterValue = values[i];
                    }
                    soby_LogMessage("filterValue:");
                    soby_LogMessage(filterValue);
                    filters.AddFilter(fieldName, filterValue, fieldType, filterType, false, shouldBeClearedOnUIFilterAction);
                    //this.Filters.AddFilter(fieldName, filterValue, fieldType, filterType, false, shouldBeClearedOnUIFilterAction);
                }
            }
            this.Filters.AddFilterCollection(filters);
        }
        this.DataService.Filter(this.Filters, true);
    };
    soby_WebGrid.prototype.ClearUIFilters = function () {
        var newFilters = new Array();
        for (var i = this.Filters.Filters.length - 1; i > -1; i--) {
            if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction === false) {
                newFilters[newFilters.length] = this.Filters.Filters[i];
            }
        }
        this.Filters.Filters = newFilters;
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
            if (this.GroupByFields[i].FieldName.toLowerCase() === sortFieldName.toLowerCase()) {
                this.GroupByFields[i].IsAsc = isAsc;
            }
        }
        this.DataService.GroupBy(this.GroupByFields);
    };
    soby_WebGrid.prototype.AddOrderByField = function (fieldName, isAsc) {
        var exist = false;
        for (var i = 0; i < this.OrderByFields.length; i++) {
            if (this.OrderByFields[i].FieldName === fieldName) {
                exist = true;
            }
        }
        if (exist === true) {
            return;
        }
        this.OrderByFields.push(new SobyOrderByField(fieldName, isAsc));
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
        this.AddOrderByField(sortFieldName, isAsc);
        this.NavigationInformation.PageIndex = 0;
        this.DataService.Sort(this.OrderByFields);
    };
    soby_WebGrid.prototype.AddGroupByField = function (fieldName, isAsc, displayFunction) {
        var exist = false;
        for (var i = 0; i < this.GroupByFields.length; i++) {
            if (this.GroupByFields[i].FieldName === fieldName) {
                exist = true;
            }
        }
        if (exist === true) {
            return;
        }
        this.GroupByFields.push(new SobyGroupByField(fieldName, isAsc, displayFunction));
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
    soby_WebGrid.prototype.GroupBy = function (fieldName, isAsc, displayFunction) {
        this.AddGroupByField(fieldName, isAsc, displayFunction);
        this.DataService.GroupBy(this.GroupByFields);
    };
    /**
     * Aggregates result based on given field name
     *
     * @fieldName Name of the field.
     * @aggregateType Type of the aggregation.
     * @example
     * // Aggregate by Price field as sum
     * grid.AggregateBy("Price", SobyAggregateTypes.Sum)
     */
    soby_WebGrid.prototype.AggregateBy = function (fieldName, aggregateType) {
        this.AddAggregateField(fieldName, aggregateType);
        this.DataService.PopulateItems(null);
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
        var responsiveConditionId = "";
        var sortable = false;
        var filterable = false;
        if (column !== null) {
            fieldName = column.FieldName;
            displayName = column.DisplayName;
            responsiveConditionId = column.ResponsiveConditionID;
            if (column.Sortable === null || column.Sortable === undefined) {
                sortable = true;
            }
            else {
                sortable = column.Sortable;
            }
            if (column.Filterable === null || column.Filterable === undefined) {
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
            if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction === true && this.Filters.Filters[i].FieldName === fieldName) {
                hasFilterIconHtml = "&nbsp;" + this.SVGImages.GetFilterCircle();
            }
        }
        var headerCell = $("<th style='padding:5px;' nowrap='nowrap' scope='col' class='ms-vh2 soby_gridheadercell' fieldName='" + fieldName + "'></th>");
        if (responsiveConditionId !== null && responsiveConditionId !== "") {
            headerCell.addClass(this.GetResponsiveConditionById(responsiveConditionId).GetClassName());
        }
        if (column.HeaderCss !== null && column.HeaderCss !== "") {
            var cssValues = column.HeaderCss.split(";");
            for (var d = 0; d < cssValues.length; d++) {
                var cssName = cssValues[d].split(":")[0];
                var cssValue = cssValues[d].split(":")[1];
                headerCell.css(cssName, cssValue);
            }
        }
        if (column.HeaderClassNames !== null && column.HeaderClassNames !== "") {
            headerCell.addClass(column.HeaderClassNames);
        }
        var headerOnClick = "";
        var headerLink = null;
        var container = $("<div style='width:100%;position: relative;'></div>");
        var sortCell = $("<div style='float:left;'></div>");
        var filterCell = $("<div style='width:10px;float:right;display:none' class='headerrowmenuiconcontainer'><a href='javascript:void(0)' class='openmenulink'>" + this.SVGImages.GetCollapse() + "</a></div>");
        container.append(sortCell);
        container.append(filterCell);
        if (this.IsGroupable === true) {
            sortCell.attr("draggable", "true");
            sortCell.attr("ondragstart", "soby_WebGrids['" + this.GridID + "'].DragColumn(event, '" + fieldName + "')");
        }
        if (sortable === true || filterable === true) {
            headerCell.addClass("showmenu");
        }
        else {
            headerCell.addClass("hidemenu");
        }
        var grid = this;
        if (sortable === false && filterable === false) {
            headerOnClick = "";
            sortCell.html(displayName);
        }
        else if (this.OrderByFields.ContainsField(fieldName) === true) {
            if (this.OrderByFields.ContainsFieldAsAsc(fieldName) === true) {
                headerLink = $("<a href='javascript:void(0)' class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + " " + this.SVGImages.GetArrowUp() + "</a>");
                headerLink.click(function () {
                    if (sortable === true) {
                        grid.SortResult(fieldName, false);
                    }
                    else if (filterable === true) {
                        grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
                    }
                });
                sortCell.html(headerLink);
            }
            else {
                headerLink = $("<a href='javascript:void(0)' class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + " " + this.SVGImages.GetArrowDown() + "</a>");
                headerLink.click(function () {
                    if (sortable === true) {
                        grid.SortResult(fieldName, true);
                    }
                    else if (filterable === true) {
                        grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
                    }
                });
                sortCell.html(headerLink);
            }
        }
        else {
            headerLink = $("<a href='javascript:void(0)' class='soby_gridheaderlink'>" + displayName + hasFilterIconHtml + "</a>");
            headerLink.click(function () {
                if (sortable === true) {
                    grid.SortResult(fieldName, true);
                }
                else if (filterable === true) {
                    grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
                }
            });
            //if (sortable === false)
            //    headerLink = $("<span></span>").html(displayName + hasFilterIconHtml);
            sortCell.html(headerLink);
        }
        if (headerLink !== null) {
            headerLink.focus(function () {
                grid.ShowHeaderRowMenuIcon(fieldName);
            });
        }
        filterCell.find("a.openmenulink").click(function () {
            grid.ShowHeaderRowMenu(fieldName, displayName, sortable, filterable);
        });
        headerCell.append(container);
        headerRow.append(headerCell);
        headerCell.mouseover(function () {
            grid.ShowHeaderRowMenuIcon(fieldName);
        });
        headerCell.mouseout(function () {
            grid.HideHeaderRowMenuIcon(fieldName);
        });
    };
    soby_WebGrid.prototype.ApplyResponsiveElementsVisibility = function () {
        for (var i = 0; i < this.ResponsiveConditions.length; i++) {
            var responsiveCondition = this.ResponsiveConditions[i];
            var isVisible = responsiveCondition.Validate();
            if (isVisible === true) {
                $(this.ContentDivSelector + " ." + responsiveCondition.GetClassName()).show();
            }
            else {
                $(this.ContentDivSelector + " ." + responsiveCondition.GetClassName()).hide();
            }
        }
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
        var hasSelectionCell = false;
        if (this.IsSelectable === true || this.DataRelations.length > 0 || this.RowDetailDisplayFunction !== null) {
            hasSelectionCell = true;
            var headerCell = $("<th class='soby_gridheadercell soby_selectitemcell' width='20px' style='padding:5px;text-align:center'></th>");
            if (this.IsSelectable === true) {
                headerCell.html("<a href='javascript:void (0)' class='soby-list-selectitem-a' onclick=\"soby_WebGrids['" + this.GridID + "'].SelectAllRows();\">" + this.SVGImages.GetCheck() + "</a>");
            }
            headerRow.append(headerCell);
            if (this.IsSelectable === false && this.DataRelations.length === 0 && this.GroupByFields.length === 0 && this.RowDetailDisplayFunction !== null) {
                headerCell.addClass(this.RowDetailDisplayViewResponsiveCondition.GetClassName());
            }
        }
        /*
        if (
            (hasSelectionCell === false && this.GroupByFields.length > 0)
            || (hasSelectionCell === true && this.GroupByFields.length > 1)
        ) {
        */
        if (this.GroupByFields.length > 1) {
            var headerCellForGroupBy = $("<th class='soby_gridheadercell' style='padding:5px;text-align:center'></th>");
            headerCellForGroupBy.attr("colspan", this.GroupByFields.length - 1);
            headerRow.append(headerCellForGroupBy);
        }
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.GroupByFields.ContainsField(this.Columns[i].FieldName) === true) {
                continue;
            }
            this.AddHeaderCell(headerRow, this.Columns[i], null);
        }
    };
    /**
     * Changes theme
     *
     * @themeName Name of the theme.
     * @example
     * // Hides header row menu icon
     * grid.ChangeTheme('classic');
     */
    soby_WebGrid.prototype.ChangeTheme = function (themeName) {
        $(".sobyitemdialog").removeClass(this.ThemeClassName);
        $(".sobygridmenu").removeClass(this.ThemeClassName);
        $(".soby_grid").removeClass(this.ThemeClassName);
        this.ThemeName = themeName;
        this.ThemeClassName = themeName;
        $(".sobyitemdialog").addClass(this.ThemeClassName);
        $(".sobygridmenu").addClass(this.ThemeClassName);
        $(".soby_grid").addClass(this.ThemeClassName);
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
        $(this.ContentDivSelector + " th .headerrowmenuiconcontainer").hide();
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
        /*
        if (this.ActionInProgress === true)
            return;

        $("#" + this.GridID + "_Menu").hide();
        */
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
            if (activeGrid !== null) {
                activeGrid.ActionInProgress = false;
            }
        }, 1000);
        if (sortable === false && filterable === false) {
            return;
        }
        var menuID = this.GridID + "_Menu";
        var menuUL = $("#" + menuID);
        if (menuUL.length > 0) {
            $("#" + menuID).remove();
        }
        menuUL = $("<table id='" + menuID + "' class='sobygridmenu " + this.ThemeClassName + "' style='margin-top: 30px;margin-left: 30px;'></table>");
        $("#" + this.GridID + " .soby_gridheadercell[fieldname='" + fieldName + "']").append(menuUL);
        menuUL.html("");
        if (sortable === true) {
            menuUL.append("<tr><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;font-size: 5px;'>&nbsp;</td><td style='padding-right:5px;padding-left:5px;font-size: 5px;'>&nbsp;</td></tr>");
            menuUL.append("<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', true)\" class='ms-vh2' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', true)\">" + this.SVGImages.GetSortAZUp() + "</a></td><td style='padding-right:5px;padding-left:5px'>Ascending</td></tr>" +
                "<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', false)\" class='ms-vh2' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].SortResult('" + fieldName + "', false)\">" + this.SVGImages.GetSortAZDown() + "</a></td><td style='padding-right:5px;padding-left:5px'>Descending</td></tr>" +
                "<tr><td style='padding-left:5px;border-right:1px solid;;padding-right:5px'>&nbsp;</td><td><hr style='margin-top:5px;margin-bottom:5px;border: 0;border-bottom: 1px dashed #ccc;'></td></tr>");
        }
        if (filterable === true) {
            for (var i = 0; i < this.Filters.Filters.length; i++) {
                if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction === true && this.Filters.Filters[i].FieldName === fieldName) {
                    menuUL.append("<tr onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ClearFiltersOn('" + fieldName + "')\" class='ms-vh2' style='cursor: pointer;'><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'><a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ClearFiltersOn('" + fieldName + "')\">" + this.SVGImages.GetXCircle() + "</a></td><td style='padding-right:5px;padding-left:5px'>Clear filter from " + displayName + "</td></tr>");
                    break;
                }
            }
            menuUL.append("<tr class='filterloadingli'  style='width: 30px;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;<td></td><td style='padding-right:5px;padding-left:5px''>Loading...</td></tr>" +
                "<tr><td  style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;'>&nbsp;</td><td style='text-align:right;padding-right:5px;padding-left:5px;padding-top:5px'><button class='btn btn-primary next applyfilters' type='button' style='width: 70px;padding-top: 5px;' onclick=\"soby_WebGrids['" + this.GridID + "'].ApplyFilters('" + fieldName + "')\">Apply</button></td></tr>");
        }
        menuUL.append("<tr><td style='width: 30px;text-align: center;padding-left:5px;padding-right:5px;border-right:1px solid;font-size: 5px;'>&nbsp;</td><td style='padding-top:5px;padding-right:5px;padding-left:5px;font-size: 5px;'>&nbsp;</td></tr>");
        var header = $(this.ContentDivSelector + " th[fieldName='" + fieldName + "']");
        setTimeout(function () {
            menuUL.show();
        }, 1000);
        var filterControl = null;
        for (var i = 0; i < this.Columns.length; i++) {
            if (this.Columns[i].FieldName === fieldName) {
                filterControl = this.Columns[i].FilterControl;
            }
        }
        var li = $("<tr></tr>");
        var cellId = soby_guid();
        if (filterControl !== null) {
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
                if (this.Filters.Filters[i].ShouldBeClearedOnUIFilterAction === true && this.Filters.Filters[i].FieldName === fieldName) {
                    currentFilterValue = this.Filters.Filters[i].Value;
                }
            }
            var cell = $("<td style='padding-top:5px;padding-right:5px;padding-left:5px;text-align:right'></td>");
            cell.attr("id", cellId);
            var textboxElement = $("<input type='text' class='filtertextbox' style='width:100px' fieldname='" + fieldName + "' />");
            textboxElement.keydown(function (event) {
                switch (event.which) {
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
        if (filterControl !== null) {
            filterControl.Initialize();
        }
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
            if (this.Columns[i].FieldName === fieldName) {
                filterControl = this.Columns[i].FilterControl;
            }
        }
        for (var i = 0; i < this.DataService.DataSourceBuilder.SchemaFields.length; i++) {
            var viewField = this.DataService.DataSourceBuilder.SchemaFields[i];
            if (viewField.FieldName === fieldName) {
                fieldType = viewField.FieldType;
                if (fieldType === SobyFieldTypes.Number) {
                    filterType = SobyFilterTypes.Equal;
                }
                else {
                    filterType = SobyFilterTypes.Contains;
                }
            }
        }
        if (filterControl !== null) {
            this.FilterResultWithMultipleValues(fieldName, filterControl.GetValue(), fieldType, filterType, true);
        }
        else if ($("input.filtertextbox[fieldname='" + fieldName + "']").length > 0) {
            var filterValue = $("input.filtertextbox[fieldname='" + fieldName + "']").val();
            this.FilterResult(fieldName, filterValue, fieldType, filterType, true);
        }
        else {
            var values = [];
            var filterValues = $("input[type='checkbox'][fieldname='" + fieldName + "']:checked");
            if (filterValues.length === 0) {
                return;
            }
            for (var i = 0; i < filterValues.length; i++) {
                values[values.length] = $(filterValues[i]).val();
            }
            this.FilterResultWithMultipleValues(fieldName, values, fieldType, filterType, true);
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
        if (this.IsSelectable === true) {
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
        loadingRow.append("<" + this.CellTagName + " colspan='" + this.CellCount + "'>" + this.SVGImages.GetLoading() + " Loading...</" + this.CellTagName + ">");
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
        if (this.DisplayTitle === true) {
            var tableTitle = $("<div class='soby_tabletitle'></div>").text(this.Title);
            tableTitle.attr("title", this.AltTitle);
            $(this.ContentDivSelector).append(tableTitle);
        }
        $(this.ContentDivSelector).append(table);
        $(this.ContentDivSelector).append("<div style='display:none' class='tempdatadiv'></div>");
        $(this.ContentDivSelector).append("<canvas style='display:none' class='soby_webgridcanvas' width='200' height='200'></canvas>");
        var grid = this;
        this.DataService.ItemPopulated = function (items) {
            grid.PopulateGridData(items);
        };
        this.DataService.ErrorThrown = function (errorMessage, errorTypeName) {
            grid.DisplayErrorMessage(errorMessage);
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
        if (populateItems === true) {
            if (this.OrderByFields.length > 0 && this.Filters.Filters.length > 0) {
                this.DataService.SortAndFilter(this.OrderByFields, this.Filters, true);
            }
            else if (this.OrderByFields.length > 0) {
                this.DataService.Sort(this.OrderByFields);
            }
            else if (this.Filters.Filters.length > 0) {
                this.DataService.Filter(this.Filters, true);
            }
            else {
                this.DataService.PopulateItems(null);
            }
        }
        else {
            if (this.ShowHeader === true) {
                this.PopulateHeaderCells();
            }
            this.InitializeActionPaneButtons();
            this.GenerateActionPane();
            this.SetActionPaneButtonsVisibility();
            $(this.ContentDivSelector + " .emptydatarow td").html("&nbsp;Please search to display data.");
            $(this.ContentDivSelector + " .emptydatarow").show();
        }
    };
    soby_WebGrid.prototype.PopulateAggregateRowValues = function (aggregateRow) {
        var dataRowCount = 0;
        var aggregateRowLevel = parseInt(aggregateRow.attr("level"));
        var currentGridRow = aggregateRow.prev();
        var aggregateValues = new Array();
        while (currentGridRow.length > 0) {
            if (currentGridRow.hasClass("soby_griddatarow") === true) {
                var rowIndex = parseInt(currentGridRow.attr("rowindex"));
                var dataItem = this.Items[rowIndex];
                for (var q = 0; q < this.AggregateFields.length; q++) {
                    var value = dataItem[this.AggregateFields[q].FieldName];
                    var aggregateValueId = this.AggregateFields[q].AggregateType + this.AggregateFields[q].FieldName;
                    if (dataRowCount === 0) {
                        aggregateValues[aggregateValueId] = value;
                    }
                    else if (this.AggregateFields[q].AggregateType === SobyAggregateTypes.Average || this.AggregateFields[q].AggregateType === SobyAggregateTypes.Sum) {
                        aggregateValues[aggregateValueId] = aggregateValues[aggregateValueId] + value;
                    }
                    else if (this.AggregateFields[q].AggregateType === SobyAggregateTypes.Max) {
                        if (value > aggregateValues[aggregateValueId]) {
                            aggregateValues[aggregateValueId] = value;
                        }
                    }
                    else if (this.AggregateFields[q].AggregateType === SobyAggregateTypes.Min) {
                        if (value < aggregateValues[aggregateValueId]) {
                            aggregateValues[aggregateValueId] = value;
                        }
                    }
                }
                dataRowCount++;
            }
            else if ((currentGridRow.hasClass("soby_gridgroupbyrow") === true && parseInt(currentGridRow.attr("level")) <= aggregateRowLevel)
                || currentGridRow.hasClass("soby_gridheaderrow") === true) {
                for (var q = 0; q < this.AggregateFields.length; q++) {
                    var aggregateValueId = this.AggregateFields[q].AggregateType + this.AggregateFields[q].FieldName;
                    if (this.AggregateFields[q].AggregateType === SobyAggregateTypes.Average) {
                        aggregateValues[aggregateValueId] = aggregateValues[aggregateValueId] / dataRowCount;
                    }
                    else if (this.AggregateFields[q].AggregateType === SobyAggregateTypes.Count) {
                        aggregateValues[aggregateValueId] = dataRowCount;
                    }
                    aggregateRow.find(".soby_gridaggregatevaluecontainer[fieldname='" + this.AggregateFields[q].FieldName + "'][aggregatetype='" + this.AggregateFields[q].AggregateType + "'] .aggregatetypevalue").text(aggregateValues[aggregateValueId]);
                }
                return;
            }
            currentGridRow = currentGridRow.prev();
        }
    };
    soby_WebGrid.prototype.PopulateAggregateRowsValues = function () {
        var aggregateRows = $(this.ContentDivSelector + " .soby_gridaggregatesrow");
        for (var i = 0; i < aggregateRows.length; i++) {
            var aggregateRow = $(aggregateRows[i]);
            this.PopulateAggregateRowValues(aggregateRow);
        }
    };
    soby_WebGrid.prototype.PopulateAggregateRow = function (rowAddBefore, level, hasEmptyCell) {
        var aggregatesRow = $("<tr class='soby_gridaggregatesrow'></tr>");
        aggregatesRow.attr("level", level);
        if (hasEmptyCell === true) {
            var emptyCell = $("<td>&nbsp;</td>");
            aggregatesRow.append(emptyCell);
        }
        for (var q = 0; q < this.Columns.length; q++) {
            if (this.Columns[q].IsVisible === false) {
                continue;
            }
            var aggregateCell = $("<td class='soby_gridaggregatecell'>&nbsp;</td>");
            for (var m = 0; m < this.AggregateFields.length; m++) {
                if (this.AggregateFields[m].FieldName === this.Columns[q].FieldName) {
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
    };
    soby_WebGrid.prototype.PopulateAggregateRows = function () {
        if (this.AggregateFields.length === 0) {
            return;
        }
        var dataRows = $(this.ContentDivSelector + " .soby_griddatarow");
        if (dataRows.length === 0) {
            return;
        }
        var hasEmptyCell = false;
        if ($(this.ContentDivSelector + " .soby_selectitemcell").length > 0) {
            hasEmptyCell = true;
        }
        var hadDataRow = false;
        var previousGroupByLevel = 0;
        var currentGroupByLevel = 0;
        var currentGridRow = $(this.ContentDivSelector + " tbody tr:first");
        currentGridRow = currentGridRow.next();
        while (currentGridRow.length > 0) {
            if (currentGridRow.hasClass("soby_griddatarow") === true) {
                hadDataRow = true;
            }
            else if (currentGridRow.hasClass("soby_gridgroupbyrow") === true || currentGridRow.hasClass("soby_gridnavigationrow") === true) {
                if (currentGridRow.hasClass("soby_gridnavigationrow") === false) {
                    currentGroupByLevel = parseInt(currentGridRow.attr("level"));
                }
                else {
                    currentGroupByLevel = 0;
                }
                if (hadDataRow === true) {
                    for (var e = previousGroupByLevel; e > currentGroupByLevel - 1; e--) {
                        this.PopulateAggregateRow(currentGridRow, e, hasEmptyCell);
                    }
                }
                previousGroupByLevel = currentGroupByLevel;
            }
            currentGridRow = currentGridRow.next();
        }
        this.PopulateAggregateRowsValues();
    };
    soby_WebGrid.prototype.PopulateGroupByRow = function (itemIndex, item, row) {
        var currentRowToAddDataRowsAfter = null;
        var hasDifferentGroupValue = false;
        for (var x = 0; x < this.GroupByFields.length; x++) {
            var value = null;
            if (this.GroupByFields[x].DisplayFunction !== null && this.GroupByFields[x].DisplayFunction !== undefined) {
                value = this.GroupByFields[x].DisplayFunction(item);
            }
            else {
                value = item[this.GroupByFields[x].FieldName];
            }
            if (itemIndex === 0 || hasDifferentGroupValue === true || this.LastGroupByValues["Level_" + x].Value !== value) {
                hasDifferentGroupValue = true;
                this.LastGroupByValues["Level_" + x] = { Level: x, Value: value };
                var displayname = this.GroupByFields[x].FieldName;
                var gridColumn = this.GetColumn(this.GroupByFields[x].FieldName);
                if (gridColumn !== null) {
                    displayname = gridColumn.DisplayName;
                }
                var groupByRowID = "soby_gridgrouprow_" + soby_guid();
                var groupByRow = $("<tr class='soby_gridgroupbyrow'></tr>");
                groupByRow.attr("id", groupByRowID);
                groupByRow.attr("level", x);
                if (x === 0) {
                    groupByRow.addClass("first");
                }
                if (x > 0) {
                    for (var q = 0; q < x; q++) {
                        var leftCell = $("<td>&nbsp;</td>");
                        groupByRow.append(leftCell);
                    }
                }
                var groupByCell = $("<td class='soby_gridgroupbycell'></td>");
                groupByCell.html("<a href='javascript:void(0)' onclick=\"javascript:soby_WebGrids['" + this.GridID + "'].ExpandGroupBy('" + groupByRowID + "')\"> " + this.SVGImages.GetCollapse() + "</a>");
                var groupByCellColspan = this.Columns.length - x;
                if (this.IsSelectable === true || this.DataRelations.length > 0) {
                    groupByCellColspan++;
                }
                groupByCell.attr("colspan", groupByCellColspan);
                groupByCell.append("&nbsp;" + displayname + ": " + value);
                groupByRow.append(groupByCell);
                var navigationRow = $(this.ContentDivSelector + " .soby_gridnavigationrow");
                navigationRow.before(groupByRow);
                currentRowToAddDataRowsAfter = groupByRow;
            }
        }
        if (this.GroupByFields.length > 1) {
            var leftCell = $("<td>&nbsp;</td>");
            leftCell.attr("colspan", this.GroupByFields.length - 1);
            row.append(leftCell);
        }
        return currentRowToAddDataRowsAfter;
    };
    soby_WebGrid.prototype.ExpandGroupBy = function (groupByRowID) {
        var groupByRow = $("#" + groupByRowID);
        var isExpanded = groupByRow.next().is(':visible');
        groupByRow.find("a").html(isExpanded === true ? this.SVGImages.GetExpand() : this.SVGImages.GetCollapse());
        //groupByRow.find("img").addClass(isExpanded === true ? "soby-list-expand" : "soby-list-collapse");
        var nextDataRow = groupByRow.next();
        var areChilhdrenGroupByRow = nextDataRow.hasClass("soby_gridgroupbyrow");
        if (areChilhdrenGroupByRow === true) {
            var groupByRowLevel = parseInt(groupByRow.attr("level"));
            var shouldExit = false;
            while (shouldExit === false) {
                var currentRowLevel = parseInt(nextDataRow.attr("level"));
                if (nextDataRow.hasClass("soby_gridgroupbyrow") === true && currentRowLevel <= groupByRowLevel) {
                    shouldExit = true;
                    break;
                }
                if (nextDataRow.hasClass("soby_gridgroupbyrow")) {
                    this.ExpandGroupBy(nextDataRow.attr("id"));
                    if (isExpanded === true)
                        nextDataRow.hide();
                    else
                        nextDataRow.show();
                }
                nextDataRow = nextDataRow.next();
                if (nextDataRow.length === 0) {
                    shouldExit = true;
                    break;
                }
            }
        }
        else {
            while (nextDataRow.hasClass("soby_griddatarow") === true || nextDataRow.hasClass("soby_gridaggregatesrow") === true) {
                if (isExpanded === true)
                    nextDataRow.hide();
                else
                    nextDataRow.show();
                nextDataRow = nextDataRow.next();
            }
        }
    };
    soby_WebGrid.prototype.PopulateDetailRow = function (rowID) {
        if (this.DataRelations.length === 0 && this.RowDetailDisplayFunction === null) {
            return;
        }
        var detailRow = $("<tr class='soby_griddetailrow'></tr>");
        detailRow.attr("mainrowid", rowID);
        var cell = $("<td colspan='" + this.CellCount + "' class='detailgridcell' style='display:none'></td>");
        if (this.RowDetailDisplayFunction !== null) {
            var itemIndex = $("#" + rowID).attr("rowindex");
            var dataItem = this.Items[itemIndex];
            var rowMainDetailPanel = $("<div class='soby_gridrowmaindetail'></div>");
            rowMainDetailPanel.html(this.RowDetailDisplayFunction(this, rowID, dataItem));
            cell.append(rowMainDetailPanel);
        }
        var tabHeaderPanel = $("<div class='soby_gridtabheaderpanel'></div>");
        cell.append(tabHeaderPanel);
        for (var t = 0; t < this.DataRelations.length; t++) {
            var dataRelation = this.DataRelations[t];
            var tabHeaderPanelItem = $("<div class='soby_tabheader' index='" + t + "'><a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].SelectDetailGridTab('" + rowID + "', '" + t + "')\">" + soby_WebGrids[dataRelation.DetailGridID].Title + "</a></div>");
            tabHeaderPanelItem.attr("title", soby_WebGrids[dataRelation.DetailGridID].AltTitle);
            var panel = $("<div style='display:none' class='soby_tabcontent'></div>");
            if (t === 0) {
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
        $("#" + rowID).after(detailRow);
    };
    soby_WebGrid.prototype.PopulateSelectionCell = function (item, row, rowID) {
        if (this.IsSelectable === true || this.DataRelations.length > 0 || this.RowDetailDisplayFunction !== null) {
            var cell = $("<td valign='top' style='padding:5px;' width='20px' class='soby_selectitemcell'></td>");
            if (this.IsSelectable === true) {
                row.addClass("soby-itmHoverEnabled");
                var onClick = "soby_WebGrids['" + this.GridID + "'].SelectRow('" + rowID + "');";
                var link = $("<a href='javascript:void(0)' class='soby-list-selectitem-a'>" + this.SVGImages.GetCheck() + "</a>");
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
            if (detailGridIds !== "") {
                detailGridIds = detailGridIds.substring(0, detailGridIds.length - soby_FilterValueSeperator.length);
                detailGridContainerIds = detailGridContainerIds.substring(0, detailGridContainerIds.length - soby_FilterValueSeperator.length);
                detailFieldNames = detailFieldNames.substring(0, detailFieldNames.length - soby_FilterValueSeperator.length);
                valuesForDetailGrids = valuesForDetailGrids.substring(0, valuesForDetailGrids.length - soby_FilterValueSeperator.length);
                var onClick = "soby_WebGrids['" + this.GridID + "'].PopulateDetailGrid('" + detailGridIds + "','" + detailGridContainerIds + "', '" + rowID + "', '" + detailFieldNames + "', '" + valuesForDetailGrids + "');";
                var link = $("<a href='javascript:void(0)'>" + this.SVGImages.GetCardView() + "</a>");
                link.attr("onclick", onClick);
                cell.append(link);
            }
            else if (this.RowDetailDisplayFunction !== null) {
                var onClick = "soby_WebGrids['" + this.GridID + "'].PopulateDetailGrid('','', '" + rowID + "', '', '');";
                var link = $("<a href='javascript:void(0)'>" + this.SVGImages.GetCardView() + "</a>");
                link.attr("onclick", onClick);
                if (this.RowDetailDisplayViewResponsiveCondition !== null) {
                    if (this.IsSelectable === false) {
                        cell.addClass(this.RowDetailDisplayViewResponsiveCondition.GetClassName());
                    }
                    else {
                        link.addClass(this.RowDetailDisplayViewResponsiveCondition.GetClassName());
                    }
                }
                cell.append(link);
            }
            row.append(cell);
        }
    };
    soby_WebGrid.prototype.GenerateConteFromCellTemplate = function (columnIndex, dataItemIndex) {
        var item = this.Items[dataItemIndex];
        var column = this.Columns[columnIndex];
        var contentHtml = column.CellTemplate.Template;
        var propertyNames = new Array(); //this.DataService.GetFieldNames();
        var remainingContent = contentHtml;
        while (remainingContent.indexOf("#{") > -1) {
            var startIndex = remainingContent.indexOf("#{");
            if (startIndex === -1) {
                break;
            }
            var endIndex = remainingContent.indexOf("}", startIndex);
            if (endIndex === -1) {
                break;
            }
            propertyNames.push(remainingContent.substr(startIndex + 2, endIndex - startIndex - 2));
            remainingContent = remainingContent.substr(endIndex);
        }
        for (var n = 0; n < propertyNames.length; n++) {
            try {
                var subFieldNames = propertyNames[n].split(".");
                var value = item[subFieldNames[0]];
                for (var z = 1; z < subFieldNames.length; z++) {
                    if (value === null)
                        continue;
                    var subFieldName = subFieldNames[z];
                    value = value[subFieldName];
                }
                var regex = new RegExp('#{' + propertyNames[n] + '}', 'ig');
                if (column.CellTemplate.ValueDisplayFunction !== null && column.CellTemplate.ValueDisplayFunction !== undefined) {
                    value = column.CellTemplate.ValueDisplayFunction(propertyNames[n], value);
                }
                if (value === null) {
                    value = "";
                }
                contentHtml = contentHtml.replace(regex, value);
            }
            catch (err) {
                soby_LogMessage(err);
            }
        }
        return contentHtml;
    };
    soby_WebGrid.prototype.PopulateCellTemplateContent = function (cellId, columnIndex, dataItemIndex) {
        var popup_contentPanel = $("#" + cellId + " .popup_content");
        var content = popup_contentPanel.html();
        if (content !== null && content !== "") {
            return;
        }
        var column = this.Columns[columnIndex];
        var contentHtml = this.GenerateConteFromCellTemplate(columnIndex, dataItemIndex);
        if (column.CellTemplate.TemplateType === "PopupContent") {
            var table1 = $("<table></table>");
            var row1 = $("<tr></tr>");
            var cell11 = $("<td style='width:95%'></td>");
            cell11.append(contentHtml);
            row1.append(cell11);
            row1.append("<td style='vertical-align: top;width:20px;'><a href='javascript:void(0)' onclick=\"soby_WebGrids['" + this.GridID + "'].HideCellPopupContent('" + cellId + "')\">x</a></td>");
            table1.append(row1);
            popup_contentPanel.append(table1);
        }
    };
    soby_WebGrid.prototype.PopulateViewColumns = function (item, row, rowID, itemIndex) {
        var cellIndex = 0;
        for (var x = 0; x < this.Columns.length; x++) {
            if (this.Columns[x].IsVisible === false) {
                continue;
            }
            if (this.GroupByFields.ContainsField(this.Columns[x].FieldName) === true) {
                continue;
            }
            var cellID = "soby_gridcell_" + soby_guid();
            var contentHtml = "";
            if (this.Columns[x].DisplayFunction !== null) {
                contentHtml = this.Columns[x].DisplayFunction(item, rowID, cellID);
            }
            else if (this.Columns[x].CellTemplate !== null) {
                if (this.Columns[x].CellTemplate.TemplateType === "CellContent") {
                    contentHtml = this.GenerateConteFromCellTemplate(x, itemIndex);
                }
                else if (this.Columns[x].CellTemplate.TemplateType === "PopupContent") {
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
            var cell = $("<" + this.CellTagName + " class='soby_gridcell " + this.CellAdditionalClassNames + "' valign='top' style='padding:5px;'></" + this.CellTagName + ">").html(contentHtml);
            if (this.Columns[x].ResponsiveConditionID !== null && this.Columns[x].ResponsiveConditionID !== "") {
                cell.addClass(this.GetResponsiveConditionById(this.Columns[x].ResponsiveConditionID).GetClassName());
            }
            cell.attr("id", cellID);
            cell.attr("cellindex", cellIndex);
            cell.attr("columnindex", x);
            cell.attr("rowid", rowID);
            cell.attr("onclick", "soby_WebGrids['" + this.GridID + "'].SelectCell('" + rowID + "', " + cellIndex + ")");
            if (this.Columns[x].CellCss !== null && this.Columns[x].CellCss !== undefined && this.Columns[x].CellCss !== "") {
                var cssValues = this.Columns[x].CellCss.split(";");
                for (var d = 0; d < cssValues.length; d++) {
                    var cssName = cssValues[d].split(":")[0];
                    var cssValue = cssValues[d].split(":")[1];
                    cell.css(cssName, cssValue);
                }
            }
            if (this.Columns[x].CellClassNames !== null && this.Columns[x].CellClassNames !== "") {
                cell.addClass(this.Columns[x].CellClassNames);
            }
            row.append(cell);
            cellIndex++;
        }
    };
    /**
    * Focuses to the first item
    *
    * @example
    * // Focuses to the first item
    * grid.FocusToFirstItem();
    */
    soby_WebGrid.prototype.FocusToFirstItem = function () {
        if (this.Items.length > 0) {
            var firstFocusableItem = $(this.ContentDivSelector + " .soby_griddatarow a:visible:first");
            firstFocusableItem.focus();
        }
    };
    /**
 * Displays error message
 *
 * @errorMessage Error message which returned from the service.
 * @example
 * // Displays error message
 * grid.DisplayErrorMessage(errorMessage);
 */
    soby_WebGrid.prototype.DisplayErrorMessage = function (errorMessage) {
        this.Items = null;
        this.InitializeActionPaneButtons();
        if (this.ShowHeader === true) {
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
        if (errorRow.length === 0) {
            errorRow = $("<" + this.RowTagName + " class='soby_errorrow " + this.RowAdditionalClassNames + "'></" + this.RowTagName + ">");
            var cell = $("<" + this.CellTagName + " colspan='" + this.CellCount + "'></" + this.CellTagName + ">");
            errorRow.append(cell);
            $(this.ContentDivSelector + " " + this.TBodyTagName).append(errorRow);
        }
        errorRow.find(this.CellTagName).html(errorMessage);
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
        if (this.OnGridDataBeingParsed !== null)
            this.OnGridDataBeingParsed();
        items = this.Items;
        this.InitializeActionPaneButtons();
        if (this.ShowHeader === true) {
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
            if (i % 2 === 0) {
                row.addClass("alt");
            }
            row.attr("id", rowID);
            row.attr("rowindex", i);
            var item = items[i];
            var tempCurrentRowToAddDataRowsAfter = this.PopulateGroupByRow(i, item, row);
            if (tempCurrentRowToAddDataRowsAfter !== null) {
                currentRowToAddDataRowsAfter = tempCurrentRowToAddDataRowsAfter;
            }
            this.PopulateSelectionCell(item, row, rowID);
            this.PopulateViewColumns(item, row, rowID, i);
            if (currentRowToAddDataRowsAfter === null) {
                if ($(this.ContentDivSelector + " .soby_gridnavigationrow").length > 0) {
                    $(this.ContentDivSelector + " .soby_gridnavigationrow").before(row);
                }
                else {
                    $(this.ContentDivSelector + " " + this.TBodyTagName).append(row);
                }
            }
            else {
                currentRowToAddDataRowsAfter.after(row);
            }
            if (this.ItemCreated !== null) {
                this.ItemCreated(rowID, item);
            }
            this.PopulateDetailRow(rowID);
        }
        $(this.ContentDivSelector + " .loadingrow").hide();
        if (items.length === 0) {
            $(this.ContentDivSelector + " .emptydatarow " + this.CellTagName).html(this.EmptyDataHtml);
            $(this.ContentDivSelector + " .emptydatarow").show();
        }
        this.PopulateAggregateRows();
        this.GenerateGroupByPanePane();
        this.GenerateActionPane();
        this.GenerateFilterPane();
        this.DataService.PopulateNavigationInformation();
        this.ApplyResponsiveElementsVisibility();
        if (this.OnGridPopulated !== null) {
            this.OnGridPopulated();
        }
        this.SetActionPaneButtonsVisibility();
        if (this.NavigationActionInProgress === true) {
            this.NavigationActionInProgress = false;
            this.FocusToFirstItem();
        }
    };
    return soby_WebGrid;
}());
$.fn.sobywebgrid = function () {
    var id = this.attr("id");
    for (var key in soby_WebGrids) {
        if (soby_WebGrids[key].ContentDivSelector === "#" + id) {
            return soby_WebGrids[key];
        }
    }
    return null;
};
var soby_DataRepeater = /** @class */ (function (_super) {
    __extends(soby_DataRepeater, _super);
    function soby_DataRepeater() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Item data bound event.
         *
         * @event soby_WebGrid#ItemDataBound
         * @type {object}
         * @property {object} cellID - Identifier of the row.
         * @property {object} item - Data item related with the row.
         */
        _this.ItemDataBound = null;
        _this.MaxCellCount = 1;
        _this.ShouldContainRowElement = true;
        return _this;
    }
    /**
     * Gets selected data items
     * @example
     * // returns [Object, Object]
     * grid.GetSelectedDataItems();
     */
    soby_DataRepeater.prototype.GetSelectedDataItems = function () {
        var selectedRows = $(this.ContentDivSelector + " .soby_griddatarow .soby_gridcell.selected");
        var selectedDataItems = new Array();
        for (var i = 0; i < selectedRows.length; i++) {
            var itemIndex = $(selectedRows[i]).attr("cellindex");
            selectedDataItems[selectedDataItems.length] = this.Items[itemIndex];
        }
        return selectedDataItems;
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
    soby_DataRepeater.prototype.SelectCell = function (rowID, cellIndex) {
        var alreadyExistCellIndex = -1;
        var cellID = $(this.ContentDivSelector + " .soby_gridcell[cellindex='" + cellIndex + "']").attr("id");
        var selectedCellIDs = this.GetSelectedCellIds();
        for (var i = 0; i < selectedCellIDs.length; i++) {
            if (selectedCellIDs[i] === cellID) {
                alreadyExistCellIndex = i;
                break;
            }
        }
        if (alreadyExistCellIndex > -1) {
            $("#" + selectedCellIDs[alreadyExistCellIndex]).removeClass("selected");
        }
        else if (this.AllowMultipleSelections === true && soby_IsCtrlOnHold === true) {
            $("#" + cellID).addClass("selected");
        }
        else {
            $(this.ContentDivSelector + " .soby_griddatarow").removeClass("selected");
            $("#" + cellID).addClass("selected");
        }
        this.GenerateActionPane();
        this.SelectDetailGridTab(cellID, 0);
        if (this.OnRowSelected !== null) {
            this.OnRowSelected(this, cellID);
        }
        if (this.OnCellSelected !== null) {
            this.OnCellSelected(this, rowID, cellIndex);
        }
        this.SetActionPaneButtonsVisibility();
    };
    /**
     * Selects the row
     *
     * @rowIndex Index of the row.
     * @example
     * // Selects the row with given row index
     * grid.SelectRow(1);
     */
    soby_DataRepeater.prototype.SelectRowByIndex = function (rowIndex) {
        var rowId = $(this.ContentDivSelector + " .soby_griddatarow:eq(" + rowIndex + ")").attr("id");
        this.SelectRow(rowId);
    };
    /**
     * Populates the grid data
     *
     * @items Data items which returned from the service.
     * @example
     * // Populates the grid with the given items
     * grid.PopulateGridData(items);
     */
    soby_DataRepeater.prototype.PopulateGridData = function (items) {
        this.Items = items;
        this.InitializeActionPaneButtons();
        if (this.ShowHeader === true) {
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
        if (this.ShouldContainRowElement === true) {
            currentRow = $(this.ContentDivSelector + " " + this.TBodyTagName);
        }
        var cellIndex = -1;
        //let currentItemIndex = 0;
        for (var i = 0; i < items.length; i++) {
            cellIndex++;
            if (this.ShouldContainRowElement === true && cellIndex % this.MaxCellCount === 0) {
                currentRowIndex++;
                currentRowID = "soby_griddatarow_" + soby_guid();
                currentRow = $("<" + this.RowTagName + " class='soby_griddatarow " + this.RowAdditionalClassNames + "'></" + this.RowTagName + ">");
                if (i % 2 === 0) {
                    currentRow.addClass("alt");
                }
                currentRow.attr("id", currentRowID);
                currentRow.attr("rowindex", currentRowIndex);
            }
            var item = items[i];
            var tempCurrentRowToAddDataRowsAfter = this.PopulateGroupByRow(i, item, currentRow);
            if (tempCurrentRowToAddDataRowsAfter !== null) {
                currentRowToAddDataRowsAfter = tempCurrentRowToAddDataRowsAfter;
            }
            //this.PopulateSelectionCell(item, currentRow, currentRowID);
            var cellID = "soby_gridcell_" + soby_guid();
            var cell = $("<" + this.CellTagName + " class='soby_gridcell " + this.CellAdditionalClassNames + "' valign='top' style='padding:5px;'></" + this.CellTagName + ">").html(this.ItemDataBound(cellID, item));
            cell.attr("id", cellID);
            cell.attr("cellindex", cellIndex);
            cell.attr("columnindex", cellIndex % this.MaxCellCount);
            if (this.IsSelectable === true) {
                cell.attr("onclick", "soby_WebGrids['" + this.GridID + "'].SelectCell('" + currentRowID + "', " + cellIndex + ")");
            }
            currentRow.append(cell);
            if (currentRowToAddDataRowsAfter === null) {
                if ($(this.ContentDivSelector + " .soby_gridnavigationrow").length > 0) {
                    $(this.ContentDivSelector + " .soby_gridnavigationrow").before(currentRow);
                }
                else {
                    $(this.ContentDivSelector + " " + this.TBodyTagName).append(currentRow);
                }
            }
            else {
                currentRowToAddDataRowsAfter.after(currentRow);
            }
            if (this.ItemCreated !== null) {
                this.ItemCreated(currentRowID, item);
            }
            this.PopulateDetailRow(currentRowID);
        }
        $(this.ContentDivSelector + " .loadingrow").hide();
        if (items.length === 0) {
            $(this.ContentDivSelector + " .emptydatarow td").html(this.EmptyDataHtml);
            $(this.ContentDivSelector + " .emptydatarow").show();
        }
        this.PopulateAggregateRows();
        this.GenerateGroupByPanePane();
        this.GenerateActionPane();
        this.GenerateFilterPane();
        this.DataService.PopulateNavigationInformation();
        if (this.OnGridPopulated !== null) {
            this.OnGridPopulated();
        }
        this.SetActionPaneButtonsVisibility();
    };
    return soby_DataRepeater;
}(soby_WebGrid));
// ************************************************************
// ********************* CAML BUILDER CAROUSEL *****************************
var soby_Carousels = new Array();
var soby_Carousel = /** @class */ (function () {
    function soby_Carousel(contentDivSelector, title, dataService, emptyDataHtml, imageFieldName, captionFieldName, contentFieldName, isContentFieldUrl) {
        /************************************ EVENTS *************************************/
        this.OnGridPopulated = null;
        this.OnRowSelected = null;
        this.OnCellSelected = null;
        /*********************************************************************************/
        this.CarouselID = "soby_carousel_" + soby_guid();
        this.MaxWidth = null;
        this.Items = null;
        this.ItemDataBound = null;
        this.SVGImages = new soby_SVGImages();
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
            if (key === this.CarouselID) {
                return;
            }
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
        if (index >= this.Items.length) {
            index = 0;
        }
        $(this.ContentDivSelector + " .item[index='" + index + "']").addClass("active");
        $(this.ContentDivSelector + " .carouselindicator[index='" + index + "']").addClass("active");
    };
    soby_Carousel.prototype.PreviousItem = function () {
        var currentIndex = parseInt($(this.ContentDivSelector + " .item.active").attr("index"));
        $(this.ContentDivSelector + " .item").removeClass("active");
        $(this.ContentDivSelector + " .carouselindicator").removeClass("active");
        var index = currentIndex - 1;
        if (index < 0) {
            index = this.Items.length - 1;
        }
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
            itemDiv.html(this.ItemDataBound(i, items[i]));
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
        if (this.MaxWidth !== null && this.MaxWidth > 0) {
            carouselDiv.css("max-width", this.MaxWidth);
        }
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(carouselDiv);
        var carousel = this;
        this.DataService.ItemPopulated = function (items) {
            carousel.PopulateGridData(items);
        };
        this.DataService.ItemBeingPopulated = function () {
            $("#" + carouselDivID).html(this.SVGImages.GetLoading() + " Loading...");
        };
        if (populateItems === true) {
            this.DataService.PopulateItems();
        }
    };
    return soby_Carousel;
}());
// ************************************************************
// ********************* CAML BUILDER METRO TILES *****************************
var soby_MetroTileGrids = new Array();
var soby_MetroTilesGrid = /** @class */ (function () {
    function soby_MetroTilesGrid(contentDivSelector, title, dataService, emptyDataHtml, imageFieldName, captionFieldName, urlFieldName, openInNewWindowFieldName, startColorFieldName, endColorFieldName, colspanFieldName, rowspanFieldName) {
        this.MetroTileGridID = "soby_metrotilegrid_" + soby_guid();
        this.MaxWidth = null;
        this.TileWidth = 150;
        this.TileHeight = 120;
        this.Width = "600px";
        this.Items = null;
        this.SVGImages = new soby_SVGImages();
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
            if (key === this.MetroTileGridID) {
                return;
            }
        }
        soby_MetroTileGrids[this.MetroTileGridID] = this;
    };
    soby_MetroTilesGrid.prototype.PopulateItems = function (items) {
        var itemsDiv = $("<div class='metro-tiles' style='width:" + this.Width + "'></div>");
        for (var i = 0; i < items.length; i++) {
            var imageSrc = items[i][this.ImageFieldName];
            if (imageSrc.indexOf(",") > -1) {
                imageSrc = imageSrc.split(",")[0];
            }
            var caption = items[i][this.CaptionFieldName];
            var url = items[i][this.URLFieldName];
            if (url.indexOf(",") > -1) {
                url = url.split(",")[0];
            }
            var openInNewWindow = items[i][this.OpenInNewWindowFieldName];
            var startColor = items[i][this.StartColorFieldName];
            var endColor = items[i][this.EndColorFieldName];
            var rowspan = parseInt(items[i][this.RowSpanFieldName]);
            if (isNaN(rowspan) === true) {
                rowspan = 1;
            }
            var colspan = parseInt(items[i][this.ColSpanFieldName]);
            if (isNaN(colspan) === true) {
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
            var link1 = $("<a></a>");
            link1.attr("href", url);
            if (openInNewWindow === "1") {
                link1.attr("target", "_blank");
            }
            var image = $("<img alt='...' class='metro-tileimage'>");
            image.attr("src", imageSrc);
            link1.append(image);
            itemDiv.append(link1);
            var captionDiv = $("<div class='metro-tilecaption'></div>");
            var link2 = $("<a></a>");
            link2.attr("href", url);
            link2.text(caption);
            if (openInNewWindow === "1") {
                link2.attr("target", "_blank");
            }
            captionDiv.append(link2);
            itemDiv.append(captionDiv);
            itemsDiv.append(itemDiv);
        }
        $("#" + this.MetroTileGridID).append(itemsDiv);
    };
    soby_MetroTilesGrid.prototype.Initialize = function (populateItems) {
        var metroTileGridDiv = $("<div class='soby_metrotilegrid' id='" + this.MetroTileGridID + "'></div>");
        if (this.MaxWidth !== null && this.MaxWidth !== "") {
            metroTileGridDiv.css("max-width", this.MaxWidth);
        }
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(metroTileGridDiv);
        var metroTileGrid = this;
        this.DataService.ItemPopulated = function (items) {
            metroTileGrid.ItemPopulated(items);
            metroTileGrid.PopulateItems(items);
        };
        this.DataService.ItemBeingPopulated = function () {
            $("#" + this.MetroTileGridID).html(this.SVGImages.GetLoading() + " Loading...");
        };
        if (populateItems === true) {
            this.DataService.PopulateItems();
        }
    };
    soby_MetroTilesGrid.prototype.ItemPopulated = function (items) { };
    return soby_MetroTilesGrid;
}());
// ************************************************************
// ********************* CAML BUILDER WIZARD TEMPLATE *****************************
var soby_Wizards = new Array();
var soby_Wizard = /** @class */ (function () {
    function soby_Wizard(contentDivSelector) {
        this.AutoPopulateStepNumbersOnHeaders = true;
        this.WizardID = "";
        this.ContentDivSelector = "";
        this.CurrentStepIndex = -1;
        this.TempStepIndex = -1;
        this.MaxWidth = null;
        this.TileWidth = "150";
        this.TileHeight = "120";
        this.Width = "600";
        this.Items = null;
        this.EnsureWizardsExistency = function () {
            for (var key in soby_Wizards) {
                if (key === this.WizardID) {
                    return;
                }
            }
            soby_Wizards[this.WizardID] = this;
        };
        this.GetItemById = function (id) {
            for (var i = 0; i < this.Items.length; i++) {
                if (this.Items[i].LinkId === id) {
                    return this.Items[i];
                }
            }
            return null;
        };
        this.ActivateWizardStep = function (linkId) {
            var item = this.GetItemById(linkId);
            $(this.ContentDivSelector + " a.sobywizardsteplink").removeClass("active");
            $(this.ContentDivSelector + " > ul > li a[linkid='" + linkId + "']").addClass("active");
            $(".sobywizardstepcontent[wizardid='" + this.WizardID + "']").hide();
            $(item.ContainerId).show();
        };
        this.GoToNextStep = function () {
            if (this.CurrentStepIndex < this.Items.length) {
                this.GoToStep(this.CurrentStepIndex + 1);
            }
        };
        this.GoToPreviousStep = function () {
            if (this.CurrentStepIndex > 0) {
                this.GoToStep(this.CurrentStepIndex - 1);
            }
        };
        this.EventBeforeStepChange = null;
        this.EventAfterStepChange = null;
        this.GoToStep = function (stepIndex) {
            if (this.CurrentStepIndex === stepIndex) {
                return;
            }
            this.TempStepIndex = stepIndex;
            if (this.EventBeforeStepChange !== null) {
                this.EventBeforeStepChange(stepIndex);
            }
            else {
                this.CommitToStep();
            }
        };
        this.CommitToStep = function () {
            var navigatedFromStepIndex = this.CurrentStepIndex;
            this.CurrentStepIndex = this.TempStepIndex;
            $(this.ContentDivSelector + " .sobywizardnavigationbar button").removeAttr("disabled");
            if (this.CurrentStepIndex === 0) {
                $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").hide();
            }
            else {
                $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").show();
            }
            if (this.CurrentStepIndex < this.Items.length) {
                $(this.ContentDivSelector + " .sobywizardnavigationbar .next").show();
            }
            else {
                $(this.ContentDivSelector + " .sobywizardnavigationbar .next").hide();
            }
            var item = this.Items[this.CurrentStepIndex];
            $(this.ContentDivSelector + " a.sobywizardsteplink").removeClass("active");
            $(this.ContentDivSelector + " > ul > li a[linkid='" + item.LinkId + "']").addClass("active");
            var visibleSteps = $(".sobywizardstepcontent[wizardid='" + this.WizardID + "']:visible");
            if (visibleSteps.length === 1) {
                visibleSteps.toggle("slide", "left", function () {
                    $(item.ContainerId).toggle("slide", "right");
                });
            }
            else {
                visibleSteps.hide();
                $(item.ContainerId).toggle("slide", "right");
            }
            if (this.EventAfterStepChange !== null) {
                this.EventAfterStepChange(navigatedFromStepIndex, this.CurrentStepIndex);
            }
        };
        this.Initialize = function () {
            $(".sobywizardstepcontent[wizardid='" + this.WizardID + "']:visible").hide();
            $(this.ContentDivSelector).addClass("sobywizard");
            var wizardLinks = $(this.ContentDivSelector + " > ul > li a");
            wizardLinks.addClass("sobywizardsteplink");
            this.Items = new Array();
            for (var i = 0; i < wizardLinks.length; i++) {
                var linkId = "soby_wizardlink_" + i;
                var linkSelector = $(wizardLinks[i]).attr("href");
                var linkText = $(wizardLinks[i]).text();
                $(linkSelector).addClass("sobywizardstepcontent");
                $(linkSelector).attr("wizardid", this.WizardID);
                $(wizardLinks[i]).attr("wizardid", this.WizardID);
                $(wizardLinks[i]).attr("linkid", linkId);
                $(wizardLinks[i]).attr("onclick", "soby_Wizards['" + this.WizardID + "'].GoToStep(" + i + ")");
                this.Items[this.Items.length] = { Title: linkText, ContainerId: linkSelector, LinkId: linkId };
                if (this.AutoPopulateStepNumbersOnHeaders === true) {
                    $(wizardLinks[i]).text((i + 1) + ". " + linkText);
                }
            }
            for (var i = 0; i < this.Items.length; i++) {
                $(this.Items[i].ContainerId).hide();
            }
            $(this.ContentDivSelector + " .sobywizardnavigationbar button").attr("wizardid", this.WizardID);
            $(this.ContentDivSelector + " .sobywizardnavigationbar .previous").click(function () {
                try {
                    var wizardId = $(this).attr("wizardid");
                    soby_Wizards[wizardId].GoToPreviousStep();
                }
                catch (ex) { }
                return false;
            });
            $(this.ContentDivSelector + " .sobywizardnavigationbar .next").click(function () {
                try {
                    var wizardId = $(this).attr("wizardid");
                    soby_Wizards[wizardId].GoToNextStep();
                }
                catch (ex) { }
                return false;
            });
            this.GoToStep(0);
        };
        this.HideNavigationBar = function () {
            $(this.ContentDivSelector + " .sobywizardnavigationbar").hide();
        };
        this.ShowNavigationBar = function () {
            $(this.ContentDivSelector + " .sobywizardnavigationbar").show();
        };
        this.HideStepPanels = function () {
            $(this.ContentDivSelector + " .sobywizardstepcontent").hide();
        };
        this.ShowStepPanels = function () {
            $(this.ContentDivSelector + " .sobywizardstepcontent").show();
        };
        this.WizardID = "soby_wizardgrid_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.EnsureWizardsExistency();
    }
    return soby_Wizard;
}());
// ************************************************************
// ********************* CAML BUILDER Tabs TEMPLATE *****************************
var soby_Tabs = new Array();
var soby_Tab = /** @class */ (function () {
    function soby_Tab(contentDivSelector) {
        this.AutoPopulateTabNumbersOnHeaders = false;
        this.TabID = "";
        this.ContentDivSelector = "";
        this.CurrentTabIndex = -1;
        this.TempTabIndex = -1;
        this.MaxWidth = null;
        this.TileWidth = "150";
        this.TileHeight = "120";
        this.Width = "600";
        this.Items = null;
        this.EnsureTabsExistency = function () {
            for (var key in soby_Tabs) {
                if (key === this.TabID) {
                    return;
                }
            }
            soby_Tabs[this.TabID] = this;
        };
        this.GetItemById = function (id) {
            for (var i = 0; i < this.Items.length; i++) {
                if (this.Items[i].LinkId === id) {
                    return this.Items[i];
                }
            }
            return null;
        };
        this.ActivateTab = function (linkId) {
            var item = this.GetItemById(linkId);
            $(this.ContentDivSelector + " a.sobytablink").removeClass("active");
            $(this.ContentDivSelector + " > ul > li a[linkid='" + linkId + "']").addClass("active");
            $(".sobytabcontent[tabid='" + this.TabID + "']").hide();
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
            if (this.CurrentTabIndex === tabIndex) {
                return;
            }
            this.TempTabIndex = tabIndex;
            if (this.EventBeforeTabChange !== null) {
                this.EventBeforeTabChange(tabIndex);
            }
            else {
                this.CommitToTab();
            }
        };
        this.CommitToTab = function () {
            var navigatedFromTabIndex = this.CurrentTabIndex;
            this.CurrentTabIndex = this.TempTabIndex;
            $(this.ContentDivSelector + " .sobytabnavigationbar button").removeAttr("disabled");
            if (this.CurrentTabIndex === 0) {
                $(this.ContentDivSelector + " .sobytabnavigationbar .previous").hide();
            }
            else {
                $(this.ContentDivSelector + " .sobytabnavigationbar .previous").show();
            }
            if (this.CurrentTabIndex < this.Items.length) {
                $(this.ContentDivSelector + " .sobytabnavigationbar .next").show();
            }
            else {
                $(this.ContentDivSelector + " .sobytabnavigationbar .next").hide();
            }
            var item = this.Items[this.CurrentTabIndex];
            $(this.ContentDivSelector + " a.sobytablink").removeClass("active");
            $(this.ContentDivSelector + " > ul > li a[linkid='" + item.LinkId + "']").addClass("active");
            $(".sobytabcontent[tabid='" + this.TabID + "']:visible").hide();
            $(item.ContainerId).show();
            if (this.EventAfterTabChange !== null) {
                this.EventAfterTabChange(navigatedFromTabIndex, this.CurrentTabIndex);
            }
        };
        this.Initialize = function () {
            var tabs = this;
            $(".sobytabcontent[tabid='" + this.TabID + "']:visible").hide();
            $(this.ContentDivSelector).addClass("sobytab");
            var tabLinks = $(this.ContentDivSelector + " > ul > li a");
            tabLinks.addClass("sobytablink");
            this.Items = new Array();
            for (var i = 0; i < tabLinks.length; i++) {
                var linkId = "soby_tablink_" + i;
                var linkSelector = $(tabLinks[i]).attr("href");
                var linkText = $(tabLinks[i]).text();
                $(linkSelector).addClass("sobytabcontent");
                $(linkSelector).attr("tabid", this.TabID);
                $(tabLinks[i]).attr("tabid", this.TabID);
                $(tabLinks[i]).attr("linkid", linkId);
                $(tabLinks[i]).attr("index", i);
                //$(tabLinks[i]).attr("onclick", "soby_Tabs['" + this.TabID + "'].GoToTab(" + i + ")")
                $(tabLinks[i]).click(function (event) {
                    event.preventDefault();
                    var index = parseInt($(this).attr("index"));
                    tabs.GoToTab(index);
                });
                this.Items[this.Items.length] = { Title: linkText, ContainerId: linkSelector, LinkId: linkId };
                if (this.AutoPopulateTabNumbersOnHeaders === true) {
                    $(tabLinks[i]).text((i + 1) + ". " + linkText);
                }
            }
            for (var i = 0; i < this.Items.length; i++) {
                $(this.Items[i].ContainerId).hide();
            }
            $(this.ContentDivSelector + " .sobytabnavigationbar button").attr("tabid", this.TabID);
            $(this.ContentDivSelector + " .sobytabnavigationbar .previous").click(function () {
                try {
                    var tabId = $(this).attr("tabid");
                    soby_Tabs[tabId].GoToPreviousTab();
                }
                catch (ex) { }
                return false;
            });
            $(this.ContentDivSelector + " .sobytabnavigationbar .next").click(function () {
                try {
                    var tabId = $(this).attr("tabid");
                    soby_Tabs[tabId].GoToNextTab();
                }
                catch (ex) { }
                return false;
            });
            this.GoToTab(0);
        };
        this.HideNavigationBar = function () {
            $(this.ContentDivSelector + " .sobytabnavigationbar").hide();
        };
        this.ShowNavigationBar = function () {
            $(this.ContentDivSelector + " .sobytabnavigationbar").show();
        };
        this.HideTabPanels = function () {
            $(this.ContentDivSelector + " .sobytabcontent").hide();
        };
        this.ShowTabPanels = function () {
            $(this.ContentDivSelector + " .sobytabcontent").show();
        };
        this.TabID = "soby_tabgrid_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.EnsureTabsExistency();
    }
    return soby_Tab;
}());
// ************************************************************
// ********************* CAML BUILDER MENU TEMPLATE *****************************
var soby_Menus = new Array();
var soby_Menu = /** @class */ (function () {
    function soby_Menu(contentDivSelector, dataService, displayNameField, idField, parentIdField) {
        this.MenuID = "";
        this.ContentDivSelector = "";
        this.DisplayNameField = "";
        this.IDField = "";
        this.ParentIDField = "";
        this.DataService = null;
        this.MaxWidth = null;
        this.TileWidth = "150";
        this.TileHeight = "120";
        this.Width = "600";
        this.Items = null;
        this.EnsureMenusExistency = function () {
            for (var key in soby_Menus) {
                if (key === this.MenuID) {
                    return;
                }
            }
            soby_Menus[this.MenuID] = this;
        };
        this.GetItemById = function (id) {
            for (var i = 0; i < this.Items.length; i++) {
                if (this.Items[i].LinkId === id) {
                    return this.Items[i];
                }
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
        this.MenuID = "soby_menugrid_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.DisplayNameField = displayNameField;
        this.IDField = idField;
        this.ParentIDField = parentIdField;
        this.DataService = dataService;
        this.EnsureMenusExistency();
    }
    return soby_Menu;
}());
// ************************************************************
// ********************* ITEM SELECTION *****************************
var soby_ItemSelections = new Array();
var SobyItemSelectorTypeObject = /** @class */ (function () {
    function SobyItemSelectorTypeObject() {
        this.GridView = 0;
        this.TreeView = 1;
        this.CardView = 2;
    }
    return SobyItemSelectorTypeObject;
}());
var SobyItemSelectorTypes = new SobyItemSelectorTypeObject();
function soby_GetItemSelectionByContentDivSelector(contentDivSelector) {
    for (var key in soby_ItemSelections) {
        if (soby_ItemSelections[key].ContentDivSelector === contentDivSelector)
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
var SobyRangeSelectionViewTypes;
(function (SobyRangeSelectionViewTypes) {
    SobyRangeSelectionViewTypes[SobyRangeSelectionViewTypes["NumericRange"] = 0] = "NumericRange";
    SobyRangeSelectionViewTypes[SobyRangeSelectionViewTypes["DateRange"] = 1] = "DateRange";
})(SobyRangeSelectionViewTypes || (SobyRangeSelectionViewTypes = {}));
var soby_RangeSelections = new Array();
var soby_RangeSelection = /** @class */ (function () {
    function soby_RangeSelection(contentDivSelector, title, viewType, width, height, startValue, endValue, minorRangeInterval, minorRangeCountInAMajorRange, selectedRange) {
        this.RangeSelectionID = null;
        this.RangeSelectionTooltipID = "";
        this.ViewType = null;
        this.Title = null;
        this.ContentDivSelector = null;
        this.Width = null;
        this.Height = null;
        this.PaddingLeft = 20;
        this.PaddingRight = 20;
        this.PaddingBottom = 20;
        this.PaddingTop = 20;
        this.LabelHeight = 20;
        this.RangeBarHeight = 20;
        this.SelectedRangeBarHeight = 40;
        this.AdditionalLabelSectionHeight = 0;
        this.StartNumericValue = null;
        this.EndNumericValue = null;
        this.MinorRangeInterval = null;
        this.MinorRangeCountInAMajorRange = null;
        this.MinimumValue = null;
        this.MaximumValue = null;
        this.PageItemCount = null;
        this.SelectedRange = null;
        this.DragDirection = "";
        this.IsBeingDragged = false;
        this.MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.RangeSelectionID = "soby_rangeselection_" + soby_guid();
        this.RangeSelectionTooltipID = this.RangeSelectionID + "_tip";
        ;
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.ViewType = viewType;
        this.Width = width;
        this.Height = height;
        this.SelectedRange = selectedRange;
        if (this.ViewType === SobyRangeSelectionViewTypes.NumericRange) {
            this.StartNumericValue = parseFloat(startValue);
            this.EndNumericValue = parseFloat(endValue);
            this.MinorRangeInterval = parseFloat(minorRangeInterval);
            this.MinorRangeCountInAMajorRange = parseFloat(minorRangeCountInAMajorRange);
        }
        else {
            this.StartNumericValue = soby_TicksFromDate(startValue);
            this.EndNumericValue = soby_TicksFromDate(endValue);
            this.MinorRangeInterval = 864000000000; // day
            this.MinorRangeCountInAMajorRange = 7; // week
            this.SelectedRange = [soby_TicksFromDate(selectedRange[0]), soby_TicksFromDate(selectedRange[1])];
            this.AdditionalLabelSectionHeight = 20;
        }
        this.EnsureRangeSelectionsExistency();
    }
    soby_RangeSelection.prototype.EnsureRangeSelectionsExistency = function () {
        for (var key in soby_RangeSelections) {
            if (key === this.RangeSelectionID) {
                return;
            }
        }
        soby_RangeSelections[this.RangeSelectionID] = this;
    };
    ;
    soby_RangeSelection.prototype.RePaint = function () {
        this.Clear();
        this.DrawPane();
        this.DrawSelectedRange();
    };
    soby_RangeSelection.prototype.Clear = function () {
        var ctx = this.GetContext();
        ctx.clearRect(0, 0, this.Width, this.Height);
    };
    soby_RangeSelection.prototype.Initialize = function () {
        var canvas = $("<canvas id='" + this.RangeSelectionID + "' width='" + this.Width + "' height='" + this.Height + "' style='border: 1px solid;'></canvas>");
        var tooltipCanvas = $("<canvas id='" + this.RangeSelectionTooltipID + "' width='120' height='40' style='position: absolute;'></canvas>");
        $(this.ContentDivSelector).html("");
        $(this.ContentDivSelector).append(canvas);
        $(this.ContentDivSelector).append(tooltipCanvas);
        $("#" + this.RangeSelectionID).attr("draggable", "true");
        document.getElementById(this.RangeSelectionID).addEventListener('mousemove', this.HandleMouseMove);
        document.getElementById(this.RangeSelectionID).addEventListener('mousedown', this.HandleMouseDown);
        document.getElementById(this.RangeSelectionID).addEventListener('mouseup', this.HandleMouseUp);
        this.DrawPane();
        this.DrawSelectedRange();
    };
    ;
    soby_RangeSelection.prototype.HandleMouseDown = function (e) {
        e.preventDefault();
        var rangeSelection = soby_RangeSelections[eval("e.target.id")];
        var ctx = rangeSelection.GetTooltipContext();
        var canvas = rangeSelection.GetTooltipCanvas();
        var canvasOffset = $("#" + rangeSelection.RangeSelectionID).offset();
        var canvasOffsetX = canvasOffset.left - $(window).scrollLeft();
        var canvasOffsetY = canvasOffset.top - $(window).scrollTop();
        var mouseX = e.clientX - canvasOffsetX;
        var mouseY = e.clientY - canvasOffsetY;
        if (rangeSelection.CheckMouseHitSelectedRangeLeftResize(mouseX, mouseY) === true) {
            rangeSelection.GetCanvas().style.cursor = "e-resize";
            rangeSelection.IsBeingDragged = true;
            rangeSelection.DragDirection = "leftresize";
        }
        else if (rangeSelection.CheckMouseHitSelectedRangeRightResize(mouseX, mouseY) === true) {
            rangeSelection.GetCanvas().style.cursor = "e-resize";
            rangeSelection.IsBeingDragged = true;
            rangeSelection.DragDirection = "rightresize";
        }
        else if (rangeSelection.CheckMouseHitSelectedRange(mouseX, mouseY) === true) {
            rangeSelection.GetCanvas().style.cursor = "pointer";
            rangeSelection.IsBeingDragged = true;
            rangeSelection.DragDirection = "moveposition";
        }
    };
    soby_RangeSelection.prototype.HandleMouseUp = function (e) {
        e.preventDefault();
        var rangeSelection = soby_RangeSelections[eval("e.target.id")];
        rangeSelection.RePaintOnMouseMove(e.offsetX, true);
    };
    soby_RangeSelection.prototype.HandleMouseMove = function (e) {
        e.preventDefault();
        var rangeSelection = soby_RangeSelections[eval("e.target.id")];
        if (rangeSelection.IsBeingDragged === true) {
            if (rangeSelection.DragDirection === "moveposition") {
                rangeSelection.GetCanvas().style.cursor = "move";
                rangeSelection.RePaintOnMouseMove(e.offsetX, false);
            }
            else if (rangeSelection.DragDirection === "rightresize" || rangeSelection.DragDirection === "leftresize") {
                rangeSelection.GetCanvas().style.cursor = "e-resize";
                rangeSelection.RePaintOnMouseMove(e.offsetX, false);
            }
            return;
        }
        var ctx = rangeSelection.GetTooltipContext();
        var canvas = rangeSelection.GetTooltipCanvas();
        var canvasOffset = $("#" + rangeSelection.RangeSelectionID).offset();
        var tooltipOffsetX = canvasOffset.left - $(window).scrollLeft();
        var tooltipOffsetY = canvasOffset.top - $(window).scrollTop();
        var mouseX = e.clientX - tooltipOffsetX;
        var mouseY = e.clientY - tooltipOffsetY;
        if (rangeSelection.CheckMouseHitSelectedRangeLeftResize(mouseX, mouseY) === true) {
            rangeSelection.GetCanvas().style.cursor = "e-resize";
            rangeSelection.DragDirection = "leftresize";
        }
        else if (rangeSelection.CheckMouseHitSelectedRangeRightResize(mouseX, mouseY) === true) {
            rangeSelection.GetCanvas().style.cursor = "e-resize";
            rangeSelection.DragDirection = "rightresize";
        }
        else if (rangeSelection.CheckMouseHitSelectedRange(mouseX, mouseY) === true) {
            rangeSelection.GetCanvas().style.cursor = "pointer";
            rangeSelection.DragDirection = "moveposition";
        }
        else {
            rangeSelection.GetCanvas().style.cursor = "default";
        }
    };
    soby_RangeSelection.prototype.CheckMouseHitSelectedRangeLeftResize = function (x, y) {
        var selectedRangeLeft = this.GetSelectedRangeLeft() - 2;
        var selectedRangeRight = selectedRangeLeft + 4;
        var selectedRangeBottom = this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom;
        var selectedRangeTop = selectedRangeBottom - this.SelectedRangeBarHeight;
        if (selectedRangeLeft < x && selectedRangeRight > x && selectedRangeBottom > y && selectedRangeTop < y)
            return true;
        return false;
    };
    soby_RangeSelection.prototype.CheckMouseHitSelectedRangeRightResize = function (x, y) {
        var selectedRangeRight = this.GetSelectedRangeRight() + 2;
        var selectedRangeLeft = selectedRangeRight - 4;
        var selectedRangeBottom = this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom;
        var selectedRangeTop = selectedRangeBottom - this.SelectedRangeBarHeight;
        if (selectedRangeLeft < x && selectedRangeRight > x && selectedRangeBottom > y && selectedRangeTop < y)
            return true;
        return false;
    };
    soby_RangeSelection.prototype.CheckMouseHitSelectedRange = function (x, y) {
        var selectedRangeLeft = this.GetSelectedRangeLeft();
        var selectedRangeRight = this.GetSelectedRangeRight();
        var selectedRangeBottom = this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom;
        var selectedRangeTop = selectedRangeBottom - this.SelectedRangeBarHeight;
        if (selectedRangeLeft < x && selectedRangeRight > x && selectedRangeBottom > y && selectedRangeTop < y)
            return true;
        return false;
    };
    soby_RangeSelection.prototype.RePaintOnMouseMove = function (offsetX, mouseUp) {
        if (this.IsBeingDragged === true) {
            var direction = this.DragDirection;
            var mousePositionValue = this.GetValueFromOffsetX(offsetX);
            var newStartValue = this.SelectedRange[0];
            var newEndValue = this.SelectedRange[1];
            if (direction === "leftresize") {
                newStartValue = mousePositionValue;
            }
            else if (direction === "rightresize") {
                newEndValue = mousePositionValue;
            }
            else if (direction === "moveposition") {
                var difference = this.SelectedRange[1] - this.SelectedRange[0];
                if (difference === 0) {
                    return;
                }
                if (difference < -1)
                    difference = difference * -1;
                newStartValue = mousePositionValue;
                newEndValue = newStartValue + difference;
                if (newStartValue < this.StartNumericValue)
                    return;
                if (newEndValue > this.EndNumericValue)
                    return;
            }
            if (newStartValue !== this.SelectedRange[0] || newEndValue !== this.SelectedRange[1]) {
                this.SelectedRange = [newStartValue, newEndValue];
                this.RePaint();
            }
            if (mouseUp === true) {
                this.GetCanvas().style.cursor = "default";
                var dragingImageObjectId = this.RangeSelectionID + "_DragingImageObject";
                if ($("#" + dragingImageObjectId).length > 0) {
                    $("#" + dragingImageObjectId).remove();
                }
                this.IsBeingDragged = false;
            }
        }
    };
    soby_RangeSelection.prototype.DrawPane = function () {
        var rangeItemCount = this.GetRangeItemCount();
        var rangeValueWidth = this.GetRangeValueWidth();
        console.log("rangeItemCount:" + rangeItemCount);
        var ctx = this.GetContext();
        ctx.fillStyle = "gray";
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.PaddingLeft, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.RangeBarHeight / 2);
        ctx.lineTo(this.Width - (this.PaddingRight), this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.RangeBarHeight / 2);
        ctx.stroke();
        for (var i = 0; i < rangeItemCount; i = i + this.MinorRangeCountInAMajorRange) {
            var currentX_1 = this.PaddingLeft + i * rangeValueWidth;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(currentX_1, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom);
            ctx.lineTo(currentX_1, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.RangeBarHeight);
            ctx.stroke();
            var currentValueFromStart = (i * this.MinorRangeInterval);
            var currentValue = this.StartNumericValue + currentValueFromStart;
            ctx.fillText(this.GetValueLabel(currentValue), currentX_1 - 6, this.Height - this.AdditionalLabelSectionHeight - this.PaddingBottom);
        }
        var currentX = this.Width - this.PaddingRight;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentX, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom);
        ctx.lineTo(currentX, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.RangeBarHeight);
        ctx.stroke();
        ctx.fillText(this.GetValueLabel(this.EndNumericValue), currentX - 6, this.Height - this.AdditionalLabelSectionHeight - this.PaddingBottom);
        if (this.ViewType === SobyRangeSelectionViewTypes.DateRange) {
            var startDate = soby_DateFromTicks(this.StartNumericValue);
            var currentDate = soby_DateFromTicks(this.StartNumericValue);
            var endDate = soby_DateFromTicks(this.EndNumericValue);
            while (endDate > currentDate) {
                if (currentDate.getDate() === 1) {
                    var currentX_2 = this.GetOffsetXFromValue(soby_TicksFromDate(currentDate));
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(currentX_2, this.Height - this.PaddingBottom - this.AdditionalLabelSectionHeight + 4);
                    ctx.lineTo(currentX_2, this.Height - this.PaddingBottom);
                    ctx.stroke();
                    ctx.fillText(this.MonthNames[currentDate.getMonth()], currentX_2 + 6, this.Height - this.PaddingBottom - 4);
                    if (startDate.getDate() < 25) {
                        var yesterdayOfCurrentDate = new Date(currentDate.getTime());
                        yesterdayOfCurrentDate.setDate(yesterdayOfCurrentDate.getDate() - 1);
                        if (yesterdayOfCurrentDate.getMonth() === startDate.getMonth() && yesterdayOfCurrentDate.getFullYear() === startDate.getFullYear()) {
                            var startDateX = this.GetOffsetXFromValue(this.StartNumericValue);
                            ctx.fillText(this.MonthNames[yesterdayOfCurrentDate.getMonth()], startDateX + 4, this.Height - this.PaddingBottom - 4);
                        }
                    }
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    };
    soby_RangeSelection.prototype.GetValueLabel = function (value) {
        if (this.ViewType === SobyRangeSelectionViewTypes.DateRange) {
            return soby_DateFromTicks(value).getDate().toString();
        }
        return value.toString();
    };
    soby_RangeSelection.prototype.GetContext = function () {
        return eval("document.getElementById('" + this.RangeSelectionID + "').getContext('2d');");
    };
    soby_RangeSelection.prototype.GetCanvas = function () {
        return eval("document.getElementById('" + this.RangeSelectionID + "');");
    };
    soby_RangeSelection.prototype.GetTooltipContext = function () {
        return eval("document.getElementById('" + this.RangeSelectionTooltipID + "').getContext('2d');");
    };
    soby_RangeSelection.prototype.GetTooltipCanvas = function () {
        return eval("document.getElementById('" + this.RangeSelectionTooltipID + "');");
    };
    soby_RangeSelection.prototype.DrawSelectedRange = function () {
        var selectedRangeLeft = this.GetSelectedRangeLeft();
        var selectedRangeRight = this.GetSelectedRangeRight();
        var selectedRangeWidth = selectedRangeRight - selectedRangeLeft;
        var ctx = this.GetContext();
        ctx.fillStyle = "#606060";
        ctx.strokeStyle = "#606060";
        ctx.fillRect(selectedRangeLeft, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.RangeBarHeight * (3 / 4), selectedRangeWidth, 10);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(selectedRangeLeft - 1, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.SelectedRangeBarHeight * (3 / 4));
        ctx.lineTo(selectedRangeLeft - 1, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom + this.SelectedRangeBarHeight * (1 / 4));
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(selectedRangeRight + 1, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.SelectedRangeBarHeight * (3 / 4));
        ctx.lineTo(selectedRangeRight + 1, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom + this.SelectedRangeBarHeight * (1 / 4));
        ctx.stroke();
        var selectedRangeValueBoxWidth = 72;
        var selectedRangeValueBoxHeight = 18;
        var selectedRangeStartValueBoxLeft = selectedRangeLeft - selectedRangeValueBoxWidth;
        if (selectedRangeStartValueBoxLeft - this.PaddingLeft < 0)
            selectedRangeStartValueBoxLeft = this.PaddingLeft;
        var selectedRangeStartValueBoxRight = selectedRangeRight;
        if (selectedRangeStartValueBoxRight + selectedRangeValueBoxWidth + this.PaddingRight > this.Width)
            selectedRangeStartValueBoxRight = this.Width - this.PaddingRight - selectedRangeValueBoxWidth;
        ctx.fillRect(selectedRangeStartValueBoxLeft - 2, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.SelectedRangeBarHeight * (3 / 4) - selectedRangeValueBoxHeight, selectedRangeValueBoxWidth + 2, selectedRangeValueBoxHeight);
        ctx.fillRect(selectedRangeStartValueBoxRight, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.SelectedRangeBarHeight * (3 / 4) - selectedRangeValueBoxHeight, selectedRangeValueBoxWidth + 2, selectedRangeValueBoxHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        var startValueLabel = this.SelectedRange[0].toString();
        var endValueLabel = this.SelectedRange[1].toString();
        if (this.ViewType === SobyRangeSelectionViewTypes.DateRange) {
            var selectedRangeStartDate = soby_DateFromTicks(this.SelectedRange[0]);
            var selectedRangeEndDate = soby_DateFromTicks(this.SelectedRange[1]);
            startValueLabel = this.MonthNames[selectedRangeStartDate.getMonth()] + " " + selectedRangeStartDate.getDate().toString();
            endValueLabel = this.MonthNames[selectedRangeEndDate.getMonth()] + " " + selectedRangeEndDate.getDate().toString();
        }
        ctx.fillText(startValueLabel, selectedRangeStartValueBoxLeft + 5, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.SelectedRangeBarHeight * (3 / 4) - 5);
        ctx.fillText(endValueLabel, selectedRangeStartValueBoxRight + 5, this.Height - this.LabelHeight - this.AdditionalLabelSectionHeight - this.PaddingBottom - this.SelectedRangeBarHeight * (3 / 4) - 5);
    };
    soby_RangeSelection.prototype.GetRangeItemCount = function () {
        return (this.EndNumericValue - this.StartNumericValue) / this.MinorRangeInterval;
    };
    soby_RangeSelection.prototype.GetRangeValueWidth = function () {
        return (this.Width - (this.PaddingLeft + this.PaddingRight)) / this.GetRangeItemCount();
    };
    soby_RangeSelection.prototype.GetValueFromOffsetX = function (offsetX) {
        return this.StartNumericValue + (((offsetX - this.PaddingLeft) / this.GetRangeValueWidth()) * this.MinorRangeInterval);
    };
    soby_RangeSelection.prototype.GetOffsetXFromValue = function (value) {
        return this.PaddingLeft + (((value - this.StartNumericValue) / this.MinorRangeInterval) * this.GetRangeValueWidth());
    };
    soby_RangeSelection.prototype.GetSelectedRangeLeft = function () {
        return this.GetOffsetXFromValue(this.SelectedRange[0]);
    };
    soby_RangeSelection.prototype.GetSelectedRangeRight = function () {
        return this.GetOffsetXFromValue(this.SelectedRange[1]);
    };
    return soby_RangeSelection;
}());
var soby_ItemSelection = /** @class */ (function () {
    function soby_ItemSelection(contentDivSelector, title, itemSelectorType, autoCompleteDataService, advancedSearchDataService, advancedSearchChildrenDataService, emptyDataHtml, dialogID, selectorUrl, valueFieldName, textFieldName, parentFieldName) {
        this.ItemSelectorType = null;
        this.AdvancedSearchAsGrid = null;
        this.ItemSelectionID = "";
        this.ContentDivSelector = "";
        this.Title = "";
        this.AutoCompleteDataService = null;
        this.AdvancedSearchDataService = null;
        this.AdvancedSearchChildrenDataService = null;
        this.AllowMultipleSelections = true;
        this.EmptyDataHtml = "";
        this.WaterMark = "";
        this.DialogID = "";
        this.SelectorUrl = "";
        this.ParentFieldName = "";
        this.ValueFieldName = "";
        this.TextFieldName = "";
        this.SVGImages = new soby_SVGImages();
        this.OnSelectionChanged = null;
        this.EventBeforeAutoCompleteQuery = null;
        this.ItemSelectionID = "soby_itemselection_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.ItemSelectorType = itemSelectorType;
        this.AutoCompleteDataService = autoCompleteDataService;
        this.AdvancedSearchDataService = advancedSearchDataService;
        this.AdvancedSearchChildrenDataService = advancedSearchChildrenDataService;
        this.EmptyDataHtml = emptyDataHtml;
        this.DialogID = dialogID;
        this.SelectorUrl = selectorUrl;
        this.ValueFieldName = valueFieldName;
        this.TextFieldName = textFieldName;
        this.ParentFieldName = parentFieldName;
        this.EnsureItemSelectionExistency();
        this.InitializeAdvancedSearchControl();
    }
    soby_ItemSelection.prototype.InitializeAdvancedSearchControl = function () {
        if (this.ItemSelectorType === SobyItemSelectorTypes.GridView) {
            var advancedSearchAsGrid = new soby_WebGrid("#" + this.DialogID + " .itemselectionadvancedsearchgridview", this.Title, this.AdvancedSearchDataService, this.EmptyDataHtml);
            advancedSearchAsGrid.IsEditable = false;
            for (var i = 0; i < this.AdvancedSearchDataService.DataSourceBuilder.SchemaFields.length; i++) {
                var schemaField = this.AdvancedSearchDataService.DataSourceBuilder.SchemaFields[i];
                advancedSearchAsGrid.AddColumn(schemaField.FieldName, schemaField.FieldName, SobyShowFieldsOn.All, null, null, true, true, true, null, null, null);
            }
            this.AdvancedSearchAsGrid = advancedSearchAsGrid;
        }
        else if (this.ItemSelectorType === SobyItemSelectorTypes.TreeView) {
            var treeView_1 = new soby_TreeView("#" + this.DialogID + " .itemselectionadvancedsearchgridview", this.Title, this.AdvancedSearchDataService, this.AdvancedSearchChildrenDataService, this.EmptyDataHtml, this.ParentFieldName, this.ValueFieldName, this.TextFieldName);
            treeView_1.Initialize();
            this.AdvancedSearchAsGrid = treeView_1;
        }
    };
    soby_ItemSelection.prototype.Initialize = function () {
        var selectedItemsHiddenField = $("<input type='hidden' class='selecteditemvalues'>");
        var itemNameInput = $("<input type='text' class='itemname' style='width:100px;padding:3px 0px 3px 0px'>");
        itemNameInput.val(this.WaterMark);
        itemNameInput.attr("title", this.WaterMark);
        var advancedSelection = $("<a id='" + this.ItemSelectionID + "_advancedbutton' href='javascript:void(0)'>" + this.SVGImages.GetPicker() + "</a>");
        var selectedItemsMaintenancePanel = $("<div class='selecteditemmaintenancepanel'></div>");
        $(this.ContentDivSelector).append(selectedItemsHiddenField);
        $(this.ContentDivSelector).append(itemNameInput);
        $(this.ContentDivSelector).append(advancedSelection);
        $(this.ContentDivSelector).append(selectedItemsMaintenancePanel);
        advancedSelection.unbind("click");
        advancedSelection.bind('click', { MainControlID: this.ItemSelectionID, DialogID: this.DialogID, DialogTitle: this.Title, SelectorUrl: this.SelectorUrl }, this.OpenItemPicker);
        var itemSelectorObj = this;
        var itemSelection = this;
        this.AutoCompleteDataService.ItemPopulated = function (items) {
            var response = itemSelection.AutoCompleteDataService.Args[0];
            var autoCompleteItems = new Array();
            for (var i = 0; i < items.length; i++) {
                var textFieldNames = itemSelection.TextFieldName.split(";");
                var valueFieldNames = itemSelection.ValueFieldName.split(";");
                var text = "";
                var value = "";
                for (var x = 0; x < textFieldNames.length; x++) {
                    var _value = items[i][textFieldNames[x]];
                    if (_value !== null) {
                        text += _value;
                    }
                }
                for (var x = 0; x < valueFieldNames.length; x++) {
                    var _value = items[i][valueFieldNames[x]];
                    if (_value !== null) {
                        value += _value;
                    }
                }
                autoCompleteItems.push({ Text: value, value: text, Value: text });
            }
            response(autoCompleteItems);
        };
        $(this.ContentDivSelector + " .itemname").click(function () {
            if ($(this).val() === itemSelection.WaterMark) {
                $(this).val('');
            }
        });
        $(this.ContentDivSelector + " .itemname").focusout(function () {
            if ($(this).val() === '') {
                $(this).val(itemSelection.WaterMark);
            }
        });
        $(this.ContentDivSelector + " .itemname").autocomplete({
            source: function (request, response) {
                itemSelection.AutoCompleteDataService.DataSourceBuilder.Filters = new SobyFilters(true);
                var textFieldNames = itemSelection.TextFieldName.split(";");
                for (var x = 0; x < textFieldNames.length; x++) {
                    itemSelection.AutoCompleteDataService.DataSourceBuilder.Filters.AddFilter(textFieldNames[x], request.term, SobyFieldTypes.Text, SobyFilterTypes.Contains, false, true);
                }
                if (itemSelection.EventBeforeAutoCompleteQuery !== null)
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
    };
    soby_ItemSelection.prototype.OpenItemPicker = function (event) {
        //        let selectorUrl = event.data.SelectorUrl;
        var mainControlID = event.data.MainControlID;
        var dialogTitle = event.data.DialogTitle;
        if (dialogTitle === null)
            dialogTitle = "";
        var dialogObject = ShowCommonHtmlDialog(dialogTitle, event.data.DialogID, function (args) {
            if (args === null) {
                return;
            }
            var values = args.split(soby_FilterValueSeperator);
            for (var i = 0; i < values.length; i = i + 2) {
                soby_ItemSelections[mainControlID].AddItem(values[i + 1], values[i]);
            }
        });
        dialogObject.html("<div class='itemselectionadvancedsearchgridview'></div><p align='right'><input type='button' value='Ekle' onclick=\"soby_ItemSelections['" + mainControlID + "'].SelectItemsFromAdvancedSearchDialog()\"></p>");
        soby_ItemSelections[mainControlID].AdvancedSearchAsGrid.Initialize(true);
    };
    soby_ItemSelection.prototype.SelectItemsFromAdvancedSearchDialog = function () {
        var data = this.AdvancedSearchAsGrid.GetSelectedDataItems();
        var selectedValuesString = "";
        for (var i = 0; i < data.length; i++) {
            if (selectedValuesString !== "") {
                selectedValuesString += soby_FilterValueSeperator;
            }
            var textFieldNames = this.TextFieldName.split(";");
            var valueFieldNames = this.ValueFieldName.split(";");
            var text = "";
            var value = "";
            for (var x = 0; x < textFieldNames.length; x++) {
                var _value = data[i][textFieldNames[x]];
                if (_value !== null) {
                    text += _value;
                }
            }
            for (var x = 0; x < valueFieldNames.length; x++) {
                var _value = data[i][valueFieldNames[x]];
                if (_value !== null) {
                    value += _value;
                }
            }
            selectedValuesString += value + soby_FilterValueSeperator + text;
        }
        var commonCloseDialog = CommonCloseDialog;
        commonCloseDialog(this.DialogID, selectedValuesString);
    };
    soby_ItemSelection.prototype.GetItemArray = function () {
        var text = $(this.ContentDivSelector + " .selecteditemvalues").val();
        if (text === null || text === "") {
            return new Array();
        }
        else {
            return JSON.parse(text);
        }
    };
    soby_ItemSelection.prototype.AddItem = function (text, value) {
        var array = new Array();
        var exist = false;
        if (this.AllowMultipleSelections === true) {
            array = this.GetItemArray();
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i].Value === value) {
                exist = true;
            }
        }
        if (exist === false) {
            var newItem = new Object();
            newItem["Text"] = text;
            newItem["Value"] = value;
            array[array.length] = newItem;
        }
        this.SetItemArray(array);
        this.GenerateItemTable();
    };
    soby_ItemSelection.prototype.RemoveItem = function (value) {
        var array = this.GetItemArray();
        var newArray = new Array();
        for (var i = array.length - 1; i > -1; i--) {
            if (array[i].Value !== value) {
                newArray[newArray.length] = { "Text": array[i].Text, "Value": array[i].Value };
            }
        }
        this.SetItemArray(newArray);
        this.GenerateItemTable();
    };
    soby_ItemSelection.prototype.SetItemArray = function (array) {
        /*
        Sample Text
        let a = new Array(new function () { this.Text = "Item1"; this.Value = "1" });
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
        if (this.OnSelectionChanged !== null) {
            this.OnSelectionChanged();
        }
    };
    soby_ItemSelection.prototype.GenerateItemTable = function () {
        var tableHTML = "<table class='ms-formtable' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin-top: 8px;'>";
        var array = this.GetItemArray();
        for (var key in array) {
            tableHTML += "<tr class='mtdataitemrow'><td width='20'><a href='javascript:void(0)' onclick=\"soby_ItemSelections['" + this.ItemSelectionID + "'].RemoveItem('" + array[key].Value + "')\" class='itemSelectorDeleteLink'>" + this.SVGImages.GetXCircle() + "</a></td><td>" + array[key].Text + "</td></tr>";
        }
        if (array.length === 0) {
            tableHTML += "<tr class='mtdataitemrow'><td>" + this.EmptyDataHtml + "</td></tr>";
        }
        tableHTML += "</table>";
        $(this.ContentDivSelector + " .selecteditemmaintenancepanel").html(tableHTML);
    };
    soby_ItemSelection.prototype.EnsureItemSelectionExistency = function () {
        for (var key in soby_ItemSelections) {
            if (key === this.ItemSelectionID) {
                return;
            }
        }
        soby_ItemSelections[this.ItemSelectionID] = this;
    };
    return soby_ItemSelection;
}());
// ************************************************************
// ********************* COMMON FUNCTIONS *****************************
function ShowCommonDialog(url, title, dialogID, onCloseCallback) {
    var showDialog = window.parent["ShowDialog"];
    showDialog(url, title, dialogID, onCloseCallback);
}
function ShowDialog(url, title, dialogID, onCloseCallback) {
    var dialogObject = $("#" + dialogID);
    if (dialogObject.length === 0) {
        dialogObject = $('<div id=\"' + dialogID + '\"></div>');
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
    }).data("argument", null);
    obj.unbind("dialogclose");
    obj.bind('dialogclose', function (event) {
        if (onCloseCallback !== null) {
            var argument = $(this).data("argument");
            onCloseCallback(argument);
        }
    });
    dialogObject.dialog('open');
}
function ShowCommonHtmlDialog(title, dialogID, onCloseCallback) {
    var showDialog = window.parent["ShowDialog"];
    return ShowHtmlDialog(title, dialogID, onCloseCallback);
}
function ShowHtmlDialog(title, dialogID, onCloseCallback) {
    var dialogObject = $("#" + dialogID);
    if (dialogObject.length > 0) {
        dialogObject.remove();
    }
    var width = 800;
    var height = 700;
    var maxHeight = $(window).height() - 100;
    var maxWidth = $(window).width() - 100;
    if (height > maxHeight)
        height = maxHeight;
    if (width > maxWidth)
        width = maxWidth;
    dialogObject = $('<div id=\"' + dialogID + '\"></div>');
    var obj = dialogObject.dialog({
        autoOpen: false,
        modal: true,
        height: height,
        width: width,
        title: title
    }).data("argument", null);
    obj.unbind("dialogclose");
    obj.bind('dialogclose', function (event) {
        if (onCloseCallback !== null) {
            var argument = $(this).data("argument");
            onCloseCallback(argument);
        }
    });
    dialogObject.dialog('open');
    return dialogObject;
}
function CloseDialog(dialogID, argument) {
    $("#" + dialogID).dialog('close');
}
function CommonCloseDialog(dialogID, argument) {
    if (SetCommonDialogArgument !== null && CloseDialog !== null) {
        SetCommonDialogArgument(dialogID, argument);
        CloseDialog(dialogID, argument);
    }
    var setCommonDialogArgument = window.parent["SetCommonDialogArgument"];
    var closeDialog = window.parent["CloseDialog"];
    setCommonDialogArgument(dialogID, argument);
    closeDialog(dialogID, argument);
}
function SetDialogArgument(dialogID, argument) {
    $("#" + dialogID).dialog().data("argument", argument);
}
function SetCommonDialogArgument(dialogID, argument) {
    $("#" + dialogID).dialog().data("argument", argument);
}
// ************************************************************
// ********************* SVG IMAGES *****************************
var soby_SVGImages = /** @class */ (function () {
    function soby_SVGImages() {
        this.Width = 20;
        this.Height = 20;
    }
    soby_SVGImages.prototype.GetArrowDown = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-down' viewBox='0 0 16 16' style='padding-bottom: 3px;'><path fill-rule='evenodd' d = 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z' /></svg>";
    };
    soby_SVGImages.prototype.GetArrowUp = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-up' viewBox='0 0 16 16' style='padding-bottom: 3px;'><path fill-rule='evenodd' d = 'M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z' /></svg>";
    };
    soby_SVGImages.prototype.GetSortAZDown = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-sort-alpha-down' viewBox='0 0 16 16'><path fill-rule='evenodd' d = 'M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z' /><path d='M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z' /></svg>";
    };
    soby_SVGImages.prototype.GetSortAZUp = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-sort-alpha-up' viewBox='0 0 16 16'><path fill-rule='evenodd' d = 'M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z' /><path d='M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z' /></svg>";
    };
    soby_SVGImages.prototype.GetXCircle = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-circle-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' /></svg>";
    };
    soby_SVGImages.prototype.GetFilterCircle = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-filter-circle-fill' viewBox='0 0 16 16'><path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zM5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z' /></svg>";
    };
    soby_SVGImages.prototype.GetCheck = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-check' viewBox='0 0 16 16'><path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z' /></svg>";
    };
    soby_SVGImages.prototype.GetCardView = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-card-list' viewBox='0 0 16 16'><path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z' /><path d='M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' /></svg>";
    };
    soby_SVGImages.prototype.GetLeftCircle = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-left-circle-fill' viewBox='0 0 16 16'><path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z' /></svg>";
    };
    soby_SVGImages.prototype.GetRightCircle = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-right-circle-fill' viewBox='0 0 16 16'><path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z' /></svg>";
    };
    soby_SVGImages.prototype.GetCollapse = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' class='svg-triangle' width='16' height='16' fill='currentColor'><polygon points='0,0 8,12 16,0' /></svg>";
    };
    soby_SVGImages.prototype.GetExpand = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' class='svg-triangle' width='16' height='16' fill='currentColor'><polygon points='12,8 0,16 0,0' /></svg>";
    };
    soby_SVGImages.prototype.GetPicker = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-journal-plus' viewBox='0 0 16 16'><path fill-rule='evenodd' d = 'M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z' /><path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z' /><path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z' /></svg>";
    };
    soby_SVGImages.prototype.GetExcel = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-file-earmark-excel-fill' viewBox='0 0 16 16'><path d='M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z' /></svg>";
    };
    soby_SVGImages.prototype.GetCSV = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-file-earmark-font-fill' viewBox='0 0 16 16'><path d='M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.057 6h5.886L11 8h-.5c-.18-1.096-.356-1.192-1.694-1.235l-.298-.01v5.09c0 .47.1.582.903.655v.5H6.59v-.5c.799-.073.898-.184.898-.654V6.755l-.293.01C5.856 6.808 5.68 6.905 5.5 8H5l.057-2z' /></svg>";
    };
    soby_SVGImages.prototype.GetPrint = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-printer-fill' viewBox='0 0 16 16'><path d='M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z' /><path d='M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z' /></svg>";
    };
    soby_SVGImages.prototype.GetClipboard = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clipboard' viewBox='0 0 16 16'><path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z' /><path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z' /></svg>";
    };
    soby_SVGImages.prototype.GetLoading = function () {
        return "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin:auto;background:#fff;display:block;' width='16px' height='16px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>" +
            "<g transform='translate(80,50)'><g transform='rotate(0)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='1'><animateTransform attributeName='transform' type='scale' begin='-0.875s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='-0.875s'></animate></circle></g></g>" +
            "<g transform='translate(71.21320343559643,71.21320343559643)'><g transform='rotate(45)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='0.875'>  <animateTransform attributeName='transform' type='scale' begin='-0.75s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='-0.75s'></animate></circle></g></g>" +
            "<g transform='translate(50,80)'><g transform='rotate(90)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='0.75'>  <animateTransform attributeName='transform' type='scale' begin='-0.625s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='-0.625s'></animate></circle></g></g>" +
            "<g transform='translate(28.786796564403577,71.21320343559643)'><g transform='rotate(135)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='0.625'>  <animateTransform attributeName='transform' type='scale' begin='-0.5s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='-0.5s'></animate></circle></g></g>" +
            "<g transform='translate(20,50.00000000000001)'><g transform='rotate(180)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='0.5'>  <animateTransform attributeName='transform' type='scale' begin='-0.375s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='-0.375s'></animate></circle></g></g>" +
            "<g transform='translate(28.78679656440357,28.786796564403577)'><g transform='rotate(225)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='0.375'>  <animateTransform attributeName='transform' type='scale' begin='-0.25s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='-0.25s'></animate></circle></g></g>" +
            "<g transform='translate(49.99999999999999,20)'><g transform='rotate(270)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='0.25'>  <animateTransform attributeName='transform' type='scale' begin='-0.125s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='-0.125s'></animate></circle></g></g>" +
            "<g transform='translate(71.21320343559643,28.78679656440357)'><g transform='rotate(315)'><circle cx='0' cy='0' r='6' fill='#ff727d' fill-opacity='0.125'>  <animateTransform attributeName='transform' type='scale' begin='0s' values='1.5 1.5;1 1' keyTimes='0;1' dur='1s' repeatCount='indefinite'></animateTransform>  <animate attributeName='fill-opacity' keyTimes='0;1' dur='1s' repeatCount='indefinite' values='1;0' begin='0s'></animate></circle></g></g>" +
            "</svg>";
    };
    return soby_SVGImages;
}());
// ************************************************************
//# sourceMappingURL=soby.ui.components.js.map