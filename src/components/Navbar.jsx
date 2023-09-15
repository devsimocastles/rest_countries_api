import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar({themeSwitcher, updateTheme}){
    return (
        <nav className="Navbar">
            <h1 className="title">Where in the world?</h1>
            <ThemeSwitcher 
            handleTheme={themeSwitcher}
            updateTheme={updateTheme}
            />
        </nav>
    );
}

export default Navbar;