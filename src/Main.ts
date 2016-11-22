#!/usr/bin/env node
import {CLProgram} from "./core/CLProgram";
import {Files} from "./utils/Files";
import {GenerateTypescriptClass} from "./commands/generation/GenerateTypescriptClass";
import {GenerateScmCommand} from "./commands/generation/GenerateScmCommand";
import {MyCommand} from "./commands/MyCommand";

Files.setPlaceholder("$SLATE_ROOT$", "/Dev/SlateRoot");
Files.setPlaceholder("$TOOLS_SERVER$", "/Dev/SlateTools/ToolsServer");
Files.setPlaceholder("$SCM$", "/Dev/ScriptsCherryMonster");
Files.setPlaceholder("$SCM_COMMANDS$", "/Dev/ScriptsCherryMonster/src/commands");

let CLI = new CLProgram();
CLI.installCommand(new GenerateTypescriptClass());
CLI.installCommand(new GenerateScmCommand());
CLI.installCommand(new MyCommand());

CLI.parse();