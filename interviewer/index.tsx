import * as React from "react";
import * as ReactDOM from "react-dom";
import Subdivide from "subdivide";
import {Modal} from "react-bootstrap";
import {spy} from "mobx";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";

import {InterviewerModel} from "./model";
import Container from "./components/container";

const model = new InterviewerModel();

interface MyWindow {
    model: InterviewerModel;
}

declare var window: MyWindow;
window.model = model;

interface StateModalProps {
    close: () => void;
    currentState: string,
    saveState: (newState: string) => void;
}

class StateModal extends React.Component<StateModalProps, any> {
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

interface ControlPanelProps {
    manageState: () => void;
    closeControlPanel: () => void;
    toggleMobxDevtools: () => void;
}

class ControlPanel extends React.Component<ControlPanelProps, {}> {
    render() {
        return <Modal show={true} onHide={this.props.closeControlPanel}>
            <button onClick={() => {TogetherJS(this); this.props.closeControlPanel()}}>Start TogetherJS</button>
            <button onClick={this.props.manageState}>Save/Restore State</button>
            <button onClick={this.props.toggleMobxDevtools}>Toggle MobX Devtools</button>
            <button onClick={this.props.closeControlPanel}>Close</button>
        </Modal>;
    }
}

interface AppProps {
    model: InterviewerModel;
}

interface AppState {
    modal?: "control" | "state" | "none";
    isInterviewer?: boolean;
    showMobxDevtools?: boolean;
}

declare var TogetherJS: any;

class App extends React.Component<AppProps, AppState> {
    hasTogetherConnection = false;
    processingRemoteAction = false;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            modal: "none",
            isInterviewer: true,
            showMobxDevtools: false,
        };
    }

    componentDidMount() {
        TogetherJS.on("ready", function() {
        });
        TogetherJS.hub.on("togetherjs.hello", (msg: any) => {
            if (!msg.sameUrl) {
                return;
            }

            TogetherJS.reinitialize();
            TogetherJS.send({
                type: "interviewer.state",
                state: this.generateSavedState(),
            });
            if (!this.hasTogetherConnection) {
                this.hasTogetherConnection = true;
                spy(this.mirrorAction);
            }
        });
        TogetherJS.hub.on("interviewer.state", (msg: any) => {
            // Receiving this message is a signal that this browser is not
            // the interviewer.
            this.setState({
                isInterviewer: false,
            });
            this.restoreSavedState(msg.state);
            TogetherJS.reinitialize();
            spy(this.mirrorAction);
        });

        TogetherJS.hub.on("interviewer.action", (msg: any) => {
            this.processingRemoteAction = true;
            const model: any = this.props.model;
            model[msg.name].apply(model, msg.arguments);
            this.processingRemoteAction = false;
        });

        document.body.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.handleKeyDown);
    }
    
    _subdivide: Subdivide;

    mirrorAction = (change: any) => {
        // Don't send an action back and forth.
        if (this.processingRemoteAction) {
            return;
        }
        if (change.type === "action") {
            TogetherJS.send({
                type: "interviewer.action",
                name: change.name,
                arguments: change.arguments,
            });
        }
    }
    
    manageState = () => {
        this.setState({
            modal: "state",
        });
    }
    
    closeState = () => {
        this.setState({
            modal: "none",
        });
    }

    showControlPanel = () => {
        this.setState({
            modal: "control",
        });
    }

    closeControlPanel = () => {
        this.setState({
            modal: "none",
        });
    }

    toggleMobxDevtools = () => {
        this.setState({
            showMobxDevtools: !this.state.showMobxDevtools,
        });
    }
    
    restoreJSONState = (newState: string) => {
        const state = JSON.parse(newState);
        this.restoreSavedState(state);
    }

    restoreSavedState = (state: any) => {
        this._subdivide.store.dispatch({
            type: "SET_STATE",
            state: state.subdivide,
        });
        
        this.props.model.restore(state.model);
        this.setState({
            modal: "none",
        });
    }

    generateSavedState = () => {
        const subdivideState = this._subdivide.store.getState().toJS();
        const state = {
            model: this.props.model,
            subdivide: subdivideState,
        };
        return state;
    }

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.metaKey && e.keyCode === "B".charCodeAt(0)) {
            e.preventDefault();
            this.showControlPanel();
            return false;
        }
        return true;
    }

    render() {
        let stateModal: any;
        let controlModal: any;
        if (this.state.modal === "state") {
            const state = this.generateSavedState();
            stateModal = <StateModal            
                currentState={JSON.stringify(state, null, 2)}
                saveState={this.restoreJSONState}
                close={this.closeState}
            />;
        }
        if (this.state.modal === "control") {
            controlModal = <ControlPanel
                manageState={this.manageState}
                closeControlPanel={this.closeControlPanel}
                toggleMobxDevtools={this.toggleMobxDevtools}
            />;
        }
        return <div onKeyDown={this.handleKeyDown}>
            <Subdivide
                DefaultComponent={Container}
                componentProps={{
                    model: this.props.model,
                    showControlPanel: this.showControlPanel,
                    isInterviewer: this.state.isInterviewer,
                }}
                ref={(c) => this._subdivide = c}
            />
            {stateModal}
            {controlModal}
            {this.state.showMobxDevtools && <DevTools/>}
        </div>;
    }
}

function render() {
    ReactDOM.render(
        <App model={model} />,
        document.getElementById("container")
    );    
}

render();
