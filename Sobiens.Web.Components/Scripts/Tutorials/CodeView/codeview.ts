var bookGrid: soby_WebGrid = null;
document.write("<div id='soby_BooksDiv'></div>");
$(function () {
    soby_PopulateCodeView();
});

function soby_PopulateCodeView()
{
    var codeView = new soby_CodeView(".soby_CodeDiv", "Examples", SobyCodeViewTypes.Js);
    codeView.ImagesFolderUrl = "/media/images";
    codeView.Initialize();
}

 