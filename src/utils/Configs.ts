import {File} from "./File"
import {Files} from "./Files";
declare var require:any;
export class Configs{

    public static get<T>(config:File | string):T{
        let fs:any = require('fs');
        let jsonText:any;
        if ((<File>config).getAbsolutePath){//This is a file
            let configFile:File = <File>config;
            if (!configFile.exists()){
                console.log("Cannot find config file with path "+configFile.getAbsolutePath());
                return;
            }
            jsonText = fs.readFileSync(configFile.getAbsolutePath(), 'utf8');
        }
        else {//This is a path string
            let configFile:File = Files.file(config);
            if (configFile.exists()){
                jsonText = fs.readFileSync(configFile.getAbsolutePath(), 'utf8')

            }
            else {
                jsonText = fs.readFileSync(config, 'utf8');
            }
        }

        let json = JSON.parse(jsonText);
        return <T>(json);
    }
}