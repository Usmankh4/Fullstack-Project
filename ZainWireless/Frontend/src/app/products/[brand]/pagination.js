"use client";

import Link from 'next/link';

export function Pagination({ currentPage, pageCount, brand }) {
  return (
    <div className="pageButton">
      <Link 
        href={`/products/${brand}?page=${currentPage - 1}`}
        className={currentPage <= 1 ? "disabled" : ""}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
      >
        <button disabled={currentPage <= 1}>Previous</button>
      </Link>
      
      <span className="pageInfo">
        Page {currentPage} of {pageCount || 1}
      </span>
      
      <Link 
        href={`/products/${brand}?page=${currentPage + 1}`}
        className={currentPage >= pageCount ? "disabled" : ""}
        aria-disabled={currentPage >= pageCount}
        tabIndex={currentPage >= pageCount ? -1 : 0}
      >
        <button disabled={currentPage >= pageCount}>Next</button>
      </Link>
    </div>
  );
}
