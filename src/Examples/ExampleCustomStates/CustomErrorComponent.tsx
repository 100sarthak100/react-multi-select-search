import { CloseCircleOutlined } from "@ant-design/icons";

const CustomErrorComponent = ({ message }: { message: string }) => {
  return (
    <div style={{ color: "red", textAlign: "center", padding: "10px" }}>
      <CloseCircleOutlined style={{ fontSize: "24px" }} />
      <p>{message}</p>
    </div>
  );
};

export default CustomErrorComponent;
