import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar(){
    return (
        <nav className="Navbar">
            <h1 className="title">Where in the world?</h1>
            <ThemeSwitcher />
        </nav>
    );
}

export default Navbar;