import React, { useContext } from 'react';
import './header.scss';

import { UserContext } from './../../components/context/UserContext';

const Header = () =>{

    const {user, isLoggedIn ,setIsLoggedIn} = useContext(UserContext);

    const logout = () => {
        setIsLoggedIn(false)
    }

    return(
        <div>
            {isLoggedIn ? user.user_name : ""}
            {isLoggedIn ? <a onClick={logout}>Logout</a> : ""}
        </div>
    );
};

export default Header;
