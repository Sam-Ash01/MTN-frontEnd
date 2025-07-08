import React, { useEffect, useState } from 'react';

function StatCard({ title, count, icon: Icon, iconColorVar }) {
  const [iconBgColor, setIconBgColor] = useState('rgba(0,0,0,0.1)');
  const iconColor = `var(${iconColorVar || '--color-primary'})`;

  useEffect(() => {
    const hex = getComputedStyle(document.documentElement).getPropertyValue(iconColorVar)?.trim();
    if (hex?.startsWith('#')) {
      const rgb = hexToRgb(hex);
      if (rgb) setIconBgColor(`rgba(${rgb}, 0.2)`);
    }
  }, [iconColorVar]);

  return (
    <div className="bg-[var(--color-bg)] rounded-2xl shadow-md p-4 flex items-center gap-4 w-full">
      <div
        className="rounded-full p-3"
        style={{
          backgroundColor: iconBgColor,
          color: iconColor,
        }}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-accent)]">{title}</p>
        <h2 className="text-xl font-bold text-[var(--color-text-main)]">
          {count.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return null;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default StatCard;
