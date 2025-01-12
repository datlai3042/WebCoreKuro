import React from "react";
import { createPortal } from "react-dom";

type TOverlay = {
  children: React.ReactNode;
  onClickOverlay: () => void;
  customOverlay?: React.CSSProperties;
};

const Overlay = (props: TOverlay) => {
  const { children, onClickOverlay, customOverlay = {} } = props;
  return createPortal(
    <div
      className="fixed inset-0 w-full h-screen z-[10]"
    >
      <div className="relative w-full h-screen inset-0">
        <div
          onClick={onClickOverlay}

          className="absolute inset-0 bg-[rgba(0,0,0,.75)]"
          style={customOverlay}
        ></div>
        <div
          className="absolute  top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]  z-[2] max-w-[90vw] overflow-auto flex justify-center items-center"
        // onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Overlay;
