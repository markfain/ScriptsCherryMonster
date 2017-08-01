#!/usr/bin/env node
import {CLProgram} from "./core/CLProgram";
import {Files, IConfig} from "./utils/Files";
import {GenerateTypescriptClass} from "./commands/generation/GenerateTypescriptClass";
import {GenerateScmCommand} from "./commands/generation/GenerateScmCommand";
import {GitResetClean} from "./commands/git/GitResetClean";
import {UpdateEpisode} from "./commands/UpdateEpisode";
import {ShockTheUser} from "./commands/ShockTheUser";
import {FindFile} from "./commands/FindFile";
import {DeleteFiles} from "./commands/DeleteFiles";
import {ExecuteScript} from "./commands/ExecuteScript";
import {CreateScript} from "./commands/generation/CreateScript";
import {DeleteScript} from "./commands/generation/DeleteScript";
import {ListScripts} from "./commands/ListScripts";
import {Compare} from "./commands/Compare";
import {Configs} from "./utils/Configs";
import {GitStatus} from "./commands/git/GitStatus";
import {ArchiveScript} from "./commands/generation/ArchiveScript";
import {RestoreScript} from "./commands/generation/RestoreScript";
import {ReleasePort} from "./commands/network/ReleasePort";


Files.setPlaceholders(Configs.get<IConfig>("/Users/markfainstein/Dev/ScriptsCherryMonster/config.json"));
//TODO: scripts and command should be separated

let CLI = new CLProgram();

//============================= Commands =============================
//Generation
CLI.installCommand(new GenerateTypescriptClass());
CLI.installCommand(new GenerateScmCommand());

//Toolbox related
CLI.installCommand(new UpdateEpisode());

//General
CLI.installCommand(new ShockTheUser());
CLI.installCommand(new FindFile());
CLI.installCommand(new DeleteFiles());
CLI.installCommand(new Compare());

//Git
CLI.installCommand(new GitResetClean());
CLI.installCommand(new GitStatus());

//Network
CLI.installCommand(new ReleasePort());


//Scripts
CLI.installCommand(new ExecuteScript());
CLI.installCommand(new CreateScript());
CLI.installCommand(new DeleteScript());
CLI.installCommand(new ListScripts());
CLI.installCommand(new DeleteScript());
CLI.installCommand(new ArchiveScript());
CLI.installCommand(new RestoreScript());

//============================= Autocompletion =============================
CLI.addAutoCompleteCommands();

CLI.parse();

