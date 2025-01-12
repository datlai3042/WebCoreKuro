import React, { useEffect, useRef, useState } from "react";
import { TListImagesProps } from "./types/listImage.type";
import Image from "next/image";
import { BiImages } from "react-icons/bi";
import Button from "@/app/core/Ui/Button";
import useClickOutSide from "@/app/core/Hooks/Ui/useClickOutSide";

const ListImages = (props: TListImagesProps) => {
  const { images, onSetImageActive, origin } = props;

  const [showBoxSelectImage, setShowBoxSelectImage] = useState(false);


  return (
    <div className="group relative p-[0rem_1rem]" onClick={(e) => e.stopPropagation()}>
      <div
        className="flex flex-col justify-center items-center gap-[1rem]"
        onClick={() => setShowBoxSelectImage(true)}
      >
        <BiImages size={24} />
        <span className="text-center text-[1rem]">Danh sách hình ảnh</span>
      </div>
      {showBoxSelectImage && (
        <div className="absolute flex right-[-32rem] top-0 w-[32rem] min-h-[40rem] ">
          <BoxSelectImage
            images={images}
            onSetImageActive={onSetImageActive}
            onClose={() => setShowBoxSelectImage(false)}
            origin={origin}
          />
        </div>
      )}
    </div>
  );
};

const BoxSelectImage = (props: TListImagesProps & { onClose: () => void }) => {
  const { images, onSetImageActive, onClose, origin } = props;
  const [imageTemp, setImageTemp] = useState<{ url: string, file: File }>();

  const onSetTempImage = ({ url, file }: { url: string, file: File }) => {
    setImageTemp({ url, file });
    onSetImageActive({ url, file });

  };

  const { ref } = useClickOutSide(() => onClose())




  return (
    <div className="p-[1rem] bg-[#fff] border-[.1rem] border-solid border-[#ccc] rounded-lg flex flex-col gap-[2rem]" ref={ref}>
      <p className=" text-center text-[1.6rem]">WebCore Kuro</p>
      <div className="w-full flex flex-wrap gap-[1rem_0.3rem] h-[30rem] overflow-auto">
        {images?.map((img) => (
          <div className="w-[calc(100%/4-0.3rem)] aspect-square">
            <ImageItem
              url={img.url}
              onSetImageActive={() => onSetTempImage(img)}
              active={img.url === origin}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-[.6rem]">
        <Button
          onClick={onClose}
          textContent="Đóng"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid var(--color-primary)",
          }}
        />
        <Button
          textContent="Chọn"
          onClick={() => {
            if (imageTemp) {
              console.log({imageTemp})
              onSetImageActive(imageTemp);
            }
            onClose();
          }}
        />
      </div>
      <div></div>
    </div>
  );
};

const ImageItem = ({
  url,
  onSetImageActive,
  active,
}: {
  url: string;
  onSetImageActive: () => void;
  active: boolean;
}) => {
  const isAtive = active ? " border-[.2rem] border-blue-700" : "";
  return (
    <div
      className={`w-full h-full p-[.4rem] bg-[#fff] rounded-lg ${isAtive}`}
      onClick={onSetImageActive}
    >
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



export default ListImages;
