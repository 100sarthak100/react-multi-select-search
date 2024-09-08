import { CloseOutlined } from "@ant-design/icons";

const CustomChip = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 10px",
        border: "1px solid #ddd",
        borderRadius: "20px",
        marginRight: "5px",
      }}
    >
      {label}
      <CloseOutlined
        onClick={onRemove}
        style={{ marginLeft: "8px", cursor: "pointer" }}
      />
    </div>
  );
};

export default CustomChip;
