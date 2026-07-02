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

  const results = [];

  const grouped =
    new Map();

  records.forEach(
    (record) => {

      const interval =
        buildDateTime(
          record.endDate,
          record.startTime,
          record.endTime
        );

      if (!interval) {
        return;
      }

      const key =
`${record.equipment}|
${record.category}|
${record.regn}|
${record.bayNo}`;

      if (
        !grouped.has(key)
      ) {
        grouped.set(
          key,
          []
        );
      }

      grouped
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

  grouped.forEach(
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

          const issueTypes =
            [];

          const remarks =
            [];

          // OVERLAP

          if (
            a.start < b.end &&
            b.start < a.end
          ) {

            issueTypes.push(
              "OVERLAP"
            );

            remarks.push(
              "Same REGN and Bay have overlapping usage periods."
            );

          }

          // DUPLICATE START DATE

          if (
            a.startDate &&
            b.startDate &&
            a.startDate ===
            b.startDate
          ) {

            issueTypes.push(
              "DUPLICATE_START_DATE"
            );

            remarks.push(
              `Duplicate Start Date (${a.startDate}) found.`
            );

          }

          // DUPLICATE END DATE

          if (
            a.endDate &&
            b.endDate &&
            a.endDate ===
            b.endDate
          ) {

            issueTypes.push(
              "DUPLICATE_END_DATE"
            );

            remarks.push(
              `Duplicate End Date (${a.endDate}) found.`
            );

          }

          // RECONNECTED

          const gapMinutes =
            (
              b.start -
              a.end
            ) /
            (1000 * 60);

          if (
            gapMinutes >= 0 &&
            gapMinutes <= 120
          ) {

            issueTypes.push(
              "RECONNECTED_WITHIN_2_HOURS"
            );

            remarks.push(
              `Aircraft reconnected within ${Math.round(gapMinutes)} minutes.`
            );

          }

          // ADD ONLY ONCE

          if (
            issueTypes.length >
            0
          ) {

            results.push({

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

              equipment:
                a.equipment,

              category:
                a.category,

              regn:
                a.regn,

              bayNo:
                a.bayNo,

              issueTypes,

              remarks:
                remarks.join(
                  " | "
                ),

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

  return results;

}