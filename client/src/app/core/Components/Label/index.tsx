import React from "react";
import { TLabel } from "./index.type";

const Label = (props: TLabel) => {
  const { content, ...native } = props;
  return <label {...native}>{content}</label>;
};

export default Label;
