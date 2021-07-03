import React from "react";

const Bio = ({ biography }) => {
  return (
    <div className="mb-10">
      <h1 className="font-bold text-2xl">Biography</h1>
      <div className="p-2"></div>
      <p>{biography || "Not available"}</p>
    </div>
  );
};

export default Bio;
