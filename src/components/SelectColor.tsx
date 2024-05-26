const SelectColor: React.FC<{
  color: string;
  selectedColor: string;
  onSelectColor: (color: string) => void;
}> = ({ color, selectedColor, onSelectColor }) => {
  return (
    <div
      className={`${
        selectedColor === color ? "border-2" : ""
      } h-[24px] w-[24px] flex items-center justify-center rounded-full mr-1`}>
      <div
        className={`h-[16px] w-[16px] rounded-full  cursor-pointer`}
        style={{ backgroundColor: `${color}` }}
        onClick={() => onSelectColor(color)}></div>
    </div>
  );
};

export default SelectColor;
