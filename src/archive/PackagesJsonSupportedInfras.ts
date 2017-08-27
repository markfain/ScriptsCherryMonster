import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
export class PackagesJsonSupportedInfras extends Script{
    execute(){
        Files.setPlaceholder("$PLAY$", "/Playground");
        let packagesFile:File = Files.file("$PLAY$", "Ert/packages.json");
        let packagesJson = TextFiles.readJson(packagesFile);
        let packages = packagesJson.packages;

        let supportedApis:string[] = [];

        for (let episodePackage of packages){
            let apiVersion:string = episodePackage.infraVersion;
            if (supportedApis.indexOf(apiVersion)<0){
                Logger.log("Pushing "+apiVersion);
                supportedApis.push(apiVersion);
            }
        }
        packagesJson.supportedInfras = supportedApis;
        TextFiles.write(packagesFile, packagesJson, true);
        Logger.log(JSON.stringify(supportedApis));
    }
}

let PackagesJsonSupportedInfrasInstance = new PackagesJsonSupportedInfras("PackagesJsonSupportedInfras", "update packages json supported infras");
PackagesJsonSupportedInfrasInstance.execute();

//@name:PackagesJsonSupportedInfras
//@description:update packages json supported infras