import {File} from "./File";
import {Logger} from "../core/Logger";
export class Finder {

    public static findFileInFolderStartingWith(root: File,
                                                find: string,
                                                appendTo: string[],
                                                namePredicate:(str:string)=>boolean,
                                                ignoreCase:boolean = false
    ) {
        if (!root.isDirectory()) {
            return;
        }
        else {
            if (appendTo == null) {
                appendTo = [];
            }

            for (let file of root.listFiles()) {
                if (file.isDirectory()) {
                    this.findFileInFolderStartingWith(file, find, appendTo, namePredicate, ignoreCase);
                }
                else {
                    let fileNameWithExtension = file.getName() + "." + file.getExtension();
                    if (ignoreCase) {
                        fileNameWithExtension = fileNameWithExtension.toLowerCase();
                    }
                    if (namePredicate(fileNameWithExtension)) {

                        appendTo.push(file.getAbsolutePath());
                    }
                }
            }
        }
    }
}