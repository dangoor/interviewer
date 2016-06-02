import * as mobx from "mobx";

class File {
    name: string;
    content: string = "";
    pane: string;
    editor: any;
    
    constructor(name: string) {
        this.name = name;
    }
}

type PaneTypes = "file" | "new" | "selector";

class Pane {
    constructor(id: string) {
        this.id = id;
    }
    
    id: string;
    @mobx.observable type: PaneTypes;
}

export class InterviewerModel {
    constructor() {
        this.files = [];
        this.panes = {};
    }

    @mobx.observable files: Array<File>;
    
    @mobx.observable panes: {[key: string]: Pane};
    
    @mobx.action getPaneType(id: string) {
        let pane = this.panes[id];
        if (!pane) {
            pane = new Pane(id);
            pane.type = "selector";
        }
        return pane.type;
    }

    @mobx.action setPaneType(id: string, type: PaneTypes) {
        this.panes[id].type = type;
    }
    
    @mobx.action addFile(name: string, pane: string) {
        const file = new File(name);
        file.pane = pane;
        this.files.push(file);
        this.panes[pane].type = "file";
    }
    
    setFileOpened(name: string, editor: any, pane: string) {
        const file = this.files.find((file) => file.name === name);
        if (!file) {
            console.error("Attempt to open file that has not been added!", name);
            return;
        }
        file.editor = editor;
        file.pane = pane;
    }
    
    getFileForPane(pane: string): File {
        for (let file of this.files) {
            if (file.pane === pane) {
                return file;
            }
        }
        return null;
    }
}
