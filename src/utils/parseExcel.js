import {
    formatExcelDate,
    formatExcelTime
  } from "./excelHelpers";
export function parseExcel(rawData) {

    const records = [];
  
    let currentEquipment = "";
    let currentCategory = "";
    let headerMap = {};
  
    rawData.forEach((row, rowIndex) => {
  
      const rowText = row
        .join(" ")
        .toLowerCase()
        .trim();
  
      // ======================
      // Detect Section Heading
      // ======================
  
      if (
        rowText.includes("bill for rendering")
      ) {
  
        if (rowText.includes("gpu")) {
          currentEquipment = "GPU";
        }
  
        if (rowText.includes("pca")) {
          currentEquipment = "PCA";
        }
  
        if (rowText.includes("domestic")) {
          currentCategory = "Domestic";
        }
  
        if (rowText.includes("international")) {
          currentCategory = "International";
        }
  
        headerMap = {};
  
        return;
      }
  
      // ======================
      // Detect Header Row
      // ======================
  
      const normalizedRow = row.map(cell =>
        String(cell)
          .toLowerCase()
          .trim()
      );
  
      if (
        normalizedRow.includes("flight no") &&
        normalizedRow.includes("airline")
      ) {
  
        headerMap = {};
  
        normalizedRow.forEach((header, index) => {
  
          if (
            header.includes("sr") ||
            header.includes("sn")
          ) {
            headerMap.srNo = index;
          }
  
          if (
            header === "start date"
          ) {
            headerMap.startDate = index;
          }
  
          if (
            header === "end date"
          ) {
            headerMap.endDate = index;
          }
  
          if (
            header === "origin"
          ) {
            headerMap.origin = index;
          }
  
          if (
            header === "destination"
          ) {
            headerMap.destination = index;
          }
  
          if (
            header.includes("flight")
          ) {
            headerMap.flightNo = index;
          }
  
          if (
            header === "airline"
          ) {
            headerMap.airline = index;
          }
  
          if (
            header.includes("regn")
          ) {
            headerMap.regn = index;
          }
  
          if (
            header.includes("bay")
          ) {
            headerMap.bayNo = index;
          }
  
          if (
            header.includes("body")
          ) {
            headerMap.bodyType = index;
          }
  
          if (
            header.includes("tonnage")
          ) {
            headerMap.tonnage = index;
          }
  
          if (
            header === "start time"
          ) {
            headerMap.startTime = index;
          }
  
          if (
            header === "end time"
          ) {
            headerMap.endTime = index;
          }
  
          if (
            header.includes("actual")
          ) {
            headerMap.actualConsumption = index;
          }
  
          if (
            header.includes("charges")
          ) {
            headerMap.charges = index;
          }
  
        });
  
        console.log(
          "Header Map:",
          headerMap
        );
  
        return;
      }
  
      // ======================
      // Skip if Header Not Found
      // ======================
  
      if (
        headerMap.flightNo === undefined
      ) {
        return;
      }
  
      // ======================
      // Skip Totals
      // ======================
  
      if (
        rowText.includes("total")
      ) {
        return;
      }
  
      // ======================
      // Data Rows
      // ======================
  
      const srValue =
        row[headerMap.srNo];
  
      if (
        isNaN(Number(srValue))
      ) {
        return;
      }
  
      records.push({
        excelRowNumber: rowIndex + 1,
  
        srNo:
          row[headerMap.srNo],
  
          startDate:
          formatExcelDate(
            row[headerMap.startDate]
          ),
        
        endDate:
          formatExcelDate(
            row[headerMap.endDate]
          ),
  
        origin:
          row[headerMap.origin],
  
        destination:
          row[headerMap.destination],
  
        flightNo:
          row[headerMap.flightNo],
  
        airline:
          row[headerMap.airline],
  
        regn:
          row[headerMap.regn],
  
        bayNo:
          row[headerMap.bayNo],
  
        bodyType:
          row[headerMap.bodyType],
  
        tonnage:
          row[headerMap.tonnage],
  
          startTime:
          formatExcelTime(
            row[headerMap.startTime]
          ),
        
        endTime:
          formatExcelTime(
            row[headerMap.endTime]
          ),
  
        actualConsumption:
          Number(
            row[
              headerMap.actualConsumption
            ]
          ),
  
        charges:
          Number(
            row[
              headerMap.charges
            ]
          ),
  
        equipment:
          currentEquipment,
  
        category:
          currentCategory
  
      });
  
    });
  
    console.log(
      "Parsed Records:",
      records
    );
  
    console.log("PARSED RECORDS");
console.log(records);

return records;
  }