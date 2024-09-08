import React from "react";
import { CloseOutlined } from "@ant-design/icons";

import styles from "./Chip.module.css";
import { SearchSize } from "../Search/helper";

export interface ChipProps {
  label: string;
  size?: SearchSize;
  onRemove?: () => void;
  isPreselected?: boolean;
  showRemoveIcon?: boolean;
  removeIcon?: React.ReactNode;
  isPreSelectedRemovable?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  removeIcon,
  showRemoveIcon = true,
  isPreselected = false,
  size = SearchSize.Medium,
  isPreSelectedRemovable = true,
}) => {
  const isRemovable = !isPreselected || isPreSelectedRemovable;

  const removeBtnClass = `${styles.removeBtn} ${styles[size]}`;
  const mainClass = `${styles.chipMainContainer} ${styles[size]} ${
    isPreselected ? styles.preselectedChip : ""
  }`;

  return (
    <div className={mainClass}>
      <p className={styles.label}>{label}</p>

      {showRemoveIcon && !!isRemovable && (
        <div onClick={onRemove} className={removeBtnClass}>
          {removeIcon || <CloseOutlined />}
        </div>
      )}
    </div>
  );
};

export default React.memo(Chip);
