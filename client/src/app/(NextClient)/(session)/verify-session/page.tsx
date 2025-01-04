"use client";
import AuthService from "@/app/services/authentication";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  EXPIRE_TOKEN,
  NOT_FOUND,
  NOT_PERMISSION,
} from "./verify-session.constant";
import elementDom from "@/app/core/Helpers/ElementDOM";

const VerifySession = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  console.log({});
  useEffect(() => {
    const onHandlerState = async () => {
      if (state === EXPIRE_TOKEN) {
        await AuthService.getNewTokenSync();
      }

      if (state === NOT_PERMISSION) {

        elementDom.createElementAlert({
          title: "NOT PERMISSION",
          button: {
            text: "Quay lại",
            action: (onClose) => {
              if (onClose) {
                onClose();
              }
              return 
            },
          },
          content: "Quyền truy cập không được phép",
        });
      }

      if (state === NOT_FOUND) {
        elementDom.createElementAlert({
          title: "NOT FOUND",
          button: {
            text: "Xác nhận",
            action: () => {},
          },
          content: "Không tìm thấy thông tin",
          callback: () => (window.location.href = "https://github.com/datlai3042"),
        });
      }
    };
    if (state) {
      onHandlerState();
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      WebCore
    </div>
  );
};

export default VerifySession;
