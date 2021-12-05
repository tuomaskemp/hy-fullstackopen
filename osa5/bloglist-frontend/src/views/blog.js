import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import CommentList from '../components/CommentList'
import NewComment from '../components/forms/NewComment'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Header, Button, Icon, Segment, Grid } from 'semantic-ui-react'

const Blog = () => {
  const blogId = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === blogId.id)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleRemoveClick = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(removeBlog(blog))
        .then(() => {
          dispatch(showNotification(`${blog.title} removed`, '', 5))
        })
        .catch(() => dispatch(showNotification('blog remove failed', 'error', 5)))
    }
  }

  const handleLikeClick = () => {
    dispatch(likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    }))
      .then(() => dispatch(showNotification('blog updated successfully', '', 5)))
      .catch(() => dispatch(showNotification('blog update failed', 'error', 5)))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <Segment raised>
        <Header size='huge'>{blog.title} {blog.author}</Header>
        <Grid divided='vertically'>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button
                primary
                icon='heart'
                content="Like"
                onClick={handleLikeClick}
                label={{ as: 'a', basic: true, content: blog.likes }}
                labelPosition='right'
                className="like-count"
              />
            </Grid.Column>
            <Grid.Column>
              <Button><a href={blog.url}>{blog.url}</a><Icon name="long arrow alternate right" /></Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <p><b>Added by</b> {blog.user.username}</p>
      </Segment>

      <Segment raised>
        <Header size="medium">Comments</Header>
        <NewComment blog={blog} />
        <CommentList comments={blog.comments} />
      </Segment>
      <Grid divided='vertically'>
        <Grid.Row columns={1}>
          <Grid.Column>
            {
              blog.user.username === user.username ?
                <Button content="remove blog" onClick={handleRemoveClick} /> :
                <p>You have no permission to remove this blog.</p>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Blog