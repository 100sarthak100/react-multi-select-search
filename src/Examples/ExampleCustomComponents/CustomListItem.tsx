const CustomListItem = ({
  label,
  isFocused,
  onClick,
}: {
  label: string;
  isFocused: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px",
        backgroundColor: isFocused ? "#f0f0f0" : "#fff",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
};

export default CustomListItem;
