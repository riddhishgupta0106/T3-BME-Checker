function ErrorTable({ title, data }) {

    if (!data || data.length === 0) {
      return null;
    }
  
    return (
      <div style={{ marginTop: "30px" }}>
  
        <h2>{title}</h2>
  
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
              <th>Flight No</th>
              <th>Airline</th>
              <th>Equipment</th>
              <th>Category</th>
              <th>Body Type</th>
              <th>Consumption</th>
              <th>Expected</th>
              <th>Actual</th>
              <th>Difference</th>
            </tr>
          </thead>
  
          <tbody>
  
            {data.map((row, index) => (
  
              <tr key={index}>
  
                <td>{row.flightNo}</td>
  
                <td>{row.airline}</td>
  
                <td>{row.equipment}</td>
  
                <td>{row.category}</td>
  
                <td>{row.bodyType}</td>
  
                <td>{row.actualConsumption}</td>
  
                <td>{row.expectedCharge ?? "-"}</td>
  
                <td>{row.actualCharge ?? "-"}</td>
  
                <td>{row.difference ?? "-"}</td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default ErrorTable;