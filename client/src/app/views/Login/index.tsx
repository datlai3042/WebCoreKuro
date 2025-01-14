"use client";
import { Intro } from "@/app/core/Components/Application";
import Box from "@/app/core/Components/Box";
import { NavigationAuth } from "@/app/core/Components/Header";
import LoginForm from "./ui/form";

const LoginView = () => {
  return (
    <Box className="w-full h-screen relative flex justify-between lg:px-[8rem] py-[1.6rem]">
      <Box
        className="  w-full xl:w-[48%] h-full z-[1000] order-2"
        isTheme={false}
      >
        <NavigationAuth />

        <Box className="mt-[2rem] lg:mt-0 w-full lg:w-[80%] h-[calc(100vh-80px)] px-[1rem] lg:px-0 lg:py-[6rem]">
          <LoginForm />
        </Box>
      </Box>

      <Box className="hidden xl:block w-[40%] h-full p-[5rem_.5rem] order-3">
        <Intro />
      </Box>
    </Box>
  );
};

export default LoginView;
