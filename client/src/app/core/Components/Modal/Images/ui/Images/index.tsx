import React from "react";
import { TImageActive } from "./types/imageActive.type";
import Image from "next/image";

const ImageActive = (props: TImageActive) => {
  const { url } = props;
  return (
    <div className="w-full min-h-full flex justify-center items-center ">
      <Image
        src={url}
        alt="Origin Image"
        className="w-full h-full rounded-lg object-contain"
        width={80}
        height={80}
      />
    </div>
  );
};

export default ImageActive;
