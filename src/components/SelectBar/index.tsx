import "./select-bar.css";

interface SelectBarProps extends React.HTMLAttributes<HTMLElement> {
  values: string[];
  handleSelect: (value: string) => void;
  active?: string;
}

const SelectBar: React.FC<SelectBarProps> = ({
  values,
  handleSelect,
  active,
}) => (
  <div className="select-bar">
    {values.map((value) => (
      <div
        key={value}
        className={`option${active === value ? " active" : ""}`}
        onClick={() => handleSelect(value)}
      >
        {value}
      </div>
    ))}
  </div>
);

export default SelectBar;
