
export const StatusBadge = ({ value, colorMap = {}, defaultColor = {} }) => {
  const color = colorMap[value] || defaultColor || {
    bg: 'var(--color-status-default-bg)',
    text: 'var(--color-status-default)',
  };

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: color.bg,
        color: color.text,
      }}
    >
      {value}
    </span>
  );
};
