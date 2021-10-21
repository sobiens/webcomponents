declare const soby_CodeViews: any[];
declare enum SobyCodeViewTypes {
    SingleHtml = 0,
    HtmlParts = 1,
    Xml = 2
}
declare enum SobyCodeViews {
    SinglePage = 0,
    Html = 1,
    Js = 2,
    Css = 3,
    Xml = 4
}
declare class soby_CodeView {
    CodeViewID: string;
    ContentDivSelector: string;
    Title: string;
    CodeViewType: SobyCodeViewTypes;
    TemplateHtml: string;
    ActiveView: SobyCodeViews;
    AdditionalTabTitles: Array<string>;
    AdditionalTabClasses: Array<string>;
    constructor(contentDivSelector: any, title: any, codeViewType: SobyCodeViewTypes);
    Initialize(): void;
    RunCode(): void;
    ResetExercise(): void;
    CopyToClipboard(): void;
    Populate(): void;
    EnsureItemSelectionExistency(): void;
    OnTemplateRendered: any;
}
