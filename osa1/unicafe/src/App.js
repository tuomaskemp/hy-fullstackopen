import React, { useState } from 'react'

const Title = ({text}) => (
  <div>
    <h1>
      {text}
    </h1>
  </div>
)

const Button = ({handleClick, value}) => {
  return(
  <div>
    <button onClick={handleClick}>{value}</button>
  </div>
)}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text} {value}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad, all, avg, positive}) => {
  if(!good && !neutral && !bad){
    return (
      <div>
        <Title text="statistics" />
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
          <Title text="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = (good+neutral+bad)
  const positive= (good/all)*100
  const avg = ((good*1)+(bad*(-1)))/all
  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button handleClick={goodClick} value="good" />
        <Button handleClick={neutralClick} value="neutral" />
        <Button handleClick={badClick} value="bad" />
      </div>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
        all={good+neutral+bad}
        avg={avg}
        positive={positive}
      />
    </div>
  )
}

export default App
