const buttonTheme = document.getElementById("button_theme");
const buttonFilter = document.getElementById("button_filter");
const listFilter = document.getElementById("list_filter");
const listFilterItems = document.getElementsByClassName("list_filter_item");
const imgLight = document.getElementById("img_light");
let showLIstFilter = false;

// Function to toggle between light and dark theme
function toggleTheme() {
    if (document.body.classList.contains("theme_light")){
        document.body.classList.add("theme_dark");
        document.body.classList.remove("theme_light");
        imgLight.style.display = "none";
    } else {
        document.body.classList.add("theme_light");
        document.body.classList.remove("theme_dark");
        imgLight.style.display = "inline-block";
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
const main = document.getElementById("main");
const url = "https://restcountries.eu/rest/v2/";

let resultHTML = "";

function getResults() {
  fetch(`${url}all`)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function displayResults(resp) {
      const col = document.getElementsByClassName("col");

      resp.map(
        (country) =>
          (resultHTML += `
        <div  data-country=${encodeURIComponent(
          JSON.stringify(country)
        )} id="col" class="col">
          <div class="container_img">
            <img src=${country.flag} alt="germany" />
          </div>
          <h3>${country.name}</h3>
          <ul class="list">
            <li class="list_item">Population: <span>${
              country.population
            }</span></li>
            <li class="list_item">Region: <span>${country.region}</span></li>
            <li class="list_item">Capital: <span>${country.capital}</span></li>
          </ul>
        </div>
        `)
      );

      row.innerHTML = resultHTML;

      row.addEventListener("click", function (e) {
        const element = e.target.closest(".col");
        const country = JSON.parse(decodeURIComponent(element.dataset.country));
        console.log(country);

        main.innerHTML = `
        <a href="" class="button_link">&#8592;<span>Back</span></a>
        <div class="row">
        <div class="col_country">
          <div class="container_img">
            <img src=${country.flag} alt="germany" />
          </div>
        </div>
        <div class="col_country">
        <h2 class="margin_left">${country.name}</h2>
        <div class="col_country_list margin_left">
          <ul class="list">
            <li class="list_item">Native Name: <span>${country.nativeName}</span></li>
            <li class="list_item">Population: <span>${country.population}</span></li>
            <li class="list_item">Region: <span>${country.region}</span></li>
            <li class="list_item">Sub Region: <span>${country.subregion}</span></li>
            <li class="list_item">Capital: <span>${country.capital}</span></li>
          </ul>
          <ul class="list">
            <li class="list_item">Top Level Domain: <span>${country.topLevelDomain}</span></li>
            <li class="list_item">Currencies: <span>${country.currencies.map(item =>
              item.name             
              )}</span></li>
            <li class="list_item">Languages: <span>${country.languages.map(item => 
              item.name              
              )}</span></li>
          </ul>
        </div>
        <ul class="list margin_left">
          <li class="list_item">Border Countries: ${country.borders.reduce((acc, curr) => {
            return acc +`<span class="button_link">${curr}</span>`
          },"")}</li>
        </ul>
        </div>
        </div>
        `;
        row.innerHTML = resultHTML;
      });
    });
};

getResults();

// Change region
for (i=0; i < listFilterItems.length; i++) {
    listFilterItems[i].addEventListener("click", function(e) {
        var region = e.target.textContent;
        fetch(`${url}region/${region}`)
        .then((resp) => resp.json()) // Transform the data into json
        .then(
            function displayResults(resp) {    
                console.log(resp)
                resultHTML = "";
                if (resp.status == 404) {
                  alert("Not found!")
                }
                else {
                  resp.map( region => 
                    resultHTML += `
                    <div id="col" class="col">
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

                  row.innerHTML = resultHTML;
                }
            }
        )
    })
}

// Search country
const form = document.getElementById("form");
const formInput = document.getElementById("form_input");

formInput.addEventListener("change", function(e) {
  console.log(e.target.value)
  if (e.target.value == "") {
    getResults();
  }
})

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let urlCountry = "";
  let name = formInput.value;
  console.log(name)

  if (name === "") {
    urlCountry =  `${url}all`
  } else {
    urlCountry = `${url}name/${name}`
  }

  fetch(`${urlCountry}`)
  .then((resp) => resp.json()) // Transform the data into json
  .then(
      function displayResults(resp) {
        console.log(resp)
        if (resp.status == 404) {
          alert("Not found!");
        }
        else {
          resp.map( country => 
            resultHTML = `
            <div id="col" class="col">
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
            );

          row.innerHTML = resultHTML;
        }
      }
  )
  .catch(err => {
    console.log(err)
  }
 )
});