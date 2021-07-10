import React from "react";

const Pager = () => {
  return (
    <nav className="mb-10 flex justify-center items-center">
      <ul className="flex w-min divide-solid divide-x-2 divide-green-400 border-2 border-green-400 rounded-md">
        <li className="page-item">previous</li>
        <li className="page-item">first</li>
        <li className="page-item">1</li>
        <li className="page-item">2</li>
        <li className="page-item">3</li>
        <li className="page-item">4</li>
        <li className="page-item">5</li>
        <li className="page-item">last</li>
        <li className="page-item">next</li>
      </ul>
    </nav>
  );
};

export default Pager;
