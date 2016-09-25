function soby_ShowHideViewSource() {
    if ($(".viewsource").is(":visible") == false) {
        if ($(".viewsourcecodefileoutput").html() == "") {
            var codefile = $(".viewsource").attr("codefile");
            $.get(codefile, function (codefileHtml) {
                codefileHtml = $('<div/>').text(codefileHtml).html();
                codefileHtml = codefileHtml.replace(/\n/gi, "<br>");
                codefileHtml = codefileHtml.replace(/    /gi, "&nbsp;&nbsp;&nbsp;&nbsp;");
                codefileHtml = "<br>&lt;script&gt;<br>" + codefileHtml + "<br>&lt;/script&gt;";
                $(".viewsourcecodefileoutput").html(codefileHtml);
            }, 'html');
        }
        $(".viewsource").show();
    }
    else {
        $(".viewsource").hide();
    }
}
function soby_ShowHideViewCode(containerId, codeFile) {
    if ($("#" + containerId).is(":visible") == false) {
        if ($("#" + containerId + " .viewsourcecodefileoutput").html() == "") {
            $.get(codeFile, function (codefileHtml) {
                codefileHtml = $('<div/>').text(codefileHtml).html();
                codefileHtml = codefileHtml.replace(/    /gi, "&nbsp;&nbsp;&nbsp;&nbsp;");
                $("#" + containerId + " .viewsourcecodefileoutput").html(codefileHtml);
            }, 'html');
        }
        $("#" + containerId).show();
    }
    else {
        $("#" + containerId).hide();
    }
}
function soby_GetTutorialWebAPIUrl() {
    if (window.location.href.indexOf("http://webcomponents.sobiens.com/") > -1)
        return "http://webcomponentsservices.sobiens.com/api";
    else
        return "http://localhost:7287/api";
}
function soby_GetTutorialWCFUrl() {
    if (window.location.href.indexOf("http://webcomponents.sobiens.com/") > -1)
        return "http://webcomponentsservices.sobiens.com/wcf";
    else
        return "http://localhost:7287/wcf";
}
//# sourceMappingURL=main.js.map