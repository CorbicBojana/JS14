var buttonTheme = document.getElementById("button_theme");
var buttonFilter = document.getElementById("button_filter");
var listFilter = document.getElementById("list_filter");
var showLIstFilter = false;

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

buttonFilter.addEventListener("click", function() {
    if (showLIstFilter == false) {
        listFilter.style.display = "block";
        showLIstFilter = true
    } else {
        listFilter.style.display = "none";
        showLIstFilter = false
    }
    
})

