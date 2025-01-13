import { useMemo } from "react";
import { TParagraph } from "./index.type";

const Paragraph = (props: TParagraph) => {
  const { isTheme = true, content, children,...rest } = props;
  const renderStyles = useMemo(() => {
    const styles = rest.style || {};
    if (isTheme) {
      return { ...styles, color: "var(--color-theme)" };
    }
    return styles;
  }, [isTheme, rest]);

  return (
    <p {...rest} style={renderStyles} content={content}>
      {children}
    </p>
  );
};

export default Paragraph;
