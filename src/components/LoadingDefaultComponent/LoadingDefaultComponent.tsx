import React from "react";

import styles from "./loadingDefaultComponent.module.css";

export interface LoadingDefaultComponentProps {
  text?: string;
}

const LoadingDefaultComponent: React.FC<LoadingDefaultComponentProps> = ({
  text = "",
}) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>

      {!!text && <p>{text}</p>}
    </div>
  );
};

export default LoadingDefaultComponent;
