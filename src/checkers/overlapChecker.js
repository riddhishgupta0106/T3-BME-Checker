function buildDateTime(
  endDate,
  startTime,
  endTime
) {

  if (
    !endDate ||
    !startTime ||
    !endTime
  ) {
    return null;
  }

  const [
    day,
    month,
    year
  ] = String(endDate)
    .split("-")
    .map(Number);

  const endDateObj =
    new Date(
      year,
      month - 1,
      day
    );

  const startDateObj =
    new Date(endDateObj);

  const startParts =
    String(startTime)
      .split(":")
      .map(Number);

  const endParts =
    String(endTime)
      .split(":")
      .map(Number);

  const startMinutes =
    startParts[0] * 60 +
    startParts[1];

  const endMinutes =
    endParts[0] * 60 +
    endParts[1];

  // Midnight crossover

  if (
    endMinutes <
    startMinutes
  ) {

    startDateObj.setDate(
      startDateObj.getDate() - 1
    );

  }

  const startDateTime =
    new Date(startDateObj);

  startDateTime.setHours(
    startParts[0],
    startParts[1],
    startParts[2] || 0,
    0
  );

  const endDateTime =
    new Date(endDateObj);

  endDateTime.setHours(
    endParts[0],
    endParts[1],
    endParts[2] || 0,
    0
  );

  return {
    startDateTime,
    endDateTime
  };

}

export function checkOverlap(
  records
) {

  const overlaps = [];

  const overlapMap =
    new Map();

  records.forEach(
    (record) => {

      const key =
`${record.equipment}|
${record.flightNo}
|${record.regn}
|${record.bayNo}`;

      const interval =
        buildDateTime(
          record.endDate,
          record.startTime,
          record.endTime
        );

      if (!interval) {
        return;
      }

      if (
        !overlapMap.has(key)
      ) {
        overlapMap.set(
          key,
          []
        );
      }

      overlapMap
        .get(key)
        .push({

          ...record,

          start:
            interval.startDateTime,

          end:
            interval.endDateTime

        });

    }
  );

  overlapMap.forEach(
    (group) => {

      group.sort(
        (a, b) =>
          a.start - b.start
      );

      for (
        let i = 0;
        i < group.length;
        i++
      ) {

        for (
          let j = i + 1;
          j < group.length;
          j++
        ) {

          const a =
            group[i];

          const b =
            group[j];

          if (
            a.start < b.end &&
            b.start < a.end
          ) {

            overlaps.push({

              excelRow1:
                a.excelRowNumber,

              excelRow2:
                b.excelRowNumber,

              srNo1:
                a.srNo,

              srNo2:
                b.srNo,

              flightNo:
                a.flightNo,

              regn:
                a.regn,

              bayNo:
                a.bayNo,

              equipment:
                a.equipment,

              record1:
`${a.startDate} ${a.startTime}
→
${a.endDate} ${a.endTime}`,

              record2:
`${b.startDate} ${b.startTime}
→
${b.endDate} ${b.endTime}`

            });

          }

        }

      }

    }
  );

  return overlaps;

}