import React from "react";
import { FrownOutlined } from "@ant-design/icons";

import styles from "./EmptyDefaultComponent.module.css";

export interface EmptyDefaultComponentProps {
  query?: string;
  message?: string;
}

const EmptyDefaultComponent: React.FC<EmptyDefaultComponentProps> = ({
  query = "",
  message = "No data found for",
}) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconContainer}>
        <FrownOutlined className={styles.icon} />
      </div>
      <p className={styles.message}>
        {message} {query ? `"${query}"` : ""}
      </p>
    </div>
  );
};

export default EmptyDefaultComponent;
