$(function () {
    soby_PopulateCustomizedCodeView();
});

function soby_PopulateCustomizedCodeView()
{
    var codeView = new soby_CodeView(".soby_CodeDiv", "Examples", SobyCodeViewTypes.HtmlParts);
    codeView.ActiveView = SobyCodeViews.Js;
    codeView.Initialize();
}

 