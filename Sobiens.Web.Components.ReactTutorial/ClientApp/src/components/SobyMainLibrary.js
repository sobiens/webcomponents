import { config } from '../config';

export class SobyMainLibrary {
    IncludeJSSection(sectionName, jsCode) {
        var scriptId = "sobyjssection_" + sectionName;
        if (document.getElementById(scriptId) === null) {
            const script = document.createElement("script");
            var inlineScript = document.createTextNode(jsCode);
            script.appendChild(inlineScript);
            //script.innerHTML = jsCode;
            script.id = scriptId;
            document.body.appendChild(script);
        }
    }

    IncludeJSLibrary(libraryName, callback) {
        var scriptId = "sobyjslibrary_" + libraryName;
        if (document.getElementById(scriptId) === null) {
            const script = document.createElement("script");
            script.src = config.JSFOLDERPATH + "/" + libraryName;
            script.async = false;
            script.id = scriptId;
            script.onreadystatechange = script.onload = function () {
                var state = script.readyState;
                console.log("state: " + state);
                if (!callback.done && (!state || /loaded|complete/.test(state))) {
                    callback.done = true;
                    callback();
                }
            };
            document.body.appendChild(script);
        }
    }

    IncludeCSSLibrary(libraryName) {
        var styleId = "sobycsslibrary_" + libraryName;
        if (document.getElementById(styleId) === null) {
            const style = document.createElement("link");
            style.href = config.CSSFOLDERPATH + "/" + libraryName;
            style.rel = "stylesheet";
            style.async = true;
            document.body.appendChild(style);
        }
    }

    IncludeChartLibrary(callback) {
        const library = this;
        library.IncludeJSLibrary("jquery-3.1.0.js", function () {
            library.IncludeJSLibrary("soby.service.js", function () {
                library.IncludeJSLibrary("soby.ui.components.charts.js", function () {
                    callback();
                    library.IncludeCSSLibrary("soby.ui.components.css", function () {
                    });
                });
            });
        });
    }
}
