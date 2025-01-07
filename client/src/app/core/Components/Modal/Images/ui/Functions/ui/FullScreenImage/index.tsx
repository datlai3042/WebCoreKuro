import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { GoScreenFull } from "react-icons/go";
import { TFullScreenImageProps } from "./types/fullScreenImage.type";

const FullScreenImage = ({ url }: { url: string }) => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const onClose = () => {
    setShowFullScreen(false);
    console.log('click', showFullScreen)
  }
  return (
    <div
      className="group relative p-[0rem_1rem]"
      onClick={() => setShowFullScreen(true)}
    >
      <div className="flex flex-col justify-center items-center gap-[1rem]">
        <GoScreenFull size={24} />

        <span className="text-center text-[1rem]">Xem toàn màn hình</span>
      </div>
      {showFullScreen && <ModalFullScreen url={url} onClose={onClose} />}
    </div>
  );
};

const ModalFullScreen = (props: TFullScreenImageProps) => {
  const { url, onClose } = props;
  return createPortal(
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,.9)] z-[9999] p-[1rem]"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <Image
        src={url}
        className="w-full h-full object-contain"
        width={500}
        height={500}
        alt="Full option"
        onClick={onClose}
      />
    </div>,
    document.body
  );
};

export default FullScreenImage;
