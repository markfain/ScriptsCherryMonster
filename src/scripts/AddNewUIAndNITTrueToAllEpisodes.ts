import {Logger} from "../core/Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Prompt} from "../core/Prompt";
import {Command} from "../core/Command";
import {JavascriptUtils} from "../utils/JavascriptUtils";
declare var require: any;
declare var process: any;

export class AddNewUIAndNITTrueToAllEpisodes extends Command {

    constructor() {
        super("AddNewUIAndNITTrueToAllEpisodes", "Adds newUI&#x3D;true and NIT&#x3D;true to all episodes", 5);
    }

    action(options: any): void {
        Logger.shockTheUser("my new AddNewUIAndNITTrueToAllEpisodes");

        let episodes:File = Files.file("$SLATE_ROOT$/Content/MathEpisodes/episodes/");
        let count = 0;
        for (let episode of episodes.listFiles()) {
            if (episode.isDirectory()) {
                let descriptor: File = Files.file(episode, episode.getName() + "Descriptor.js");
                if (!descriptor.exists()) {
                    Logger.error("No descriptor for episode" + episode.getName());
                    return;
                }

                let descriptorAsString: string = TextFiles.read(descriptor);
                let lines:string[] = descriptorAsString.split('\n');
                let configLine = "";
                for (let line of lines){
                    if (line.indexOf('config":{')!==-1 || line.indexOf('config": {')!==-1 || line.indexOf('config" : {')!==-1){
                        configLine = line;
                        console.log("here "+line);
                        break;
                    }
                }
                if (configLine == ""){
                    Logger.log("episode with no config: " + episode.getName());
                    continue;
                }

                let newDescriptorAsString = descriptorAsString.replace(configLine+"\n", configLine+'\n\t\t"newUI": true,\n\t\t"NIT": true,\n');
                //newDescriptorAsString = descriptorAsString.replace('"config": {\n', '"config":{\n\t\t"newUI": true,\n\t\t"NIT": true,\n');

                if (descriptorAsString == newDescriptorAsString) {
                    //there is no config
                    Logger.log("episode with no config: " + episode.getName());
                    newDescriptorAsString = newDescriptorAsString.replace('};',
                        ',\n\t"config":{\n\t\t"newUI": true,\n\t\t"NIT": true\n\t}\n};');

                    newDescriptorAsString = newDescriptorAsString.replace('\t}\n,', '\t},');
                }
                count++;
                TextFiles.write(descriptor, newDescriptorAsString, true);
            }
        }
        Logger.highlight("count is: "+count);
    }

}