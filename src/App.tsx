import "./App.css";
import Search from "./components/Search/Search";
import useGetSearchResult from "./hooks/useGetSearchResult";

const App = () => {
  const { fetchResult, data, error, loading } = useGetSearchResult<string>();

  const onChipsChange = (chips: any) => {
    console.log("chips", chips);
  };

  const onQueryChange = (query: string) => {
    fetchResult(query);
  };

  return (
    <div className="root">
      <div className="search-container">
        <Search
          data={data}
          error={error}
          loading={loading}
          onQueryChange={onQueryChange}
          onChipsChange={onChipsChange}
        />
      </div>
    </div>
  );
};

export default App;
