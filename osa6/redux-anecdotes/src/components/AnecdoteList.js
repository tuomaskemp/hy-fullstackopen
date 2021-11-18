import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.filter.filter !== '' ?
        state.anecdotes.filter(a => 
            a.content.toLowerCase().includes(state.filter.filter.toLowerCase())
        )
        : state.anecdotes
    })
    const dispatch = useDispatch()

    const newVote = (anecdote) => {
        dispatch(vote(anecdote.id, anecdote))
        dispatch(showNotification(`You voted ${anecdote.content}`, 5))
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => a.votes < b.votes ? 1 : -1)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => newVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList