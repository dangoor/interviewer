import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel} from "../model";

import Selector from "./selector";
import NewFile from "./newfile";
import Editor from "./editor";
import Preview from "./preview";
import {Babel} from "../babel";

interface SubdividePane {
    id: string;
}

interface ContainerProps {
    model: InterviewerModel;
    isInterviewer: boolean;
    showControlPanel: () => void;
    subdividePane: SubdividePane;
    babel: Babel;
    save: () => void;
}

@observer class Container extends React.Component<ContainerProps, any> {
    addFile = (filename: string) => {
        this.props.model.addFile(filename, this.props.subdividePane.id);
    }

    switchToNewFile = () => {
        this.props.model.setPaneType(this.props.subdividePane.id, "new");
    }
    
    switchToPreview = () => {
        this.props.model.setPaneType(this.props.subdividePane.id, "preview");
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
                    switchToPreview={this.switchToPreview}
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
            case "preview":
                contents = <Preview
                    model={model}
                    runTests={false}
                    babel={this.props.babel}
                />;
                break;
            case "test":
                contents = <Preview
                    model={model}
                    runTests={true}
                    babel={this.props.babel}
                />;
                break;
        }
        return <div style={{width: "100%", height: "100%"}}>
            {contents}
        </div>;
    }
}

export default Container;