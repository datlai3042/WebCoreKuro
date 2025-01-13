import React, { useMemo } from "react";
import { TSpan } from "./index.type";

const Span = (props: TSpan) => {
  const { content, children, isTheme, ...rest } = props;
  const renderStyles = useMemo(() => {
    const styles = rest.style || {};
    if (isTheme) {
      return { ...styles, color: "var(--color-theme)" };
    }
    return styles;
  }, [isTheme, rest]);

  return (
    <span {...rest} style={renderStyles} content={content}>
      {children}
    </span>
  );
};

export default Span;
