export function checkDEL(records) {

    const errors = [];
  
    records.forEach((record) => {
  
      const origin =
        String(record.origin || "")
          .trim()
          .toUpperCase();
  
      const destination =
        String(record.destination || "")
          .trim()
          .toUpperCase();
  
      if (
        origin === "DEL" ||
        destination === "DEL"
      ) {
  
        errors.push({
          ...record
        });
  
      }
  
    });
  
    return errors;
  
  }