import { readInput } from "./input.ts";

type FrequencyMap = Map<string, [number, number][]>;

function createFrequencyMap(grid: string[]) {
  const frequencyMap: FrequencyMap = new Map();
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const char = grid[r][c];
      if (char === ".") continue;

      if (!frequencyMap.has(char)) {
        frequencyMap.set(char, []);
      }
      frequencyMap.get(char)!.push([r, c]);
    }
  }

  return frequencyMap;
}

function getAntinodesFromFrequencyMap(grid: string[], freqMap: FrequencyMap) {
  const antinodesSet = new Set<string>();
  for (const positions of freqMap.values()) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions.length; j++) {
        if (i === j) continue;

        const [r1, c1] = positions[i];
        const [r2, c2] = positions[j];
        const dr = r2 - r1;
        const dc = c2 - c1;
        const [nr1, nc1] = [r1 - dr, c1 - dc];
        const [nr2, nc2] = [r2 + dr, c2 + dc];

        if (grid[nr1] && grid[nr1][nc1]) {
          antinodesSet.add([nr1, nc1].toString());
        }

        if (grid[nr2] && grid[nr2][nc2]) {
          antinodesSet.add([nr2, nc2].toString());
        }
      }
    }
  }

  return antinodesSet;
}

function part1(input: string) {
  const grid = input.split("\n");
  const freqMap = createFrequencyMap(grid);
  const antinodes = getAntinodesFromFrequencyMap(grid, freqMap);

  console.log(antinodes.size);
}

if (import.meta.main) {
  part1(readInput().trimEnd());
}
