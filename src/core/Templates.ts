import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";

declare var require: any;
declare var process: any;
export class Templates {

    public static getTemplateConstructor(template: File): any {
        let handlebars: any = require('handlebars');

        let templateFileAsString: string = Files.readFile(template).toString();
        let template: any = handlebars.compile(templateFileAsString);
        return template;
    }

    public static createTemplateInstance(template: File, data: any): any {
        let template = this.getTemplateConstructor(template);
        let instance: any = template(data);
        return instance;
    }

    public static writeTemplateInstanceToFile(template: File, target: File, data: any): void {
        let instance: any = this.createTemplateInstance(template, data);
        TextFiles.write(target, instance, true);
    }
}