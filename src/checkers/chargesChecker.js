import {
  calculateOtherAirlineCharge
} from "./otherAirlinesCalculator";

import {
  calculateAirIndiaCharge
} from "../utils/airIndiaBilling";

export function checkCharges(
  records,
  selectedAirline
) {

  const errors = [];

  records.forEach((record) => {

    let expectedCharge;

    // Air India Logic

    if (
      selectedAirline ===
      "airindia"
    ) {

      expectedCharge =
        calculateAirIndiaCharge(
          record.equipment,
          record.category,
          record.bodyType,
          record.actualConsumption
        );

    }

    // Other Airlines Logic

    else {

      expectedCharge =
        calculateOtherAirlineCharge(
          record.equipment,
          record.category,
          record.bodyType,
          record.actualConsumption
        );

    }

    if (
      expectedCharge === null
    ) {
      return;
    }

    const actualCharge =
      Number(record.charges);

    if (
      expectedCharge !== actualCharge
    ) {

      errors.push({

        ...record,

        expectedCharge,

        actualCharge,

        difference:
          actualCharge -
          expectedCharge

      });

    }

  });

  return errors;

}