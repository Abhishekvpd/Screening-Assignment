"use client";

import { useState } from "react";

const Paginator = ({ totalPages = 10 }) => {
  const [currentPage, setCurrentPage] = useState(5);

  const renderPages = () => {
    const pages = [];
    const displayRange = 3; // Number of pages to display before and after current page
    const ellipsis = <span key="ellipsis">...</span>;

    // Render previous pages
    for (
      let i = Math.max(1, currentPage - displayRange);
      i < currentPage;
      i++
    ) {
      pages.push(
        <span key={i} onClick={() => handlePageChange(i)}>
          {i}
        </span>,
      );
    }

    // Render current page
    pages.push(
      <span
        key={currentPage}
        onClick={() => handlePageChange(currentPage)}
        className="current-page"
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
        <span key={i} onClick={() => handlePageChange(i)}>
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

  const handlePageChange = (page: number) => {};
  const goToPreviousPage = () => {};
  const goToNextPage = () => {};
  const goToFirstPage = () => {};
  const goToLastPage = () => {};
  return (
    <div>
      <span onClick={goToFirstPage}>&lt;&lt;</span>
      <span onClick={goToPreviousPage}>&lt;</span>
      {renderPages()}
      <span onClick={goToNextPage}>&gt;</span>
      <span onClick={goToLastPage}>&gt;&gt;</span>
    </div>
  );
};

export default Paginator;
