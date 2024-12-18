import {
  bfs,
  BYTES_BOUND,
  END_LOC,
  getBytesFalling,
  getGrid,
} from "./part1.ts";

function part2() {
  const bytes = getBytesFalling();
  const grid = getGrid(bytes.slice(0, BYTES_BOUND));
  let i = 0;
  while (true) {
    const newBound = i + BYTES_BOUND;
    const [c, r] = bytes[newBound];
    grid[r][c] = false;
    const visited = bfs(grid, 0, 0);
    if (!visited.has(END_LOC.join(","))) {
      console.log([c, r].join(","));
      break;
    }
    i++;
  }
}

if (import.meta.main) {
  part2();
}
