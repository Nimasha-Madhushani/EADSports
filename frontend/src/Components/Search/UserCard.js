import React from 'react';
import './UserCard.css'

const UserCard = ({user}) => {
  return (
    <div className='userCard'>
        <h3>{user.firstName+" "+user.lastName}</h3>
        <p>{user.email}</p>
    </div>
  )
}

export default UserCard;