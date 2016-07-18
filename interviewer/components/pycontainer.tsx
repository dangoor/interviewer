import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel} from "../model";

import Selector from "./selector";
import NewFile from "./newfile";
import Editor from "./editor";
import PyTest from "./pytest";

interface SubdividePane {
    id: string;
}

interface PyContainerProps {
    model: InterviewerModel;
    isInterviewer: boolean;
    showControlPanel: () => void;
    subdividePane: SubdividePane;
    save: () => void;
}

@observer class PyContainer extends React.Component<PyContainerProps, any> {
    addFile = (filename: string) => {
        this.props.model.addFile(filename, this.props.subdividePane.id);
    }

    switchToNewFile = () => {
        this.props.model.setPaneType(this.props.subdividePane.id, "new");
    }
    
    switchToTest = () => {
        this.props.model.setPaneType(this.props.subdividePane.id, "test");
    }
    
    chooseFile = (filename: string) => {
        this.props.model.setFileForPane(this.props.subdividePane.id, filename);
    }
    
    registerEditor = (editor: any) => {
        this.props.model.registerEditor(this.props.subdividePane.id, editor);
    }

    switchToSelector = () => {
        this.props.model.setPaneType(this.props.subdividePane.id, "selector");
    }
    
    save = () => {
        this.props.save();
    }
    
    render() {
        const {model, subdividePane} = this.props;
        const pane = model.getPane(subdividePane.id);
        let contents: any;
        switch (pane.type) {
            case "selector":
                contents = <Selector
                    chooseFile={this.chooseFile}
                    showControlPanel={this.props.showControlPanel}
                    model={model}
                    switchToNewFile={this.switchToNewFile}
                    switchToTest={this.switchToTest}
                    isInterviewer={this.props.isInterviewer}
            />;
                break;
            case "new":
                contents = <NewFile
                    addFile={this.addFile}
                    switchToSelector={this.switchToSelector}
                />
                break;
            case "file":
                const file = model.getFileForPane(subdividePane.id);
                contents = <Editor
                    closeFile={this.switchToSelector}
                    file={file}
                    registerEditor={this.registerEditor}
                    save={this.save}
                />;
                break;
            case "test":
                contents = <PyTest
                    model={this.props.model}
                />;
        }
        return <div style={{width: "100%", height: "100%"}}>
            {contents}
        </div>;
    }
}

export default PyContainer;