function OverlapErrorsTable({
  data
}) {

  if (!data || data.length === 0) {
    return (
      <div style={{ marginTop: "30px" }}>
        <h2>Overlap Records</h2>

        <p
          style={{
            color: "green",
            fontWeight: "bold"
          }}
        >
          No overlap found.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>

      <h2>Overlap Records</h2>

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

            <th>Excel Row 1</th>
            <th>Excel Row 2</th>

            <th>SR No 1</th>
            <th>SR No 2</th>

            <th>Flight No</th>

            <th>Equipment</th>

            <th>REGN</th>

            <th>Bay No</th>

            <th>Record 1</th>

            <th>Record 2</th>

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr key={index}>

              <td>
                {row.excelRow1}
              </td>

              <td>
                {row.excelRow2}
              </td>

              <td>
                {row.srNo1}
              </td>

              <td>
                {row.srNo2}
              </td>

              <td>
                {row.flightNo}
              </td>

              <td>
                {row.equipment}
              </td>

              <td>
                {row.regn}
              </td>

              <td>
                {row.bayNo}
              </td>

              <td>
                {row.record1}
              </td>

              <td>
                {row.record2}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OverlapErrorsTable;