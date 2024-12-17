import { readInput } from "./input.ts";

export const CPU = {
  PC: 0,
  A: 0n,
  B: 0n,
  C: 0n,
  outs: [],
  program: [],
} as unknown as { PC: number; outs: bigint[]; program: number[] } & Record<
  string,
  bigint
>;

const ACHAR = "A".charCodeAt(0);

const getValue = (op: number) =>
  op < 4
    ? BigInt(op)
    : BigInt(CPU[String.fromCharCode(Number(op - 4 + ACHAR))]);

const divByRegister = (reg: string, op: number) => {
  CPU[reg] = CPU.A / 2n ** BigInt(getValue(op));
  CPU.PC += 2;
};

const bxl = (n: number) => {
  CPU.B ^= BigInt(n);
  CPU.PC += 2;
};

const bst = (combo: number) => {
  CPU.B = BigInt(getValue(combo)) % 8n;
  CPU.PC += 2;
};

const jnz = (n: number) => {
  if (CPU.A !== 0n) {
    CPU.PC = n;
  } else {
    CPU.PC += 2;
  }
};

const bxc = () => {
  CPU.B ^= CPU.C;
  CPU.PC += 2;
};

const out = (n: number) => {
  CPU.outs.push(getValue(n) % 8n);
  CPU.PC += 2;
};

export function calculateOp() {
  const program = CPU.program;

  if (CPU.PC >= program.length) {
    return false;
  }

  const pc = Number(CPU.PC);

  switch (Number(program[pc])) {
    case 0:
      divByRegister("A", program[pc + 1]);
      break;
    case 1:
      bxl(program[pc + 1]);
      break;
    case 2:
      bst(program[pc + 1]);
      break;
    case 3:
      jnz(program[pc + 1]);
      break;
    case 4:
      bxc();
      break;
    case 5:
      out(program[pc + 1]);
      break;
    case 6:
      divByRegister("B", program[pc + 1]);
      break;
    case 7:
      divByRegister("C", program[pc + 1]);
      break;
  }

  return true;
}

const reg = /(\d+)/;

export function parseInput(input: string) {
  const [registers, programStr] = input.split("\n\n");
  const regLines = registers.split("\n");

  CPU.A = BigInt(parseInt(regLines[0].match(reg)![0]));
  CPU.B = BigInt(parseInt(regLines[1].match(reg)![0]));
  CPU.C = BigInt(parseInt(regLines[2].match(reg)![0]));

  CPU.program = programStr.slice("Program: ".length).split(",").map(Number);
}

if (import.meta.main) {
  parseInput(readInput().trimEnd());
  while (calculateOp());
  console.log(CPU.outs.join(","));
  console.log(CPU);
}
