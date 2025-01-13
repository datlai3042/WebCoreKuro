import React, { useMemo } from "react";
import { TBox } from "./index.type";

const Box = (props: TBox) => {
  const { children = null, isTheme = false, ...rest } = props;

  const renderStyles = useMemo(() => {
    const styles = rest.style || {};
    if (isTheme) {
      return {
        ...styles,
        color: "var(--color-theme)",
        // backgroundColor: "var(--bg-theme)",
      };
    }
    return styles;
  }, [isTheme, rest]);
  return (
    <div {...rest} style={renderStyles}>
      {children}
    </div>
  );
};

export default Box;
