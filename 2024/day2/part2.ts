import { getReports, isReportValid } from "./part1.ts";

function isReportValidWithDrops(report: number[]): boolean {
  for (let i = 0; i < report.length; i++) {
    const reportCopy = report.filter((_, index) => index !== i);
    if (isReportValid(reportCopy)) return true;
  }

  return false;
}

function part2() {
  const reports = getReports();
  const validReports = reports.filter(isReportValidWithDrops);
  console.log("Part 2:", validReports.length);
}

if (import.meta.main) {
  part2();
}
