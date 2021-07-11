import { React, useEffect, useState } from "react";

const Pager = ({ page, totalPage }) => {
  console.log("page: " + page);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    var tempPages = pages;
    if (page <= 3) {
      for (let i = 1; i <= 3; ++i) {
        tempPages.push(
          <li className={page === i ? "page-item-selected" : "page-item"}>
            <span>{i}</span>
          </li>
        );
      }
      setPages(tempPages);
      setIsLoading(false);
      return;
    } else if (page - 2 <= totalPage) {
      console.log("else");
      for (let i = totalPage - 2; i <= totalPage; ++i) {
        tempPages.push(
          <li className="page-item">
            <span>{i}</span>
          </li>
        );
      }
      setPages(tempPages);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [page]);

  if (isLoading) {
    return <></>;
  }

  return (
    <nav className="mb-10 flex justify-center items-center">
      <ul className="flex w-min divide-solid divide-x-2 divide-green-400 border-2 border-green-400 rounded-md">
        {/* previous page */}
        <li className="page-item">
          <span>&lt;</span>
        </li>

        {/* pages */}
        {/* first page */}
        {page === 1 ? (
          <></>
        ) : (
          <li className="page-item">
            <span>1</span>
          </li>
        )}

        {pages}

        {/* last page */}
        {page === totalPage ? (
          <></>
        ) : (
          <li className="page-item">{totalPage}</li>
        )}

        {/* next page */}
        <li className="page-item">
          <span>&gt;</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pager;
