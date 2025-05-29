/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import Link from "next/link";
import { loginSchema, LoginType } from "./login.schema";
import { ResponseApi, ResponseAuth } from "../../RestfullAPI/response.schema";
import InputText from "@/app/core/Components/Form/InputText";
import IconClose from "@/app/core/Components/Store/IconClose";
import Button from "@/app/core/Components/Store/Button";
import { onFetchUser } from "@/lib/Redux/auth.slice";
import SpaceLine from "@/app/core/Components/Store/SpaceLine";
import AuthService from "../Api/auth.service";
import ButtonLoginGoogle from "@/app/modules/Account/OAuth2/ButtonLoginWithGoole";
import ButtonLoginGithub from "@/app/modules/Account/OAuth2/ButtonWithGithub";

type TProps = {
  onClose?: (state: boolean) => void;
};

const LoginForm = (props: TProps) => {
  const { onClose } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const loginForm = useForm<LoginType>({
    defaultValues: {
      user_email: "",
      user_password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (formLogin: LoginType) =>
      AuthService.login<LoginType, ResponseAuth>(formLogin),
    onSuccess: (response) => {},
  });

  const onSubmit = (data: LoginType) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const { user } = loginMutation?.data.metadata;
      router.push("/dashboard");
      dispatch(onFetchUser({ user }));
    }
  }, [loginMutation.isSuccess, onClose, loginMutation.data, dispatch, router]);

  useEffect(() => {
    if (Object.keys(loginForm.formState.errors).length > 0) {
    }
  }, [loginForm.formState.errors]);

  return (
    <div className="relative   min-h-[40rem] w-full h-max mx-auto mt-[4rem]  flex justify-center items-center flex-col  gap-[1.6rem] rounded-[1.2rem] p-[2.4rem_2rem]">
      <p
        style={{ letterSpacing: ".4rem" }}
        className=" w-full flex  justify-center py-[2rem]"
      >
        {/* <span className="text-text-theme text-[4.2rem]">Kuro</span>
                        <span className="text-[#6262e5] text-[4.2rem]">form</span> */}
        <span className="text-[#3d52a2] font-semibold text-[3.2rem]">
          Đăng nhập
        </span>
      </p>

      <div className=" w-full flex flex-col gap-[2rem] ">
        <form
          className="w-full h-full flex flex-col justify-center  gap-[.6rem] rounded-[1.2rem]"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        >
          <InputText<LoginType>
            FieldKey="user_email"
            placeholder="Email"
            type="email"
            register={loginForm.register}
            error={loginForm.formState.errors}
            watch={loginForm.watch}
          />
          <InputText<LoginType>
            FieldKey="user_password"
            placeholder="Mật khẩu"
            type="password"
            register={loginForm.register}
            error={loginForm.formState.errors}
            watch={loginForm.watch}
          />
          <Button
            disabled={loginMutation.isPending}
            loading={loginMutation.isPending}
            type="submit"
            textContent="Đăng nhập"
            className="!w-full !h-[4rem] !bg-[#3d52a2] mt-[.8rem]"
          />
        </form>
        <SpaceLine content="Hoặc đăng nhập luôn bằng phương thức khác" />
        <div className="w-full flex flex-col gap-[1rem]">
          <div className="w-full h-[4.6rem]">
            <ButtonLoginGoogle />
          </div>

          <div className="w-full h-[4.6rem]">
            <ButtonLoginGithub />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-[.2rem] text-[1.4rem] my-[1.5rem]">
          {/* <p className="text-[#6262e5] font-medium text-[1.6rem]">Đăng nhập tài khoản của bạn</p> */}
          <p className="text-[1.4rem]">
            Bạn chưa có tài khoản?{" "}
            <Link
              href={"/register"}
              className="text-[#3d52a2] underline font-semibold"
            >
              đăng kí nhé
            </Link>
          </p>
        </div>
      </div>

      {onClose && (
        <div className="absolute  top-[-20px] right-[-10px] xl:right-[-20px]">
          <IconClose onClose={onClose} />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
