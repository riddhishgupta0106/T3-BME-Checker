function ChargeErrorsTable({ data }) {

  if (!data || data.length === 0) {
    return (
      <div style={{ marginTop: "30px" }}>
        <h2>Charge Errors</h2>

        <p
          style={{
            color: "green",
            fontWeight: "bold"
          }}
        >
          No charge errors found.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>

      <h2>Charge Errors</h2>

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

            <th>Equipment</th>

            <th>Category</th>

            <th>Body Type</th>

            <th>Consumption (Min)</th>

            <th>Expected Charge</th>

            <th>Actual Charge</th>

            <th>Difference</th>

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
                {row.expectedCharge}
              </td>

              <td>
                {row.actualCharge}
              </td>

              <td
                style={{
                  color:
                    row.difference > 0
                      ? "red"
                      : "green",
                  fontWeight: "bold"
                }}
              >
                {row.difference}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ChargeErrorsTable;