import { readInput } from "./input.ts";
import { calculateChecksum, uncompress, type Disk } from "./part1.ts";

function getCurrentBlockSize(disk: Disk, r: number) {
  let size = 0;
  const currId = disk[r];
  while (disk[r] === currId) {
    size++;
    r--;
  }

  return size;
}

function moveBlocksToStart(disk: Disk) {
  let r = disk.length - 1;
  while (r > 0) {
    if (disk[r] === null) {
      r--;
      continue;
    }

    const currentBlockSize = getCurrentBlockSize(disk, r);

    const indexOfFreeSpace = findFreeSpaceOfSize(disk, currentBlockSize, r);

    if (!indexOfFreeSpace) {
      const currNum = disk[r];
      while (disk[r] === currNum) {
        r--;
      }
      continue;
    }

    for (let i = 0; i < currentBlockSize; i++) {
      disk[indexOfFreeSpace + i] = disk[r];
      disk[r] = null;
      r--;
    }
  }

  return disk;
}

function part2(input: string) {
  const uncompressed = uncompress(input);
  const fragmentedDisk = moveBlocksToStart(uncompressed);
  console.log(calculateChecksum(fragmentedDisk));
}

if (import.meta.main) {
  part2(readInput().trimEnd());
}

function findFreeSpaceOfSize(disk: Disk, size: number, r: number) {
  const bound = Math.min(r - size - 1, disk.length - size - 1);
  for (let i = 0; i < bound; i++) {
    if (disk.slice(i, i + size).every((val) => val === null)) {
      return i;
    }
  }

  return null;
}
