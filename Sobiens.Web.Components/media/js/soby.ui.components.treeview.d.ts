declare var soby_TreeViews: any[];
declare var soby_TreeViewItems: any[];
interface soby_TreeViewInterface {
    RootDataBeingParsed(data: any): Array<soby_Item>;
    ChildDataBeingParsed(data: any): Array<soby_Item>;
    RootNodesDataServiceBeingQueried(): any;
    ChildNodesDataServiceBeingQueried(node: soby_Item): any;
}
declare class soby_TreeView implements soby_TreeViewInterface {
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
    ImagesFolderUrl: string;
    Initialize(): void;
    GetItemData(treeviewItemId: any): any;
    GetRootNodeId(treeviewItemId: any): any;
    GetParentNodeId(treeviewItemId: any): string;
    GetRootNodeItemData(treeviewItemId: any): any;
    GetParentNodeItemData(treeviewItemId: any): any;
    ExpandNode(treeviewItemId: any): void;
    PopulateNodes(contentDivSelector: any, items: any): void;
    GetSelectedItems(): any[];
    ClickNode(treeViewItemId: any): void;
    CheckNode(treeViewItemId: any): void;
    EnsureItemSelectionExistency(): void;
    OnSelectionChanged: any;
    OnClick: any;
}
