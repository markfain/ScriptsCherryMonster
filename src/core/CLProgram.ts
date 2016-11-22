import {Command} from "./Command";
declare var require:any;
declare var process:any;
export class CLProgram{

    private prog:any;

    constructor(){
        this.prog = require('commander');
        this.addDescription();

    }

    addDescription():void{
        this.prog.description("A command line tool for anything: the Scripts Cherry Monster can do anything for you!")
    }

    getEngine():any{
        return this.prog;
    }

    installCommand(command:Command){
        command.setProgram(this);
        command.addArguments();
        command.addOptions();
        command.addAction();
        command.addDescription();
        command.finalize();
    }

    parse(){
       this.prog.parse(process.argv);
    }
}