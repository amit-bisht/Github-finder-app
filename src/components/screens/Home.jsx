import React from 'react'
import UserList from '../users/UserList'
import UserSearch from '../users/UserSearch'


function Home() {
  return (
    <div>
      <UserSearch/>
      <UserList />
    </div>
  )
}

export default Home