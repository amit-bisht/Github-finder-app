import React, { useReducer } from "react";
const axios = require('axios').default;

const UserContext = React.createContext({
    users: [],
    isLoading: true,
    isSingleUserLoading:true,
    user: {},
    repos:[],
    getUser: (username) => { },
    clearUser: () => { },
    getUserDetial: (username) => { },
    getRepos:(username)=>{}
})
export default UserContext

const userReducer = (state, action) => {
    if (action.type == "USER_LOAD") {
        console.log("reducer was executed")
        return ({ users: action.val, isLoading: false,isSingleUserLoading:true,repos:[] })
    }
    if (action.type == "CLEAR_USERS") {
        return ({
            users: [],
            isLoading: false,
            isSingleUserLoading:true,
            repos:[]
        })
    }
    if (action.type == 'SINGLE_USER_DETAIL') {
        return ({
            users: [],
            isSingleUserLoading:false,
            user: action.val,
            repos:[]
        })
    }
    if(action.type=="GET_REPOS"){
        return({
            users: state.users,
            isLoading:state.isLoading,
            isSingleUserLoading:state.isSingleUserLoading,
            user: state.user,
            repos:action.val
        })
    }
    return ({
        users: [],
        isLoading: true,
        isSingleUserLoading:true,
        repos:[]
    })
}
const initialState = {
    users: [],
    user: {},
    isLoading: true,
    isSingleUserLoading:true,
    repos:[]
}
export const UserContextProvider = (props) => {
    const [userState, dispatchUser] = useReducer(userReducer, initialState)

    const clearUser = () => {
        dispatchUser({ type: 'CLEAR_USERS' })
    }


    async function getUser(username) {
        const params = new URLSearchParams({
            q: username
        })
        try {
            const response = await axios.get(`https://api.github.com/search/users?${params}`);
            dispatchUser({ type: 'USER_LOAD', val: response.data.items })
            // console.log(response.data.items)
        } catch (error) {
            console.error(error);
        }
        console.log("executed")
    }

    async function getUserDetial(username) {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            dispatchUser({type:'SINGLE_USER_DETAIL',val:response.data})
            console.log(response.data)
        } catch (error) {
            window.location="/notfound"
        }
        console.log("executed")
    }

    async function getRepos(username) {
        const params = new URLSearchParams({
            sort:'created',
            per_page:10
        })
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos?${params}`);
            dispatchUser({ type: 'GET_REPOS', val: response.data })
            // console.log(response.data)
        } catch (error) {
            console.error(error);
        }
        console.log("executed")
    }

    const userValue = { users: userState.users,repos:userState.repos,getRepos:getRepos,isSingleUserLoading:userState.isSingleUserLoading,getUserDetial: getUserDetial, isLoading: userState.isLoading, user: userState.user, getUser: getUser, clearUser: clearUser }

    return (
        <UserContext.Provider value={userValue}>
            {props.children}
        </UserContext.Provider>
    )
}
