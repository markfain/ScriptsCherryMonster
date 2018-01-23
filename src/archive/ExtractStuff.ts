import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class ExtractStuff extends Script{
    execute(){


        let strains = [];
        let htmlFile: File = Files.file("$PLAY$", "strains.htm");
        let html = TextFiles.read(htmlFile);
        let nameRegex = /<div class="strain-info-name ellipsis">(.+)<\/div>/gi;
        let typeRegex = />(\w+)<\/a> - THC/gi;
        //TODO: thc regex
        let imageRegex = /<img data-original="(.+)" alt=/gi;
        let thcRegex = /<\/a> - THC (.+)<\/div>/gi;
        let nameMatch = nameRegex.exec(html);
        let typeMatch = typeRegex.exec(html);
        let imageMatch = imageRegex.exec(html);
        let thcMatch = thcRegex.exec(html);
        while (nameMatch != null) {
            let strain = {};
            strain["name"] = nameMatch[1];
            strain["type"] = typeMatch[1];
            strain["image"] = imageMatch[1];
            strain["thc"] = thcMatch[1];
            nameMatch = nameRegex.exec(html);
            typeMatch = typeRegex.exec(html);
            imageMatch = imageRegex.exec(html);
            thcMatch = thcRegex.exec(html);
            strains.push(strain);
            Logger.log(JSON.stringify(strain));
        }
        let targetFile = Files.file("$PLAY$", "strains.json");
        TextFiles.write(targetFile, strains);
    }
}

let ExtractStuffInstance = new ExtractStuff("ExtractStuff", "extracts stuff from a specific html");
ExtractStuffInstance.execute();

//@name:ExtractStuff
//@description:extracts stuff from a specific html