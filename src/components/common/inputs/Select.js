import React from 'react';

const Select = ({ label, value, onChange, options = [], error }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 rounded-lg border outline-none transition
          bg-[var(--color-white)]
          border-[var(--color-border)]
          text-sm
          focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]
          ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : ''
          }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;
