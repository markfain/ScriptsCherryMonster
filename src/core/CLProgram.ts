import {Command} from "./Command";
declare var require:any;
declare var process:any;
export class CLProgram{

    private prog:any;

    constructor(){
        this.prog = require('commander');
    }

    getEngine():any{
        return this.prog;
    }

    installCommand(command:Command){
        command.setProgram(this);
        command.doAddOptions();
        command.doAddAction();
        command.doAddDescription();
    }

    parse(){
       this.prog.parse(process.argv);
    }
}