import React from "react";

const Bio = ({ biography }) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Biography</h1>
      <div className="p-2"></div>
      <p>{biography}</p>
    </div>
  );
};

export default Bio;
