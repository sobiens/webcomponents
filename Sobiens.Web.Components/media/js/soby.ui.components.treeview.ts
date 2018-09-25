// VERSION 1.0.8.1
// ********************* ITEM SELECTION *****************************
var soby_TreeViews = new Array();
var soby_TreeViewItems = new Array();

interface soby_TreeViewInterface
{
    RootDataBeingParsed(data: any): Array<soby_Item>;
    ChildDataBeingParsed(data: any): Array<soby_Item>;
    RootNodesDataServiceBeingQueried();
    ChildNodesDataServiceBeingQueried(node: soby_Item);
}

class soby_TreeView implements soby_TreeViewInterface, ISobySelectorControlInterface {
    constructor(contentDivSelector, title, rootNodesDataService, childNodesDataService, emptyDataHtml, parentFieldName, valueFieldName, textFieldName) {
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
        this.RootNodesDataService.ItemPopulated = function (items)
        {
            soby_TreeViewItems = new Array();
            items = treeview.RootDataBeingParsed(items);
            treeview.PopulateNodes(treeview.ContentDivSelector, items);
        };
    }

    RootDataBeingParsed(data: any): Array<soby_Item>
    {
        return data;
    }

    ChildDataBeingParsed(data: any): Array<soby_Item>
    {
        return data;
    }

    RootNodesDataServiceBeingQueried()
    {
    }

    ChildNodesDataServiceBeingQueried(node: soby_Item)
    {
    }

    TreeViewID: string = "";
    ContentDivSelector: string = "";
    Title: string = "";
    RootNodesDataService: soby_ServiceInterface = null;
    ChildNodesDataService: soby_ServiceInterface = null;
    AllowMultipleSelections: boolean = true;
    AllowCheckBoxes: boolean = true;
    EmptyDataHtml: string = "";
    ParentFieldName: string = "";
    ValueFieldName: string = "";
    TextFieldName: string = "";
    ImagesFolderUrl: string = "/_layouts/1033/images";
    Initialize() {
        $(this.ContentDivSelector).addClass("soby_treeview");
        this.RootNodesDataServiceBeingQueried();
        this.RootNodesDataService.PopulateItems(null);
    }
    GetItemData(treeviewItemId) {
        for (var i = 0; i < soby_TreeViewItems.length; i++) {
            if (soby_TreeViewItems[i]["SobyTreeViewItemId"] == treeviewItemId)
            {
                return soby_TreeViewItems[i];
            }
        }

        return null;
    }

    GetRootNodeId(treeviewItemId)
    {
        var rootNodeId = treeviewItemId;
        var currentParentNodeId = treeviewItemId;
        while (currentParentNodeId != null)
        {
            currentParentNodeId = this.GetParentNodeId(currentParentNodeId)
            if (currentParentNodeId != null)
            {
                rootNodeId = currentParentNodeId;
            }
        }

        return rootNodeId; 
    }

    GetParentNodeId(treeviewItemId)
    {
        var parentNode = $("#" + treeviewItemId).parent().parent();
        if (parentNode.hasClass("soby_treeviewnode") == true)
        {
            return parentNode.attr("id");
        }

        return;
    }

    GetRootNodeItemData(treeviewItemId)
    {
        var rootNodeId = this.GetRootNodeId(treeviewItemId);
        return this.GetItemData(rootNodeId);
    }

    GetParentNodeItemData(treeviewItemId)
    {
        var parentNodeId = this.GetParentNodeId(treeviewItemId);
        if (parentNodeId != null)
        {
            return this.GetItemData(parentNodeId);
        }

        return;
    }
    ExpandNode(treeviewItemId) {
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
            this.ChildNodesDataService.DataSourceBuilder.Filters.AddFilter(this.ParentFieldName, value, SobyFieldTypes.Number, SobyFilterTypes.Equal, false, false); 
            this.ChildNodesDataService.ItemPopulated = function (items)
            {
                items = treeview.ChildDataBeingParsed(items);
                treeview.PopulateNodes("#" + treeviewItemId, items);
                $("#" + treeviewItemId + " > ul").show();
                $("#" + treeviewItemId).attr("isexpanded", "1");
            };

            this.ChildNodesDataServiceBeingQueried(itemData);
            this.ChildNodesDataService.PopulateItems([treeviewItemId, value]);

        }
    }
    PopulateNodes(contentDivSelector, items) {
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

            var expandLink = $("<a href='javascript:void(0)' onclick=\"soby_TreeViews['" + this.TreeViewID + "'].ExpandNode('" + treeViewItemId + "')\"><span class='soby-icon-imgSpan15' > <img class='soby-list-expand soby-icon-img' alt= '' src= '" + this.ImagesFolderUrl + "/spcommon.png?rev=43' > </span></a>");
            var selectLink = $("<a href='javascript:void(0)' onclick=\"soby_TreeViews['" + this.TreeViewID + "'].ClickNode('" + treeViewItemId + "')\"></a>");
            selectLink.text(text);

            li.append(expandLink);
            if (this.AllowCheckBoxes == true)
            {
                li.append(checkBox);
            }

            li.append(selectLink);
            ul.append(li);
        }

        $(contentDivSelector).append(ul);
    }
    GetSelectedDataItems() {
        var selectedItems = new Array();
        var selectedInputs = $("input[name='checkbox_" + this.TreeViewID + "']:checked");
        if (this.AllowCheckBoxes == false)
        {
            selectedInputs = $("input[name='checkbox_" + this.TreeViewID + "']:checked");
        }

        for (var i = 0; i < selectedInputs.length; i++) {
            selectedItems[selectedItems.length] = this.GetItemData($(selectedInputs[i]).val());
        }

        return selectedItems;
    }
    ClickNode(treeViewItemId) {
        if (this.OnClick != null)
        {
            this.OnClick(this.TreeViewID, treeViewItemId);
        }
    }
    CheckNode(treeViewItemId) {
        if (this.OnSelectionChanged != null)
        {
            this.OnSelectionChanged(this.TreeViewID);
        }
    }
    EnsureItemSelectionExistency() {
        for (var key in soby_TreeViews) {
            if (key == this.TreeViewID)
            {
                return;
            }
        }

        soby_TreeViews[this.TreeViewID] = this;
    }
    OnSelectionChanged = null;
    OnClick = null;
}
// ************************************************************
