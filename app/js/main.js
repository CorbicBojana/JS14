var buttonTheme = document.getElementById("button");

// function to toggle between light and dark theme
function toggleTheme() {
    if (document.body.classList.contains("theme_light")){
        document.body.classList.add("theme_dark");
        document.body.classList.remove("theme_light")
    } else {
        document.body.classList.add("theme_light");
        document.body.classList.remove("theme_dark")
    }
 }

buttonTheme.addEventListener("click", toggleTheme);

