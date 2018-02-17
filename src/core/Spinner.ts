import {Logger} from "./Logger";
export class Spinner {
    private static spinner:any;
    private static isSpinning = true;

    public static start(text){
        if (!this.spinner){
            this.spinner = require('ora')(text);
        }
        this.spinner.start(text);
        this.isSpinning = true;
    }

    public static stop(text?:string){
        if (!this.spinner){
            this.recreate();
        }
        if (text){
            this.spinner.succeed(text);
        }
        this.spinner.stop();
        this.isSpinning = false;
    }

    public static info(text:string){
        if (!this.spinner){
            this.recreate();
        }
        this.spinner.info(text);
    }

    public static clear(){
        if (!this.spinner){
            this.recreate();
        }
        this.spinner.clear();
        this.isSpinning = false;
    }

    public static recreate(){
        this.spinner = require('ora')(name);
    }

    public static success(text){
        if (!this.spinner){
            this.recreate();
        }
        this.spinner.success(text);
    }

    public static fail(text){
        if (!this.spinner){
            this.recreate();
        }
        this.spinner.fail(text);
    }
}