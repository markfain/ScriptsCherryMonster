#!/usr/bin/env node
import {Command} from "./core/Command";
import {TestCommand} from "./commands/TestCommand";
import {CLProgram} from "./core/CLProgram";
import {AnotherTestCommand} from "./commands/AnotherTestCommand";

let CLI = new CLProgram();
CLI.installCommand(new TestCommand());
CLI.installCommand(new AnotherTestCommand());



CLI.parse();
