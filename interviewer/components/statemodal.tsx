import * as React from "react";
import {Modal} from "react-bootstrap";

interface StateModalProps {
    close: () => void;
    currentState: string,
    saveState: (newState: string) => void;
}

export default class StateModal extends React.Component<StateModalProps, any> {
    _textarea: HTMLTextAreaElement;
    
    componentDidMount() {
        this._textarea.setSelectionRange(0, this.props.currentState.length);
    }
    
    save = () => {
        this.props.saveState(this._textarea.value);
    }
    
    revert = () => {
        this._textarea.value = this.props.currentState;
    }
    
    render() {
        return <Modal show={true} onHide={this.props.close}>
            <h1>Save/Restore State</h1>
            <div>
                <textarea
                    defaultValue={this.props.currentState}
                    ref={(c) => this._textarea = c}
                    style={{width: 600, height: 500}}
                />
            </div>
            <div>
                <button onClick={this.save}>Set State</button>
                <button onClick={this.revert}>Current State</button>
                <button onClick={this.props.close}>Close</button>
            </div>
        </Modal>;
    }
}