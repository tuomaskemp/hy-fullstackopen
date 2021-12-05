import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'

const NewComment = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const comment = {
      id: blog.id,
      content
    }
    dispatch(createComment(comment))
      .then(() => {
        dispatch(showNotification(`A new comment ${comment.content} added`, '', 5))
        setContent('')
      })
      .catch(() => dispatch(showNotification('cannot add comment', 'error', 5)))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={content} onChange={({ target }) => setContent(target.value)}/>
        <input type="submit" value="add comment" />
      </form>
    </div>
  )
}

export default NewComment