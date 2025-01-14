"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Box from "../../Box";
import { ThemeContext } from "@/app/core/Context/Theme";

const BackgroundApplication = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {theme === "dark" ? (
        <Box className="absolute pointer-events-none top-0 w-full h-[50rem] hidden xl:block">
          <Image
            src={
              "https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif"
            }
            width={100}
            height={100}
            alt="bg"
            className="w-full h-full"
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default BackgroundApplication;
