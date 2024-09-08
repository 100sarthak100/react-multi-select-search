import { useState } from "react";

import { fetchData } from "../helper";
import Search from "../../components/Search/Search";

const ExampleBasicSearch = () => {
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
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '10px' }}>Basic Search</h3>

      <Search
        data={data}
        error={error}
        loading={loading}
        onQueryChange={handleQueryChange}
        placeholder="Type to search..."
      />
    </div>
  );
};

export default ExampleBasicSearch;
