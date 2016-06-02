import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel} from "../model";

import Selector from "./selector";
import NewFile from "./newfile";

interface SubdividePane {
    id: string;
}

interface ContainerProps {
    model: InterviewerModel;
    subdividePane: SubdividePane;
}

@observer class Container extends React.Component<ContainerProps, any> {
    addFile = (filename: string) => {
        this.props.model.addFile(filename, this.props.subdividePane.id);
    }

    switchToNewFile = () => {
        this.props.model.setPaneType(this.props.subdividePane.id, "new");
    }
    
    render() {
        const {model, subdividePane} = this.props;
        const paneType = model.getPaneType(subdividePane.id);
        let contents: React.Component;
        switch (paneType) {
            case "selector":
                contents = <Selector
                    model={model}
                    switchToNewFile={this.switchToNewFile}
            />;
            case "new":
                contents = <NewFile />
        }
        return <div>
            {contents}
        </div>;
    }
}

export default Container;