import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class AggregateStrains extends Script{
    execute(){
        let effects = [];
        let wikileafJson = TextFiles.readJson(Files.file("$PLAY$", "wikileaf.json"));
        for (let strainName in wikileafJson){
            let strain = wikileafJson[strainName];
            Logger.log(strain["effects"]);
            for (let effect in strain["effects"]){
                if (!effects.indexOf(effect)){
                    effects.push(effect);
                }
            }
        }
        for (let effect of effects){
            Logger.log(effect);
        }
    }
}

let AggregateStrainsInstance = new AggregateStrains("AggregateStrains", "aggregate strains from wiki leaf");
AggregateStrainsInstance.execute();

//@name:AggregateStrains
//@description:aggregate strains from wiki leaf