import * as React from "react";
import {Babel} from "../babel";
import Subdivide from "subdivide";
import {Modal} from "react-bootstrap";
import {spy} from "mobx";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";

import {InterviewerModel} from "../model";
import ControlPanel from "./controlpanel";
import StateModal from "./statemodal";

interface AppProps {
    model: InterviewerModel;
    container: {new(...args: any[]): React.Component<any, any>};
    extraContainerProps: any;
    savedStateKey: string;
}

interface AppState {
    modal?: "control" | "state" | "none";
    isInterviewer?: boolean;
    showMobxDevtools?: boolean;
}

declare var TogetherJS: any;

export default class App extends React.Component<AppProps, AppState> {
    hasTogetherConnection = false;
    processingRemoteAction = false;
    defaultState:any = null;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            modal: "none",
            isInterviewer: true,
            showMobxDevtools: false,
        };
    }

    componentDidMount() {
        const savedState = localStorage.getItem(this.props.savedStateKey);
        if (savedState) {
            this.defaultState = JSON.stringify(this.generateSavedState());
            this.restoreJSONState(savedState);
        }
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

    startTogetherJS = () => {
        TogetherJS(this);
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
        if (this.state.isInterviewer && e.metaKey && e.keyCode === "B".charCodeAt(0)) {
            e.preventDefault();
            this.showControlPanel();
            return false;
        }
        return true;
    }

    save = () => {
        this.props.model.save();
        if (this.state.isInterviewer) {
            localStorage.setItem(this.props.savedStateKey, JSON.stringify(this.generateSavedState()));
        }
    }

    reset = () => {
        if (this.defaultState) {
            this.restoreJSONState(this.defaultState);
        }
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
                startTogetherJS={this.startTogetherJS}
                toggleMobxDevtools={this.toggleMobxDevtools}
                reset={this.reset}
            />;
        }
        const componentProps = {
            model: this.props.model,
            showControlPanel: this.showControlPanel,
            isInterviewer: this.state.isInterviewer,
            save: this.save,
        };
        Object.assign(componentProps, this.props.extraContainerProps);
        return <div onKeyDown={this.handleKeyDown}>
            <Subdivide
                DefaultComponent={this.props.container}
                componentProps={componentProps}
                ref={(c) => this._subdivide = c}
            />
            {stateModal}
            {controlModal}
            {this.state.showMobxDevtools && <DevTools/>}
        </div>;
    }
}

