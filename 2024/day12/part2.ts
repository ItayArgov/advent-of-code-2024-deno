import { readInput } from "./input.ts";

type Cord = string;

type Dir = "U" | "D" | "L" | "R";

const DIRS = [
  [0, 1, "R"],
  [1, 0, "D"],
  [0, -1, "L"],
  [-1, 0, "U"],
] as [number, number, Dir][];

function dfs(
  r: number,
  c: number,
  currLand: string,
  grid: string[][],
  edges: Set<Cord>,
  dir: Dir | null,
  visited: Set<Cord>,
): [number, number] {
  if (
    r < 0 ||
    c < 0 ||
    r >= grid.length ||
    c >= grid[0].length ||
    grid[r][c] !== currLand
  ) {
    edges.add(`${r},${c},${dir}`);
    return [0, 1];
  }

  if (visited.has(`${r},${c}`)) {
    return [0, 0];
  }

  visited.add(`${r},${c}`);
  const res = [1, 0] as [number, number];
  for (const [dr, dc, dir] of DIRS) {
    const [a, b] = dfs(r + dr, c + dc, currLand, grid, edges, dir, visited);
    res[0] += a;
    res[1] += b;
  }

  return res;
}

function reduceEdges(edges: Set<Cord>) {
  let res = 0;
  for (const edge of edges) {
    const [rs, cs, dir] = edge.split(",");
    const r = parseInt(rs);
    const c = parseInt(cs);
    if (dir === "L" || dir === "R") {
      let dr = 0;
      while (edges.delete(`${r - dr++},${c},${dir}`));
      dr = 1;
      while (edges.delete(`${r + dr++},${c},${dir}`));
    } else {
      let dc = 0;
      while (edges.delete(`${r},${c - dc++},${dir}`));
      dc = 1;
      while (edges.delete(`${r},${c + dc++},${dir}`));
    }

    res++;
  }

  return res;
}

function part2(input: string) {
  const grid = input.split("\n").map((l) => l.split(""));
  const visited = new Set<Cord>();
  let res = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const edges = new Set<Cord>();
      const [a, _] = dfs(r, c, grid[r][c], grid, edges, null, visited);
      res += a * reduceEdges(edges);
    }
  }

  console.log(res);
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}
