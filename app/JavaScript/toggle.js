const html = document.querySelector("html")
const toggleButton = document.querySelector(".toggle")
const toggleIcon = document.querySelector(".toggle__icon")
const SearchIcon = document.querySelector(".search-icon")
const toggleText = document.querySelector(".toggle__text")
const arrowIcon = document.querySelector(".arrow-icon")
var theme
var getTheme
toggleButton.addEventListener('click',toggleAfterClick)

function toggleAfterClick(){
    if(html.classList.contains("Light")){
        html.classList.add("Dark")
        html.classList.remove("Light")
        toggleIcon.src = "images/icon-sun.png"
        SearchIcon.src = "images/search-icon-dark.png"
        arrowIcon.src = "images/arrow-dark.png"
        toggleText.textContent = "Light Mode"
    }else{
        html.classList.add("Light")
        html.classList.remove("Dark")
        toggleIcon.src = "images/icon-moon.png"
        SearchIcon.src = "images/search-icon-light.png"
        arrowIcon.src = "images/arrow-light.png"
        toggleText.textContent = "Dark Mode"
    }
}