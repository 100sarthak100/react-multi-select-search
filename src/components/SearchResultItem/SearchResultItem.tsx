import React from "react";
import styles from "./SearchResultItem.module.css";

export interface SearchResultItemProps {
  label: string;
  isFocused: boolean;
  onClick: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  label,
  isFocused,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.resultItem} ${isFocused ? styles.focusedItem : ""}`}
    >
      {label}
    </div>
  );
};

export default SearchResultItem;
