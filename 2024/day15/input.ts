import { parseArgs } from "@std/cli";

export function readInput(): string {
  const isTest = parseArgs(Deno.args, { boolean: ["test"] }).test;
  return isTest
    ? Deno.readTextFileSync("testInput")
    : Deno.readTextFileSync("input");
}
