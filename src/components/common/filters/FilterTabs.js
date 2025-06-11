const FilterTabs = ({ tabs = [], selected, onChange }) => {
  return (
    <div 
      className="flex space-x-4 mt-10 border-b" 
      style={{ borderColor: 'var(--color-border)' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            borderColor: selected === tab 
              ? 'var(--color-secondary)'
              : 'transparent',
            color: selected === tab 
              ? 'var(--color-secondary)'
              : 'var(--color-text-accent)',
          }}
          className={`py-2 px-4 font-medium text-sm transition-colors duration-200 border-b-2 ${
            selected !== tab ? 'hover:text-[var(--color-text-accent)]' : ''
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
