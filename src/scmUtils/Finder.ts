import {File} from "../utils/File";
export class Finder {

    public static findFileInFolderStartingWith(root: File,
                                                find: string,
                                                list: string[],
                                                namePredicate:(str:string)=>boolean,
                                                ignoreCase:boolean = false
    ) {
        if (!root.isDirectory()) {
            return;
        }
        else {
            if (list == null) {
                list = [];
            }

            for (let file of root.listFiles()) {
                if (file.isDirectory()) {
                    this.findFileInFolderStartingWith(file, find, list, namePredicate, ignoreCase);
                }
                else {
                    let fileNameWithExtension = file.getName() + "." + file.getExtension();
                    if (ignoreCase) {
                        fileNameWithExtension = fileNameWithExtension.toLowerCase();
                    }
                    if (namePredicate(fileNameWithExtension)) {
                        list.push(file.getAbsolutePath());
                    }
                }
            }
        }
    }
}