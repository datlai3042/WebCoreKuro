/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { useMutation } from "@tanstack/react-query";

import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterType } from "./register.schema";
import AuthService from "../Api/auth.service";
import { onFetchUser } from "@/lib/Redux/auth.slice";
import { ResponseAuth } from "../../RestfullAPI/response.schema";
import InputText from "@/app/core/Components/Form/InputText";
import Button from "@/app/core/Components/Store/Button";
import SpaceLine from "@/app/core/Components/Store/SpaceLine";
import ButtonLoginGoogle from "../OAuth2/ButtonLoginWithGoole";
import ButtonLoginGithub from "../OAuth2/ButtonWithGithub";
import IconClose from "@/app/core/Components/Store/IconClose";
type TProps = {
      onClose?: (state: boolean) => void;
};

const RegisterForm = (props: TProps) => {
      const { onClose } = props;
      const router = useRouter();

      const dispatch = useDispatch();

      const registerForm = useForm<RegisterType>({
            defaultValues: {
                  user_email: "",
                  user_password: "",
                  user_first_name: "",
                  user_last_name: "",
                  confirm_password: "",
            },
            resolver: zodResolver(registerSchema),
      });

      const registerMutation = useMutation({
            mutationKey: ["register"],
            // mutationFn: (formRegister: Omit<RegisterType, "confirm_password">) =>
            mutationFn: (formRegister: Omit<RegisterType, "confirm_password">) =>
                  AuthService.register<Omit<RegisterType, "confirm_password">,ResponseAuth>(formRegister),
      });

      useEffect(() => {
            if (registerMutation.isSuccess) {
                  const { user } = registerMutation.data.metadata;
                  router.push("/dashboard");
                  dispatch(onFetchUser({ user }));
            }
      }, [registerMutation.isSuccess, onClose, registerMutation.data, dispatch, router]);

      const onSubmit = (data: RegisterType) => {
            registerMutation.mutate(data);
      };

      return (
            <div className="relative w-[42rem] mb-[1.6rem] h-max flex justify-start xl:justify-center items-center flex-col  gap-[1.6rem] rounded-[1.2rem] p-[2.4rem_2rem] ">
                  <div className="w-full flex flex-col gap-[.2rem] py-[2rem]">
                        <p className="text-[2.4rem] xl:text-[3rem] font-semibold text-[#3d52a2] text-center">Tạo tài khoản</p>
                  </div>

                  <div className=" w-full flex flex-col gap-[2rem] ">
                        <form className="w-full flex flex-col justify-center  gap-[.6rem] rounded-[1.2rem] " onSubmit={registerForm.handleSubmit(onSubmit)}>
                              <InputText<RegisterType>
                                    FieldKey="user_first_name"
                                    placeholder="Nhập họ của bạn"
                                    type="text"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />

                              <InputText<RegisterType>
                                    FieldKey="user_last_name"
                                    placeholder="Nhập tên của bạn"
                                    type="text"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />
                              <InputText<RegisterType>
                                    FieldKey="user_email"
                                    placeholder="email"
                                    type="email"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />
                              <InputText<RegisterType>
                                    FieldKey="user_password"
                                    placeholder="mật khẩu"
                                    type="password"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}

                                    // formState={registerForm.formState}
                              />
                              <InputText<RegisterType>
                                    FieldKey="confirm_password"
                                    placeholder="xác nhận mật khẩu"
                                    type="password"
                                    register={registerForm.register}
                                    watch={registerForm.watch}
                                    error={registerForm.formState.errors}
                              />
                              <Button
                                    type="submit"
                                    textContent="Đăng kí"
                                    disabled={registerMutation.isPending}
                                    loading={registerMutation.isPending}
                                    className="!w-full !h-[4rem] !bg-[#3d52a2] my-[1.6rem]"
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
                        <div className="w-full flex flex-col items-center gap-[.2rem] text-[1.4rem]">
                              <p className="text-[1.4rem]">
                                    Bạn đã có tài khoản?{" "}
                                    <Link href={"/login"} className="text-[#3d52a2] underline font-semibold">
                                          đăng nhập
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

export default RegisterForm;
