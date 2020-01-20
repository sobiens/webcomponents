$(function () {
    soby_PopulateCustomizedCodeView1();
});
function soby_PopulateCustomizedCodeView1() {
    var codeView = new soby_CodeView(".soby_CodeDiv", "Examples", SobyCodeViewTypes.Js);
    codeView.ImagesFolderUrl = "/media/images";
    codeView.TemplateHtml = "<div style='border: 1px solid lightgray;padding: 5px;width:100%'>" +
        "<div class='codeeditor' style='width:100%;'></div>" +
        "<div class='actionbuttons' style='width:100%;text-align: right;'></div>" +
        "<div class='result' style='width:100%;'></div>" +
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
    };
    codeView.Initialize();
}
//# sourceMappingURL=customizedtemplate1.js.map