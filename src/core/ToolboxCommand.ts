import {Command} from "./Command";
declare var require:any;
declare var process:any;
export abstract class ToolboxCommand extends Command{
    /*
    This class will only need to define the data,
     and send it using the http client.
     */

    /*HTTPClient.post("localhost:8333/executeCommand"
     , {command: "UpdateDependenciesCommand", episodeFolderPath:"/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/BeesAndFlowers", useExplodedApiVersion:"true", configFileName:"WebPacking.json", outputFilename:"gen/\$Dependencies.js"}
     , (err, res)=>{console.log(err); console.log(res.text)});*/
}