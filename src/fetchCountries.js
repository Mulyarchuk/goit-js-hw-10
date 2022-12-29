const BASE_URL = `https://restcountries.com/v3.1/name`;

export function fetchCountries(name){
    
    return fetch(`${BASE_URL}/${name}?field=name,capital,population,flags,languages`).then(resp=>{
        if (resp.statusText === `404`){
            throw new Error(resp.statusText)
        } else{
        return resp.json()};
    })
}