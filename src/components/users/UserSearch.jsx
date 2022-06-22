import React, { useState, useContext } from 'react'
import UserContext from '../../store/user-context'
import AlertContext from '../../alert/alert-context'

function UserSearch() {
    const [searchText, setSearchText] = useState("")
    
    const ctx = useContext(UserContext)
    const alertCtx=useContext(AlertContext)

    const searchHandler = (event) => {
        setSearchText(event.target.value)
    }
    
    const clearUserHandler=()=>{
        ctx.clearUser()
    }
    const submitHandler = (event) => {
        event.preventDefault()
        if (searchText == '') {
            // alert("Please enter something")
            alertCtx.setAlert("Please enter something",'error')
        }
        else {
            ctx.getUser(searchText)
            setSearchText("")
        }
    }
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <div className="relative">
                            <input type="text" value={searchText} onChange={searchHandler} className="w-full pr-40 bg-gray-200 input input-lg text-black" placeholder='search' />
                            <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {ctx.users.length > 0 && <div>
                <button onClick={clearUserHandler} className="btn-ghost btn-lg">
                    clear
                </button>
            </div>}
        </div>
    )
}

export default UserSearch