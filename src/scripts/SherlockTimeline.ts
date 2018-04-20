import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {TextUtils} from "../utils/TextUtils";
export class SherlockTimeline extends Script{
    execute(){
        const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const d = new Date();
        let currentMonth = MONTH_NAMES[d.getMonth()];
        let currentDay = d.getDay();

        let sherlockTimelineText = TextFiles.read(Files.file("$SCM$", "sherlock.txt"));
        let regex = /(\w+)\s+(\d+),\s+\w+.+>"(.+)"</g;
        let storyDates = TextUtils.getRegexGroups(sherlockTimelineText, regex);
        let monthCandidates = [];
        for (let i=0; i<storyDates.length; i++){
            if (i%2 ==0){
                let month = storyDates[i];
                if (month == currentMonth){
                    monthCandidates.push(i);
                }
            }
        }
        let min = 32;
        let closestStoryName = "";
        let closestStoryDay = "";
        let closestStoryMonth = "";
        let closestStoryYear = ""; //TODO
        for (let candidate of monthCandidates){
            let day = storyDates[candidate+1];
            if (Math.abs(currentDay-day)<min){
                min = Math.abs(currentDay-day);
                closestStoryName = storyDates[candidate+2];
                closestStoryDay = storyDates[candidate+1];
                closestStoryMonth = storyDates[candidate];

            }
        }
        Logger.log("The Game is Afoot! - The closest Sherlock Holmes story: ");
        Logger.warn(closestStoryName+" which happened at "+closestStoryDay+" of "+closestStoryMonth);

    }
}

let SherlockTimelineInstance = new SherlockTimeline("SherlockTimeline", "builds the sherlock timeline from an html timeline");
SherlockTimelineInstance.execute();

//@name:SherlockTimeline
//@description:builds the sherlock timeline from an html timeline