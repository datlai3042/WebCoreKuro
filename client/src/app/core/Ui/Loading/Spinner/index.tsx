import React from "react";
import styles from "./styles.module.scss";

type SpinnerProps = JSX.IntrinsicElements["div"] & {
  spinnerColor?: string;
};

const Spinner = (props: SpinnerProps) => {
  const { spinnerColor, ...rest } = props;
  const renderColorSpinner = () => {
    if (spinnerColor) {
      return { borderLeftColor: spinnerColor, borderTopColor: spinnerColor };
    }
    return {};
  };
  return (
    <div
      {...rest}
      
      className={`${styles.Spinner__container} ${styles["Spinner__container--loading"]} ${rest.className}`}
      style={{ ...rest.style, ...renderColorSpinner() }}
    ></div>
  );
};

export default Spinner;
