import * as React from "react";
import * as CodeMirror from "codemirror";

interface EditorProps {
    save: () => void;
    registerEditor: (editor: any) => void;
}

class Editor extends React.Component<EditorProps, any> {
    _textarea: HTMLTextAreaElement;
    
    componentDidMount() {
        this._textarea.focus();
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
            <textarea
                ref={(c) => this._textarea = c}
                style={fullsize}
            ></textarea>
        </div>
    }
}

export default Editor;