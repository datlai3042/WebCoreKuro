import React, { useContext } from "react";
import Box from "../../Box";
import { Paragraph, Span } from "../../Text";
import Image from "next/image";
import Bg from "../../../../resources/Auth/bg-intro.png";
import Bg2 from "../../../../resources/Auth/bg-intro2.png";
import Button from "@/app/core/Ui/Button";
import { BiPlus } from "react-icons/bi";
import { ThemeContext } from "@/app/core/Context/Theme";
import styles from "./styles.module.scss";
const Intro = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <Box className="bg-[var(--bg-intro)] w-full h-full rounded-2xl  px-[2rem] flex flex-col gap-[3rem]">
      <Box className="flex flex-col gap-[1rem] items-center">
        <Paragraph isTheme={false} className={`${styles.projectName}`}>
          <Span className="text-[4rem]">Kuro</Span>
          <Span className="text-[1.6rem]">WebCore</Span>
        </Paragraph>
        <Paragraph isTheme={false} className="text-[#fff] text-[1.8rem] ">
          Front End Tech NextJS@14
        </Paragraph>
      </Box>
      <Box className="flex">
        <Box className="w-[50%] flex justify-center">
          <Image
            src={Bg}
            alt="bg-intro"
            width={280}
            height={280}
            className="object-contain w-[80%]"
          />
        </Box>
        <Box className="w-[50%] flex justify-center">
          <Image
            src={Bg2}
            alt="bg-intro"
            width={280}
            height={280}
            className="object-contain w-[80%]"
          />
        </Box>
      </Box>
      <Box className="mt-[4rem]">
        <Paragraph
          isTheme={false}
          className="text-[#fff] text-[1.5rem] px-[1.4rem] text-center opacity-70"
        >
          Mọi chuyện đều trông có vẻ bất khả thi cho đến khi nó được hoàn thành.
        </Paragraph>
        <Paragraph
          isTheme={false}
          className="text-[#fff] text-[1.6rem] px-[1.4rem] text-end opacity-70"
        >
          Nelson Mandela
        </Paragraph>
      </Box>
      <Button
        styleText={{ color: "#fff" }}
        iconConfig={{ component: BiPlus }}
        textContent="Chuyển mode"
        className="ml-auto "
        onClick={() => {
          setTheme((prev) => {
            if (prev === "dark") {
              return "light";
            }
            return "dark";
          });
        }}
      />
    </Box>
  );
};

export default Intro;
