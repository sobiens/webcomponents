// VERSION 1.0.8.1
// ********************* ITEM SELECTION *****************************
var soby_CodeViews = new Array();
var SobyCodeViewTypesObject = /** @class */ (function () {
    function SobyCodeViewTypesObject() {
        this.Html = 0;
        this.Js = 1;
        this.Xml = 2;
    }
    return SobyCodeViewTypesObject;
}());
var SobyCodeViewTypes = new SobyCodeViewTypesObject();
var soby_CodeView = /** @class */ (function () {
    function soby_CodeView(contentDivSelector, title, codeViewType) {
        this.CodeViewID = "";
        this.ContentDivSelector = "";
        this.Title = "";
        this.ImagesFolderUrl = "/_layouts/1033/images";
        this.CodeViewType = null;
        this.TemplateHtml = "<div style='border: 1px solid lightgray;padding: 5px;'>" +
            "<div class='codeeditor'></div>" +
            "<div class='actionbuttons'></div>" +
            "<p class='codedescription'></p>" +
            "<div class='result'> </div><br><p class='resultdescription'></p>" +
            "</div>";
        this.OnTemplateRendered = null;
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
        $(this.ContentDivSelector).html(this.TemplateHtml);
        $(this.ContentDivSelector).prepend("<textarea class='copytoclipboardtextarea' style='height: 0px;width: 0px;overflow: hidden;border: 0px;resize: none;' > </textarea>" +
            "<textarea class='defaultcodecontainer' style='height: 0px;width: 0px;overflow: hidden;border: 0px;resize: none;'></textarea>");
        $(this.ContentDivSelector).find(".codeeditor").html("<textarea class='code' rows = '6' cols = '70' style='width:100%;height: 200px;'></textarea>");
        $(this.ContentDivSelector).find(".code").html(codeContent.replace(/<br \/ >/gi, "\n").replace(/<br>/gi, "\n"));
        $(this.ContentDivSelector).find(".defaultcodecontainer").html(codeContent);
        $(this.ContentDivSelector).find(".codedescription").html(codeDescription);
        $(this.ContentDivSelector).find(".resultdescription").html(resultDescription);
        $(this.ContentDivSelector).find(".result").html("<iframe class='resultiframe' style='width:100%;height:200px;' > </iframe>");
        $(this.ContentDivSelector).find(".actionbuttons").html("<a href='javascript:void(0)' class='runcodebutton' onclick=\"soby_CodeViews['" + this.CodeViewID + "'].RunCode();\">Run</a>&nbsp;" +
            "<a href='javascript:void(0)' class='resetexercisebutton' onclick=\"soby_CodeViews['" + this.CodeViewID + "'].ResetExercise();\">Reset exercise</a>&nbsp;" +
            "<a href='javascript:void(0)' class='copyyoclipboardbutton' onclick=\"soby_CodeViews['" + this.CodeViewID + "'].CopyToClipboard();\">Copy to clipboard</a>");
        if (this.OnTemplateRendered != null) {
            this.OnTemplateRendered();
        }
        var codeview = this;
        $(function () {
            codeview.RunCode();
        });
    };
    soby_CodeView.prototype.RunCode = function () {
        $(this.ContentDivSelector).find(".result").html("<iframe class='resultiframe' style= 'width:100%;height:200px;' > </iframe>");
        var html = $(this.ContentDivSelector).find(".code").val();
        var iframe = $(this.ContentDivSelector).find(".resultiframe")[0];
        iframe.contentWindow.document.write(html);
    };
    soby_CodeView.prototype.ResetExercise = function () {
        var code = $(this.ContentDivSelector).find(".defaultcodecontainer").val();
        $(this.ContentDivSelector).find(".code").val(code);
    };
    soby_CodeView.prototype.CopyToClipboard = function () {
        var html = $(this.ContentDivSelector).find(".code").val();
        var copyToClipboardTextarea = $(this.ContentDivSelector).find(".copytoclipboardtextarea");
        copyToClipboardTextarea.text(html);
        var copyText = copyToClipboardTextarea[0];
        eval("copyText.select();");
        document.execCommand("copy");
    };
    soby_CodeView.prototype.Populate = function () {
    };
    soby_CodeView.prototype.EnsureItemSelectionExistency = function () {
        for (var key in soby_CodeViews) {
            if (key == this.CodeViewID) {
                return;
            }
        }
        soby_CodeViews[this.CodeViewID] = this;
    };
    return soby_CodeView;
}());
// ************************************************************
//# sourceMappingURL=soby.ui.components.codeview.js.map