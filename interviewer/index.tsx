import {Babel} from "./babel";
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/app";
import {InterviewerModel} from "./model";
import Container from "./components/container";

const model = new InterviewerModel();

interface MyWindow {
    model: InterviewerModel;
    Babel: Babel;
}

declare var window: MyWindow;
window.model = model;

function render() {
    ReactDOM.render(
        <App
            container={Container}
            model={model}
            extraContainerProps={{
                babel: window.Babel,
            }}
        />,
        document.getElementById("container")
    );    
}

render();
