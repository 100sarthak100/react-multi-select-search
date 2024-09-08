import { FileSearchOutlined } from "@ant-design/icons";

const CustomEmptyComponent = ({ query }: { query?: string }) => {
  return (
    <div style={{ textAlign: "center", padding: "10px", color: "#aaa" }}>
      <FileSearchOutlined style={{ fontSize: "24px" }} />
      <p>No results found for "{query}". Try again with a different query.</p>
    </div>
  );
};

export default CustomEmptyComponent;
