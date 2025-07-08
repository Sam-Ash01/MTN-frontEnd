import React from 'react';
import { FaPlus } from 'react-icons/fa';

const FAB = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white p-4 rounded-full shadow-lg transition-all duration-300"
      aria-label="Add"
    >
      <FaPlus />
    </button>
  );
};

export default FAB;
