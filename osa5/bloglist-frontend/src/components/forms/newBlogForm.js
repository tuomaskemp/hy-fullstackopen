import React from 'react'

const NewBlogForm = ({
    newBlogSubmitHandler, 
    title, 
    titleOnChange, 
    author, 
    authorOnChange, 
    url, 
    urlOnChange
}) => (
    <div>
        <form onSubmit={newBlogSubmitHandler}>
        <div>
        title:
            <input 
                type="text"
                value={title}
                name="Title"
                onChange={titleOnChange}
            />
        </div>
        <div>
        author:
            <input 
                type="text"
                value={author}
                name="Author"
                onChange={authorOnChange}
            />
        </div>
        <div>
        url:
            <input 
                type="text"
                value={url}
                name="Url"
                onChange={urlOnChange}
            />
        </div>
        <button type="submit">create</button>
        </form> 
    </div>
)

export default NewBlogForm