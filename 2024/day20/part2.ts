import { bfs, getGrid, getStart } from "./part1.ts";

function calculateCheatScoreFromLocations(locations: Uint16Array) {
  let valid = 0;
  const len = locations.length / 3;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const [sr, sc, sd] = [
        locations[i * 3],
        locations[i * 3 + 1],
        locations[i * 3 + 2],
      ];

      const [er, ec, ed] = [
        locations[j * 3],
        locations[j * 3 + 1],
        locations[j * 3 + 2],
      ];
      const distance = ed - sd;
      const distanceWithCheat = Math.abs(sr - er) + Math.abs(sc - ec);

      if (distanceWithCheat === distance) continue;

      if (distanceWithCheat > 20) {
        j += distanceWithCheat - 21;
        continue;
      }

      if (distance - distanceWithCheat >= 100) valid++;
    }
  }

  return valid;
}

function part2() {
  const grid = getGrid();
  const [sr, sc] = getStart(grid);
  const [_, locations] = bfs(grid, sr, sc);
  const res = calculateCheatScoreFromLocations(
    new Uint16Array(locations.flat()),
  );
  console.log(res);
}

if (import.meta.main) {
  part2();
}
