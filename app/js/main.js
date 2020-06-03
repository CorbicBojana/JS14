const buttonTheme = document.getElementById("button_theme");
const buttonFilter = document.getElementById("button_filter");
const listFilter = document.getElementById("list_filter");
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

// API
const row = document.getElementById("row");
const url = "https://restcountries.eu/rest/v2/all";

(function  getResults() {
fetch(url)
.then((resp) => resp.json()) // Transform the data into json
.then(
    function displayResults(resp) {
        resp.map( country => 
        row.innerHTML += `
        <div class="col">
        <div class="container_img">
          <img src=${country.flag} alt="germany" />
        </div>
        <h3>${country.name}</h3>
          <ul class="list">
            <li class="list_item">Population: <span>${country.population}</span></li>
            <li class="list_item">Region: <span>${country.region}</span></li>
            <li class="list_item">Capital: <span>${country.capital}</span></li>
          </ul>
        </div>
        ` 
        )
    }
)
}())