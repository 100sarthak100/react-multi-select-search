import { useCallback, useMemo, useRef, useState } from "react";

import { debounce } from "../helper";

interface UseGetSearchResultReturn<T> {
  data: T[];
  error: string;
  loading: boolean;
  fetchResult: (query: string, options?: RequestInit) => Promise<void>;
}

const API_URL = "https://dummyjson.com/products/search";

const useGetSearchResult = <T,>(): UseGetSearchResultReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchResult = useCallback(
    async (query: string, options: RequestInit = {}) => {
      if (!query) {
        setData([]);
        return;
      }

      // Abort previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new AbortController for the new request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}?q=${encodeURIComponent(query)}`,
          {
            ...options,
            signal: abortController.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          setError(result?.message ?? "Network response was not ok");
          return;
        }

        const modifiedRes = result?.products?.map((item: any) => item?.title);

        setData(modifiedRes);
      } catch (err) {
        if (err?.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          setError(err?.message);
        }
      } finally {
        setLoading(false);

        if (abortControllerRef.current === abortController) {
          abortControllerRef.current = null;
        }
      }
    },
    []
  );

  // Debounce the fetchResult function
  const debouncedFetchResult = useMemo(() => {
    return debounce(fetchResult, 300);
  }, [fetchResult]);

  return {
    data,
    error,
    loading,
    fetchResult: debouncedFetchResult,
  };
};

export default useGetSearchResult;
