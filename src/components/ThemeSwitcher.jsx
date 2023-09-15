import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon  as MoonLight} from "@fortawesome/free-regular-svg-icons";
import { faMoon as MoonDark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core";

function ThemeSwitcher({handleTheme, updateTheme}){

    let [buttonIcon, setButtonIcon] = useState(MoonDark);


    const changeIcon = () => {
        if (buttonIcon == MoonLight) setButtonIcon(MoonDark);
        else setButtonIcon(MoonLight)
    }

    return (
        <button className="theme_switcher" onClick={() => {
            handleTheme()
            updateTheme()
            changeIcon()
        }}>
        <FontAwesomeIcon
            icon={buttonIcon} 
            className="theme_switcher_icon"
         />
            Dark Mode
        </button>
    );
}

export default ThemeSwitcher;