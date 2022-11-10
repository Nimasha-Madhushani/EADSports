import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({blogs}) => {
  console.log(blogs);
    return (
      blogs.length>0 && blogs.map(blog=>{
          return <BlogCard blog={blog} />
      })
    )
  };

export default BlogList;