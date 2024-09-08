import { useState } from "react";

import { fetchData } from "../helper";
import Search from "../../components/Search/Search";
import CustomErrorComponent from "./CustomErrorComponent";
import CustomEmptyComponent from "./CustomEmptyComponent";
import CustomLoadingComponent from "./CustomLoadingComponent";

const ExampleCustomStates = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQueryChange = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate an API call
      const result = await fetchData(query); // fetchData is a mock function or real API call
      setData(result);
    } catch (err) {
      setError("API failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '10px' }}>Search with Custom States</h3>

      <Search
        data={data}
        error={error}
        loading={loading}
        onQueryChange={handleQueryChange}
        placeholder="Search for something..."
        ErrorComponent={CustomErrorComponent}
        EmptyComponent={CustomEmptyComponent}
        LoadingComponent={CustomLoadingComponent}
      />
    </div>
  );
};

export default ExampleCustomStates;
