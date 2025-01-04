import React from "react";
import styles from "../styles.module.scss";

type SkeletonProps = JSX.IntrinsicElements["div"];
const SkeletonAvatar = (props: SkeletonProps) => {
  return (
    <div
      {...props}
      className={`${props.className} ${styles.skeleton__container} ${styles['skeleton--avatar']}`}
    >
    </div>
  );
};

export default SkeletonAvatar;
