declare var require: any;
declare var process: any;
export class Logger {

    private static getRandomColor() {
        let rand = Math.floor(Math.random() * 9);

        switch (rand) {
            case 0:
                return "white";
            case 1:
                return "red";
            case 3:
                return "green";
            case 4:
                return "yellow";
            case 5:
                return "blue";
            case 6:
                return "magenta";
            case 7:
                return "cyan";
            case 8:
                return "white";
            case 9:
                return "gray";
            default:
                return "white";
        }
    }

    public static log(message: string) {
        let chalk = require('chalk');
        console.log(chalk.cyan(message));
    }

    public static warn(message: string) {
        let chalk = require('chalk');
        console.log(chalk.bold.magenta(message));
    }

    public static highlight(message: string) {
        let chalk = require('chalk');
        console.log(chalk.white.bgYellow(message));
    }

    public static error(message: string) {
        let chalk = require('chalk');
        console.log(chalk.bold.red(message));
    }

    /**
     * TODO: To completely shock the user - should also randomzie background color.
     *
     * @param message
     */
    public static shockTheUser(message: string) {
        for (let i = 0; i < message.length; i++) {

            let char = message.charAt(i);
            let chalk = require('chalk');
            process.stdout.write(chalk[this.getRandomColor()](char));

        }
        process.stdout.write("\n");
    }
}