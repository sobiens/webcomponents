$(function () {
    soby_PopulateCustomizedCodeView();
});
function soby_PopulateCustomizedCodeView() {
    var codeView = new soby_CodeView(".soby_CodeDiv", "Examples", SobyCodeViewTypes.Js);
    codeView.ImagesFolderUrl = "/media/images";
    codeView.Initialize();
}
//# sourceMappingURL=codeview.js.map