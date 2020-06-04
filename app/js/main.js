const buttonTheme = document.getElementById("button_theme");
const buttonFilter = document.getElementById("button_filter");
const listFilter = document.getElementById("list_filter");
const listFilterItems = document.getElementsByClassName("list_filter_item");
var showLIstFilter = false;

// Function to toggle between light and dark theme
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
        showLIstFilter = true;
    } else {
        listFilter.style.display = "none";
        showLIstFilter = false
    } 
})

// API
const row = document.getElementById("row");
const url = "https://restcountries.eu/rest/v2/";

(function  getResults() {
fetch(`${url}all`)
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
}());

// Change region
for (i=0; i < listFilterItems.length; i++) {
    listFilterItems[i].addEventListener("click", function(e) {
        var region = e.target.textContent;
        fetch(`${url}region/${region}`)
        .then((resp) => resp.json()) // Transform the data into json
        .then(
            function displayResults(resp) {    
                console.log(resp)
                row.innerHTML = "";
                if (resp.status == 404) {
                  alert("Not found!")
                }
                else {
                  resp.map( region => 
                    row.innerHTML += `
                    <div class="col">
                      <div class="container_img">
                        <img src=${region.flag} alt="germany" />
                      </div>
                      <h3>${region.name}</h3>
                      <ul class="list">
                        <li class="list_item">Population: <span>${region.population}</span></li>
                        <li class="list_item">Region: <span>${region.region}</span></li>
                        <li class="list_item">Capital: <span>${region.capital}</span></li>
                      </ul>
                    </div>
                    ` 
                    )
                }
            }
        )
    })
}

// Search country
const form = document.getElementById("form");
const formInput = document.getElementById("form_input");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  var name = formInput.value;
  fetch(`${url}name/${name}`)
  .then((resp) => resp.json()) // Transform the data into json
  .then(
      function displayResults(resp) {
        console.log(resp.status)
        if (resp.status == 404) {
          alert("Not found!");
        }
        else {
          resp.map( country => 
            row.innerHTML = `
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
      }
  )
  .catch(err => {
    console.log(err)
  }
 )
})