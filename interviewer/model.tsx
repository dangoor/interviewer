import * as mobx from "mobx";

const SCRIPT_EXTENSIONS = ["js", "jsx", "ts", "tsx"];

export class File {
    name: string;
    @mobx.observable content: string = "";
    pane: string;
    editor: any;
    
    @mobx.computed get moduleName() {
        const dot = this.name.indexOf(".");
        return this.name.substring(0, dot);
    }

    @mobx.computed get extension() {
        const dot = this.name.indexOf(".");
        return this.name.substring(dot + 1);
    }
    
    isScript() {
        return SCRIPT_EXTENSIONS.indexOf(this.extension) > -1;
    }

    isTest() {
        return this.isScript() && this.name.includes("test");
    }

    constructor(name: string) {
        this.name = name;
    }

    toJSON() {
        return {
            name: this.name,
            content: this.content,
            pane: this.pane,
        };
    }
}

type PaneTypes = "file" | "new" | "selector" | "preview" | "test";

class Pane {
    constructor(id: string) {
        this.id = id;
    }
    
    id: string;
    @mobx.observable type: PaneTypes;
    
    editor: any;

    toJSON() {
        return {
            id: this.id,
            type: this.type,
        };
    }
}

const DEFAULT_PREVIEW_HTML = `<!DOCTYPE html>
<html>
<head>
    <CSS-PLACEHOLDER/>
    <SCRIPT-PLACEHOLDER/>
</head>
<body>
</body>
</html>
`

export class InterviewerModel {
    constructor() {
        const htmlFile = new File("preview.html");
        htmlFile.content = DEFAULT_PREVIEW_HTML;
        this.files = [htmlFile];
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
        const pane = this.panes[id];
        if (pane.type === "file") {
            const currentFile = this.getFileForPane(id);
            currentFile.pane = null;
        }
        pane.type = type;
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
    
    @mobx.action setFileForPane(paneID: string, filename: string) {
        const currentFile = this.getFileForPane(paneID);
        if (currentFile) {
            currentFile.pane = null;
        }
        const file = this.files.find((f) => f.name === filename);
        if (!file) {
            throw new Error("Tried to open nonexistent file: " + filename);
        }

        // Close the file in the old pane if it was open in a different pane
        if (file.pane) {
            this.panes[file.pane].type = "selector"; 
        }

        file.pane = paneID;
        const pane = this.getPane(paneID);
        pane.type = "file";
    }
    
    @mobx.action restore(newState: any) {
        this.files = newState.files.map((plainFile: any) => {
            const file = new File(plainFile.name);
            file.pane = plainFile.pane;
            file.content = plainFile.content;
            return file;
        });
        
        this.panes = {};
        Object.keys(newState.panes).forEach((id: string) => {
            const plainPane = newState.panes[id];
            const pane = this.getPane(id);
            pane.type = plainPane.type;
            return pane;
        });
    }
}
