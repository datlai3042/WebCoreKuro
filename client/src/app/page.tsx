"use client";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import Button from "./core/Ui/Button";
import storage from "./core/Helpers/LocalStorage.helper";
import { useEffect } from "react";
import http from "./core/Http";
import useProtectActions from "./core/Hooks/Authentication/useProtectedAction";

export default function Home() {
  const handleOpenBook = ({ name }: { name?: string }) => {
    storage.getItem("sdsd");
  };

  const onActionProtected = useProtectActions<{ name: string }>();



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href={"/podcast"}>Podcast</Link>
      <Link href={"/task"}>Tasks</Link>
      <Button
        iconConfig={{ component: BiPlus }}
        textContent="Mở book"
        onClick={() => {
          onActionProtected({ name: "Đat" }, handleOpenBook);
          // if (onActionProtected) {
          //   onActionProtected({ name: "Đạt" });
          // }
        }}
      />

      <Button iconConfig={{ component: BiPlus }} textContent="Mở vật phẩm" />
    </div>
  );
}
