import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, Store} from "redux";
import Subdivide, {reducer as subdivide} from "subdivide";
import DevTools from "mobx-react-devtools";

import {InterviewerModel} from "./model";
import Container from "./components/container";

const INITIALIZE = Symbol("initialize");

function topLevelReducer(state: any = {}, action: any) {
    if (action.type === INITIALIZE) {
        state.interviewer = new InterviewerModel();
    } else {
        state.subdivide = subdivide(state.subdivide, action);
    }
    return state;
}

const store = createStore(topLevelReducer);

store.dispatch({
    type: INITIALIZE,
});

interface AppProps {
    store: Store;
}

class App extends React.Component<any, any> {
    render() {
        const store = this.props.store;
        const state = store.getState();
        return <div>
            <Subdivide
                DefaultComponent={Container}
                subdivide={state.subdivide}
                componentProps={{model: state.interviewer}}
                dispatch={this.props.dispatch}
            />
            <DevTools/>
        </div>;
    }
}

function render() {
    ReactDOM.render(
        <App store={store} />,
        document.getElementById("container")
    );    
}

store.subscribe(render);
render();
