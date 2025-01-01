import React from "react";

type TOverlay = {
  ComponentCore: React.ReactNode;
  children: React.ReactNode;
  onClickOverlay: () => void;
};

const Overlay = (props: TOverlay) => {
  const { ComponentCore, children, onClickOverlay } = props;
  return (
    <div className="fixed inset-0 w-full h-screen " onClick={onClickOverlay}>
      <div className="relative w-full h-screen inset-0">
        <div className="absolute inset-0 bg-[rgba(0,0,0,.75)]"></div>
        <div>{children}</div>
        <div
          className="absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]  z-[2] max-w-[90vw] overflow-auto flex justify-center items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {ComponentCore}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
