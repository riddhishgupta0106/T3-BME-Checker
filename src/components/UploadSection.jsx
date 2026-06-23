import * as XLSX from "xlsx";

function UploadSection({ setRawData }) {

  const handleFileUpload = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

      const workbook = XLSX.read(
        e.target.result,
        { type: "binary" }
      );

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const data =
        XLSX.utils.sheet_to_json(
          worksheet,
          {
            header: 1,
            defval: ""
          }
        );

        console.log(
          "First 20 Rows:",
          data.slice(0, 20)
        );
        
        setRawData(data);

    };

    reader.readAsBinaryString(file);

  };

  return (
    <div>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
      />

    </div>
  );

}

export default UploadSection;