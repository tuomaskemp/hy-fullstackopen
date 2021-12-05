import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Header, Segment, List } from 'semantic-ui-react'

const User = () => {
  const userid = useParams()
  const users = useSelector(state => state.user.users)
  const user = users.find(user => user.id === userid.id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Header size="huge">{user.fullname}</Header>
      <Segment raised>
        <Header size="medium">Added blogs</Header>
        <List divided relaxed>
          {user.blogs.map(blog =>
            <List.Item key={blog.id}>
              <List.Header>{blog.title}</List.Header>
            by {blog.author}
            </List.Item>)}
        </List>
      </Segment>
    </div>
  )
}

export default User