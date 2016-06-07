import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel} from "../model";

interface SelectorProps {
    chooseFile: (name: string) => void;
    manageState: () => void;
    model: InterviewerModel;
    switchToNewFile: () => void;
    switchToPreview: () => void;
}

@observer class Selector extends React.Component<SelectorProps, any> {
    render() {
        const {model} = this.props;
        return <div>
            <ul>
                {model.files.map((file) => <li key={file.name}>
                    <a href="javascript:void(0);" onClick={() => this.props.chooseFile(file.name)}>
                        {file.name}
                    </a>
                </li>)}
            </ul>
            <button onClick={this.props.manageState}>Save/Restore State</button>
            <button onClick={this.props.switchToNewFile}>Add a file</button>
            <button onClick={this.props.switchToPreview}>Preview</button>
        </div>
    }
}

export default Selector;