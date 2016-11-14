declare var soby_TreeViews: any[];
declare var soby_TreeViewItems: any[];
declare class soby_TreeView {
    constructor(contentDivSelector: any, title: any, rootNodesDataService: any, childNodesDataService: any, emptyDataHtml: any, parentFieldName: any, valueFieldName: any, textFieldName: any);
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
    ImagesFolderUrl: string;
    Initialize(): void;
    GetItemData(treeviewItemId: any): any;
    ExpandNode(treeviewItemId: any): void;
    PopulateNodes(contentDivSelector: any, items: any): void;
    GetSelectedItems(): any[];
    ClickNode(treeViewItemId: any): void;
    CheckNode(treeViewItemId: any): void;
    EnsureItemSelectionExistency(): void;
    OnSelectionChanged: any;
    OnClick: any;
}
