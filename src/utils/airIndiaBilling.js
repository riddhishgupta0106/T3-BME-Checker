export function calculateAirIndiaCharge(
  equipment,
  category,
  bodyType,
  minutes
) {

  let baseRate = 0;
  let reducedRate = 0;
  let thresholdMinutes = 0;

  bodyType = String(bodyType)
    .trim()
    .toUpperCase();

  // =========================
  // DOMESTIC
  // =========================

  if (category === "Domestic") {

    thresholdMinutes = 120;

    if (equipment === "GPU") {

      if (bodyType === "C") {
        baseRate = 2200;
        reducedRate = 1320;
      }

      if (bodyType === "E") {
        baseRate = 3300;
        reducedRate = 1980;
      }

    }

    if (equipment === "PCA") {

      if (bodyType === "C") {
        baseRate = 3300;
        reducedRate = 1980;
      }

      if (bodyType === "E") {
        baseRate = 3300;
        reducedRate = 1980;
      }

    }

  }

  // =========================
  // INTERNATIONAL
  // =========================o

  if (category === "International") {

    thresholdMinutes = 240;

    if (equipment === "GPU") {

      if (bodyType === "C") {
        baseRate = 4400;
        reducedRate = 2970;
      }

      if (bodyType === "D") {
        baseRate = 5200;
        reducedRate = 2970;
      }

      if (bodyType === "E") {
        baseRate = 5500;
        reducedRate = 3630;
      }

      if (bodyType === "F") {
        baseRate = 6000;
        reducedRate = 3630;
      }

      if (bodyType === "A380") {
        baseRate = 7500;
        reducedRate = 3630;
      }

    }

    if (equipment === "PCA") {

      if (bodyType === "C") {
        baseRate = 4950;
        reducedRate = 3630;
      }

      if (bodyType === "D") {
        baseRate = 5500;
        reducedRate = 3630;
      }

      if (bodyType === "E") {
        baseRate = 5500;
        reducedRate = 3960;
      }

      if (bodyType === "F") {
        baseRate = 6600;
        reducedRate = 4290;
      }

      if (bodyType === "A380") {
        baseRate = 8000;
        reducedRate = 5005;
      }

    }

  }

  if (!baseRate) {
    return null;
  }

  // Within free slab

  if (minutes <= thresholdMinutes) {

    return Math.round(
      (minutes * baseRate) / 60
    );

  }

  // Beyond slab

  const firstPart =
    (thresholdMinutes * baseRate) / 60;

  const secondPart =
    (
      (minutes - thresholdMinutes) *
      reducedRate
    ) / 60;

  return Math.round(
    firstPart + secondPart
  );

}