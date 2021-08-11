import { React, useEffect, useState } from "react";

const Pager = ({ page, totalPage, setPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    console.log("page useEffect");
    var tempPages;
    var start;
    var rowLength;

    // case 1: front
    if (page === 1 || page === 2) {
      start = 2;
      rowLength = 2;
    } else if (page === totalPage - 1 || page === totalPage) {
      start = totalPage - 2;
      rowLength = 2;
    } else {
      start = page - 1;
      rowLength = 3;
    }

    tempPages = buildPages(start, rowLength);
    setPages(tempPages);

    // eslint-disable-next-line
  }, [page]);

  const buildPages = (start, rowLength) => {
    const tempPages = [];
    for (let i = start; i < start + rowLength; ++i) {
      tempPages.push(
        <li
        key={i}
          className={page === i ? "page-item-selected" : "page-item"}
          onClick={() => {
            setPage(i);
          }}
        >
          <span>{i}</span>
        </li>
      );
    }
    return tempPages;
  };

  return (
    <nav className="mb-10 flex justify-center items-center">
      <ul className="flex w-min divide-solid divide-x-2 divide-green-400 border-2 border-green-400 rounded-md">
        {/* previous page */}
        {page === 1 || (
          <li
            className="page-item"
            onClick={() => {
              if (page !== 1) setPage(page - 1);
            }}
          >
            <span>&lt;</span>
          </li>
        )}

        {/* pages */}
        {/* first page */}
        <li
          className={page === 1 ? "page-item-selected" : "page-item"}
          onClick={() => {
            setPage(1);
          }}
        >
          <span>1</span>
        </li>

        {/* pages in the middle, 3 of them */}
        {pages}

        {/* last page */}
        {totalPage === 1 ? (
          <></>
        ) : (
          <li
            key={totalPage}
            className={page === totalPage ? "page-item-selected" : "page-item"}
            onClick={() => {
              setPage(totalPage);
            }}
          >
            {totalPage}
          </li>
        )}

        {/* next page */}
        {page === totalPage || (
          <li
            className="page-item"
            onClick={() => {
              if (page !== totalPage) setPage(page + 1);
            }}
          >
            <span>&gt;</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pager;
