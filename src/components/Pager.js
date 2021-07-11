import React from "react";

const Pager = ({ page, totalPage, setPage }) => {
  return (
    <nav className="mb-10 flex justify-center items-center">
      <ul className="flex w-min divide-solid divide-x-2 divide-green-400 border-2 border-green-400 rounded-md">
        {/* previous page */}
        <li
          className="page-item"
          onClick={() => {
            if (page !== 1) setPage(page - 1);
          }}
        >
          <span>&lt;</span>
        </li>

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
        {page === 1 || page === 2 || (
          <li
            className="page-item"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <span>{page - 1}</span>
          </li>
        )}
        <li
          className={page === 1 ? "page-item" : "page-item-selected"}
          onClick={() => {
            page === 1 ? setPage(page + 1) : setPage(page);
          }}
        >
          <span>{page === 1 ? page + 1 : page}</span>
        </li>
        <li
          className="page-item"
          onClick={() => {
            page === 1 ? setPage(page + 2) : setPage(page + 1);
          }}
        >
          <span>{page === 1 ? page + 2 : page + 1}</span>
        </li>

        {/* last page */}
        {page === totalPage ? (
          <></>
        ) : (
          <li key={totalPage} className="page-item">
            {totalPage}
          </li>
        )}

        {/* next page */}
        <li
          className="page-item"
          onClick={() => {
            if (page !== totalPage) setPage(page + 1);
          }}
        >
          <span>&gt;</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pager;
