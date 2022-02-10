import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Info from './Info'

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

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter: <input value={value} onChange={onChange}></input>
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [chosen, setChosen] = useState('')

  const filteredCountries = new Map([...countries].filter(([name, country]) =>
    name.toLowerCase().includes(filter.toLowerCase())))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
      setCountries(mapCountries(response.data))
    })
  }, [])

  const mapCountries = (list) => {
    const mapped = new Map()
    list.forEach(country => mapped.set(country.name.common, country))
    return (mapped)
  }

  const showCountry = (event) => {
    event.preventDefault()
    setChosen(event.target.className)
  }

  const handleFiltering = (event) => {
    if (event.target.value === '') {
      setChosen('')
    }
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries: <Filter value={filter} onChange={handleFiltering} />
      <Info countries={filteredCountries} chosen={chosen} showFunc={showCountry} />
    </div>
  )
}

export default App