import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, combineReducers} from "redux";

import Subdivide from "subdivide";

import {Hello} from "./components/hello";

let hello = <Hello compiler="TypeScript" framework="React" />; 

ReactDOM.render(
    <Subdivide DefaultComponent={Hello}/>,
    document.getElementById("container")
);
