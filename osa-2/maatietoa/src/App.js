import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      {country.name.common}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  console.log(country)
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

const Info = ({ countries }) => {
  if (countries.length >= 10) {
    return (<div>Too many matches, specify more</div>)
  }
  if (countries.length > 1) {
    return (<div>{countries.map(country => <Country key={country.name.common} country={country} />)}</div>)
  }
  if (countries.length === 1) {
    return (<CountryInfo country={countries[0]} />)
  }
  return (<div>No matches</div>)
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFiltering = (event) => {
    setFilter(event.target.value)
  }

  //const names = countries.map(country => country.name.common)
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      find countries: <input value={filter} onChange={handleFiltering}></input>
      <Info countries={filteredCountries} />
    </div>
  )

}

export default App