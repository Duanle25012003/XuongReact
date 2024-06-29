import { ReactNode, createContext, useReducer } from "react";

interface Login{
    children : ReactNode
}
const reduceLog = (state: any, action: any)=>{
    switch (action.type){
        case "login":
            return sessionStorage.getItem('user');
        case "logout":
            return sessionStorage.removeItem('user');
            default:
                return state;
    }
}
export const LoginContext = createContext({} as {
    username: any,
    dispatchLogin: any
});
export const LoginProvider = (prop: Login)=>{
    const [username, dispatchLogin] = useReducer(reduceLog,sessionStorage.getItem('user'));
    return(
        <LoginContext.Provider value={{
            username,
            dispatchLogin
        }}>
        {prop.children}
        </LoginContext.Provider>
    )
}