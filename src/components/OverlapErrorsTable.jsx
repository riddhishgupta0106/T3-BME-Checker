function OverlapErrorsTable({
  data
}) {

  if (!data || data.length === 0) {

    return (
      <div style={{ marginTop: "30px" }}>

        <h2>
          Overlap / Duplicate / Reconnection Issues
        </h2>

        <p
          style={{
            color: "green",
            fontWeight: "bold"
          }}
        >
          No issues found.
        </p>

      </div>
    );

  }

  return (

    <div style={{ marginTop: "30px" }}>

      <h2>
        Overlap / Duplicate / Reconnection Issues
      </h2>

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

            <th>Issues Found</th>

            <th>Excel Row 1</th>
            <th>Excel Row 2</th>

            <th>SR No 1</th>
            <th>SR No 2</th>

            <th>Flight No</th>

            <th>Equipment</th>

            <th>Category</th>

            <th>REGN</th>

            <th>Bay No</th>

            <th>Remarks</th>

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr key={index}>

              <td
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                {row.issueTypes.join(", ")}
              </td>

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
                {row.category}
              </td>

              <td>
                {row.regn}
              </td>

              <td>
                {row.bayNo}
              </td>

              <td>
                {row.remarks}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default OverlapErrorsTable;