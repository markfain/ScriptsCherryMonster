#!/usr/bin/env node
import {CLProgram} from "./core/CLProgram";
import {Files, IConfig} from "./utils/Files";
import {GenerateTypescriptClass} from "./commands/other/GenerateTypescriptClass";
import {CreateScmCommand} from "./commands/CreateScmCommand";
import {GitResetClean} from "./commands/git/GitResetClean";
import {UpdateEpisode} from "./commands/episodes/UpdateEpisode";
import {ShockTheUser} from "./commands/other/ShockTheUser";
import {FindFile} from "./commands/filesystem/FindFile";
import {DeleteFiles} from "./commands/filesystem/DeleteFiles";
import {ExecuteScript} from "./commands/scripts/ExecuteScript";
import {CreateScript} from "./commands/scripts/CreateScript";
import {DeleteScript} from "./commands/scripts/DeleteScript";
import {ListScripts} from "./commands/scripts/ListScripts";
import {Compare} from "./commands/other/Compare";
import {Configs} from "./utils/Configs";
import {GitStatus} from "./commands/git/GitStatus";
import {ArchiveScript} from "./commands/scripts/ArchiveScript";
import {RestoreScript} from "./commands/scripts/RestoreScript";
import {ReleasePort} from "./commands/network/ReleasePort";
import {DescribeScript} from "./commands/scripts/DescribeScript";
import {GitAdd} from "./commands/git/GitAdd";
import {GitDiff} from "./commands/git/GitDiff";
import {GitReset} from "./commands/git/GitReset";
import {GitCheckout} from "./commands/git/GitCheckout";
import {GitLog} from "./commands/git/GitLog";
import {AddTask} from "./commands/tasks/AddTask";
import {RemoveTask} from "./commands/tasks/RemoveTask";
import {ListTasks} from "./commands/tasks/ListTasks";
import {StartTask} from "./commands/tasks/StartTask";
import {CompleteTask} from "./commands/tasks/CompleteTask";
import {PauseTask} from "./commands/tasks/PauseTask";
import {AddNote} from "./commands/tasks/AddNote";


Files.setPlaceholders(Configs.get<IConfig>("/Users/markfainstein/Dev/ScriptsCherryMonster/config.json"));
//TODO: scripts and command should be separated

let CLI = new CLProgram();

//============================= Commands =============================
//Generation
CLI.installCommand(new GenerateTypescriptClass());
CLI.installCommand(new CreateScmCommand());

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
CLI.installCommand(new GitAdd());
CLI.installCommand(new GitDiff());
CLI.installCommand(new GitReset());
CLI.installCommand(new GitCheckout());
CLI.installCommand(new GitLog());

//Tasks
CLI.installCommand(new AddTask());
CLI.installCommand(new RemoveTask());
CLI.installCommand(new ListTasks());
CLI.installCommand(new StartTask());
CLI.installCommand(new CompleteTask());
CLI.installCommand(new PauseTask());
CLI.installCommand(new AddNote());


//Network
CLI.installCommand(new ReleasePort());


//Scripts
CLI.installCommand(new ExecuteScript());
CLI.installCommand(new CreateScript());
CLI.installCommand(new DeleteScript());
CLI.installCommand(new DescribeScript());
CLI.installCommand(new ListScripts());
CLI.installCommand(new ArchiveScript());
CLI.installCommand(new RestoreScript());

//============================= Autocompletion =============================
CLI.addAutoCompleteCommands();

CLI.parse();

