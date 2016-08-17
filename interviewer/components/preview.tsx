import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel, File} from "../model";
import {Babel} from "../babel";

interface PreviewProps {
    model: InterviewerModel;
    runTests: boolean;
    babel: Babel;
}

const FALLBACK_HTML = `<DOCTYPE html>
<html>
<body>
Create a file called preview.html
</body>
</html>
`;

const TEST_HTML = `<!DOCTYPE html>
<html>
<head>
    <CSS-PLACEHOLDER/>
    <SCRIPT-PLACEHOLDER/>
</head>
<body>
    <div id="mocha"></div>
</body>
</html>
`

@observer class Preview extends React.Component<PreviewProps, any> {
    getScriptText(files: Array<File>) {
        let mochaSetup = "";
        if (this.props.runTests) {
            const testModules = "[" + files.filter((f) => f.isTest()).map(
                (f) => `"${f.moduleName}",`) + "]";
            mochaSetup = `
    <script src="thirdparty/mocha/mocha.js"></script>
    <script src="thirdparty/chai.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            mocha.setup("bdd");
            window.assert = chai.assert;
            const testModules = ${testModules};
            require(testModules, function() {
                mocha.run();
            });
        })
    </script>
`
        }
        return `
        ${mochaSetup}
        <script src="thirdparty/require.js"></script>
        <script>
            requirejs.config({
                paths: {
                    react: "thirdparty/react.min",
                    "react-dom": "thirdparty/react-dom.min",
                }
            })
            ${files.filter((file) => file.isScript()).map((file) =>
                this.props.babel.transform(file.content, {
                    presets: ["es2015", "react"],
                    plugins: ["transform-es2015-modules-amd"],
                    moduleId: file.moduleName
            }).code).join("\n")}
        </script>
`
    }

    getStyleText() {
        let mochaCSS = "";
        if (this.props.runTests) {
            mochaCSS = `
    <link rel="stylesheet" href="thirdparty/mocha/mocha.css">
`
        }
        return mochaCSS;
    }
    
    getPreviewHTML(files: Array<File>) {
        const previewFile = this.props.runTests ?
            null :
            files.find((file) => file.name === "preview.html");
        let previewPage: string;
        if (previewFile) {
            previewPage = previewFile.content;
        } else {
            previewPage = this.props.runTests ? TEST_HTML : FALLBACK_HTML;
        }
        previewPage = previewPage.replace("<CSS-PLACEHOLDER/>", this.getStyleText());
        previewPage = previewPage.replace("<SCRIPT-PLACEHOLDER/>",
            this.getScriptText(files));
        return previewPage;
    }
    
    render() {
        const {files} = this.props.model;
        return <iframe
            style={{width: "100%", height: "100%"}}
            srcDoc={this.getPreviewHTML(files)}
        />;
    }
}

export default Preview;