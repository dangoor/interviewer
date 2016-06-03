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
    
    editor: any;
}

export class InterviewerModel {
    constructor() {
        this.files = [];
        this.panes = {};
    }

    @mobx.observable files: Array<File>;
    
    @mobx.observable panes: {[key: string]: Pane};
    
    @mobx.action getPane(id: string) {
        let pane = this.panes[id];
        if (!pane) {
            pane = this.panes[id] = new Pane(id);
            pane.type = "selector";
        }
        return pane;        
    }
    
    @mobx.action setPaneType(id: string, type: PaneTypes) {
        this.panes[id].type = type;
    }
    
    @mobx.action registerEditor(id: string, editor: any) {
        const pane = this.getPane(id);
        pane.editor = editor;
    }
    
    @mobx.action addFile(name: string, pane: string) {
        const file = new File(name);
        file.pane = pane;
        this.files.push(file);
        this.panes[pane].type = "file";
    }
    
    @mobx.action save() {
        Object.keys(this.panes).forEach((id) => {
            const pane = this.panes[id];
            if (!pane.editor) {
                return;
            }
            
            let file = this.getFileForPane(pane.id);
            file.content = pane.editor.getValue();
        });
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
