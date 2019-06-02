import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class DeleteMachineVoiceoverNativeCache extends Script{
    execute(){
        Logger.highlight("Deleting machine voiceover cache (native)");
        let cacheFolder:File = Files.file("/Users/markfainstein/Library/Caches/SlateApplication/machineVoiceover");
        for (let cachedFile of cacheFolder.listFiles()){
            Files.delete(cachedFile);
        }
    }
}

let DeleteMachineVoiceoverNativeCacheInstance = new DeleteMachineVoiceoverNativeCache("DeleteMachineVoiceoverNativeCache", "deletes the machine voiceover native cache on device (osX)");
DeleteMachineVoiceoverNativeCacheInstance.execute();

//@name:DeleteMachineVoiceoverNativeCache
//@description:deletes the machine voiceover native cache on device (osX)