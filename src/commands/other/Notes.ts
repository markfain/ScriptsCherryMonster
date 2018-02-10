import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
declare var require: any;
declare var process: any;

export class Notes extends Command {

    private notesFile = Files.file("$SCM_NOTES$", "notes.txt");

    constructor() {
        super("notes", "opens a notes file. without arguments will open notes.txt in the playground", 1);
        //TODO: add option to clear notes, open new notes and so on, open a specific note and so on.
    }

    execute(options: any): void {
        if (!this.notesFile.exists()) {
            this.execSync("touch "+this.notesFile.getAbsolutePath());
        }
        this.execSync("idea " + this.notesFile.getAbsolutePath());
    }

}