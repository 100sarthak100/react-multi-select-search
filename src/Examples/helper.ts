const API_URL = "https://dummyjson.com/products/search";

export const fetchData = async (query: string) => {
  const res = await fetch(`${API_URL}?q=${query}`);
  const data = await res.json();

  return data?.products?.map((item: any) => item?.title)
};
