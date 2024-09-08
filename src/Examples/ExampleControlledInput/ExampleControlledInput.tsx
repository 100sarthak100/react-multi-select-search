import { useRef, useState } from "react";

import Search from "../../components/Search/Search";

const ExampleControlledInput = () => {
  const [data] = useState<string[]>(["Dog", "Cat", "Horse"]);
  const [selectedChips, setSelectedChips] = useState<string[]>(["Dog"]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQueryChange = (query: string) => {
    // Handle the query change
    console.log("Query changed:", query);
  };

  const handleChipsChange = (chips: string[]) => {
    setSelectedChips(chips);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>Search with Pre-Selected Chips</h3>

      <Search
        data={data}
        inputRef={inputRef}
        placeholder="Search animals..."
        preSelectedChips={selectedChips}
        onQueryChange={handleQueryChange}
        onChipsChange={handleChipsChange}
      />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default ExampleControlledInput;
