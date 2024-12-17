import { readInput } from "./input.ts";
import { assertEquals } from "@std/assert";
import { calculateOp, CPU, parseInput } from "./part1.ts";

function listsAreEqual(a: bigint[], b: bigint[]) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function digitToOut(target: bigint[]): bigint {
  if (!target.length) {
    return 0n;
  }

  let curr = 8n * digitToOut(target.slice(1));

  while (true) {
    clearCPU(curr);
    while (calculateOp());

    if (listsAreEqual(CPU.outs, target)) {
      return curr;
    }

    curr++;
  }
}

const clearCPU = (a?: bigint) => {
  CPU.outs = [];
  CPU.PC = 0;
  CPU.A = a ?? 0n;
  CPU.B = 0n;
  CPU.C = 0n;
};

if (import.meta.main) {
  parseInput(readInput().trimEnd());

  const res = digitToOut(CPU.program.map((a) => BigInt(a)));

  clearCPU(res);
  while (calculateOp());
  assertEquals(
    CPU.program,
    CPU.outs.map((o) => Number(o)),
  );
  console.log(res);
  console.log(CPU.outs);
}
