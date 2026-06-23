function AbnormalUsageTable({
  data,
  threshold
}) {

  if (!data || data.length === 0) {
    return (
      <div style={{ marginTop: "30px" }}>
        <h2>Abnormal Usage</h2>

        <p
          style={{
            color: "green",
            fontWeight: "bold"
          }}
        >
          No abnormal usage found.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>

      <h2>Abnormal Usage</h2>

      <table
        border="1"
        cellPadding="5"
        style={{
          borderCollapse: "collapse",
          width: "100%"
        }}
      >

        <thead>
          <tr>

            <th>Excel Row</th>
            <th>SR No</th>

            <th>Flight No</th>

            <th>Airline</th>

            <th>Equipment</th>

            <th>Category</th>

            <th>Body Type</th>

            <th>Consumption (Min)</th>

            <th>Threshold (Min)</th>

            <th>Excess (Min)</th>

          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr key={index}>

              <td>
              {row.excelRowNumber}
              </td>

            <td>
                {row.srNo}
              </td>

              <td>
                {row.flightNo}
              </td>

              <td>
                {row.airline}
              </td>

              <td>
                {row.equipment}
              </td>

              <td>
                {row.category}
              </td>

              <td>
                {row.bodyType}
              </td>

              <td>
                {row.actualConsumption}
              </td>

              <td>
                {threshold}
              </td>

              <td
                style={{
                  color: "red",
                  fontWeight: "bold"
                }}
              >
                {row.actualConsumption - threshold}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AbnormalUsageTable;