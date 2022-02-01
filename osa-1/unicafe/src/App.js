import React, { useState } from 'react'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({ name, click }) => {
  return(
    <div>
      <button onClick={click}>{name}</button>
    </div>
  )
}

const StatLine = ({ text, value }) => {
  return (
    <>
        <td>{text}</td>
        <td>{value}</td>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  let average = (good - bad) / all || 0
  let posi = all != 0 ? good / all * 100 + ' %' : '0 %'

  if (all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <StatLine text='Good' value={good} />
        </tr>
        <tr>
          <StatLine text='Neutral' value={neutral} />
        </tr>
        <tr>
          <StatLine text='Bad' value={bad} />
        </tr>
        <tr>
          <StatLine text='All' value={all} />
        </tr>
        <tr>
          <StatLine text='Average' value={average} />
        </tr>
        <tr>
          <StatLine text='Positive' value={posi} />
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let header1 = 'give feedback'
  let header2 = 'statistics'

  return (
    <div>
      <Header name={header1} />
      <Button name={'good'} click={() => setGood(good + 1)} />
      <Button name={'neutral'} click={() => setNeutral(neutral + 1)} />
      <Button name={'bad'} click={() => setBad(bad + 1)} />
      <Header name={header2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App