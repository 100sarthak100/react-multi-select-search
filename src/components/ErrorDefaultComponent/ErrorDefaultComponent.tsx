import React, { useEffect, useRef, useState } from "react";
import { CloseCircleOutlined, WarningOutlined } from "@ant-design/icons";

import styles from "./errorDefaultComponent.module.css";

export interface ErrorDefaultComponentProps {
  message: string;
  duration?: number; // duration in ms
}

const ErrorDefaultComponent: React.FC<ErrorDefaultComponentProps> = ({
  message,
  duration = 10000,
}) => {
  const timerRef: React.MutableRefObject<number | NodeJS.Timeout | null> = useRef(null);

  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setAnimate(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => setVisible(false), duration);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [message, duration]);

  if (!visible || !message) return null;

  return (
    <div
      className={`${styles.errorContainer} ${animate ? styles.animate : ""}`}
      onAnimationEnd={() => setAnimate(false)}
    >
      <div className={styles.leftContainer}>
        <div className={styles.iconContainer}>
          <WarningOutlined className={styles.errorIcon} />
        </div>

        <div className={styles.messageContainer}>
          <p className={styles.messageText}>{message}</p>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <button
          className={styles.dismissButton}
          onClick={() => setVisible(false)}
        >
          <CloseCircleOutlined />
        </button>
      </div>
    </div>
  );
};

export default ErrorDefaultComponent;
