"use client";
import { useContext, useEffect, useState } from "react";
import { BiCamera, BiPlus } from "react-icons/bi";
import { ApplicationErrorContext } from "./core/Context/ApplicationError";
import storage from "./core/Helpers/LocalStorage.helper";
import useProtectActions from "./core/Hooks/Authentication/useProtectedAction";
import http from "./core/Http";
import Button from "./core/Ui/Button";
import AuthService from "./services/authentication";
import { ResponseAuth } from "./services/authentication/auth.service.type";
import { ThemeContext } from "./core/Context/Theme";
import SkeletonLine from "./core/Ui/Loading/Skeleton/Line";
import SkeletonAvatar from "./core/Ui/Loading/Skeleton/Avatar";
import SkeletonBox from "./core/Ui/Loading/Skeleton/Box";
import ModalImages from "./core/Components/Modal/Images";
import Image from "next/image";

const list = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaCpoEEdCLYs62sDKwTLi88GFzlVFm4Y0S_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxcASu6kFgRApkhQuZiLQNG5CTvL-6myIn9A&s",
  "https://image.cdn2.seaart.me/2024-04-16/cof0d8de878c738gjrp0/221b818b5d1fe33bf0395dc0e24f10f7caaf23d3_high.webp",
];

let timer: NodeJS.Timeout | null = null;

export default function Home() {
  const handleOpenBook = ({ name }: { name?: string }) => {
    storage.getItem("sdsd");
  };

  const { setTheme } = useContext(ThemeContext);

  const { clearErroApp, setErrorApp } = useContext(ApplicationErrorContext);
  const [countDown, setCountDowm] = useState<number>(-1);

  const [showModalImages, setShowModalImages] = useState(false);

  const onActionProtected = useProtectActions<{ name: string }>();

  const login = async () => {
    const res = await http.post<ResponseAuth>("/v1/api/auth/login", {
      email: "datlai304@gmail.com",
      password: "3042",
    });
    if (!res.code) {
      setErrorApp({
        name: "AUTH",
        payload: {
          button: { text: "Hủy", action: () => clearErroApp() },
          content: "Gọi api failed",
          title: "AUTH_FAILED",
        },
      });
    }

    if (+res?.code) {
      const now = new Date().getTime() / 1000;
      const expire = new Date(res?.metadata?.expireToken).getTime() / 1000;

      const result = Math.floor(expire - now);
      setCountDowm(result);
    } else {
    }
  };

  const getList = async () => {
    const res = await http.get("/v1/api/tasks/get-lists", {});
    await http.get("/v1/api/tasks/get-chapters", {});
    await http.get("/v1/api/tasks/get-musics", {});
    if (!res.code) {
      setErrorApp({
        name: "API",
        payload: {
          button: { text: "Hủy", action: () => clearErroApp() },
          content: "Gọi api failed",
          title: "API_FAILED",
        },
      });
    }
  };

  useEffect(() => {
    if (countDown === 0) {
      AuthService.refreshTokenClient().then((res) => {
        const now = new Date().getTime() / 1000;
        const expire = new Date(res?.metadata?.expireToken).getTime() / 1000;

        const result = Math.floor(expire - now);
        setCountDowm(result);
      });
    }
  }, [countDown]);

  // useEffect(() => {
  //   if (countDown && countDown <= -1) return;
  //   timer = setInterval(() => {
  //     setCountDowm((prev) => {
  //       return (prev -= 1);
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer as NodeJS.Timeout);
  //   };
  // }, [countDown]);

  return (
    <div className="flex flex-wrap m-[4rem] gap-[2rem]">
     
      {/* <Link href={"/podcast"}>Podcast</Link>
      <Link href={"/task"}>Tasks</Link> */}
      <Button
        iconConfig={{ component: BiPlus }}
        textContent="Mở book"
        styleText={{color: '#fff'}}
        onClick={() => {
          onActionProtected({ name: "Đat" }, handleOpenBook);
          // if (onActionProtected) {
          //   onActionProtected({ name: "Đạt" });
          // }
        }}
      />

        <Button iconConfig={{ component: BiPlus }} textContent="Mở vật phẩm" 
        styleText={{color: '#fff'}}
        
        />
      <Button
        iconConfig={{ component: BiPlus }}
        styleText={{color: '#fff'}}

        textContent="Đăng nhập"
        onClick={login}
        loading={true}
      />

      <Button
        styleText={{color: '#fff'}}
        iconConfig={{ component: BiPlus }}
        textContent="Lấy danh sách"
        onClick={getList}
      />

      <Button
        styleText={{color: '#fff'}}
        iconConfig={{ component: BiPlus }}
        textContent="Đăng xuất"
        onClick={() => {
          console.log("goi dang xuat");
          AuthService.logout();
        }}
      />

      <Button
        styleText={{color: '#fff'}}
        iconConfig={{ component: BiPlus }}
        textContent="Chuyển mode"
        onClick={() => {
          setTheme((prev) => {
            if (prev === "dark") {
              return "light";
            }
            return "dark";
          });
        }}
      />

      {showModalImages && (
        <ModalImages
          onClick={() => setShowModalImages(false)}
          onClose={() => setShowModalImages(false)}
        />
      )}

      <Button
        styleText={{color: '#fff'}}
        iconConfig={{ component: BiCamera }}
        textContent="Modal Hình"
        onClick={() => {
          setShowModalImages(true);
        }}
      />
      <div className="w-full  h-[2rem]">
        <SkeletonLine />
      </div>

      <div className="flex w-full justify-between gap-[1rem]">
        <div className="w-[calc(100%/4)]  h-[5rem]">
          <SkeletonLine />
        </div>

        <div className="w-[calc(100%/4)]  h-[5rem]">
          <SkeletonLine />
        </div>

        <div className="w-[calc(100%/4)]  h-[5rem]">
          <SkeletonLine />
        </div>

        <div className="w-[calc(100%/4)]  h-[5rem]">
          <SkeletonLine />
        </div>
      </div>

      <SkeletonBox />

      <SkeletonAvatar />

      <span>
        Thời gian token hết hạn:{" "}
        {countDown === -1 ? "Chưa có token" : countDown}s
      </span>
    </div>
  );
}
