import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
export class WatsonVoices extends Script{
    execute(){
        //curl -X GET -u "{username}":"{password}" "https://stream.watsonplatform.net/text-to-speech/api/v1/voices"
        let command = "curl " +
            "-X GET " +
            "--user 744232dd-e215-464f-ac54-e2524df2ad83:lB4fTLYMEJ5E " +
            "--output voices.json " +
            "\"https://stream.watsonplatform.net/text-to-speech/api/v1/voices\"";
        this.execSync(command);

    }
}

let WatsonVoicesInstance = new WatsonVoices("WatsonVoices", "asd");
WatsonVoicesInstance.execute();

//@name:WatsonVoices
//@description:asd