import { createContext } from "react";

export const LoginContext=createContext({
    userID:null,
    isloggedin:false,
    login:()=>{},
    logout:()=>{}
});