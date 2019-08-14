import React, { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = props => {
    
    const [user, setUser] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    
    const get_profil_info = async () => {
        const response = await fetch("/api/profile/me");
        const json = await response.json();
        setUser(json);
    };

    const get_logout = async () => {
        const response = await fetch("/api/auth/logout");
        const json = await response.json();
        if(json.message){
            setUser([])
        }
    };
    
    useEffect( () => {
        if(Cookies.get('token')){
            get_profil_info();
            setIsLoggedIn(true)
        }
    },[]);
    
    useEffect( () => {
        if(isLoggedIn === true){
            get_profil_info();
        }else if(isLoggedIn === false){
            get_logout();
        }
    },[isLoggedIn]);

    return(
        <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    );
    
};
