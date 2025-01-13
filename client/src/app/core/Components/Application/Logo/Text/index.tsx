import React from "react";
import { Paragraph, Span } from "../../../Text";

const LogoText = () => {
  return (
    <Paragraph className="text-[1.8rem] h-full flex items-center">
      <Span className="text-[4.8rem] text-[#175fef] font-extrabold">K</Span>
      <Span>urodev</Span>
      <Span>App.</Span>
    </Paragraph>
  );
};

export default LogoText;
