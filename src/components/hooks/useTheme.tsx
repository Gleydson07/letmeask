import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ProviderProps = {
    children: ReactNode;
}

interface ThemeContextProps{
    theme: string;
    handleToogleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: ProviderProps) => {
    const [theme, setTheme] = useState(localStorage.getItem("@letmeask:theme") || "light");

    useEffect(() => {
        if(theme === "dark"){
            document.querySelector("body")?.classList.add(theme)
        }else{
            document.querySelector("body")?.classList.remove('dark')
        }
        localStorage.setItem("@letmeask:theme", theme)
    }, [theme])

    function handleToogleTheme(){
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{theme, handleToogleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);