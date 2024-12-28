import { SetStateAction, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const paginationArray = [];

    // Always show first two pages and the last page
    paginationArray.push(
      <li
        key={1}
        className={`flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold ${
          currentPage === 1 ? "bg-[#007bff] text-white" : "text-[#333]"
        } w-9 h-8 rounded`}
        onClick={() => handlePageClick(1)}
      >
        1
      </li>
    );

    paginationArray.push(
      <li
        key={2}
        className={`flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold ${
          currentPage === 2 ? "bg-[#007bff] text-white" : "text-[#333]"
        } w-9 h-8 rounded`}
        onClick={() => handlePageClick(2)}
      >
        2
      </li>
    );

    // Show "..." if current page is beyond page 3
    if (currentPage > 3) {
      paginationArray.push(
        <li
          key="dots"
          className="flex items-center justify-center shrink-0 text-sm text-[#333] w-9 h-8 rounded"
        >
          ...
        </li>
      );
    }

    // Show the current page if it's beyond the first two pages
    if (currentPage > 2 && currentPage < totalPages) {
      paginationArray.push(
        <li
          key={currentPage}
          className="flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold bg-[#007bff] text-white w-9 h-8 rounded"
          onClick={() => handlePageClick(currentPage)}
        >
          {currentPage}
        </li>
      );
    }

    // Always show last page
    paginationArray.push(
      <li
        key={totalPages}
        className={`flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold ${
          currentPage === totalPages ? "bg-[#007bff] text-white" : "text-[#333]"
        } w-9 h-8 rounded`}
        onClick={() => handlePageClick(totalPages)}
      >
        {totalPages}
      </li>
    );

    return paginationArray;
  };

  return (
    <ul className="flex space-x-3 justify-center mt-8">
      {/* Previous button */}
      <li
        className={`flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handlePrevious}
      >
        <FaChevronLeft className="w-3 text-gray-500" />
      </li>

      {/* Page numbers */}
      {renderPagination()}

      {/* Next button */}
      <li
        className={`flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleNext}
      >
        <FaChevronRight className="w-3 text-gray-500" />
      </li>
    </ul>
  );
};

export default Pagination;
