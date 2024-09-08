export const mockApiCall = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data based on query
      const data = [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Elderberry",
        "Fig",
        "Grape",
        "ant",
        "arrow",
        "acknowledge",
      ];

      const filteredData = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );

      resolve(filteredData);
    }, 500);
  });
};

export function debounce<T extends (...args: any[]) => Promise<void>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerInstance:  number | null | NodeJS.Timeout = null;

  return function (...args: Parameters<T>): void {
    if (timerInstance) {
      clearTimeout(timerInstance);
    }

    timerInstance = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
