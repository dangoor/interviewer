import * as React from "react";
import * as ReactDOM from "react-dom";
import {reaction} from "mobx";

import App from "./components/app";
import {InterviewerModel} from "./model";
import PyContainer from "./components/pycontainer";

const model = new InterviewerModel(false);

interface MyWindow {
    model: InterviewerModel;
}

declare var window: MyWindow;
window.model = model;

// reaction("runpython", () => model.files, (files) => {

// });

function render() {
    ReactDOM.render(
        <App
            container={PyContainer}
            model={model}
            extraContainerProps={{
            }}
            savedStateKey={"pysaved"}
        />,
        document.getElementById("container")
    );    
}

render();
