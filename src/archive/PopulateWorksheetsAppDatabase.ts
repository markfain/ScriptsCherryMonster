import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files, IConfig} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Configs} from "../utils/Configs";
export class PopulateWorksheetsAppDatabase extends Script {

    buildUnits(type: string): any[] {
        let units: any = {};
        let unitesMetadata: any = {};

        let unitsFolder: File = Files.file("$EPISODES$/WorksheetStudio/" + type+"/");
        let unitsMetadataFolder: File = Files.file("$EPISODES$/WorksheetStudio/" + type + "/metadata/");

        for (let unitFile of unitsFolder.listFiles()) {

            if (unitFile.getName().indexOf("metadata") >= 0 || unitFile.getName().startsWith(".")) {
                continue;
            }
            Logger.log("parsing: "+unitFile.getName());

            let unit: any = TextFiles.readJson(unitFile);
            units[unitFile.getName()] = unit;
        }

        for (let metadataFile of unitsMetadataFolder.listFiles()) {

            if (metadataFile.getName().indexOf("instructions") >= 0 || metadataFile.getName().indexOf("checksums") >= 0 || metadataFile.getName().startsWith(".")) {
                continue;
            }
            let metadata: any = TextFiles.readJson(metadataFile);
            unitesMetadata[metadataFile.getName()] = metadata;
        }
        return [units, unitesMetadata]
    }

    getInstructions(){
        let instructionsFile = Files.file("$EPISODES$/WorksheetStudio/templates/metadata", "instructions.json");
        let instructions = TextFiles.readJson(instructionsFile);
        return instructions;
    }

    getChecksums(){
        let checksumsFile = Files.file("$EPISODES$/WorksheetStudio/worksheets/metadata", "checksums.json");
        let checksums = TextFiles.readJson(checksumsFile);
        return checksums;
    }

    setup(){
        Files.setPlaceholders(Configs.get<IConfig>("/Users/markfainstein/Dev/ScriptsCherryMonster/config.json"));
    }

    execute() {
        this.setup();


        let database: any = {};
        let templates = this.buildUnits("templates");
        let worksheets = this.buildUnits("worksheets");

        database.templates = templates[0];
        database.templatesMetadata = templates[1];

        database.worksheets = worksheets[0];
        database.worksheetsMetadata = worksheets[1];

        database.instructions = this.getInstructions();
        database.worksheetChecksums = this.getChecksums();

        let databaseFile = Files.file("$EPISODES$/WorksheetStudio", "database.json");
        TextFiles.write(databaseFile, database);

    }
}

let PopulateWorksheetsAppDatabaseInstance = new PopulateWorksheetsAppDatabase("PopulateWorksheetsAppDatabase", "Populate the WorksheetApps database from the relevant files");
PopulateWorksheetsAppDatabaseInstance.execute();

//@name:PopulateWorksheetsAppDatabase
//@description:Populate the WorksheetApps database from the relevant files