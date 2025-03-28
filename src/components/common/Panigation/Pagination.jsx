import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPages = 4, onPageChange }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePageClick = (index) => {
    setActiveIdx(index);
    onPageChange && onPageChange(index + 1);
  };

  const handleControlClick = (diff) => {
    const newIdx = activeIdx + diff;
    if (newIdx >= 0 && newIdx < totalPages) {
      setActiveIdx(newIdx);
      onPageChange && onPageChange(newIdx + 1);
    }
  };

  return (
    <div className="text-gray-300 flex items-center space-x-2 select-none">
      <button
        className="h-8 w-8 p-1 hover:bg-gray-700 rounded"
        onClick={() => handleControlClick(-1)}
        disabled={activeIdx === 0}
      >
        <FaAngleLeft />
      </button>
      <div className="space-x-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-2 rounded ${
              activeIdx === index ? "bg-gray-300 text-gray-800" : "hover:bg-gray-700"
            }`}
            onClick={() => handlePageClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="h-8 w-8 p-1 hover:bg-gray-700 rounded"
        onClick={() => handleControlClick(1)}
        disabled={activeIdx === totalPages - 1}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
