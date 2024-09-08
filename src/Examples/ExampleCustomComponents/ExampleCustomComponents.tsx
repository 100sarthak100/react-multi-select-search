import React from "react";

import CustomChip from "./CustomChip";
import CustomListItem from "./CustomListItem";
import Search from "../../components/Search/Search";

const ExampleCustomComponents = () => {
  const data = ["Apple", "Banana", "Orange"];
  const [_, setSelectedItems] = React.useState<string[]>([]);

  const handleQueryChange = (query: string) => {
    // Logic to filter or fetch data based on query
    console.log("query", query)
  };

  const handleChipsChange = (chips: string[]) => {
    setSelectedItems(chips);
  };

  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>Search with Custom Components</h3>

      <Search
        data={data}
        ChipComponent={CustomChip}
        placeholder="Search for fruits..."
        onQueryChange={handleQueryChange}
        onChipsChange={handleChipsChange}
        ListItemComponent={CustomListItem}
      />
    </div>
  );
};

export default ExampleCustomComponents;
