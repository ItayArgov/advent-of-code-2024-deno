import { parseArgs } from "@std/cli";

export function isTestArg() {
  return parseArgs(Deno.args, { boolean: ["test"] }).test;
}

export function readInput(): string {
  const isTest = isTestArg();
  return isTest
    ? Deno.readTextFileSync("testInput")
    : Deno.readTextFileSync("input");
}
