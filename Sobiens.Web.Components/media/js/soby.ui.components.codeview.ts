// VERSION 1.0.6.1
// ********************* ITEM SELECTION *****************************
var soby_CodeViews = new Array();
class SobyCodeViewTypesObject
{
    Html: number = 0;
    Js: number = 1;
    Xml: number = 2;
}
var SobyCodeViewTypes = new SobyCodeViewTypesObject();

class soby_CodeView
{
    constructor(contentDivSelector, title, codeViewType: number)
    {
        this.CodeViewID = "soby_codeview_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.CodeViewType = codeViewType;
        this.EnsureItemSelectionExistency();
    }

    CodeViewID: string = "";
    ContentDivSelector: string = "";
    Title: string = "";
    ImagesFolderUrl: string = "/_layouts/1033/images";
    CodeViewType: number = null;
    Initialize() {
        $(this.ContentDivSelector).addClass("soby_codeview");
        var codeContent = $(this.ContentDivSelector).find(".code").html();
        var codeDescription = $(this.ContentDivSelector).find(".codedescription").html();
        var resultDescription = $(this.ContentDivSelector).find(".resultdescription").html();
        $(this.ContentDivSelector).html("<h3>Example</h3><div style='border: 1px solid lightgray;padding: 5px;'><h3>Code:</h3><table width='100%'><tr><td><textarea class='code' rows='6' cols='70'></textarea></td><td valign='bottom' align='right'><input type='button' value='Run' onclick=\"soby_CodeViews['" + this.CodeViewID + "'].RunCode();\"></td></tr></table><h3>Description:</h3><p class='codedescription'></p></div><br><div style='border: 1px solid lightgray;padding: 5px;'><h3>Result:</h3><iframe class='result' width='500px'></iframe><br><h3>Description:</h3><p class='resultdescription'></p></div>");
        $(this.ContentDivSelector).find(".code").html(codeContent);
        $(this.ContentDivSelector).find(".codedescription").html(codeDescription);
        $(this.ContentDivSelector).find(".resultdescription").html(resultDescription);
        var codeview = this;
        $(function ()
        {
            codeview.RunCode();
        });
    }
    RunCode()
    {
        var html = "<script language='javascript'>" + $(this.ContentDivSelector).find(".code").html() + "</script>";
        var iframe: HTMLIFrameElement = $(this.ContentDivSelector).find(".result")[0] as HTMLIFrameElement;
        console.log(iframe.contentWindow.document.body.innerHTML)
        iframe.contentWindow.document.body.innerHTML = "";
        console.log(iframe.contentWindow.document.body.innerHTML)
        iframe.contentWindow.document.clear();
        iframe.contentWindow.document.write(html);
    }
    Populate()
    {

    }
    EnsureItemSelectionExistency() {
        for (var key in soby_CodeViews) {
            if (key == this.CodeViewID)
                return;
        }

        soby_CodeViews[this.CodeViewID] = this;
    }
    OnSelectionChanged = null;
    OnClick = null;
}
// ************************************************************
