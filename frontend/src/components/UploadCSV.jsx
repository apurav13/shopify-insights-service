import React from "react";
import Papa from "papaparse";

const UploadCSV = ({ onData }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        onData(results.data);
      },
    });
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="text-sm text-gray-300"
      />
    </div>
  );
};

export default UploadCSV;
