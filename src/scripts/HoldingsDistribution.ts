import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {Scripts} from "../core/Scripts";
export class HoldingsDistribution extends Script{

    handleAnswer(answer: any): void {
        let amount = answer.amount;
        let sAndP:number = 0.55;
        let europe: number = 0.33;
        let asia: number = 0.12;
        Logger.log("SandP: "+sAndP*amount);
        Logger.log("Europe: "+europe*amount);
        Logger.log("Asia: "+asia*amount);

    }

    execute(){
        let userPrompt = new Prompt();

        userPrompt
            .input("amount", "Amount To Distribute")
            .bind(this, this.handleAnswer);
    }
}

let HoldingsDistributionInstance = new HoldingsDistribution("HoldingsDistribution", "calculate the holding distribution");
HoldingsDistributionInstance.execute();

//@name:HoldingsDistribution
//@description:calculate the holding distribution