import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class ExtendInfra extends Script{

    /*
        Process:
        1. compile infra

     */

    execute(){


    }
}

let ExtendInfraInstance = new ExtendInfra("ExtendInfra", "compile the infra extension (typescript)");
ExtendInfraInstance.execute();

//@name:ExtendInfra
//@description:compile the infra extension (typescript)