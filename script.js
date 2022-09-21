const url = 'https://api.openweathermap.org/data/2.5/';
const key = 'f928937890bc1999f8cdb6d3a871d45f';

const searchBar = document.getElementById('searchBar');
let city = document.querySelector('.city');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let minmax = document.querySelector('.minmax');



const setResult = () => {
    let query = `${url}weather?q=manavgat&appid=${key}&units=metric&lang=tr`;
    fetch(query)
    .then(weather => {
        return weather.json();
    }
    ).then((data) => {
        displayResults(data);
    });
}

setResult();

searchBar.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBar.value);
        searchBar.value = '';
    }
}

const getResults = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
    .then(weather => {
        return weather.json();
    }
    ).then(displayResults);
}

const displayResults = (weather) => {
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    let letter = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);
    desc.innerText = letter;
    minmax.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}
