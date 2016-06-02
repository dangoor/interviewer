import * as React from "react";
import * as CodeMirror from "codemirror";

class Editor extends React.Component<any, any> {
    _textarea: HTMLTextAreaElement;
    
    componentDidMount() {
        this._textarea.focus();
        CodeMirror.fromTextArea(this._textarea, {
            lineNumbers: true,
        });
    }
    
    render() {
        const fullsize = {
            width: "100%",
            height: "100%",
        };
        
        return <div style={fullsize}>
            <textarea
                ref={(c) => this._textarea = c}
                style={fullsize}
            ></textarea>
        </div>
    }
}

export default Editor;