declare var require:any;
declare var process:any;
export class Logger {

    public static log(message:string){
        let chalk = require('chalk');
        console.log(chalk.cyan(message));
    }

    public static warn(message:string){
        let chalk = require('chalk');
        console.log(chalk.bold.magenta(message));
    }

    public static highlight(message:string){
        let chalk = require('chalk');
        console.log(chalk.white.bgYellow(message));
    }

    public static error(message:string){
        let chalk = require('chalk');
        console.log(chalk.bold.red(message));
    }
}