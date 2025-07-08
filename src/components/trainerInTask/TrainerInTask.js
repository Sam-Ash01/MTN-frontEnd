import React, { useState } from 'react';
import CategoryItem from '../categoryItem/CategoryItem';
import '../../App.css';

const TrainerInTask = ({ name, categories, onDropCategory, isResetting }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Option 1');
  const [justDropped, setJustDropped] = useState(false);

  const colorCycle = ['bg-category-one', 'bg-category-two', 'bg-category-three'];

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/categories');
    if (!data) return;

    let incomingCategories = [];

    try {
      incomingCategories = JSON.parse(data);
    } catch {
      return;
    }

    incomingCategories.forEach((cat) => {
      if (!categories.includes(cat)) {
        onDropCategory(name, cat);
      }
    });

    setJustDropped(true);
    setTimeout(() => setJustDropped(false), 300);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`w-36 rounded-lg bg-[var(--color-trainer-task)] p-4 text-center shadow-md transition-transform duration-300 ${
        justDropped ? 'scale-105 bg-green-100' : ''
      }`}
    >
      <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">{name}</h3>
      <div className="border-t border-white my-2" />

      <div className="relative text-left w-full mb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-[16px] font-semibold text-[var(--color-text-main)] flex items-center justify-between px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {selected}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute left-0 mt-1 w-full bg-[var(--color-bg)] rounded shadow-lg z-10 text-sm text-[var(--color-text-main)]">
            {['Option 1', 'Option 2', 'Option 3'].map((option) => (
              <li
                key={option}
                className="px-3 py-2 hover:bg-[var(--color-surface)] cursor-pointer"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-white my-3" />

      <div className="space-y-3">
        {categories.map((cat, index) => (
          <div
            key={cat}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData('category-from-trainer', JSON.stringify({ cat, trainer: name }))
            }
            className={`cursor-pointer ${isResetting ? 'animate-pulse' : ''}`}
          >
            <CategoryItem name={cat} colorClass={colorCycle[index % colorCycle.length]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerInTask;
