import React from "react";
import styles from "../styles.module.scss";

type SkeletonProps = JSX.IntrinsicElements["div"];
const SkeletonBox = (props: SkeletonProps) => {
  return (
    <div
      {...props}
      className={`${props.className} ${styles.skeleton__container} ${styles['skeleton--box']}`}
      style={{width: '100%', height: '100%'}}
    >
    </div>
  );
};

export default SkeletonBox;
