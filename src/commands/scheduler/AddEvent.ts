import {Command} from "../../core/Command";
import {CalendarClient} from "./CalendarClient";
declare var require: any;
declare var process: any;

export class AddEvent extends Command {

    private DEFAULT_LOCATION = "Somewhere...";
    private DEFAULT_DESCRIPTION = "None";

    constructor() {
        super("addevent", "Adds an event", 1);
        this.commandArguments = [
            "title"
        ];

        this.options = [
            {
                flags: "-l, --location <location>",
                description: "location for the event"
            },
            {
                flags: "-d, --description <description>",
                description: "description for the event"
            }
        ]

    }

    async doExecute(options: any): Promise<any> {
        let datePrompt = require('date-prompt');
        let title = this.getArgument("title", options);
        let location = this.getOption("location", options) || this.DEFAULT_LOCATION;
        let description = this.getOption("description", options) || this.DEFAULT_DESCRIPTION;

        datePrompt("When...?: ")
            .on('data', (v) => {
            })
            .on('submit', (v) => {
                CalendarClient.authorizeAndCreateEvent(title, location, description, new Date(v.unix()*1000));
            })
            .on('abort', (v) => {
            })
    }

}