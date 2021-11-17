import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.filter.filter !== '' ?
        state.anecdotes.filter(a => 
            a.content.toLowerCase().includes(state.filter.filter.toLowerCase())
        )
        : state.anecdotes
    })
    const dispatch = useDispatch()

    const newVote = (id) => {
        const content = anecdotes.filter(a => a.id === id)
        dispatch(vote(id))
        dispatch(showNotification(`You voted ${content[0].content}`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000);
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
                        <button onClick={() => newVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList