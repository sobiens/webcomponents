// VERSION 1.0.7.2
// ********************* ITEM SELECTION *****************************
var soby_CodeViews = new Array();
var SobyCodeViewTypesObject = (function () {
    function SobyCodeViewTypesObject() {
        this.Html = 0;
        this.Js = 1;
        this.Xml = 2;
    }
    return SobyCodeViewTypesObject;
}());
var SobyCodeViewTypes = new SobyCodeViewTypesObject();
var soby_CodeView = (function () {
    function soby_CodeView(contentDivSelector, title, codeViewType) {
        this.CodeViewID = "";
        this.ContentDivSelector = "";
        this.Title = "";
        this.ImagesFolderUrl = "/_layouts/1033/images";
        this.CodeViewType = null;
        this.OnSelectionChanged = null;
        this.OnClick = null;
        this.CodeViewID = "soby_codeview_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.CodeViewType = codeViewType;
        this.EnsureItemSelectionExistency();
    }
    soby_CodeView.prototype.Initialize = function () {
        $(this.ContentDivSelector).addClass("soby_codeview");
        var codeContent = $(this.ContentDivSelector).find(".code").html();
        var codeDescription = $(this.ContentDivSelector).find(".codedescription").html();
        var resultDescription = $(this.ContentDivSelector).find(".resultdescription").html();
        $(this.ContentDivSelector).html("<h3>Example</h3><div style='border: 1px solid lightgray;padding: 5px;'><h3>Code:</h3><table width='100%'><tr><td><textarea class='code' rows='6' cols='70'></textarea></td><td valign='bottom' align='right'><input type='button' value='Run' onclick=\"soby_CodeViews['" + this.CodeViewID + "'].RunCode();\"></td></tr></table><h3>Description:</h3><p class='codedescription'></p></div><br><div style='border: 1px solid lightgray;padding: 5px;'><h3>Result:</h3><div class='result'><iframe class='resultiframe' width='500px'></iframe></div><br><h3>Description:</h3><p class='resultdescription'></p></div>");
        $(this.ContentDivSelector).find(".code").html(codeContent.replace(/<br \/ >/gi, "\n").replace(/<br>/gi, "\n"));
        $(this.ContentDivSelector).find(".codedescription").html(codeDescription);
        $(this.ContentDivSelector).find(".resultdescription").html(resultDescription);
        var codeview = this;
        $(function () {
            codeview.RunCode();
        });
    };
    soby_CodeView.prototype.RunCode = function () {
        $(this.ContentDivSelector).find(".result").html("<iframe class='resultiframe' width= '500px' > </iframe>");
        var html = "<script language='javascript'>" + $(this.ContentDivSelector).find(".code").val() + "</script>";
        var iframe = $(this.ContentDivSelector).find(".resultiframe")[0];
        iframe.contentWindow.document.write(html);
    };
    soby_CodeView.prototype.Populate = function () {
    };
    soby_CodeView.prototype.EnsureItemSelectionExistency = function () {
        for (var key in soby_CodeViews) {
            if (key == this.CodeViewID)
                return;
        }
        soby_CodeViews[this.CodeViewID] = this;
    };
    return soby_CodeView;
}());
// ************************************************************
