import {Files, IConfig} from "../utils/Files";
import {File} from "../utils/File";
import {Configs} from "../utils/Configs";
import {Logger} from "./Logger";
import {ProcessUtils} from "../utils/ProcessUtils";
declare var require;
export abstract class Script {

    protected name: string;
    protected description: string;

    constructor(name:string, description:string){
        this.name = name;
        this.description = description;

        Files.setPlaceholders(Configs.get<IConfig>("/Users/markfainstein/Dev/ScriptsCherryMonster/config.json"));
    }

    getName() {
        return this.name;
    }

    execSyncRedirectOutput(command: string, workingDir?:File, shouldReturnOutput?:boolean): any {
        return ProcessUtils.execSyncRedirectOutput(command, workingDir, shouldReturnOutput);
    }

    execSync(command: string, workingDir?:File): any {
        return ProcessUtils.execSync(command, workingDir);
    }

    getCurrentDir(): string {
        let dir: string = this.execSync("pwd").toString();
        return dir.replace(/^\s+|\s+$/g, '');
    }

    abstract execute(...options: any[]): void;

}
