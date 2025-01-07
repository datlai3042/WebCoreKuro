import React from "react";
import OriginImage from "./ui/OriginImage";
import ListImages from "./ui/ListImage";
import { TFunctionImageProps } from "./types/functionImage.type";
import FullScreenImage from "./ui/FullScreenImage";

const FunctionsImage = (props: TFunctionImageProps) => {
  const { listImage, origin, onSetImageActive,  } = props;
  return (
    <div className="flex flex-col gap-[3rem] items-center">
      <OriginImage url={origin} />
      <ListImages images={listImage} onSetImageActive={onSetImageActive}  origin={origin}/>
      <FullScreenImage url={origin} />
    </div>
  );
};

export default FunctionsImage;
