$(function () {
    soby_PopulateCustomizedCodeView2();
});
function soby_PopulateCustomizedCodeView2() {
    var codeView = new soby_CodeView(".soby_CodeDiv", "Examples", SobyCodeViewTypes.Js);
    codeView.ImagesFolderUrl = "/media/images";
    codeView.TemplateHtml = "<div style='width:100%'>" +
        "<div class='codeeditor' style='width:47%;float:left;'></div>" +
        "<div class='actionbuttons' style='width:6%;float:left;'></div>" +
        "<div class='result' style='width:47%;float:left;'></div>" +
        "</div>";
    codeView.OnTemplateRendered = function () {
        var runcodebutton = $(this.ContentDivSelector).find(".runcodebutton");
        var resetexercisebutton = $(this.ContentDivSelector).find(".resetexercisebutton");
        var copyyoclipboardbutton = $(this.ContentDivSelector).find(".copyyoclipboardbutton");
        runcodebutton.html("<span class='fa fa-caret-square-o-right' style='color:green'></span>");
        resetexercisebutton.html("<span class='fa fa-close' style='color:red'></span>");
        copyyoclipboardbutton.html("<span class='fa fa-clone' style='color:blue'></span>");
        runcodebutton.attr("title", "Run code");
        resetexercisebutton.attr("title", "Reset code");
        copyyoclipboardbutton.attr("title", "Copy code to clipboard");
        runcodebutton.css("clear", "both");
        runcodebutton.css("float", "left");
        resetexercisebutton.css("clear", "both");
        resetexercisebutton.css("float", "left");
        copyyoclipboardbutton.css("clear", "both");
        copyyoclipboardbutton.css("float", "left");
    };
    codeView.Initialize();
}
//# sourceMappingURL=customizedtemplate2.js.map