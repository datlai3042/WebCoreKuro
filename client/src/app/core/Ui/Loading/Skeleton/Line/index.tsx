import React from "react";
import styles from "../styles.module.scss";

type SkeletonProps = JSX.IntrinsicElements["div"];
const SkeletonLine = (props: SkeletonProps) => {
  return (
    <div
      {...props}
      className={`${props.className} ${styles.skeleton__container} ${styles['skeleton--line']}`}
      style={{width: '100%', height: '100%'}}
    >
    </div>
  );
};

export default SkeletonLine;
