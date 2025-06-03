const FilterButton = ({ label, className = "", onClick, active }) => (
    <button 
        className={`bg-[#101111] text-white text-sm rounded-xl flex items-center gap-2 px-4 py-2 ${className} ${active ? "bg-[#1D1F28]" : ""}`}
        onClick={() => onClick(label)}
    >
        {label}
    </button>
);

export default FilterButton;
