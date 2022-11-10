import React from 'react';
import './BlogCard.css';

const BlogCard = ({blog}) => {
  return (
    <div className='blogCard'>
        <h3>{blog.title}</h3>
        <p>{blog.description.slice(0,50)}...</p>
        <button className='readMoreButton' >Read more...</button>
    </div>
  )
}

export default BlogCard;