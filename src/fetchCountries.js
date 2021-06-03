export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(r => {
            if (searchQuery === '') {
                return
            }
            return r.json()
        })
}