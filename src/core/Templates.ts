import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import * as Handlebars from 'handlebars';
import {Logger} from "./Logger";

declare var require: any;
declare var process: any;
export class Templates {

    public static getTemplateConstructor(template: File): any {
        let templateFileAsString: string = Files.readFile(template).toString();
        let templtaeConstructor: any = Handlebars.compile(templateFileAsString);
        return templtaeConstructor;
    }

    public static createTemplateInstance(template: File, data: any): any {
        let templateConstructor = this.getTemplateConstructor(template);
        let instance: any = templateConstructor(data);
        return instance;
    }

    public static writeTemplateInstanceToFile(template: File, target: File, data: any): void {
        let instance: any = this.createTemplateInstance(template, data);
        TextFiles.write(target, instance, true);
    }
}