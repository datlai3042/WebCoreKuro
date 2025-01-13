import React from "react";
import Box from "../../Box";
import { Paragraph } from "../../Text";
import Image from "next/image";
import Bg from "../../../../resources/Auth/bg-intro.png";
import Bg2 from "../../../../resources/Auth/bg-intro2.png";

const Intro = () => {
  return (
    <Box className="bg-[var(--bg-intro)] w-full h-full rounded-2xl pt-[6rem] px-[6rem] flex flex-col gap-[3rem]">
      <Paragraph isTheme={false} className="text-[#fff] text-[2.4rem]">
        WebCore Front End Tech NextJS@14
      </Paragraph>
      <Box className="flex">
        <Box className="w-[50%] flex">
          <Image
            src={Bg}
            alt="bg-intro"
            width={300}
            height={300}
            className="object-contain w-full"
          />
        </Box>
        <Box className="w-[50%] flex">
          <Image
            src={Bg2}
            alt="bg-intro"
            width={300}
            height={300}
            className="object-contain w-full"
          />
        </Box>
      </Box>
      <Box className="mt-[2rem]">
        <Paragraph
          isTheme={false}
          className="text-[#fff] text-[1.6rem] px-[1.4rem] text-center opacity-70"
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
    </Box>
  );
};

export default Intro;
