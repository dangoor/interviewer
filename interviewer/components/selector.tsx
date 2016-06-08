import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel} from "../model";

declare function TogetherJS(something: any): void;

interface SelectorProps {
    chooseFile: (name: string) => void;
    isInterviewer: boolean;
    manageState: () => void;
    model: InterviewerModel;
    switchToNewFile: () => void;
    switchToPreview: () => void;
    switchToTest: () => void;
}

@observer class Selector extends React.Component<SelectorProps, any> {
    render() {
        const {model} = this.props;
        let controls: any;
        if (this.props.isInterviewer) {
            controls = <div>
                <button onClick={() => {TogetherJS(this); return false; }}>Start TogetherJS</button>
                <button onClick={this.props.manageState}>Save/Restore State</button>
            </div>;
        }
        return <div>
            <ul>
                {model.files.map((file) => <li key={file.name}>
                    <a href="javascript:void(0);" onClick={() => this.props.chooseFile(file.name)}>
                        {file.name}
                    </a>
                </li>)}
            </ul>
            {controls}
            <button onClick={this.props.switchToNewFile}>Add a file</button>
            <button onClick={this.props.switchToPreview}>Preview</button>
            <button onClick={this.props.switchToTest}>Test Runner</button>
        </div>
    }
}

export default Selector;