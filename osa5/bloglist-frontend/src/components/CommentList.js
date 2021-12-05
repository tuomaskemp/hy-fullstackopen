import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'

const CommentList = ({ comments }) => {
  return (
    <div>
      <Divider />
      {comments.map(comment =>
        <Segment key={comment.id}>{comment.content}</Segment>
      )}
      <Divider />
    </div>
  )
}

export default CommentList