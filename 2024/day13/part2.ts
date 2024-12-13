import { readInput } from "./input.ts";
import {
  getClawMachines,
  reduceClawMachines,
  type ClawMachine,
} from "./part1.ts";

const OFFSET = 10000000000000;

const addOffset = (clawMachine: ClawMachine) =>
  ({
    A: clawMachine.A,
    B: clawMachine.B,
    P: [clawMachine.P[0] + OFFSET, clawMachine.P[1] + OFFSET],
  }) as ClawMachine;

function simulateClawMachine(
  clawMachine: ClawMachine,
): [number, number] | null {
  const [ax, ay] = clawMachine.A;
  const [bx, by] = clawMachine.B;
  const [px, py] = clawMachine.P;

  const x = (bx * py - by * px) / (bx * ay - by * ax);
  const y = (px - ax * x) / bx;

  if (x >= 0 && y >= 0 && Number.isInteger(x) && Number.isInteger(y))
    return [x, y];

  return null;
}

function part2(input: string) {
  const claws = getClawMachines(input).map(addOffset);
  const tokens = claws.map(simulateClawMachine);
  const res = reduceClawMachines(tokens);
  console.log(res);
}

if (import.meta.main) part2(readInput().trimEnd());
