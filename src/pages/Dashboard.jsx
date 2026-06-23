import DELErrorsTable from "../components/DELErrorsTable";
import OverlapErrorsTable from "../components/OverlapErrorsTable";
import { useState } from "react";
import UploadSection from "../components/UploadSection";

import ChargeErrorsTable from "../components/ChargeErrorsTable";
import AbnormalUsageTable from "../components/AbnormalUsageTable";

import { parseExcel } from "../utils/parseExcel";

import { checkCharges } from "../checkers/chargesChecker";
import { checkAbnormalUsage } from "../checkers/abnormalUsageChecker";
import { checkDEL } from "../checkers/delChecker";
import { checkOverlap } from "../checkers/overlapChecker";

function Dashboard() {

  const [airline, setAirline] =
    useState("airindia");

  const [rawData, setRawData] =
    useState([]);

  const [records, setRecords] =
    useState([]);

  const [chargeErrors, setChargeErrors] =
    useState([]);

  const [abnormalErrors, setAbnormalErrors] =
    useState([]);

  const [delErrors, setDelErrors] =
    useState([]);

  const [overlapErrors, setOverlapErrors] =
    useState([]);

  const [abnormalThreshold,
    setAbnormalThreshold] =
    useState(600);

  const processData = () => {

    const parsed =
      parseExcel(rawData);

    setRecords(parsed);

  };

  const runValidation = () => {

    const chargeResults =
      checkCharges(
        records,
        airline
      );

    const abnormalResults =
      checkAbnormalUsage(
        records,
        abnormalThreshold
      );

    const delResults =
      checkDEL(records);

    const overlapResults =
      checkOverlap(records);

    setChargeErrors(
      chargeResults
    );

    setAbnormalErrors(
      abnormalResults
    );

    setDelErrors(
      delResults
    );

    setOverlapErrors(
      overlapResults
    );

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>
        Terminal 3 BME Checker
      </h1>

      <label>
        Select Airline Logic
      </label>

      <br />
      <br />

      <select
        value={airline}
        onChange={(e) =>
          setAirline(
            e.target.value
          )
        }
      >

        <option value="airindia">
          Air India
        </option>

        <option value="others">
          Other Airlines
        </option>

      </select>

      <br />
      <br />

      <UploadSection
        setRawData={setRawData}
      />

      <br />

      <h3>
        Rows Loaded:
        {" "}
        {rawData.length}
      </h3>

      <div
        style={{
          marginTop: "20px"
        }}
      >

        <label>
          Abnormal Usage Threshold (Minutes)
        </label>

        <br />
        <br />

        <input
          type="number"
          value={abnormalThreshold}
          onChange={(e) =>
            setAbnormalThreshold(
              Number(
                e.target.value
              )
            )
          }
          style={{
            width: "150px",
            padding: "8px"
          }}
        />

      </div>

      <br />

      <button
        onClick={processData}
      >
        Parse Excel
      </button>

      <button
        onClick={runValidation}
        style={{
          marginLeft: "10px"
        }}
      >
        Run Validation
      </button>

      <br />
      <br />

      <h3>
        Parsed Records:
        {" "}
        {records.length}
      </h3>

      <hr />

      <h2>
        Validation Summary
      </h2>

      <h3>
        Charge Errors:
        {" "}
        {chargeErrors.length}
      </h3>

      <h3>
        Abnormal Usage:
        {" "}
        {abnormalErrors.length}
      </h3>

      <h3>
        DEL Errors:
        {" "}
        {delErrors.length}
      </h3>

      <h3>
        Overlap Errors:
        {" "}
        {overlapErrors.length}
      </h3>

      <ChargeErrorsTable
        data={chargeErrors}
      />

      <AbnormalUsageTable
        data={abnormalErrors}
        threshold={abnormalThreshold}
      />

      <DELErrorsTable
        data={delErrors}
      />

      <OverlapErrorsTable
        data={overlapErrors}
      />

    </div>

  );

}

export default Dashboard;