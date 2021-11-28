import React from 'react'
import { useHistory } from 'react-router'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    
    const fields = [content, author, info].map(({clear, ...rest}) => rest)
    
    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      history.push('/')
    }

    const resetForm = (e) => {
      e.preventDefault()
      content.clear()
      author.clear()
      info.clear()
    }
      
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...fields[0]} />
          </div>
          <div>
            author
            <input {...fields[1]} />
          </div>
          <div>
            url for more info
            <input {...fields[2]} />
          </div>
          <button>create</button>
          <button onClick={resetForm}>reset</button>
        </form>
      </div>
    )
  
}

export default CreateNew