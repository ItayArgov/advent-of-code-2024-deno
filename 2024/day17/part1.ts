import { CPU } from "./CPU.ts";
import { readInput } from "./input.ts";

if (import.meta.main) {
  const cpu = new CPU(readInput().trimEnd());
  cpu.run();
  console.log(cpu.outs.join(","));
  console.log(CPU);
}
