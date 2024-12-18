import { CPU } from "./CPU.ts";
import { readInput } from "./input.ts";
import { assertEquals } from "@std/assert";

function digitToOut(
  cpu: CPU,
  target: bigint[],
  curr: bigint,
  index: number,
): bigint | undefined {
  for (let i = 0n; i < 8n; i++) {
    const candidate = curr | i;
    cpu.runWithA(candidate);

    if (cpu.outs[0] === target[index]) {
      if (index === 0) return candidate;

      const res = digitToOut(cpu, target, candidate << 3n, index - 1);
      if (res) return res;
    }
  }

  return undefined;
}

function part2() {
  const cpu = new CPU(readInput().trimEnd());

  const res = digitToOut(
    cpu,
    cpu.program.map((a) => BigInt(a)),
    0n,
    cpu.program.length - 1,
  );

  cpu.runWithA(res!);
  assertEquals(
    cpu.program,
    cpu.outs.map((o) => Number(o)),
  );
  console.log(res);
}

if (import.meta.main) {
  part2();
}

Deno.bench("part2", part2);
