'use client'
import { Intro } from "@/app/core/Components/Application";
import Box from "@/app/core/Components/Box";
import { NavigationAuth } from "@/app/core/Components/Header";
import LoginForm from "./ui/form";

const LoginView = () => {
  return (
    <Box className="w-full h-screen relative">
      <Box className="hidden xl:block absolute top-0 right-0 w-[40%] h-full p-[3rem_.5rem]">
        <Intro />
      </Box>

      <Box
        className="absolute top-0 left-0 w-full xl:w-[40%] h-full z-[1000] "
        isTheme={false}
      >
        <NavigationAuth />
        <LoginForm />
       
      </Box>
    </Box>
  );
};

export default LoginView;
