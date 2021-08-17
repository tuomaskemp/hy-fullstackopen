import React, { useState } from 'react'

const Button = ({handleClick, value}) => (
    <div>
      <button onClick={handleClick}>{value}</button>
    </div>
)

const Title = ({text}) => (
  <div>
    <h1>
      {text}
    </h1>
  </div>
)

const TextDisplay = ({text}) => (
  <div>
    <p>
      {text}
    </p>
  </div>
)

const VoteCount = ({count}) => (
  <div>
    <p>
      has {count} votes
    </p>
  </div>
)

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
  const [vote, setVote] = useState(new Array(7+1).join('0').split('').map(parseFloat))
  const randomIndex = () => {
    const random = Math.floor(Math.random() * 7)
    return random !== selected ? random : randomIndex()
  } 
  const setIndex = (index) => () => { setSelected(index) }
  const addVote = (index) => () => {
    const votesToModify = [...vote]
    votesToModify[index] += 1
    setVote(votesToModify)
  }
  const biggestVoteCount = Math.max(...vote)
  const biggestVoteCountIndex = vote.indexOf(biggestVoteCount)
  
  return (
    <div>
      <Title text="Anecdote of the day" />
      <TextDisplay text={anecdotes[selected]} />
      <VoteCount count={vote[selected]} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button handleClick={addVote(selected)} value="vote" />
        <Button handleClick={setIndex(randomIndex)} value="next anecdote" />
      </div>

      <Title text="Anecdote with most votes"/>
      <TextDisplay text={anecdotes[biggestVoteCountIndex]} />
      <VoteCount count={biggestVoteCount} />
    </div>
  )
}

export default App
