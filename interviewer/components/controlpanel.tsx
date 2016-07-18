import * as React from "react";
import {Modal} from "react-bootstrap";

interface ControlPanelProps {
    manageState: () => void;
    closeControlPanel: () => void;
    startTogetherJS: () => void;
    toggleMobxDevtools: () => void;
    reset: () => void;
}

export default class ControlPanel extends React.Component<ControlPanelProps, {}> {
    render() {
        return <Modal show={true} onHide={this.props.closeControlPanel}>
            <button onClick={() => {this.props.startTogetherJS(); this.props.closeControlPanel()}}>Start TogetherJS</button>
            <button onClick={this.props.manageState}>Save/Restore State</button>
            <button onClick={this.props.toggleMobxDevtools}>Toggle MobX Devtools</button>
            <button onClick={this.props.reset}>Reset</button>
            <button onClick={this.props.closeControlPanel}>Close</button>
        </Modal>;
    }
}

