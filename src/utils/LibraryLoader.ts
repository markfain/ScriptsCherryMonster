import {Files} from "./Files";
import {TextFiles} from "./TextFiles";
import {File} from "./File";
declare var require:any;
export class LibraryLoader {

    /**
     *
     * @param context
     * @param filePathsRelativeToSlateRoot
     * @returns {any}
     */
    public static loadScriptsInContext(context:any, filePathsRelativeToSlateRoot:string[]):any {
        let vm = require('vm');
        context = context || {};
        for (var i = 0; i < filePathsRelativeToSlateRoot.length; i++) {
            let fileToLoad:File = Files.file("$SLATE_ROOT$", filePathsRelativeToSlateRoot[i]);
            let data = TextFiles.read(fileToLoad);
            vm.runInNewContext(data, context);
        }
        return context;
    }
}



