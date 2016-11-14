declare var soby_CodeViews: any[];
declare class SobyCodeViewTypesObject {
    Html: number;
    Js: number;
    Xml: number;
}
declare var SobyCodeViewTypes: SobyCodeViewTypesObject;
declare class soby_CodeView {
    constructor(contentDivSelector: any, title: any, codeViewType: number);
    CodeViewID: string;
    ContentDivSelector: string;
    Title: string;
    ImagesFolderUrl: string;
    CodeViewType: number;
    Initialize(): void;
    RunCode(): void;
    Populate(): void;
    EnsureItemSelectionExistency(): void;
    OnSelectionChanged: any;
    OnClick: any;
}
