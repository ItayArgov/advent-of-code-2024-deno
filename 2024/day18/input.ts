import { parseArgs } from "@std/cli";

export const isTest = () => parseArgs(Deno.args, { boolean: ["test"] }).test;

export function readInput(): string {
  return isTest()
    ? Deno.readTextFileSync("testInput")
    : Deno.readTextFileSync("input");
}
