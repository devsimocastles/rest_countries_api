
// THIS FUNCTION SWITCHES LIGHT/DARK THEME //////////////////////////////////////////////////////   
const themeSwitch = (theme, setTheme) => {
    if(theme === true) {
        setTheme(false);
        localStorage.removeItem("darkTheme")
        localStorage.setItem("darkTheme", 0);
    } else {
        setTheme(true);
        localStorage.removeItem("darkTheme")
        localStorage.setItem("darkTheme", 1);
    } 
}

// UPDATE THEME
const updateTheme = (chosenTheme, setChosenTheme) => {
    if (chosenTheme == 1) {
        localStorage.removeItem("darkTheme");
        localStorage.setItem("darkTheme", 0);
        setChosenTheme(localStorage.getItem("darkTheme"));
    } else{
        localStorage.removeItem("darkTheme");
        localStorage.setItem("darkTheme", 1);
        setChosenTheme(localStorage.getItem("darkTheme"));
    }
}

export {themeSwitch, updateTheme};