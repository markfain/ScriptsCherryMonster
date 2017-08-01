import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
export class WatsonToken extends Script{
    execute(){
        let command = "curl " +
            "-X GET " +
            "--user 744232dd-e215-464f-ac54-e2524df2ad83:lB4fTLYMEJ5E " +
            "--output token " +
            "\"https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api\"";
       this.execSync(command);
        Logger.log("generated token under"+ this.getCurrentDir()+ "/token");
    }
}

let WatsonTokenInstance = new WatsonToken("WatsonToken", "Generate a token for the IBM TTS service Watson");
WatsonTokenInstance.execute();

//@name:WatsonToken
//@description:Generate a token for the IBM TTS service Watson