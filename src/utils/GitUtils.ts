import {ProcessUtils} from "./ProcessUtils";
import {Files} from "./Files";
import {File} from "./File";
import {Logger} from "../core/Logger";
export class GitUtils {

    /**
     * returns also parents, not only path that have diffs
     *
     * @returns {Array}
     */
    public static getOptionalFilesToAdd(withParents:boolean){
        let pathsToReturn = [];
        let outputDiff = ProcessUtils.execSyncRedirectOutput("git diff --name-only", null, true);
        let outputNew = ProcessUtils.execSyncRedirectOutput("git ls-files --others --exclude-standard", null, true);
        let pathsDiff:string[] = outputDiff.toString().split("\n");
        let pathsNew:string[] = outputNew.toString().split("\n");
        let paths = pathsDiff.concat(pathsNew);
        for (let path of paths){
            pathsToReturn.push(path);
            if (withParents){
                let file:File = Files.file(path);
                let parentPath = file.getParentFile().getAbsolutePath();
                if (pathsToReturn.indexOf(parentPath)<0){
                    pathsToReturn.push(parentPath);
                }
            }

        }
        return pathsToReturn;
    }

}
