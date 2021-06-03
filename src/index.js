import './sass/main.scss';
import countryList from './templates/country-list.hbs';
import countryInfo from './templates/country-info.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import fetchCountries from './fetchCountries'

const debounce = require('lodash.debounce')
const inputEl = document.querySelector('.country-input')
const listEl = document.querySelector('.country-list')
const infoEl = document.querySelector('.country-container')
const countryListEl = document.querySelector('.country-list')

inputEl.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
    const countryName = e.target.value
    fetchCountries(countryName)
        .then(country => {
            
            
            if (countryName === '' || country.status === 404) {
                 clearMarkup()
                return
            } else if (country.length > 10) {
                error({
                    title: 'Too many matches found. Please enter a more specific query!',
                    delay: 2000
                });
                clearMarkup()
            } else if (country.length >= 2 && country.length <= 10) {
                renderCoutryList(country)
                infoEl.innerHTML = ''
               
            } else if (country.length === 1) {
                renderCountryInfo(country)
                listEl.innerHTML = ''
            } 
            })
}

function renderCoutryList(country) {
    const listMarkup = countryList(country)
    listEl.innerHTML = listMarkup
}

function renderCountryInfo(country) {
    const infoMarkup = countryInfo(country)
    infoEl.innerHTML = infoMarkup
}

function clearMarkup() {
    listEl.innerHTML = ''
    infoEl.innerHTML = ''
}