import React from 'react';
import UserCard from './UserCard';

const UserList = ({users}) => {
  return (
    users.length>0 && users.map(user=>{
        return <UserCard user={user} />
    })
  )
};

export default UserList;