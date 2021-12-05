import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import Blog from './Blog'
import { Segment, List, Header } from 'semantic-ui-react'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <Segment raised className="blogs-list">
      <Header size="large">Blogs</Header>
      <List divided relaxed>
        {blogs
          .sort((a, b) => a.likes < b.likes ? 1 : -1)
          .map(blog => (
            <Segment key={blog.id} size="big">
              <Blog
                blog={blog}
              />
            </Segment>)
          )}
      </List>
    </Segment>
  )
}

export default BlogList