import * as React from "react";
import {observer} from "mobx-react";

import {InterviewerModel, File} from "../model";

interface PreviewProps {
    model: InterviewerModel;
}

@observer class Preview extends React.Component<PreviewProps, any> {
    getPreviewHTML(files: Array<File>) {
        return `<DOCTYPE html>
<html>
<body>
Hi.
</body>
</html>
`;
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