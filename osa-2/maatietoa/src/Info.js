import React from 'react'

// DISCLAIMER
//
// Otin maahakuun huomioon myös corner caset (esim. Sudan),
// vaikka pitikin käyttää aika outoja keinoja.
// Maainfo lähtee pois näkyvistä kun filtterikentän tyhjentää kokonaan.
//
// Ja tämä siis siksi, että mielestäni tehtävä 2.13 oli idioottimainen,
// koska napit eivät tuoneet mitään iloa sivun toimintaan
// (ymmärrän kyllä pedagokisen tarkoituksen, mutta tyhmää silti).
//
// Toivottavasti tämän toiminnallisuuden tekemiseen saa vähän
// parempia eväitä kurssin edetessä. :D
  
const Population = ({ country }) => {
  return (
    <div>
      <b>Population </b> {country.population}
    </div>
  )
}
  
const Capital = ({ country }) => {
  return (
    <div>
      <b>Capital</b> {country.capital}
    </div>
  )
}
  
const Timezones = ({ country }) => {
  const zones = country.timezones
  return (
    <div>
      <b>{zones.length} timezone(s)</b> {zones.join(", ")}
    </div>
  )
}
  
const Languages = ({ country }) => {
  const languages = Object.entries(country.languages).map(language => language[1])
  return (
    <div>
      <b>Languages</b>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
    </div>
  )
}
  
const Flag = ({ country }) => {
  return (
    <div>
      <img src={country.flags.svg} height="100"></img>
    </div>
  )
}

const Country = ({ country, showFunc }) => {
  return (
    <div>
      {country.name.common} <input className={country.name.common} value="show" type="button" onClick={showFunc}/>
    </div>
  )
}
  
const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <Capital country={country} />
      <Population country={country} />
      <Timezones country={country} />
      <Languages country={country} />
      <Flag country={country} />
    </div>
  )
}
  
const Info = ({ countries, chosen, showFunc }) => {
  const listOfCountries = Array.from(countries.values())
  if (chosen != "") {
    return (<CountryInfo country={countries.get(chosen)} />)
  }
  if (listOfCountries.length === 1) {
    return (<CountryInfo country={listOfCountries[0]} />)
  }
  if (listOfCountries.length >= 10) {
    return (<div>Too many matches, specify more</div>)
  }
  if (listOfCountries.length > 1) {
    return (<div>{listOfCountries.map(country => <Country key={country.name.common} country={country} showFunc={showFunc} />)}</div>)
  }
  return (<div>No matches</div>)
}

export default Info