import Image from "next/image";
import React, { forwardRef } from "react";

type TPrintWithLogo = {
  children: React.ReactNode;
  showLogo?: boolean;
};

const PrintWithLogo = forwardRef<HTMLDivElement, TPrintWithLogo>(
  (props, ref) => {
    const { children } = props;
    return (
      <div ref={ref} className="flex flex-col gap-[3rem] p-[4rem]  min-w-screen min-h-screen">
        <div className="flex   gap-[1rem] print-logo">
          <Image
          priority
            src={"https://i.imgur.com/2PcAJdi.jpeg"}
            width={80}
            height={80}
            alt="logo"
            className=" min-w-[4rem] min-h-[4rem] h-[8rem] w-[8rem]"
          />
          <div className="flex flex-col gap-[.4rem] text-[2.2rem]">
            <span className=" font-bold text-[#3b5695]">
              Sản phẩm của KuroDev
            </span>
            <span>Demo Patch: 0236</span>
          </div>
        </div>
        <div>{children}</div>
      </div>
    );
  }
);
PrintWithLogo.displayName = "PrintWithLogo";

export default PrintWithLogo;
