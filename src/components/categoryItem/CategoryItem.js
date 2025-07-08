import React from 'react';

const CategoryItem = ({ name, colorClass }) => {
  return (
    <div
      className={`text-center text-[15px] py-2 rounded-md text-black font-medium ${colorClass}`}
    >
      {name}
    </div>
  );
};

export default CategoryItem;
