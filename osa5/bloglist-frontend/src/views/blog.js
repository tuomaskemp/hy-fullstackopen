import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Button from '../components/Button'
import CommentList from '../components/CommentList'
import NewComment from '../components/forms/NewComment'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

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
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>Added by: {blog.user.username}</p>
      <p className="like-count">Likes: {blog.likes}</p>
      <Button text="like" clickAction={handleLikeClick} />
      <h4>Comments</h4>
      <NewComment blog={blog} />
      <CommentList comments={blog.comments} />
      {
        blog.user.username === user.username ?
          <Button text="remove blog" clickAction={handleRemoveClick} /> :
          <p>You have no permission to remove this blog.</p>
      }
    </div>
  )
}

export default Blog