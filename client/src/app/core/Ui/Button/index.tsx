'use client'

import React, { useMemo } from "react";
import { styleButton } from "./style.constans";
import { ButtonLoading, ButtonLoadingStyle } from "./button.type";
import Spinner from "../Loading/Spinner";

export type ButtonProps = {
  textContent?: string;
  typeLoading?: ButtonLoading;
  loading?: boolean;
  loadingStyle?: ButtonLoadingStyle;
  iconConfig?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    style?: React.CSSProperties;
    position?: "Before" | "After";
    hidden?: boolean;
  };
  styleText?: React.CSSProperties;
  isFull?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    textContent,
    loading,
    typeLoading = 'spinner',
    loadingStyle,
    iconConfig,
    styleText = {},
    isFull = false,
    ...buttonProps
  } = props;

  const renderIcon = useMemo(() => {
    if (!iconConfig || iconConfig?.hidden) return <></>;
    const { component: NodeIcon, style, position = "Before" } = iconConfig;

    return (
      <NodeIcon style={{ ...style, order: position === "After" ? "1" : "" }} />
    );
  }, [iconConfig]);

  return (
    <button
      {...buttonProps}
      className={`${styleButton} ${buttonProps.className}`}
      style={{ width: isFull ? '100%' : '' }}
    >
      {iconConfig && renderIcon}
      <span style={styleText}>{textContent}</span>
      {loading && typeLoading === "spinner" && <Spinner style={loadingStyle} />}
    </button>
  );
};

export default Button;
