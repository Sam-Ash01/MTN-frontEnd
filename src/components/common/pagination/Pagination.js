// components/common/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full mt-4 flex justify-end">
      <div className="inline-flex items-center space-x-1 text-xs sm:text-sm">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={`px-2 py-1 rounded-md transition ${
            currentPage === 1
              ? 'text-[var(--color-text-muted)] cursor-not-allowed'
              : 'text-[var(--color-status-open)] hover:bg-[var(--color-border)]'
          }`}
          disabled={currentPage === 1}
        >
          &lt; Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md transition border text-xs sm:text-sm ${
              page === currentPage
                ? 'bg-[var(--color-status-open)] text-[var(--color-bg)] font-medium'
                : 'text-[var(--color-status-open)] hover:bg-[var(--color-border)]'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          className={`px-2 py-1 rounded-md transition ${
            currentPage === totalPages
              ? 'text-[var(--color-text-muted)] cursor-not-allowed'
              : 'text-[var(--color-status-open)] hover:bg-[var(--color-border)]'
          }`}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
