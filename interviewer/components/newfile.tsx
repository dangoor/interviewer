import * as React from "react";

interface NewFileProps {
    addFile: (name: string) => void;
    switchToSelector: () => void;
}

export default class NewFile extends React.Component<NewFileProps, any> {
    _input: HTMLInputElement;
    
    componentDidMount() {
        this._input.focus();
    }
    
    render() {
        return <div>
            <h2>Enter the new filename:</h2>
            <div>
                <input
                    type="text"
                    onKeyDown={this.keydownHandler}
                    ref={(c) => this._input = c}
                />
            </div>
        </div>;
    }
    
    keydownHandler = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) {
            this.props.addFile(this._input.value);
        } else if (e.keyCode === 27) {
            this.props.switchToSelector();
        }
    }
}