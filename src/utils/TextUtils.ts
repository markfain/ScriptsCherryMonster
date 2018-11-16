import {Logger} from "../core/Logger";
export class TextUtils{

    public static getRegexGroups(text:string, regex:RegExp){
        let matcher;
        let matches = [];
        while ((matcher = regex.exec(text)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (matcher.index === regex.lastIndex) {
                regex.lastIndex++;
            }

             // The result can be accessed through the `m`-variable.
            matcher.forEach((match, groupIndex) => {
                if (groupIndex>=1){
                    matches.push(match);
                }

            });
        }
        return matches;
    }


}