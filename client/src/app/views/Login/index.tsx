'use client'
import Intro from "@/app/core/Components/Application/Intro";
import Box from "@/app/core/Components/Box";
import { NavigationAuth } from "@/app/core/Components/Header";
import { ThemeContext } from "@/app/core/Context/Theme";
import Button from "@/app/core/Ui/Button";
import { useContext } from "react";
import { BiPlus } from "react-icons/bi";
import LoginForm from "./ui/form";

const LoginView = () => {
  const { setTheme } = useContext(ThemeContext);
  return (
    <Box className="w-full h-screen relative">
      <Box className="hidden xl:block absolute top-0 right-0 w-[40%] h-full p-[3rem_1rem]">
        <Intro />
      </Box>

      <Box
        className="absolute top-0 left-0 w-[50%] h-full z-[1000] "
        isTheme={false}
      >
        <NavigationAuth />
        <LoginForm />
        <Button
          styleText={{ color: "#fff" }}
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
      </Box>
    </Box>
  );
};

export default LoginView;
