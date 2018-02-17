declare var require: any;
declare var process: any;
import * as Chalk from 'chalk';
export class Logger {

    private static WITH_BG_PERCENT = 30;

    private static randomizeInRange(min: number, max: number) {
        return Math.floor(Math.random() * max) + min;
    }

    private static getRandomBackground(): string {
        let rand = this.randomizeInRange(0, 9);

        switch (rand) {
            case 0:
                return "bgBlack";
            case 1:
                return "bgBlue";
            case 3:
                return "bgCyan";
            case 4:
                return "bgGreen";
            case 5:
                return "bgMagenta";
            case 6:
                return "bgRed";
            case 7:
                return "bgWhite";
            case 8:
                return "bgYellow";
            default:
                return "bgBlack";
        }
    }

    private static getRandomColor(): string {
        let rand = this.randomizeInRange(0, 8);

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
        //noinspection TypeScriptUnresolvedFunction
        console.log(Chalk.cyan(message));
    }

    public static warn(message: string) {
        //noinspection TypeScriptUnresolvedFunction
        console.log(Chalk.bold.magenta(message));
    }

    public static highlight(message: string) {
        //noinspection TypeScriptUnresolvedVariable
        console.log(Chalk.white.bgYellow(message));
    }

    public static error(message: string) {
        //noinspection TypeScriptUnresolvedFunction
        console.log(Chalk.bold.red(message));
    }

    /**
     * TODO: To completely shock the user - should also randomzie background color.
     *
     * @param message
     */
    public static shockTheUser(message: string, percentage?: number) {
        for (let i = 0; i < message.length; i++) {
            let char = message.charAt(i);
            let shouldAlsoHaveBg = this.randomizeInRange(0, 100);
            if (shouldAlsoHaveBg < percentage || this.WITH_BG_PERCENT) {
                process.stdout.write(Chalk[this.getRandomBackground()][this.getRandomColor()](char));
            }
            else {
                process.stdout.write(Chalk[this.getRandomColor()](char));
            }
        }
        process.stdout.write("\n");
    }
}