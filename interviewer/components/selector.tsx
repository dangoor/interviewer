import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel} from "../model";

interface SelectorProps {
    model: InterviewerModel;
    switchToNewFile: () => void;
    switchToPreview: () => void;
}

@observer class Selector extends React.Component<SelectorProps, any> {
    render() {
        const {model} = this.props;
        return <div>
            <ul>
                {model.files.filter((file) => file.pane !== undefined).map((file) => <li>
                    {file.name}
                </li>)}
            </ul>
            <button onClick={this.props.switchToNewFile}>Add a file</button>
            <button onClick={this.props.switchToPreview}>Preview</button>
        </div>
    }
}

export default Selector;