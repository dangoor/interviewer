import * as React from "react";
import * as ReactDOM from "react-dom";
import Subdivide from "subdivide";
import {Modal} from "react-bootstrap";
import DevTools from "mobx-react-devtools";
import {observer} from "mobx-react";

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

interface AppProps {
    model: InterviewerModel;
}

interface AppState {
    showStateModal?: boolean;
    isInterviewer?: boolean;
}

declare var TogetherJS: any;

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            showStateModal: false,
            isInterviewer: true,
        };
    }

    componentDidMount() {
        TogetherJS.hub.on("togetherjs.hello", (msg: any) => {
            if (!msg.sameUrl) {
                return;
            }
            TogetherJS.reinitialize();
            TogetherJS.send({
                type: "interviewer.state",
                state: this.generateSavedState(),
            });
        });
        TogetherJS.hub.on("interviewer.state", (msg: any) => {
            // Receiving this message is a signal that this browser is not
            // the interviewer.
            this.setState({
                isInterviewer: false,
            });
            this.restoreSavedState(msg.state);
            TogetherJS.reinitialize();
        });
    }
    
    _subdivide: Subdivide;
    
    manageState = () => {
        this.setState({
            showStateModal: true,
        });
    }
    
    closeState = () => {
        this.setState({
            showStateModal: false,
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
            showStateModal: false,
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

    render() {
        let stateModal: any;
        if (this.state.showStateModal) {
            const state = this.generateSavedState();
            stateModal = <StateModal            
                currentState={JSON.stringify(state, null, 2)}
                saveState={this.restoreJSONState}
                close={this.closeState}
            />;
        }
        return <div>
            <Subdivide
                DefaultComponent={Container}
                componentProps={{
                    model: this.props.model,
                    manageState: this.manageState,
                    isInterviewer: this.state.isInterviewer,
                }}
                ref={(c) => this._subdivide = c}
            />
            {stateModal}
            <DevTools/>
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
