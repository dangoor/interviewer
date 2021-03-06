import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel, File} from "../model";

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

@observer class Preview extends React.Component<PreviewProps, any> {
    getScriptText(files: Array<File>) {
        const scriptFiles = "{" + files.filter((f) => f.isScript()).map((f) => `
 "${"local://" + f.moduleName}": \`${f.content.replace("`", "\\`")}\`
 `).join(",\n") + "}";
        const moduleNames = "[" + files.filter((f) => f.isScript()).map(
            (f) => '"' + f.moduleName + '",') + "]";
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
            Promise.all(testModules.map((tm) => System.import(tm))).then(() => mocha.run());
        })
    </script>
`
        }
        return `
        <script src="node_modules/systemjs/dist/system.js"></script>
        <script>
            const modules = ${scriptFiles};
            const moduleNames = ${moduleNames};
            const sysnorm = System.normalize.bind(System);
            const sysfetch = System.fetch.bind(System);
            const systranslate = System.translate.bind(System);
            System.normalize = function(name, parentName, parentAddress) {
                console.log("Normalize", name, parentName, parentAddress);
                if (moduleNames.indexOf(name) > -1) {
                    return "local://" + name;
                }
                return sysnorm(name, parentName, parentAddress);
            }
            System.fetch = function(load) {
                console.log("Fetch: ", JSON.stringify(load, null, 2));
                console.log("Modules:", modules);
                if (modules[load.address]) {
                    return Promise.resolve(modules[load.address]);
                } else {
                    return sysfetch(load);
                }
            }
            System.translate = function(load) {
                console.log("translate", load.name);
                if (moduleNames.indexOf(load.name) > -1) {
                    console.log("Translate: ", JSON.stringify(load, null, 2));                
                }
                result = systranslate(load);
                if (moduleNames.indexOf(load.name) > -1) {
                    console.log("Result: ", result);
                }
                return result;
            }
            System.config({
                transpiler: "typescript",
                map: {
                    react: "./node_modules/react/dist/react.js",
                    "react-dom": "./node_modules/react-dom/dist/react-dom.js",
                    "typescript": "./node_modules/typescript/lib/typescript.js",
                },
                typescriptOptions: {
                    module: "system",
                    target: "es6",
                    allowJs: true,
                    jsx: 2,
                },
            })
        </script>
        ${mochaSetup}
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