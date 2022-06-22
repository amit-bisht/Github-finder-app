import React,{useReducer} from 'react'

const AlertContext=React.createContext({
    type:null,
    message:null,
    setAlert:(par1,par2)=>{}
})
export default AlertContext

const initialState={
    type:null,
    message:null
}
const alertReducer=(state,action)=>{
    if(action.type=="SET_ALERT"){
        return{
            type:action.value.type,
            message:action.value.message
        }
    }
    if(action.type=="REMOVE_ALERT"){
        return {
            type:null,
            message:null
        }
    }
    return state
}
export const AlertContextProvider=(props)=>{
    const [alertState,dispatchAlert]=useReducer(alertReducer,initialState)
    
    const setAlert=(msg,type)=>{
        dispatchAlert({
            type:'SET_ALERT',
            value:{
                'message':msg,
                'type':type
            }
        })
        setTimeout(()=>{dispatchAlert({type:'REMOVE_ALERT'})},3000)
    }

    const alertValue={type:alertState.type,message:alertState.message,setAlert:setAlert}
    
    return(
        <AlertContext.Provider value={alertValue}>
            {props.children}
        </AlertContext.Provider>
    )
}