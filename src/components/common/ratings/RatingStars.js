import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ value = 0, onChange }) => {
  const handleClick = (i) => {
    if (i === 1 && value === 1) {
      onChange(0); // allow clearing when clicking 1 again
    } else {
      onChange(i);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={18}
          className={`cursor-pointer transition ${
            i <= value
              ? 'fill-[var(--color-primary)] stroke-[var(--color-primary)]'
              : 'stroke-[var(--color-text-muted)]'
          }`}
          onClick={() => handleClick(i)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
