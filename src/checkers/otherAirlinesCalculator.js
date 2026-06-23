export function calculateOtherAirlineCharge(
    equipment,
    category,
    bodyType,
    minutes
  ) {
  
    bodyType =
      String(bodyType)
        .trim()
        .toUpperCase();
  
    let rate = 0;
  
    // =====================
    // DOMESTIC
    // =====================
  
    if (category === "Domestic") {
  
      // Minimum Billing
  
      if (minutes < 20) {
        minutes = 20;
      }
  
      // Round Up To Next 10
  
      minutes =
        Math.ceil(
          minutes / 10
        ) * 10;
  
      if (equipment === "GPU") {
  
        if (bodyType === "C") {
          rate = 2200;
        }
  
        if (bodyType === "E") {
          rate = 3300;
        }
  
      }
  
      if (equipment === "PCA") {
  
        if (bodyType === "C") {
          rate = 3300;
        }
  
        if (bodyType === "E") {
          rate = 4000;
        }
  
      }
  
    }
  
    // =====================
    // INTERNATIONAL
    // =====================
  
    if (
      category ===
      "International"
    ) {
  
      // Minimum Billing
  
      if (minutes < 30) {
        minutes = 30;
      }
  
      // Round Up To Next 10
  
      minutes =
        Math.ceil(
          minutes / 10
        ) * 10;
  
      if (equipment === "GPU") {
  
        if (bodyType === "C") {
          rate = 4400;
        }
  
        if (bodyType === "D") {
          rate = 5500;
        }
  
        if (bodyType === "E") {
          rate = 5500;
        }
  
        if (bodyType === "F") {
          rate = 5500;
        }
  
        if (
          bodyType === "A380"
        ) {
          rate = 7700;
        }
  
      }
  
      if (equipment === "PCA") {
  
        if (bodyType === "C") {
          rate = 4950;
        }
  
        if (bodyType === "D") {
          rate = 5500;
        }
  
        if (bodyType === "E") {
          rate = 5500;
        }
  
        if (bodyType === "F") {
          rate = 6600;
        }
  
        if (
          bodyType === "A380"
        ) {
          rate = 7700;
        }
  
      }
  
    }
  
    if (!rate) {
      return null;
    }
  
    return Math.round(
      (minutes * rate) / 60
    );
  
  }