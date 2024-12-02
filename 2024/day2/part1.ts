import { readInput } from "./input.ts";

export function getReports() {
  return readInput()
    .trimEnd()
    .split("\n")
    .map((report) => report.split(" ").map((num) => parseInt(num)));
}

export function isReportValid(report: number[]): boolean {
  const isIncreasing = report.every((num, i) => i === 0 || num > report[i - 1]);
  const isDecreasing = report.every((num, i) => i === 0 || num < report[i - 1]);
  if (!isIncreasing && !isDecreasing) return false;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = Math.abs(report[i] - report[i + 1]);
    if (diff === 0 || diff > 3) return false;
  }

  return true;
}

function part1() {
  const reports = getReports();
  const validReports = reports.filter(isReportValid);
  console.log("Part 1:", validReports.length);
}

if (import.meta.main) {
  part1();
}
