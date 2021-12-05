import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'
import { Input, Form, Button } from 'semantic-ui-react'

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
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={content} onChange={({ target }) => setContent(target.value)}/>
        <Button primary content="add comment" />
      </Form>
    </div>
  )
}

export default NewComment