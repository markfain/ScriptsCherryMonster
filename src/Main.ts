#!/usr/bin/env node
import {TestCommand} from "./commands/TestCommand";
import {CLProgram} from "./core/CLProgram";
import {AnotherTestCommand} from "./commands/AnotherTestCommand";
import {UpdateDependencies} from "./commands/UpdateDependencies";

let CLI = new CLProgram();
CLI.installCommand(new TestCommand());
CLI.installCommand(new AnotherTestCommand());
CLI.installCommand(new UpdateDependencies());

CLI.parse();

//http://localhost:8333/executeCommand --data "command=RunEpisodeInBrowserCommand&episodeFolderPath=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&language=$2&openFile=true"
