declare var require;
export abstract class Script {

    protected name: string;
    protected description: string;

    constructor(name:string, description:string){
        this.name = name;
        this.description = description;

    }

    getName() {
        return this.name;
    }

    execSyncRedirectOutput(command: string): any {
        let execSync = require("child_process").execSync;
        return execSync(command, {stdio: [0, 1, 2]});
    }

    execSync(command: string): any {
        let execSync = require("child_process").execSync;
        return execSync(command, function () {

        });
    }

    getCurrentDir(): string {
        let dir: string = this.execSync("pwd").toString();
        return dir.replace(/^\s+|\s+$/g, '');
    }

    abstract execute(...options: any[]): void;

}
