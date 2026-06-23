export function checkAbnormalUsage(
    records,
    threshold
  ) {
  
    return records.filter(
      (record) =>
        record.actualConsumption >
        threshold
    );
  
  }