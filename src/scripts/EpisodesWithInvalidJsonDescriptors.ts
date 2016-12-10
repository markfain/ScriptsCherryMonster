import {Logger} from "../core/Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Prompt} from "../core/Prompt";
import {Command} from "../core/Command";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {Script} from "../core/Script";
declare var require: any;
declare var process: any;

export class EpisodesWithInvalidJsonDescriptors extends Script {

    constructor() {
        super("EpisodesWithInvalidJsonDescriptors", "finds all episodes with an invalid json descriptor");
    }

    execute(options: any): void {

        let episodes:File = Files.file("$SLATE_ROOT$/Content/MathEpisodes/episodes/");
        //let episode:File = Files.file("$SLATE_ROOT$/Content/MathEpisodes/episodes/", "AreaOfRectangles");
        let count = 0;
        for (let episode of episodes.listFiles()) {
            if (episode.isDirectory()) {
                let descriptor: File = Files.file(episode, episode.getName() + "Descriptor.js");
                let descriptorAsString:string = TextFiles.read(descriptor);
                try {
                    let descriptor: any = JavascriptUtils.extractJsonFromClassDeclaration(descriptorAsString);
                }
                catch (e){
                    count++;
                    Logger.error("Episode "+episode.getName()+" Has an invalid descriptor: "+e);
                }
            }
        }
        Logger.highlight("Count of probelmatic episodes: "+count);




        /*
            here is the actual action
            prompt the user for something:
            userPrompt
                .input("name", "Command Name:")
                .input("description", "Command Description:")
                .input("tasks", "Number of tasks:")
                .bind(this, this.handleAnswer);

        */
    }

}