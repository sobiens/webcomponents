// VERSION 1.0.8.1
// ********************* ITEM SELECTION *****************************
var soby_CodeViews = new Array();
var SobyCodeViewTypes;
(function (SobyCodeViewTypes) {
    SobyCodeViewTypes[SobyCodeViewTypes["SingleHtml"] = 0] = "SingleHtml";
    SobyCodeViewTypes[SobyCodeViewTypes["HtmlParts"] = 1] = "HtmlParts";
    SobyCodeViewTypes[SobyCodeViewTypes["Xml"] = 2] = "Xml";
})(SobyCodeViewTypes || (SobyCodeViewTypes = {}));
var SobyCodeViews;
(function (SobyCodeViews) {
    SobyCodeViews[SobyCodeViews["SinglePage"] = 0] = "SinglePage";
    SobyCodeViews[SobyCodeViews["Html"] = 1] = "Html";
    SobyCodeViews[SobyCodeViews["Js"] = 2] = "Js";
    SobyCodeViews[SobyCodeViews["Css"] = 3] = "Css";
    SobyCodeViews[SobyCodeViews["Xml"] = 4] = "Xml";
})(SobyCodeViews || (SobyCodeViews = {}));
var soby_CodeView = /** @class */ (function () {
    function soby_CodeView(contentDivSelector, title, codeViewType) {
        this.CodeViewID = "";
        this.ContentDivSelector = "";
        this.Title = "";
        this.CodeViewType = null;
        this.TemplateHtml = "";
        this.ActiveView = SobyCodeViews.Js;
        this.OnTemplateRendered = null;
        this.CodeViewID = "soby_codeview_" + soby_guid();
        this.ContentDivSelector = contentDivSelector;
        this.Title = title;
        this.CodeViewType = codeViewType;
        this.EnsureItemSelectionExistency();
        this.TemplateHtml = "<div style='border: 1px solid lightgray;padding: 5px;'>" +
            "<div id='" + this.CodeViewID + "_codeeditor' class='codeeditors'>" +
            "<ul>" +
            (this.CodeViewType === SobyCodeViewTypes.SingleHtml ? "<li><a href='#" + this.CodeViewID + "_singlecodeeditor'>Single</a></li > " : "") +
            (this.CodeViewType === SobyCodeViewTypes.HtmlParts ?
                "<li><a href='#" + this.CodeViewID + "_jscodeeditor'>JS</a></li>" : "") +
            "<li><a href='#" + this.CodeViewID + "_htmlcodeeditor'>Html</a></li>" +
            "<li><a href='#" + this.CodeViewID + "_csscodeeditor'>CSS</a></li>" +
            "</ul>" +
            (this.CodeViewType === SobyCodeViewTypes.SingleHtml ? "<div id='" + this.CodeViewID + "_singlecodeeditor' class='singlecodeeditor'></div>" : "") +
            (this.CodeViewType === SobyCodeViewTypes.HtmlParts ?
                "<div id='" + this.CodeViewID + "_jscodeeditor' class='jscodeeditor'></div>" : "") +
            "<div id='" + this.CodeViewID + "_htmlcodeeditor' class='htmlcodeeditor'></div>" +
            "<div id='" + this.CodeViewID + "_csscodeeditor' class='csscodeeditor'></div>" +
            "</div>" +
            "<div class='actionbuttons'></div>" +
            "<p class='codedescription'></p>" +
            "<div class='result'> </div><br><p class='resultdescription'></p>" +
            "</div>";
        if (this.CodeViewType === SobyCodeViewTypes.SingleHtml) {
            this.ActiveView = SobyCodeViews.SinglePage;
        }
        else if (this.CodeViewType === SobyCodeViewTypes.HtmlParts) {
            this.ActiveView = SobyCodeViews.Js;
        }
        else if (this.CodeViewType === SobyCodeViewTypes.Xml) {
            this.ActiveView = SobyCodeViews.Xml;
        }
    }
    soby_CodeView.prototype.Initialize = function () {
        $(this.ContentDivSelector).addClass("soby_codeview");
        var singleCodeContent = $(this.ContentDivSelector).find(".singlecode").html();
        var htmlCodeContent = $(this.ContentDivSelector).find(".htmlcode").html();
        var jsCodeContent = $(this.ContentDivSelector).find(".jscode").html();
        var cssCodeContent = $(this.ContentDivSelector).find(".csscode").html();
        var codeDescription = $(this.ContentDivSelector).find(".codedescription").html();
        var resultDescription = $(this.ContentDivSelector).find(".resultdescription").html();
        $(this.ContentDivSelector).html(this.TemplateHtml);
        $(this.ContentDivSelector).prepend("<textarea class='copytoclipboardtextarea' style='height: 0px;width: 0px;overflow: hidden;border: 0px;resize: none;' > </textarea>" +
            "<textarea class='defaultsinglecodecontainer' style='height: 0px;width: 0px;overflow: hidden;border: 0px;resize: none;'></textarea>" +
            "<textarea class='defaultjscodecontainer' style='height: 0px;width: 0px;overflow: hidden;border: 0px;resize: none;'></textarea>" +
            "<textarea class='defaulthtmlcodecontainer' style='height: 0px;width: 0px;overflow: hidden;border: 0px;resize: none;'></textarea>" +
            "<textarea class='defaultcsscodecontainer' style='height: 0px;width: 0px;overflow: hidden;border: 0px;resize: none;'></textarea>");
        if (this.CodeViewType === SobyCodeViewTypes.SingleHtml) {
            $(this.ContentDivSelector).find(".singlecodeeditor").html("<div id='" + this.CodeViewID + "__singlecodeeditor' class='singlecode codeeditor'></div>");
            $(this.ContentDivSelector).find(".singlecode").html(singleCodeContent.replace(/<br \/ >/gi, "\n").replace(/<br>/gi, "\n"));
        }
        else if (this.CodeViewType === SobyCodeViewTypes.HtmlParts) {
            $(this.ContentDivSelector).find(".jscodeeditor").html("<div id='" + this.CodeViewID + "__jscodeeditor' class='jscode codeeditor' ></div>");
            $(this.ContentDivSelector).find(".htmlcodeeditor").html("<div id='" + this.CodeViewID + "__htmlcodeeditor' class='htmlcode codeeditor'></div>");
            $(this.ContentDivSelector).find(".csscodeeditor").html("<div id='" + this.CodeViewID + "__csscodeeditor' class='csscode codeeditor'></div>");
            $(this.ContentDivSelector).find(".htmlcode").html(htmlCodeContent.replace(/<br \/ >/gi, "\n").replace(/<br>/gi, "\n"));
            $(this.ContentDivSelector).find(".jscode").html(jsCodeContent.replace(/<br \/ >/gi, "\n").replace(/<br>/gi, "\n"));
            $(this.ContentDivSelector).find(".csscode").html(cssCodeContent.replace(/<br \/ >/gi, "\n").replace(/<br>/gi, "\n"));
        }
        $(this.ContentDivSelector).find(".defaultsinglecodecontainer").html(singleCodeContent);
        $(this.ContentDivSelector).find(".defaultjscodecontainer").html(jsCodeContent);
        $(this.ContentDivSelector).find(".defaultcsscodecontainer").html(cssCodeContent);
        $(this.ContentDivSelector).find(".defaulthtmlcodecontainer").html(htmlCodeContent);
        $(this.ContentDivSelector).find(".codedescription").html(codeDescription);
        $(this.ContentDivSelector).find(".resultdescription").html(resultDescription);
        $(this.ContentDivSelector).find(".result").html("<iframe class='resultiframe' style='width:100%;height:600px;' > </iframe>");
        $(this.ContentDivSelector).find(".actionbuttons").html("<button type = \"button\" class= \"btn btn-primary\" onclick=\"soby_CodeViews['" + this.CodeViewID + "'].RunCode();\">" +
            "<svg xmlns =\"http://www.w3.org/2000/svg\" width = \"16\" height = \"16\" fill = \"currentColor\" class= \"bi bi-play-circle\" viewBox = \"0 0 16 16\" >" +
            "<path d =\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\" > </path>" +
            "<path d = \"M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z\" > </path>" +
            "</svg> Run</button> " +
            "&nbsp;" +
            "<button type=\"button\" class=\"btn btn-primary\" onclick=\"soby_CodeViews['" + this.CodeViewID + "'].CopyToClipboard();\">" +
            "<svg xmlns = \"http://www.w3.org/2000/svg\" width = \"16\" height = \"16\" fill = \"currentColor\" class= \"bi bi-clipboard-check\" viewBox = \"0 0 16 16\" >" +
            "<path fill-rule=\"evenodd\" d = \"M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z\" > </path>" +
            "<path d = \"M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z\" > </path>" +
            "<path d = \"M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z\" > </path>" +
            "</svg>" +
            "   Copy" +
            "</button>" +
            "&nbsp;" +
            "<button type=\"button\" class=\"btn btn-primary\" onclick=\"soby_CodeViews['" + this.CodeViewID + "'].ResetExercise();\">" +
            "<svg xmlns = \"http://www.w3.org/2000/svg\" width = \"16\" height = \"16\" fill = \"currentColor\" class= \"bi bi-bootstrap-reboot\" viewBox = \"0 0 16 16\" >" +
            "<path d =\"M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z\" > </path>" +
            "<path d = \"M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z\" > </path>" +
            "</svg>" +
            "        Reset" +
            "</button>&nbsp;");
        eval("var editor = ace.edit('" + this.CodeViewID + "__jscodeeditor');");
        eval("editor.setTheme('ace/theme/monokai');");
        eval("editor.session.setMode('ace/mode/javascript');");
        eval("var editor = ace.edit('" + this.CodeViewID + "__csscodeeditor');");
        eval("editor.setTheme('ace/theme/monokai');");
        eval("editor.session.setMode('ace/mode/css');");
        eval("var editor = ace.edit('" + this.CodeViewID + "__htmlcodeeditor');");
        eval("editor.setTheme('ace/theme/monokai');");
        eval("editor.session.setMode('ace/mode/html');");
        $(".ace_editor").css("height", "200px");
        if (this.OnTemplateRendered !== null) {
            this.OnTemplateRendered();
        }
        var codeview = this;
        $(function () {
            codeview.RunCode();
        });
        var tabs = new soby_Tab("#" + this.CodeViewID + "_codeeditor");
        tabs.Initialize();
    };
    soby_CodeView.prototype.RunCode = function () {
        $(this.ContentDivSelector).find(".result").html("<iframe class='resultiframe' style= 'width:100%;height:600px;' > </iframe>");
        var html = "";
        if (this.CodeViewType === SobyCodeViewTypes.SingleHtml) {
            html = eval("ace.edit('" + this.CodeViewID + "__singlecodeeditor').getValue()");
        }
        else if (this.CodeViewType === SobyCodeViewTypes.HtmlParts) {
            html = eval("ace.edit('" + this.CodeViewID + "__htmlcodeeditor').getValue()");
            html += "<style type='text/css'>" + eval("ace.edit('" + this.CodeViewID + "__csscodeeditor').getValue()") + "</style>";
            html += "<script language='javascript'>" + eval("ace.edit('" + this.CodeViewID + "__jscodeeditor').getValue()") + "</script>";
        }
        var iframe = $(this.ContentDivSelector).find(".resultiframe")[0];
        iframe.contentWindow.document.write(html);
    };
    soby_CodeView.prototype.ResetExercise = function () {
        if (this.CodeViewType === SobyCodeViewTypes.SingleHtml) {
            var code = $(this.ContentDivSelector).find(".defaultsinglecodecontainer").val();
            $(this.ContentDivSelector).find(".code").val(code);
        }
        else if (this.CodeViewType === SobyCodeViewTypes.HtmlParts) {
            var htmlcode = $(this.ContentDivSelector).find(".defaulthtmlcodecontainer").val();
            $(this.ContentDivSelector).find(".htmlcode").val(htmlcode);
            var jscode = $(this.ContentDivSelector).find(".defaultjscodecontainer").val();
            $(this.ContentDivSelector).find(".jscode").val(jscode);
            var csscode = $(this.ContentDivSelector).find(".defaultcsscodecontainer").val();
            $(this.ContentDivSelector).find(".csscode").val(csscode);
        }
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
            if (key === this.CodeViewID) {
                return;
            }
        }
        soby_CodeViews[this.CodeViewID] = this;
    };
    return soby_CodeView;
}());
// ************************************************************
//# sourceMappingURL=soby.ui.components.codeview.js.map