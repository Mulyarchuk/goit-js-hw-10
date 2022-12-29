import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector(`input#search-box`);
const countryList = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);


input.addEventListener(`input`,debounce(onSearch,DEBOUNCE_DELAY));

function onSearch(evt){
evt.preventDefault();
let name = evt.target.value.trim();
clearInput();
if (name !=" "){
fetchCountries(name).then(countries=> {
    if (countries.length > 10){
        clearInput();
 Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
 return;
} else if (countries.length>=2 && countries.length<=10){
    creatMarkupList(countries);
} else if (countries.length===1){
    creatMarkupInfo(countries);
}
}).catch(inCaseError());
}}

function creatMarkupList(countries){
    const markup = countries.map(({flags,name})=>
    `<li class="list">
    <img class="image" src="${flags.svg}" alt="${name.official}"/>
    <h2 class="name">${name.official}</h2>
  </li>`).join(``);
  countryList.innerHTML = markup;
}

function creatMarkupInfo(countries){
    const markup = countries.map(({flags,name,capital,population,languages})=>
    `<div class="listInfo">
    <img src="${flags.svg}" alt="${name.official}" width = "50"/>
      <h1 class="name">${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>
    </div>`).join(``);
  countryInfo.innerHTML = markup;
}

function clearInput (){
    countryList.innerHTML = ``;
    countryInfo.innerHTML = ``;
}

function inCaseError(){
    clearInput();
    Notiflix.Notify.warning("Oops, there is no country with that name")
}