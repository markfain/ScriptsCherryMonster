import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {MailClient} from "../commands/tasks/MailClient";
import {CalendarClient} from "../commands/scheduler/CalendarClient";
export class HelloWorld extends Script{
    execute(){
        //CalendarClient.authorizeAndCreateEvent();

    }
}

let HelloWorldInstance = new HelloWorld("HelloWorld", "Says HelloWorld");
HelloWorldInstance.execute();

//@name:HelloWorld
//@description:Says HelloWorld