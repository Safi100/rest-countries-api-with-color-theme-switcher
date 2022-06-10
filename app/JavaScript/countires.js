const select = document.querySelector(".select_region")
const inputSearch = document.querySelector(".search_country")
const countryInfoPage = document.querySelector(".countryInfoPage")
document.querySelector(".select").addEventListener('click',open_close_menu)
document.querySelector(".Back_Btn").addEventListener('click', close_page)
let countries
fetch('https://restcountries.com/v2/all')
.then(req => req.json())
.then(result => getAllCountries(result))
.catch(error => alert(error + "\nReload the page") )

// Display countries after fetch
function getAllCountries(c){
    document.querySelector('.loader').style.display="none" // hide loader after loaded
    document.querySelector('.grid').innerHTML="" // remove after select
    countries = c
    countries.forEach(country => {
        let country_flag = country.flag
        let country_name = country.name
        let country_population = country.population.toLocaleString("en-US")
        let country_region = country.region
        let country_capital = country.capital
        const displayCountry = `
        <a>
            <div class="img-div"><img class="country_flag" src="${country_flag} alt="${country_name} flag"> </div>
            <div class="country_info">
                <h3 class="country_name">${country_name}</h3>
                <p class="country_population"> <span>Population:</span> ${country_population}</p>
                <p class="country_region"> <span>Region:</span> ${country_region}</p>
                <p class="country_capital"> <span>Capital:</span> ${country_capital}</p>
            </div>
        </a>
        `
        const card = document.createElement('div')
        card.innerHTML= displayCountry
        card.classList.add("card")
        document.querySelector('.grid').appendChild(card)
        
        // Search region field
        inputSearch.addEventListener('input',()=>{
           inputSearch.value = inputSearch.value.trimStart()
            SearchCountry(card,country_name,inputSearch.value.trim())
        })

        // Select region field
        document.querySelectorAll(".region").forEach(region =>{
            SelectRegion(card,country_region,region)
        })
        // Country info page
        card.addEventListener("click",()=>{
            displayCountryInfo(country)
        })
    })
}

// close and open select menu
function open_close_menu() {
    document.querySelector(".option").classList.toggle("show");
    document.querySelector(".arrow-icon").classList.toggle("open");
}

// Close menu after click on anything otherwise menu
document.onclick = function(e){
    if(e.target.id !="option" && e.target.className !="select-click" && e.target.className!="select" && e.target.id!="arrow-icon"){
        document.querySelector(".option").classList.remove("show");
        document.querySelector(".arrow-icon").classList.remove("open");
    }
}
// Search country function
function SearchCountry(card,country_name,search){
    if((country_name.toLowerCase().includes(search.toLowerCase()))){
        card.classList.add("show_card")
        card.classList.remove("hide_card")
    }else{
        card.classList.remove("show_card")
        card.classList.add("hide_card")
    }
    // filter region to all After search 
    document.querySelectorAll(".region").forEach(unselected_region => { 
        unselected_region.classList.remove("selected")
        if(unselected_region.lastChild.nodeName=="IMG"){
            unselected_region.lastChild.remove()
        }
    })

    let img = document.createElement('img')
    img.src="images/checked.png"
    img.alt="ckecked icon"
    document.querySelectorAll('.region')[0].classList.add("selected")
    document.querySelectorAll('.region')[0].appendChild(img)
        

}

// Select country by region function
function SelectRegion(card,country_region,region){
    region.addEventListener('click',()=>{
        document.querySelectorAll(".region").forEach(unselected_region => { 
            unselected_region.classList.remove("selected")
            if(unselected_region.lastChild.nodeName=="IMG"){
                unselected_region.lastChild.remove()
            }
        })
        region.classList.add("selected")

        if(region.textContent == "All"){
            card.classList.add("show_card")// display all countries
            card.classList.remove("hide_card")
        }else if(country_region == region.textContent){
            card.classList.add("show_card")
            card.classList.remove("hide_card")
        }else{
            card.classList.add("hide_card")
            card.classList.remove("show_card")
        }
        document.querySelectorAll(".region").forEach(region=>{
            if(region.classList.contains("selected")){
                var img = document.createElement('img')
                img.src="images/checked.png"
                img.alt="ckecked icon"
                region.appendChild(img)
            }
        })
        document.querySelector(".option").classList.remove("show");
        document.querySelector(".arrow-icon").classList.remove("open");

        // Remove search input after filter by region
        inputSearch.value=""
    })
}

// Display country after click on card
function displayCountryInfo(country){
    let country_flag = country.flag
    let country_name = country.name
    let country_native_name = country.nativeName
    let country_population = country.population.toLocaleString("en-US")
    let country_region = country.region
    let country_subregion = country.subregion
    let top_level_domain = country.topLevelDomain
    let country_capital = (country.capital == undefined) ? "No Capital..." : country.capital
    let country_currencies = country.currencies.filter(currencies => currencies.name).map(c => `${c.name}`).join(", ")
    let country_languages = country.languages.filter(language => language.name).map(l => `${l.name}`).join(", ")
    let country_borders = (country.borders == undefined) ? "<p>No borders...</p>" : country.borders.map(border =>`<button class="border_button">${border}</button>`).join("")
    const countryInfo=`
        <div class="img_container"><img src="${country_flag}" alt="${country_name} flag"></div>
        <div class="Country_info_container">
            <h2 class="country_name">${country_name}</h2>
            <div class="info_container">
                <div class="right">
                    <p class="native_name"><span>Native Name:</span> ${country_native_name}</p>
                    <p class="population"><span>Population:</span> ${country_population}</p>
                    <p class="region"><span>Region:</span> ${country_region}</p>
                    <p class="sub_region"><span>Sub Region:</span> ${country_subregion}</p>
                    <p class="capital"><span>Capital:</span> ${country_capital}</p>
                </div>
                <div class="left">
                    <p class="top_level_domain"><span>Top Level Domain:</span> ${top_level_domain}</p>
                    <p class="currencies"><span>Currencies:</span> ${country_currencies}</p>
                    <p class="languages"><span>Languages:</span> ${country_languages}</p>
                </div>
            </div>
            <div class="borders_container">
                <div class="border_text_container"><span class="border_text">Border Countries:</span></div>
                <div class="borders">${country_borders}</div>
            </div>
        </div>
    `
    document.querySelector(".country_container").innerHTML = countryInfo
    open_page()

    document.querySelectorAll('.border_button').forEach(button=>{
        button.addEventListener('click', ()=>{
            countries.forEach(country =>{ displayCountryInfoByBorder(country,button.textContent) })
        })
    })

}

function displayCountryInfoByBorder(country,CountryByBorder){
    (country.alpha3Code == CountryByBorder) ?  displayCountryInfo(country) : ""
}
// Open country info page
function open_page(){
    countryInfoPage.classList.add("show_country_container")
    document.body.classList.add("body_after_show")
}

// Close country info page
function close_page(){
    countryInfoPage.classList.remove("show_country_container")
    document.body.classList.remove("body_after_show")
}

