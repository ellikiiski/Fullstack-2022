import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [chosen, setChosen] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
      setCountries(mapCountries(response.data))
    })
  }, [])

  const mapCountries = (list) => {
    const mappa = new Map()
    list.forEach(country => mappa.set(country.name.common, country))
    return (mappa)
  }

  const showCountry = (event) => {
    event.preventDefault()
    setChosen(event.target.className)
  }

  const handleFiltering = (event) => {
    if (event.target.value === "") {
      setChosen('')
    }
    setFilter(event.target.value)
  }

  const filteredCountries = new Map([...countries].filter(([name, country]) => name.toLowerCase().includes(filter.toLowerCase())))

  return (
    <div>
      find countries: <input value={filter} onChange={handleFiltering}></input>
      <Info countries={filteredCountries} chosen={chosen} showFunc={showCountry} />
    </div>
  )

}

export default App