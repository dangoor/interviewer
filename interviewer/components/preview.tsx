import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel, File} from "../model";
import * as TS from "typescript";

interface PreviewProps {
    model: InterviewerModel;
    runTests: boolean;
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

function compileFile(file: File) {
    const result = TS.transpile(file.content, {
        allowJs: true,
        jsx: 2,
        module: TS.ModuleKind.AMD,
        target: TS.ScriptTarget.ES2015,
    }, file.name, undefined, file.moduleName);
    return result;
}

@observer class Preview extends React.Component<PreviewProps, any> {
    getScriptText(files: Array<File>) {
        let mochaSetup = "";
        if (this.props.runTests) {
            const testModules = "[" + files.filter((f) => f.isTest()).map(
                (f) => `"${f.moduleName}",`) + "]";
            mochaSetup = `
    <script src="node_modules/mocha/mocha.js"></script>
    <script src="node_modules/chai/chai.js"></script>
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
        <script src="node_modules/requirejs/require.js"></script>
        <script>
            requirejs.config({
                paths: {
                    react: "node_modules/react/dist/react",
                    "react-dom": "node_modules/react-dom/dist/react-dom.min",
                }
            })
            ${files.filter((file) => file.isScript()).map(compileFile).join("\n")}
        </script>
`
    }

    getStyleText() {
        let mochaCSS = "";
        if (this.props.runTests) {
            mochaCSS = `
    <link rel="stylesheet" href="node_modules/mocha/mocha.css">
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