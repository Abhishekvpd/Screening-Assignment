"use client";

import { useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationHandler: (page: number) => void;
};

const Paginator = ({
  currentPage,
  totalPages,
  paginationHandler,
}: PaginationProps) => {
  const renderPages = () => {
    const pages = [];
    const displayRange = currentPage < 4 ? 7 - currentPage : 3; // Number of pages to display before and after current page
    const ellipsis = <span key="ellipsis">...</span>;

    // Render previous pages
    for (
      let i = Math.max(1, currentPage - displayRange);
      i < currentPage;
      i++
    ) {
      pages.push(
        <span key={i} onClick={() => handlePageChange(i)} className="h-6 w-6">
          {i}
        </span>,
      );
    }

    // Render current page
    pages.push(
      <span
        key={currentPage}
        onClick={() => handlePageChange(currentPage)}
        className="h-6 w-6 text-black"
      >
        {currentPage}
      </span>,
    );

    // Render next pages
    for (
      let i = currentPage + 1;
      i <= Math.min(totalPages, currentPage + displayRange);
      i++
    ) {
      pages.push(
        <span key={i} onClick={() => handlePageChange(i)} className="h-6 w-6">
          {i}
        </span>,
      );
    }

    // Add ellipsis if there are pages not currently shown before the first page
    if (currentPage - displayRange > 1) {
      pages.unshift(ellipsis);
    }

    // Add ellipsis if last page is not displayed
    if (currentPage + displayRange < totalPages) {
      pages.push(ellipsis);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    paginationHandler(page);
  };

  const goToPreviousPage = () => {
    paginationHandler(currentPage - 1);
  };
  const goToNextPage = () => {
    paginationHandler(currentPage + 1);
  };

  const goToFirstPage = () => {
    paginationHandler(1);
  };
  const goToLastPage = () => {
    paginationHandler(totalPages);
  };

  return (
    <div className="flex cursor-pointer justify-center gap-2 text-xl font-medium text-[#ACACAC]">
      <span
        onClick={goToFirstPage}
        className={currentPage === 1 ? "pointer-events-none" : ""}
        key={"first"}
      >
        &lt;&lt;
      </span>
      <span
        onClick={goToPreviousPage}
        className={currentPage === 1 ? "pointer-events-none" : ""}
        key={"previous"}
      >
        &lt;
      </span>
      {renderPages()}
      <span
        onClick={goToNextPage}
        className={currentPage === totalPages ? "pointer-events-none" : ""}
        key={"next"}
      >
        &gt;
      </span>
      <span
        onClick={goToLastPage}
        className={currentPage === totalPages ? "pointer-events-none" : ""}
        key={"last"}
      >
        &gt;&gt;
      </span>
    </div>
  );
};

export default Paginator;
