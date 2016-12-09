#!/usr/bin/env node
import {CLProgram} from "./core/CLProgram";
import {Files} from "./utils/Files";
import {GenerateTypescriptClass} from "./commands/generation/GenerateTypescriptClass";
import {GenerateScmCommand} from "./commands/generation/GenerateScmCommand";
import {GitResetClean} from "./commands/GitResetClean";
import {UpdateEpisode} from "./commands/UpdateEpisode";
import {ShockTheUser} from "./commands/ShockTheUser";
import {FindFile} from "./commands/FindFile";
import {AddNewUIAndNITTrueToAllEpisodes} from "./scripts/AddNewUIAndNITTrueToAllEpisodes";
import {EpisodesWithInvalidJsonDescriptors} from "./scripts/EpisodesWithInvalidJsonDescriptors";
import {DeleteFiles} from "./commands/DeleteFiles";
import {AnnotateJsClass} from "./scripts/AnnotateJsClass";
import {ExecuteScript} from "./commands/ExecuteScript";

Files.setPlaceholder("$SLATE_ROOT$", "/Dev/SlateRoot");
Files.setPlaceholder("$EPISODES$", "/Dev/SlateRoot/Content/MathEpisodes/episodes/");
Files.setPlaceholder("$TOOLS_SERVER$", "/Dev/SlateTools/ToolsServer");
Files.setPlaceholder("$SCM$", "/Dev/ScriptsCherryMonster");
Files.setPlaceholder("$SCM_COMMANDS$", "/Dev/ScriptsCherryMonster/src/commands");

//TODO: scripts and command should be separated

let CLI = new CLProgram();
//Commands
CLI.installCommand(new GenerateTypescriptClass());
CLI.installCommand(new GenerateScmCommand());
CLI.installCommand(new GitResetClean());
CLI.installCommand(new UpdateEpisode());
CLI.installCommand(new ShockTheUser());
CLI.installCommand(new FindFile());
CLI.installCommand(new DeleteFiles());
CLI.installCommand(new ExecuteScript());

//Scripts
CLI.installScript(new AddNewUIAndNITTrueToAllEpisodes());
CLI.installScript(new EpisodesWithInvalidJsonDescriptors());
CLI.installScript(new AnnotateJsClass());



CLI.addAutoCompleteCommands();





CLI.parse();

