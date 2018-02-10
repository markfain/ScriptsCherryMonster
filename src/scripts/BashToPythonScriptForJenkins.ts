import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextUtils} from "../utils/TextUtils";
export class BashToPythonScriptForJenkins extends Script{

    extractParam(param){
        return param.substring(2, param.length-1);
    }


    execute(){
        let command = './toolbox.sh ' +
            '-headless ' +
            '-command ' +
            'EpisodesDeploymentScripts/PackUploadEpisodesNativeCommand ' +
            'episodeList ${EPISODES} ' +
            'relativeContentPath ${CONTENT_PATH} ' +
            'shouldGitResetToCommit true';

        let regex = /toolbox.sh\s+-headless\s-command\s(.+?)\s+(.+)/g;
        let commandParts = TextUtils.getRegexGroups(command, regex);
        Logger.log("command: "+ commandParts[0]+" params: "+commandParts[1]);

        let commandName = commandParts[0];
        let params = commandParts[1];
        let paramParts = params.split(" ");
        let paramMap = {};


        for (let i=0; i<=paramParts.length; i=i+2){
            paramMap[paramParts[i]] = paramParts[i+1];
        }

        let pythonCommand = '#!/usr/bin/env python\n' +
            'import os\n'+
            'import sys\n';

        for (let param in paramMap){
            let paramLine = "param ="+" os.getenv("+this.extractParam(paramMap[param])+")";
        }

        Logger.log(JSON.stringify(paramMap));

        /*

         #!/usr/bin/env python

         import os
         import sys

         relativeContentPath = os.getenv('CONTENT_PATH', '')
         bucketName = os.getenv('BUCKET', 'staging')
         episodes = os.getenv('EPISODES', '')
         disableMultipleHosts = os.getenv('DISABLE_MULTIPLE_HOSTS', False)
         languageCodes = os.getenv('LANGUAGECODES', '')


         if "," not in episodes:
         episodes = episodes+","

         if "," not in languageCodes:
         languageCodes = languageCodes+","


         os.chdir("/Users/jenkins/DevContent/toolbox")

         if languageCodes!=',' and languageCodes!='':
         os.system("./toolbox.sh -headless -command EpisodesDeploymentScripts/PackUploadEpisodesWebCommand episodeList " + episodes + " shouldGitResetToCommit " + "true" + " disableMultipleHosts "+str(disableMultipleHosts)+" bucketName "+bucketName+" languageCodesToPull "+languageCodes+ " shouldPullTranslations "+ "true")
         else:
         os.system("./toolbox.sh -headless -command EpisodesDeploymentScripts/PackUploadEpisodesWebCommand episodeList " + episodes + " shouldGitResetToCommit " + "true" + " disableMultipleHosts "+str(disableMultipleHosts)+" bucketName "+bucketName+" shouldPullTranslations "+ "false")


         */
    }
}

let BashToPythonScriptForJenkinsInstance = new BashToPythonScriptForJenkins("BashToPythonScriptForJenkins", "convert bash scripts to python scripts for jenkins");
BashToPythonScriptForJenkinsInstance.execute();

//@name:BashToPythonScriptForJenkins
//@description:convert bash scripts to python scripts for jenkins