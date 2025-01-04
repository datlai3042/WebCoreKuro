import { SetStateAction } from "react"

export type TTheme = 'dark' | 'light'

export type TThemeContext = {
    theme: TTheme,
    setTheme: React.Dispatch<SetStateAction<TTheme>>
}

