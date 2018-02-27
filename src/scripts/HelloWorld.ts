import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {MailClient} from "../commands/tasks/MailClient";
export class HelloWorld extends Script{
    execute(){
        MailClient.sendMail();


    }
}

let HelloWorldInstance = new HelloWorld("HelloWorld", "Says HelloWorld");
HelloWorldInstance.execute();

//@name:HelloWorld
//@description:Says HelloWorld