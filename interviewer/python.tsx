import * as React from "react";
import * as ReactDOM from "react-dom";
import {reaction} from "mobx";

import App from "./components/app";
import {InterviewerModel, File} from "./model";
import PyContainer from "./components/pycontainer";

const model = new InterviewerModel(false);

interface MyWindow {
    model: InterviewerModel;
    brython: () => void;
    __BRYTHON__: {
        VFS: any;
        modules: any;
        imported: any;
    };
    execPythonMain: (src: string) => void;
    execTests: (testModules: Array<string>) => void;
    clearConsole: () => void;
}

declare var window: MyWindow;
window.model = model;

window.__BRYTHON__.VFS._locale = ["py", `raise ImportError()`]

window.brython();

model.saveReaction = function(model) {
        window.clearConsole();
        const testFiles:Array<string> = [];
        const mainFiles:Array<File> = [];
        model.files.filter((file) => file.extension === "py").forEach((file) => {
           window.__BRYTHON__.VFS[file.moduleName] = [".py", file.content];
           delete window.__BRYTHON__.modules[file.moduleName];
           delete window.__BRYTHON__.imported[file.moduleName];
           if (file.content.indexOf("__main__")) {
               mainFiles.push(file);
           } 
           if (file.isTest()) {
               testFiles.push(file.moduleName);
           }
        });
        mainFiles.forEach((file) => { window.execPythonMain(file.content); })
        window.execTests(testFiles);
}

function render() {
    ReactDOM.render(
        <App
            container={PyContainer}
            model={model}
            extraContainerProps={{
            }}
            savedStateKey={"pysaved"}
        />,
        document.getElementById("container")
    );    
}

render();
