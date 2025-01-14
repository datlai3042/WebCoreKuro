'use client'

import { createContext, useEffect, useState } from "react";
import { TTheme, TThemeContext } from "./theme.type";

export const ThemeContext = createContext<TThemeContext>({
  theme: "dark",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<TTheme>("light");

  useEffect(() => {
    const body = document.body;
    if (theme === "dark") {
      body.classList.remove("light");
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
