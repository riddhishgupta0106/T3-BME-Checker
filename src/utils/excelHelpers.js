import * as XLSX from "xlsx";

export function formatExcelDate(value) {

  if (!value) return "";

  if (typeof value === "number") {

    const date =
      XLSX.SSF.parse_date_code(value);

    if (!date) return value;

    return `${String(date.d).padStart(2, "0")}-${String(date.m).padStart(2, "0")}-${date.y}`;
  }

  return value;
}

export function formatExcelTime(value) {

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "";
  }

  if (typeof value === "number") {

    const totalSeconds =
      Math.round(value * 86400);

    const hrs =
      Math.floor(totalSeconds / 3600);

    const mins =
      Math.floor((totalSeconds % 3600) / 60);

    const secs =
      totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return value;
}