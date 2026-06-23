function DELErrorsTable({ data }) {

  if (!data || data.length === 0) {
    return (
      <div style={{ marginTop: "30px" }}>
        <h2>DEL Records</h2>

        <p
          style={{
            color: "green",
            fontWeight: "bold"
          }}
        >
          No DEL records found.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>

      <h2>DEL Records</h2>

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

            <th>Bay No</th>

            <th>Origin</th>

            <th>Destination</th>

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
                {row.bayNo}
              </td>

              <td>
                {row.origin}
              </td>

              <td>
                {row.destination}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DELErrorsTable;