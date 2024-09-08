import React, { useEffect, useRef, useState } from "react";

import Chip from "../Chip/Chip";
import { SearchSize } from "./helper";
import styles from "./Search.module.css";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import ErrorDefaultComponent from "../ErrorDefaultComponent/ErrorDefaultComponent";
import EmptyDefaultComponent from "../EmptyDefaultComponent/EmptyDefaultComponent";
import LoadingDefaultComponent from "../LoadingDefaultComponent/LoadingDefaultComponent";

export interface SearchProps {
  placeholder?: string;
  ListItemComponent?: React.ComponentType<{
    label: string;
    isFocused: boolean;
    onClick: () => void;
  }>;
  ChipComponent?: React.ComponentType<{
    label: string;
    onRemove?: () => void;
    showRemoveIcon?: boolean;
    removeIcon?: React.ReactNode;
    size?: SearchSize | null;
  }>;
  showError?: boolean;
  showLoading?: boolean;
  LoadingComponent?: React.ComponentType | null;
  ErrorComponent?: React.ComponentType<{ message: string }> | null;
  EmptyComponent?: React.ComponentType | null;
  data: string[];
  loading?: boolean;
  error?: string | null;
  onQueryChange: (query: string) => void;
  onChipsChange?: (chips: string[]) => void;
  size?: SearchSize;
  customStyles?: {
    searchContainer?: React.CSSProperties;
    input?: React.CSSProperties;
    resultsContainer?: React.CSSProperties;
  };
  inputRef?: React.RefObject<HTMLInputElement>;
  preSelectedChips?: string[];
  isPreSelectedChipsRemovable?: boolean;
}

const Search: React.FC<SearchProps> = ({
  inputRef,
  data = [],
  error = "",
  onQueryChange,
  onChipsChange,
  loading = false,
  showError = true,
  customStyles = {},
  showLoading = true,
  ChipComponent = Chip,
  preSelectedChips = [],
  size = SearchSize.Medium,
  placeholder = "Search...",
  isPreSelectedChipsRemovable = false,
  ListItemComponent = SearchResultItem,
  ErrorComponent = ErrorDefaultComponent,
  EmptyComponent = EmptyDefaultComponent,
  LoadingComponent = LoadingDefaultComponent,
}) => {
  const internalInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const inputReference = inputRef || internalInputRef;

  useEffect(() => {
    if (inputReference) {
      inputReference?.current?.focus();
    }
  }, []);

  const getInitialChipData = () => {
    return preSelectedChips ?? [];
  };

  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [chips, setChips] = useState<string[]>(getInitialChipData);

  const isPreSelectedChip = (chip: string) => preSelectedChips.includes(chip);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        onQueryChange("");
        setQuery("");
        setShowEmptyState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onQueryChange]);

  useEffect(() => {
    if (resultsContainerRef.current && data.length > 0) {
      const container = resultsContainerRef.current;
      const focusedItem = container.children[focusedIndex] as HTMLElement;

      if (focusedItem) {
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;
        const itemTop = focusedItem.offsetTop;
        const itemBottom = itemTop + focusedItem.clientHeight;

        if (itemTop < containerTop) {
          container.scrollTop = itemTop;
        } else if (itemBottom > containerBottom) {
          container.scrollTop = itemBottom - container.clientHeight;
        }
      }
    }
  }, [focusedIndex, data]);

  useEffect(() => {
    if (!loading && !error && data.length === 0 && !!query) {
      setShowEmptyState(true);
    } else {
      setShowEmptyState(false);
    }
  }, [data, loading, error]);

  const reset = () => {
    setQuery("");
    onQueryChange("");
    setShowEmptyState(false);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const queryValue = e.target.value;
    setQuery(queryValue);
    setShowEmptyState(false);
    onQueryChange(queryValue);
  };

  const handleAddChip = (item: string) => {
    if (!chips.includes(item)) {
      const newChips = [...chips, item];
      setChips(newChips);
      if (onChipsChange) onChipsChange(newChips);
    }

    setQuery("");
    setFocusedIndex(0);
    inputReference?.current?.focus();
  };

  const handleRemoveChip = (item: string) => {
    // Prevent removal of pre-selected chips if `isPreSelectedChipsRemovable` is false
    if (!isPreSelectedChip(item) || isPreSelectedChipsRemovable) {
      const newChips = chips.filter((chip) => chip !== item);
      setChips(newChips);
      setShowEmptyState(false);

      if (onChipsChange) onChipsChange(newChips);
      inputReference?.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !query && chips.length > 0) {
      handleRemoveChip(chips[chips.length - 1]);
    } else if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      handleAddChip(data[focusedIndex]);
    } else if (e.key === "Escape") {
      reset();
    }
  };

  return (
    <div
      ref={searchContainerRef}
      className={`${styles.wrapperContainer} ${styles[size]}`}
      style={customStyles.searchContainer}
    >
      <div className={`${styles.searchContainer} ${styles[size]}`}>
        {chips?.map((chip, index) => (
          <ChipComponent
            size={size}
            key={index}
            label={chip}
            onRemove={() => handleRemoveChip(chip)}
            isPreselected={preSelectedChips.includes(chip)}
            isPreSelectedRemovable={isPreSelectedChipsRemovable}
          />
        ))}

        <input
          type="search"
          value={query}
          ref={inputReference}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={customStyles.input}
          onChange={handleQueryChange}
          className={`${styles.input} ${styles[size]}`}
        />
      </div>

      {!!query.length &&
        (!!data?.length ||
          (!!loading && !!showLoading && !!LoadingComponent) ||
          (!!error && !!showError && !!ErrorComponent) ||
          (showEmptyState && EmptyComponent)) && (
          <div
            ref={resultsContainerRef}
            className={`${styles.resultsContainer} ${styles[size]}`}
            style={customStyles.resultsContainer}
          >
            {loading && showLoading && LoadingComponent && <LoadingComponent />}

            {error && showError && ErrorComponent && (
              <ErrorComponent message={error} />
            )}

            {showEmptyState && EmptyComponent && (
              <EmptyComponent query={query} />
            )}

            {data?.length > 0 &&
              data.map((result, index) => (
                <ListItemComponent
                  key={index}
                  label={result}
                  isFocused={focusedIndex === index}
                  onClick={() => handleAddChip(result)}
                />
              ))}
          </div>
        )}
    </div>
  );
};

export default Search;
