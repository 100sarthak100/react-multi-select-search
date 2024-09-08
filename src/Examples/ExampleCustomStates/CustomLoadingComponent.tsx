import { LoadingOutlined } from "@ant-design/icons";

const CustomLoadingComponent = () => {
  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <LoadingOutlined style={{ fontSize: "24px", color: "blue" }} spin />
      <p>Loading...</p>
    </div>
  );
};

export default CustomLoadingComponent;
