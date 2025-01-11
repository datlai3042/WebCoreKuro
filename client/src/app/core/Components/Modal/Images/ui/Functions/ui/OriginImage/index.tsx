import React from "react";
import { TOriginImageProps } from "./types/originImage.type";
import Image from "next/image";

const OriginImage = (props: TOriginImageProps) => {
  const { url } = props;
  return <div className="w-[6rem] h-[6rem] border-[.2rem] border-blue-700 p-[.4rem] bg-[#fff] rounded-lg">
    <Image
      src={url}
      alt="Origin Image"
      className="w-full h-full rounded-lg object-contain"
      width={80}
      height={80}
    />
  </div>;
};

export default OriginImage;
