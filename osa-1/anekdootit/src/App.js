import React, { useState } from 'react'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({ name, click }) => {
  return (
    <div>
      <button onClick={click}>{name}</button>
    </div>
  )
}

const Anecdote = ({ name, text, votes }) => {
  return (
    <div>
      <Header name={name} />
      <h4>{text}</h4>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const anec1h = 'Anecdot of the day'
  const anec2h = 'Anecdote with most votes'

  const selectRandom = () => {
    let max = anecdotes.length
    setSelected(Math.floor(Math.random() * max))
  }

  const addVote = () => {
    let newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    if (newVotes[mostVoted] <= newVotes[selected]) {
      setMostVoted(selected)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote name= {anec1h} text={anecdotes[selected]} votes={votes[selected]} />
      <Button name={'next anecdote'} click={() => selectRandom()} />
      <Button name={'vote'} click={() => addVote()} />
      <Anecdote name= {anec2h} text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App