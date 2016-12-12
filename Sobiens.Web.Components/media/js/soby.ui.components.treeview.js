// VERSION 1.0.6.1
// ********************* ITEM SELECTION *****************************
var soby_TreeViews = new Array();
var soby_TreeViewItems = new Array();
var soby_TreeView = (function () {
    function soby_TreeView(contentDivSelector, title, rootNodesDataService, childNodesDataService, emptyDataHtml, parentFieldName, valueFieldName, textFieldName) {
        this.TreeViewID = "";
        this.ContentDivSelector = "";
        this.Title = "";
        this.RootNodesDataService = null;
        this.ChildNodesDataService = null;
        this.AllowMultipleSelections = true;
        this.AllowCheckBoxes = true;
        this.EmptyDataHtml = "";
        this.ParentFieldName = "";
        this.ValueFieldName = "";
        this.TextFieldName = "";
        this.ImagesFolderUrl = "/_layouts/1033/images";
        this.OnSelectionChanged = null;
        this.OnClick = null;
        this.TreeViewID = "soby_itemselection_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.RootNodesDataService = rootNodesDataService;
        this.ChildNodesDataService = childNodesDataService;
        this.EmptyDataHtml = emptyDataHtml;
        this.ParentFieldName = parentFieldName;
        this.ValueFieldName = valueFieldName;
        this.TextFieldName = textFieldName;
        this.EnsureItemSelectionExistency();
        var treeview = this;
        this.RootNodesDataService.ItemPopulated = function (items) {
            soby_TreeViewItems = new Array();
            treeview.PopulateNodes(treeview.ContentDivSelector, items);
        };
    }
    soby_TreeView.prototype.Initialize = function () {
        $(this.ContentDivSelector).addClass("soby_treeview");
        this.RootNodesDataService.PopulateItems(null);
    };
    soby_TreeView.prototype.GetItemData = function (treeviewItemId) {
        for (var i = 0; i < soby_TreeViewItems.length; i++) {
            if (soby_TreeViewItems[i]["SobyTreeViewItemId"] == treeviewItemId)
                return soby_TreeViewItems[i];
        }
        return null;
    };
    soby_TreeView.prototype.ExpandNode = function (treeviewItemId) {
        var isExpanded = $("#" + treeviewItemId).attr("isexpanded");
        var isLoaded = $("#" + treeviewItemId).attr("isloaded");
        if (isExpanded == "0") {
            $("#" + treeviewItemId + " > ul").show();
            $("#" + treeviewItemId).attr("isexpanded", "1");
            $("#" + treeviewItemId + " > a > span > img").attr("isexpanded", "1").removeClass("soby-list-expand").addClass("soby-list-collapse");
        }
        else {
            $("#" + treeviewItemId + " > ul").hide();
            $("#" + treeviewItemId).attr("isexpanded", "0");
            $("#" + treeviewItemId + " > a > span > img").attr("isexpanded", "1").removeClass("soby-list-collapse").addClass("soby-list-expand");
        }
        if (isLoaded == "0") {
            $("#" + treeviewItemId).attr("isloaded", "1");
            var itemData = this.GetItemData(treeviewItemId);
            var treeview = this;
            var value = itemData[this.ValueFieldName];
            this.ChildNodesDataService.DataSourceBuilder.Filters.Clear();
            this.ChildNodesDataService.DataSourceBuilder.Filters.AddFilter(this.ParentFieldName, value, SobyFieldTypes.Number, SobyFilterTypes.Equal, false);
            this.ChildNodesDataService.ItemPopulated = function (items) {
                treeview.PopulateNodes("#" + treeviewItemId, items);
                $("#" + treeviewItemId + " > ul").show();
                $("#" + treeviewItemId).attr("isexpanded", "1");
            };
            this.ChildNodesDataService.PopulateItems([treeviewItemId]);
        }
    };
    soby_TreeView.prototype.PopulateNodes = function (contentDivSelector, items) {
        var ul = $("<ul></ul>");
        for (var i = 0; i < items.length; i++) {
            var treeViewItemId = soby_guid();
            items[i]["SobyTreeViewItemId"] = treeViewItemId;
            soby_TreeViewItems.push(items[i]);
            var value = items[i][this.ValueFieldName];
            var text = items[i][this.TextFieldName];
            var li = $("<li class='soby_treeviewnode'></li>");
            li.attr("id", treeViewItemId);
            li.attr("isloaded", "0");
            li.attr("isexpanded", "0");
            var checkBox = $("<input type='checkbox' onclick=\"soby_TreeViews['" + this.TreeViewID + "'].CheckNode('" + treeViewItemId + "')\">");
            checkBox.val(treeViewItemId);
            checkBox.attr("name", "checkbox_" + this.TreeViewID);
            var expandLink = $("<a href='javascript:void(0)' onclick=\"soby_TreeViews['" + this.TreeViewID + "'].ExpandNode('" + treeViewItemId + "')\"><span class='soby-icon-imgSpan15' > <img class='soby-list-expand soby-icon-img' alt= '' src= '/media/images/spcommon.png?rev=43' > </span></a>");
            var selectLink = $("<a href='javascript:void(0)' onclick=\"soby_TreeViews['" + this.TreeViewID + "'].ClickNode('" + treeViewItemId + "')\"></a>");
            selectLink.text(text);
            li.append(expandLink);
            if (this.AllowCheckBoxes == true)
                li.append(checkBox);
            li.append(selectLink);
            ul.append(li);
        }
        $(contentDivSelector).append(ul);
    };
    soby_TreeView.prototype.GetSelectedItems = function () {
        var selectedItems = new Array();
        var selectedInputs = $("input[name='checkbox_" + this.TreeViewID + "']:checked");
        if (this.AllowCheckBoxes == false)
            selectedInputs = $("input[name='checkbox_" + this.TreeViewID + "']:checked");
        for (var i = 0; i < selectedInputs.length; i++) {
            selectedItems[selectedItems.length] = this.GetItemData($(selectedInputs[i]).val());
        }
        return selectedItems;
    };
    soby_TreeView.prototype.ClickNode = function (treeViewItemId) {
        if (this.OnClick != null)
            this.OnClick(this.TreeViewID, treeViewItemId);
    };
    soby_TreeView.prototype.CheckNode = function (treeViewItemId) {
        if (this.OnSelectionChanged != null)
            this.OnSelectionChanged(this.TreeViewID);
    };
    soby_TreeView.prototype.EnsureItemSelectionExistency = function () {
        for (var key in soby_TreeViews) {
            if (key == this.TreeViewID)
                return;
        }
        soby_TreeViews[this.TreeViewID] = this;
    };
    return soby_TreeView;
})();
// ************************************************************
//# sourceMappingURL=soby.ui.components.treeview.js.map