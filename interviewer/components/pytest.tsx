import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel, File} from "../model";

interface PythonWindow {
    brython: () => void;
    __BRYTHON__: {
        VFS: any;
        modules: any;
        imported: any;
    };
    execPythonMain: (src: string) => void;
    execTests: (testModules: Array<string>) => void;
    getCachedOutput: () => string;
}

declare var window: PythonWindow;

window.__BRYTHON__.VFS._locale = ["py", `raise ImportError()`]

window.brython();

interface PyTestProps {
    model: InterviewerModel;
}

// This is the least pure React component ever.
@observer
export default class PyTest extends React.Component<PyTestProps, any> {
    console: HTMLTextAreaElement;

    componentDidMount() {
        this.console.value = window.getCachedOutput()
    }

    render() {
        const testFiles:Array<string> = [];
        const mainFiles:Array<File> = [];
        this.props.model.files.filter((file) => file.extension === "py").forEach((file) => {
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
        if (this.console) {
            this.console.value = "";
        }
        mainFiles.forEach((file) => { window.execPythonMain(file.content); })
        window.execTests(testFiles);
        return <textarea
            id="console"
            ref={(node) => this.console = node}
            style={{width: "100%", height: "100%"}}
        />;
    }
}
