import { readInput } from "./input.ts";

const buttonRegex = /X\+(\d+), Y\+(\d+)/;
const prizeRegex = /X=(\d+), Y=(\d+)/;

export type ClawMachine = {
  A: [number, number];
  B: [number, number];
  P: [number, number];
};

export const getClawMachines = (input: string) =>
  input.split("\n\n").map((line) => {
    const [a, b, p] = line.split("\n");
    return {
      A: buttonRegex.exec(a)!.slice(1).map(Number),
      B: buttonRegex.exec(b)!.slice(1).map(Number),
      P: prizeRegex.exec(p)!.slice(1).map(Number),
    };
  }) as ClawMachine[];

export const reduceClawMachines = (clawsTokens: ([number, number] | null)[]) =>
  clawsTokens.reduce(
    (acc, claw) => (claw ? acc + claw[0] * 3 + claw[1] : acc),
    0,
  );

function simulateClawMachine(
  clawMachine: ClawMachine,
): [number, number] | null {
  const [ax, ay] = clawMachine.A;
  const [bx, by] = clawMachine.B;
  const [px, py] = clawMachine.P;

  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      if (i * ax + j * bx === px && i * ay + j * by === py) return [i, j];
      if (j * ax + i * bx === px && j * ay + i * by === py) return [j, i];
    }
  }

  return null;
}

function part1(input: string) {
  const claws = getClawMachines(input);
  const tokens = claws.map(simulateClawMachine);
  const res = reduceClawMachines(tokens);
  console.log(res);
}

if (import.meta.main) part1(readInput().trimEnd());
