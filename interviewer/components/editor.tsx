import * as React from "react";
import * as CodeMirror from "codemirror";

import {File} from "../model";

interface EditorProps {
    closeFile: () => void;
    save: () => void;
    registerEditor: (editor: any) => void;
    file: File;
}

class Editor extends React.Component<EditorProps, any> {
    _textarea: HTMLTextAreaElement;
    
    componentDidMount() {
        this._textarea.focus();
        const initialContent = this.props.file.content;
        if (initialContent) {
            this._textarea.value = initialContent;
        }
        const editor = CodeMirror.fromTextArea(this._textarea, {
            lineNumbers: true,
            extraKeys: {
                "Cmd-S": () => {
                    this.props.save();
                    return false;
                }
            },
        });
        this.props.registerEditor(editor);        
    }
    
    render() {
        const fullsize = {
            width: "100%",
            height: "100%",
        };
        
        return <div style={fullsize}>
            <div>
                {this.props.file.name}
                <button style={{float: "right"}} onClick={this.props.closeFile}>Close</button>
            </div>
            <div>
                <textarea
                    ref={(c) => this._textarea = c}
                    style={fullsize}
                ></textarea>
            </div>
        </div>
    }
}

export default Editor;