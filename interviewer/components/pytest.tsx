import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel} from "../model";

interface PythonWindow {
    getCachedOutput: () => string;
}

declare var window: PythonWindow;

interface PyTestProps {
    model: InterviewerModel;
}

@observer
export default class PyTest extends React.Component<PyTestProps, any> {
    console: HTMLTextAreaElement;

    componentDidMount() {
        this.console.value = window.getCachedOutput()
    }

    render() {
        return <textarea
            id="console"
            ref={(node) => this.console = node}
            style={{width: "100%", height: "100%"}}
        />;
    }
}
