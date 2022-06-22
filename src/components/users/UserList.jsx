import React, {useContext,useEffect} from 'react'
import Spinner from '../UI/Spinner';
import UserItem from './UserItem';
import UserContext from '../../store/user-context'
function UserList() {
    const ctx=useContext(UserContext)
    const users=ctx.users
    const loading=ctx.isLoading
    // console.log(users)
    console.log(loading)
    if (!loading) {
        return (
            <div className="grid grid-col-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map(user => <UserItem key={user.id} user={user} />)}
            </div>
        )
    }
    else {
        <Spinner />
    }
}

export default UserList