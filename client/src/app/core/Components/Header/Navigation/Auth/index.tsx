import React from "react";
import Box from "../../../Box";
import { LogoText } from "../../../Application";
import Link from "next/link";

const NavigationAuth = () => {
  return (
    <Box className="w-full min-h-[8rem] xl:h-[8rem] gap-[1rem] xl:gap-[12rem]  flex flex-col xl:flex-row xl:items-center px-[2rem] text-[1.5rem]">
      <Box className="h-full flex items-center">
        <LogoText />
      </Box>
      <Box className="h-full flex gap-[3rem] items-center w-max text-[#6c7284]" isTheme={false}>
        <Link href={"/"}>Trang chủ</Link>
        <Link href={"/regsiter"}>Đăng kí</Link>
      </Box>
    </Box>
  );
};

export default NavigationAuth;
