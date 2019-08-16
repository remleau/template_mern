import React, { useContext } from 'react';
import './header.scss';

import { UserContext } from './../../components/context/UserContext';

const Header = () =>{
    
    const [user, setUser] = useContext(UserContext);

    const logout = () => {
        const fetchData = async () => {
            const response = await fetch("/api/auth/logout");
            const json = await response.json();
            setUser([]);
        };
        fetchData();
    }

    return(
        <div>
            {!user.message ? user.user_name : ""}
            {!user.message ? <a onClick={logout}>   logout</a> : ""}
        </div>
    );
};

export default Header;
