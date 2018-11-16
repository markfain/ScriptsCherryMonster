declare var require: any;
import {File} from "./File";
import * as path from 'path';

export interface IConfig{
    placeholders:Map<string, string>;
}

export class Files {

    private static fs = require('file-system');
    private static fs_extra = require('fs-extra');
    private static placeHolders: Map<string, string> = new Map<string, string>();

    private static getPlaceHolderAbsolutePath(placeholderRelativePath:string):string{
        //Path to ToolsServer dir
        let mainAbsolutePath:string = path.join(__dirname, "../../../");
        let joined = path.join(mainAbsolutePath, placeholderRelativePath);
        let root:string = path.normalize(joined);
        return root;
    }

    private static isPlaceholderValid(placeholder: string) {
        return placeholder.startsWith("$") && placeholder.endsWith("$") && placeholder.length > 3;
    }

    public static setPlaceholders(config:IConfig){
        for (let placeholderName in config.placeholders){
            this.setPlaceholder(placeholderName, config.placeholders[placeholderName]);
        }
    }

    public static setPlaceholder(placeholderName: string, placeholderPath:string): boolean {
        let placeholderAbsolutePath:string = this.getPlaceHolderAbsolutePath(placeholderPath);
        placeholderName = placeholderName.toUpperCase();
        if (!this.isPlaceholderValid(placeholderName)) {
            return false;
        }
        this.placeHolders.set(placeholderName, placeholderAbsolutePath);
        return true;
    }

    public static combinePaths(...paths: string[]): string {

        return path.join(...paths);
    }

    public static normalize(pathToNormalize:string):string{
        return path.normalize(pathToNormalize);
    }

    private static replaceTokensInPath(path: string): string {
        this.placeHolders.forEach((value: string, key: string) => {
            path = path.replace(key, value);
        });

        return path;
    }

    public static isFile(pathOrFile: string | File): pathOrFile is File {
        return (<File>pathOrFile).getAbsolutePath !== undefined;
    }

    /**
     * file factory
     * @returns {File}
     */
    public static file(pathOrFile: any, path?: string): File {
        let basePath: string = "";
        if (this.isFile(pathOrFile)) {
            basePath = (<File>pathOrFile).getAbsolutePath();
        }
        else {
            basePath = <string>pathOrFile;
        }
        if (!path) {
            path = "";
        }

        path = this.replaceTokensInPath(path);
        basePath = this.replaceTokensInPath(basePath);
        let newPath = this.normalize(this.combinePaths(basePath, path));

        var file: File = new File(newPath);
        return file;
    }

    public static copyFolder(source:File, target:File): void{
        //noinspection TypeScriptUnresolvedFunction
        this.fs_extra.copySync(source.getAbsolutePath(), target.getAbsolutePath());
    }

    public static copyFile(source: File, target: File): void {
        //noinspection TypeScriptUnresolvedFunction
        this.fs.copyFileSync(source.getAbsolutePath(), target.getAbsolutePath());
    }

    public static readFile(source: File): any {
        if (source.isDirectory()) {
            return;
        }
        return this.fs.readFileSync(source.getAbsolutePath());
    }

    public static readJson(source: File): any {
        if (source.getExtension() != "json") {
            return;
        }
        return JSON.parse(this.readFile(source));
    }

    public static writeFile(file: File): void {
        this.fs.writeFile(file.getAbsolutePath(), 'test', ()=> {
        })
    }

    public static computeMd5(content: any): string {
        let stringContent: string;
        if (typeof content == "string") {
            stringContent = content;
        }
        else {
            stringContent = JSON.stringify(content, null, 4);
        }
        let md5 =  require('md5');
        return md5(stringContent);
    }

    public static delete(fileToDelete: File) {
        this.fs.unlinkSync(fileToDelete.getAbsolutePath());
    }

    public static mkdir(file:File){
        let mkdirp:any = require('mkdirp');
        //TODO: better with fs
        mkdirp.sync(file.getAbsolutePath());
    }
}